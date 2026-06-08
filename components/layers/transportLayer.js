// src/components/map/layers/transportLayer.js
import { TileLayer } from 'react-leaflet';

export const renderTransportLayer = () => {
  return (
    <TileLayer
      url="https://pt.facilmap.org/tile/{z}/{x}/{y}.png"
      attribution='© <a href="https://facilmap.org">FacilMap</a> · © OpenStreetMap'
      opacity={0.9}  // kissé átlátszó, hogy jól látszódjon a hőtérképed alatt
      zIndex={200}    // felül minden rétegen
      className="fade-layer"
      maxZoom={18}
    />
  );
};

export const fetchTransportData = async () => [];  // marad üresen