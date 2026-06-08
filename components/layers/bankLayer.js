import { icons } from '../icons';
import MarkerWithPopup from '../MarkerWithPopup';

// DB-ből!
export const fetchBankData = async (bbox, signal = null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/markers?layer=bank&bbox=${bbox}`,
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
    console.error('[fetchBankData] Hiba DB lekérdezéskor:', error);
    return [];
  }
};

export const renderBankLayer = (data, zoom) => {
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
      let title;

      const amenity = place.tags?.amenity;

      if (amenity === 'bank') {
        icon = icons.bank;
        title = place.tags?.name || 'Bankfiók';
      } else if (amenity === 'atm') {
        icon = icons.atm;
        title = place.tags?.name || place.tags?.operator || 'Bankautomata';
      } else {
        icon = icons.bank;
        title = place.tags?.name || 'Pénzügyi helyszín';
      }

      return (
        <MarkerWithPopup
          key={place.id}
          position={[lat, lon]}
          icon={icon}
          title={title}
          content={place.tags?.description || place.tags?.operator || ''}
        />
      );
    });
};