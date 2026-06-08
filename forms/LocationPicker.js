// src/components/LocationPicker.jsx
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { debounce } from 'lodash';
import '../styles/components/LocationPicker.css';  // ← a CSS fájl importja

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
});

const LocationPicker = ({
  initialLat = 47.4979,
  initialLon = 19.0402,
  initialRadius = 100,
  initialStreetLine = [],
  initialAreaPolygon = [],
  initialMode = 'exact_point',
  onChange,
}) => {
  const [mode, setMode] = useState(initialMode);
  const [prevMode, setPrevMode] = useState(initialMode);
  const [lat, setLat] = useState(initialLat);
  const [lon, setLon] = useState(initialLon);
  const [radius, setRadius] = useState(initialRadius);
  const [streetLine, setStreetLine] = useState(initialStreetLine);
  const [areaPolygon, setAreaPolygon] = useState(initialAreaPolygon);

  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const markerRef = useRef(null);
  const drawControlRef = useRef(null);
  const shapeRef = useRef(null);
  const isDraggingRef = useRef(false);

  const round = (num) => parseFloat(num.toFixed(6));
  const debouncedLatLon = useRef(debounce((newLat, newLon) => {
    setLat(round(newLat));
    setLon(round(newLon));
  }, 200)).current;

  // Térkép létrehozása
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('location-picker-map').setView([initialLat, initialLon], 15);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    drawnItemsRef.current = new L.FeatureGroup();
    map.addLayer(drawnItemsRef.current);

    markerRef.current = L.marker([initialLat, initialLon], { draggable: true });
    markerRef.current.addTo(drawnItemsRef.current);

    markerRef.current.on('dragstart', () => {
      isDraggingRef.current = true;
    });

    markerRef.current.on('dragend', (e) => {
      isDraggingRef.current = false;
      const pos = e.target.getLatLng();
      debouncedLatLon(pos.lat, pos.lng);

      if (shapeRef.current) {
        if (mode === 'random_circle' && shapeRef.current instanceof L.Circle) {
          shapeRef.current.setLatLng(pos);
        }
        // street line és polygon → maradnak a helyükön
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Mode változás figyelése
  useEffect(() => {
    if (mode !== prevMode) {
      setPrevMode(mode);
    }
  }, [mode]);

  // Draw control + automatikus rajzolás (kivéve circle-t)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (drawControlRef.current) {
      map.removeControl(drawControlRef.current);
    }

    const drawOptions = {
      polyline: mode === 'point_street' || mode === 'random_street',
      polygon: mode === 'random_polygon',
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
    };

    drawControlRef.current = new L.Control.Draw({
      edit: { featureGroup: drawnItemsRef.current },
      draw: drawOptions,
    });
    map.addControl(drawControlRef.current);

    const handleCreated = (e) => {
      const layer = e.layer;

      if (shapeRef.current) {
        drawnItemsRef.current.removeLayer(shapeRef.current);
      }

      drawnItemsRef.current.addLayer(layer);
      shapeRef.current = layer;

      if (e.layerType === 'polyline') {
        const coords = layer.getLatLngs().map(p => [round(p.lng), round(p.lat)]);
        setStreetLine([coords]);
        const midIndex = Math.floor(coords.length / 2);
        const mid = coords[midIndex];
        markerRef.current.setLatLng([mid[1], mid[0]]);
        debouncedLatLon(mid[1], mid[0]);
      } else if (e.layerType === 'polygon') {
        const coords = layer.getLatLngs()[0].map(p => [round(p.lng), round(p.lat)]);
        setAreaPolygon([coords]);
        const bounds = layer.getBounds();
        const center = bounds.getCenter();
        markerRef.current.setLatLng(center);
        debouncedLatLon(center.lat, center.lng);
      }
    };

    const handleEdited = (e) => {
      e.layers.eachLayer((layer) => {
        if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
          const coords = layer.getLatLngs().map(p => [round(p.lng), round(p.lat)]);
          setStreetLine([coords]);
        } else if (layer instanceof L.Polygon) {
          const coords = layer.getLatLngs()[0].map(p => [round(p.lng), round(p.lat)]);
          setAreaPolygon([coords]);
        }
      });
    };

    map.on('draw:created', handleCreated);
    map.on('draw:edited', handleEdited);

    const modeChanged = mode !== prevMode;
    const hasShape = !!(
      ((mode === 'point_street' || mode === 'random_street') && streetLine.length > 0) ||
      (mode === 'random_polygon' && areaPolygon.length > 0)
    );

    if (modeChanged && !hasShape) {
      if (drawOptions.polyline) {
        new L.Draw.Polyline(map, drawControlRef.current.options.polyline).enable();
      } else if (drawOptions.polygon) {
        new L.Draw.Polygon(map, drawControlRef.current.options.polygon).enable();
      }
    }

    return () => {
      map.off('draw:created', handleCreated);
      map.off('draw:edited', handleEdited);
      if (map._drawLayer) map._drawLayer.disable();
    };
  }, [mode, prevMode, streetLine, areaPolygon]);

  // Mode váltáskor rétegek resetelése
  useEffect(() => {
    if (!mapRef.current || !drawnItemsRef.current || !markerRef.current) return;

    const needsClear = mode !== prevMode &&
      !((mode.includes('street') && prevMode.includes('street')) ||
        (mode.includes('polygon') && prevMode.includes('polygon')) ||
        (mode === 'random_circle' && prevMode === 'random_circle'));

    if (needsClear) {
      drawnItemsRef.current.eachLayer((lyr) => {
        if (lyr !== markerRef.current) {
          drawnItemsRef.current.removeLayer(lyr);
        }
      });
      shapeRef.current = null;
      if (mode !== 'random_circle') setRadius(0);
      if (!mode.includes('street')) setStreetLine([]);
      if (!mode.includes('polygon')) setAreaPolygon([]);
    }

    if (!isDraggingRef.current) {
      markerRef.current.setLatLng([lat, lon]);
    }
  }, [lat, lon, mode, prevMode]);

  // Manuális kör kezelés
  useEffect(() => {
    if (mode !== 'random_circle' || !mapRef.current || !drawnItemsRef.current) return;

    if (shapeRef.current && !(shapeRef.current instanceof L.Circle)) {
      drawnItemsRef.current.removeLayer(shapeRef.current);
      shapeRef.current = null;
    }

    if (radius > 0) {
      if (shapeRef.current && shapeRef.current instanceof L.Circle) {
        shapeRef.current.setLatLng([lat, lon]);
        shapeRef.current.setRadius(radius);
      } else {
        const circle = L.circle([lat, lon], {
          radius,
          color: '#3388ff',
          fillColor: '#3388ff',
          fillOpacity: 0.15,
        });
        drawnItemsRef.current.addLayer(circle);
        shapeRef.current = circle;
      }
    } else if (shapeRef.current) {
      drawnItemsRef.current.removeLayer(shapeRef.current);
      shapeRef.current = null;
    }
  }, [mode, lat, lon, radius]);

  // LocationPicker.jsx — a komponens végére, a return előtt

useEffect(() => {
  if (!onChange) return;

  onChange({
    mode,
    lat: round(lat),
    lon: round(lon),
    radius: mode === 'random_circle' ? radius : null,
    street_line: (mode === 'point_street' || mode === 'random_street') ? streetLine : [],
    area_polygon: mode === 'random_polygon' ? areaPolygon : [],
  });
}, [mode, lat, lon, radius, streetLine, areaPolygon, onChange]);

// LocationPicker.jsx – a mode/draw control useEffect után tedd be ezt
useEffect(() => {
  if (!mapRef.current || !drawnItemsRef.current) return;

  // Ha van street_line és a mód utca vonal → kirajzoljuk
  if (mode === 'point_street' && streetLine.length > 0) {
    streetLine.forEach(segment => {
      if (segment?.length > 1) {
        const coords = segment.map(([lon, lat]) => [lat, lon]);
        L.polyline(coords, {
          color: '#e74c3c',
          weight: 5,
          opacity: 0.9
        }).addTo(drawnItemsRef.current);
      }
    });
  }

  // Ha van area_polygon és mód poligon → kirajzoljuk
  if (mode === 'random_polygon' && areaPolygon.length > 0) {
    areaPolygon.forEach(poly => {
      if (poly?.length > 2) {
        const coords = poly.map(([lon, lat]) => [lat, lon]);
        L.polygon(coords, {
          color: '#2ecc71',
          fillColor: '#2ecc71',
          fillOpacity: 0.25,
          weight: 3
        }).addTo(drawnItemsRef.current);
      }
    });
  }
}, [mode, streetLine, areaPolygon]);  // figyeli a változásokat

  // Nominatim keresés
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
      );
      const data = await res.json();

      if (data?.length > 0) {
        const { lat: newLat, lon: newLon } = data[0];
        setLat(parseFloat(newLat));
        setLon(parseFloat(newLon));
        mapRef.current?.setView([newLat, newLon], 15);

        if (mode === 'random_circle' && shapeRef.current instanceof L.Circle) {
          shapeRef.current.setLatLng([newLat, newLon]);
        }
      } else {
        alert('Nem található a keresett hely');
      }
    } catch (err) {
      console.error('Nominatim hiba:', err);
      alert('Hiba történt a keresés során');
    }
  };

  return (
<fieldset className="upload-fieldset">
  <legend>Helyszín megadása térképen</legend>
      <div className="location-picker-header">
        <div className="location-picker-search">
          <label>Keresés (város, utca, stb.):</label>
          <div className="location-picker-search-row">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pl.: Budapest, Andrássy út"
              className="form-input"
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button onClick={handleSearch}>Keres</button>
          </div>
        </div>

        <div className="location-picker-mode">
          <label>Megadási mód:</label>
          <select
            value={mode}
            onChange={e => setMode(e.target.value)}
            className="form-select"
          >
            <option value="exact_point">Pontos pont (csak jelölő)</option>
            <option value="random_circle">Pont + kör (sugárral)</option>
            <option value="point_street">Pont + utca vonal</option>
            <option value="random_polygon">Pont + poligon terület</option>
          </select>
        </div>
      </div>


<div 
  id="location-picker-map" 
  style={{ 
    width: '100%', 
    height: '500px',
    minHeight: '300px',
    position: 'relative',
    zIndex: 1
  }} 
/>    </fieldset>
  );
};

export default LocationPicker;