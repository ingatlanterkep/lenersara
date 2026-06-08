import { icons } from '../icons';
import MarkerWithPopup from '../MarkerWithPopup';

export const fetchOutdoorData = async (bbox, signal = null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/markers?layer=outdoor&bbox=${bbox}`,
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
    console.error('[fetchOutdoorData] Hiba DB lekérdezéskor:', error);
    return [];
  }
};

export const renderOutdoorLayer = (data, zoom) => {
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

      const leisure = place.tags?.leisure;
      const landuse = place.tags?.landuse;
      const boundary = place.tags?.boundary;
      const natural = place.tags?.natural;

      if (leisure === 'playground') {
        icon = icons.playground;
        title = place.tags?.name || 'Játszótér';
      } else if (leisure === 'dog_park') {
        icon = icons.dogPark;
        title = place.tags?.name || 'Kutyafuttató';
      } else if (
        landuse === 'forest' ||
        boundary === 'protected_area' ||
        natural === 'peak' ||
        natural === 'cave_entrance'
      ) {
        icon = icons.nature;
        if (landuse === 'forest') {
          title = place.tags?.name || 'Erdő';
        } else if (boundary === 'protected_area') {
          title = place.tags?.name || 'Természetvédelmi terület';
        } else if (natural === 'peak') {
          title = place.tags?.name || 'Hegycsúcs';
        } else if (natural === 'cave_entrance') {
          title = place.tags?.name || 'Barlang';
        }
      } else if (leisure === 'park' || leisure === 'garden') {
        icon = icons.park;
        title = place.tags?.name || (leisure === 'park' ? 'Park' : 'Kert');
      } else {
        icon = icons.park;
        title = place.tags?.name || 'Szabadtéri terület';
      }

      return (
        <MarkerWithPopup
          key={place.id}
          position={[lat, lon]}
          icon={icon}
          title={title}
          content={place.tags?.description || ''}
        />
      );
    });
};