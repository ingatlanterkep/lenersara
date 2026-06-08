// src/components/layers/crimeHeatLayer.js
import { TileLayer } from 'react-leaflet';

export const fetchCrimeData = async (bbox, signal) => {
  return [];
};

export const renderCrimeHeatLayer = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  
  // Próbáld ki ezeket a formátumokat:
  
  // 1. TileJSON alapú URL (gyakran ez kell egyéni rétegekhez)
  return (
    <TileLayer
      key="crime-heat-raster"
      url={`https://api.maptiler.com/maps/019e556f-80e0-7e04-af78-466f7f79efd7/{z}/{x}/{y}.webp?key=pZsWTfQMsHMC3mv8EY7g`}
      attribution='© <a href="https://www.maptiler.com/">MapTiler</a> | Közbiztonság: terkep.police.hu'
      tileSize={512}
            zIndex={105} // Például magasabb zIndex érték

      zoomOffset={-1}
    />
  );
};