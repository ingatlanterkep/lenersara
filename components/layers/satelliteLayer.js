import { TileLayer } from 'react-leaflet';

export const fetchSatelliteData = async (bbox, signal) => {
  // A Satellite réteg nem igényel adatlekérést, mivel csak a térképréteg URL-je változik
  return [];
};

export const renderSatelliteLayer = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  return (
   <TileLayer
     url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${apiKey}`}
      attribution='© <a href="https://www.maptiler.com/">MapTiler</a>'
      zIndex={100} // Például magasabb zIndex érték
//     url={`https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}`}
//      zIndex={100} // Például magasabb zIndex érték
    />
  );
};