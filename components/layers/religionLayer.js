import { icons } from '../icons';
import MarkerWithPopup from '../MarkerWithPopup';

export const fetchReligionData = async (bbox, signal = null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/markers?layer=religion&bbox=${bbox}`,
      { signal }
    );

    if (!response.ok) throw new Error('Hiba a markerek lekérdezésekor');

    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Ismeretlen hiba');

    return result.data.map(marker => ({
      id: marker.id,
      lat: marker.lat,
      lon: marker.lon,
      tags: marker.tags,
      type: marker.type,
      center: marker.lat && marker.lon ? { lat: marker.lat, lon: marker.lon } : undefined
    }));
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    console.error('[fetchReligionData] Hiba DB lekérdezéskor:', error);
    return [];
  }
};

export const renderReligionLayer = (data, zoom) => {
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

      const religion = place.tags?.religion?.toLowerCase();
      switch (religion) {
        case 'christian':
          icon = icons.christian;
          break;
        case 'muslim':
          icon = icons.muslim;
          break;
        case 'jewish':
          icon = icons.jewish;
          break;
        default:
          icon = icons.christian;
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