import { icons } from '../icons';
import MarkerWithPopup from '../MarkerWithPopup';

// layers/healthLayer.js – most már DB-ből!
export const fetchHealthData = async (bbox, signal = null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/markers?layer=health&bbox=${bbox}`,
      { signal }
    );

    if (!response.ok) throw new Error('Hiba a markerek lekérdezésekor');

    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Ismeretlen hiba');

    // Visszaadjuk ugyanazt a formátumot, mint az Overpass (elements tömb)
    return result.data.map(marker => ({
      id: marker.id,
      lat: marker.lat,
      lon: marker.lon,
      tags: marker.tags,
      type: marker.type,
      // center fallback, ha nincs lat/lon (de nálad mindig van)
      center: marker.lat && marker.lon ? { lat: marker.lat, lon: marker.lon } : undefined
    }));
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    console.error('[fetchHealthData] Hiba DB lekérdezéskor:', error);
    return []; // fallback üres tömb
  }
};

export const renderHealthLayer = (data, zoom) => {
  return data
    .slice(0, 50) // ← MAX 50 marker
    .filter((place) => {
      const lat = place.lat || place.center?.lat;
      const lon = place.lon || place.center?.lon;
      return lat !== undefined && lon !== undefined;
    })
    .map((place) => {
      const lat = place.lat || place.center?.lat;
      const lon = place.lon || place.center?.lon;
      let icon;

      const amenity = place.tags?.amenity;
      switch (amenity) {
        case 'hospital':
          icon = icons.hospital;
          break;
        case 'pharmacy':
          icon = icons.pharmacy;
          break;
        case 'dentist':
          icon = icons.dentist;
          break;
        case 'veterinary':
          icon = icons.veterinarian;
          break;
        case 'clinic':
        case 'doctor':
        case 'doctors':
          icon = icons.doctor;
          break;
        default:
          icon = icons.hospital;
      }

      return (
        <MarkerWithPopup
          key={place.id}
          position={[lat, lon]}
          icon={icon}
          title={place.tags?.name || 'Névtelen'}
          content={''}
        />
      );
    });
};