import { icons } from '../icons';
import MarkerWithPopup from '../MarkerWithPopup';

export const fetchSportData = async (bbox, signal = null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/markers?layer=sport&bbox=${bbox}`,
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
    console.error('[fetchSportData] Hiba DB lekérdezéskor:', error);
    return [];
  }
};

export const renderSportLayer = (data, zoom) => {
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
      const sport = place.tags?.sport;
      const amenity = place.tags?.amenity;

      if (
        (leisure === 'fitness_centre' && (!sport || !sport.includes('yoga'))) ||
        (leisure === 'gym' && (!sport || !sport.includes('yoga'))) ||
        (amenity === 'gym' && (!sport || !sport.includes('yoga')))
      ) {
        icon = icons.gym;
        title = place.tags?.name || 'Konditerem';
      } else if (leisure === 'fitness_station') {
        icon = icons.streetWorkout;
        title = place.tags?.name || 'Street Workout';
      } else if (
        (leisure === 'pitch' && (sport === 'soccer' || sport === 'basketball' || sport === 'beachvolleyball')) ||
        (leisure === 'sports_centre' && sport && (sport.includes('soccer') || sport.includes('basketball') || sport.includes('beachvolleyball')))
      ) {
        icon = icons.pitch;
        title = place.tags?.name || (sport === 'soccer' ? 'Focipálya' : sport === 'basketball' ? 'Kosárpálya' : 'Strandröplabda-pálya');
      } else if (
        leisure === 'marina' ||
        sport === 'rowing' ||
        sport === 'canoe' ||
        sport === 'kayak' ||
        leisure === 'swimming_area' ||
        sport === 'swimming'
      ) {
        icon = icons.waterSports;
        title = place.tags?.name || (leisure === 'marina' ? 'Kikötő' : sport === 'swimming' ? 'Úszóhely' : 'Vízisport');
      } else {
        icon = icons.gym;
        title = place.tags?.name || 'Sporthelyszín';
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