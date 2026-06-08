import { TileLayer } from 'react-leaflet';

export const fetchBasicData = async (bbox, signal) => {
  // A Basic réteg nem igényel adatlekérést, mivel csak a térképréteg URL-je változik
  return [];
};

export const renderBasicLayer = () => {
 const apiKey = process.env.REACT_APP_MAPTILER_API_KEY;
  return (
    <TileLayer
//      url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"


     url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.jpg?key=${apiKey}`}
      attribution='© <a href="https://www.maptiler.com/">MapTiler</a>'
      zIndex={100} // Például magasabb zIndex érték
    />
  );
};