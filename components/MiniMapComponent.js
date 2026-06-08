import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderReligionLayer, fetchReligionData } from './layers/religionLayer';
import { renderHealthLayer, fetchHealthData } from './layers/healthLayer';
import { renderEducationLayer, fetchEducationData } from './layers/educationLayer';
import { renderShopLayer, fetchShopData } from './layers/shopLayer';
import { renderOutdoorLayer, fetchOutdoorData } from './layers/outdoorLayer';
import { renderSportLayer, fetchSportData } from './layers/sportLayer';
import { renderBankLayer, fetchBankData } from './layers/bankLayer';
import { getPostGeometry } from '../services/apiService';
import './MiniMapComponent.css';
import { debounce } from 'lodash';

const geometryCache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

const loadGeometry = async (postId) => {
  if (geometryCache.has(postId)) {
    const { data, timestamp } = geometryCache.get(postId);
    if (Date.now() - timestamp < CACHE_TTL && (data.area_polygon?.length || data.street_line?.length || data.radius)) {
      return data;
    }
    geometryCache.delete(postId);
  }

  try {
    const res = await getPostGeometry(postId);
    const data = {
      radius: res.data?.radius || 0,
      street_line: Array.isArray(res.data?.street_line) ? res.data.street_line : [],
      area_polygon: Array.isArray(res.data?.area_polygon) ? res.data.area_polygon : [],
    };

    if (!data.area_polygon.length && !data.street_line.length && !data.radius) return null;

    geometryCache.set(postId, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error(`[MiniMap] Geometry load failed for ${postId}:`, error);
    return null;
  }
};

const MiniMapComponent = React.memo(({ post }) => {
  const [zoom, setZoom] = useState(14);
  const [layers, setLayers] = useState({
    transport: false,
    satellite: false,
    religion: false,
    health: false,
    education: false,
    shop: false,
    outdoor: false,
    sport: false,
    bank: false,
    crimeHeat: false,
  });
  const [layerData, setLayerData] = useState({
    transport: [], religion: [], health: [], education: [], satellite: [], shop: [], outdoor: [], sport: [], bank: [], crimeHeat: [],
  });
  const [geometryData, setGeometryData] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // A drag engedélyezésére használt ref - közvetlenül a leaflet map-en állítjuk be
  const dragEnabledRef = useRef(false);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  const geometryLayerRef = useRef(null);
  const abortRef = useRef(null);
  const layersRef = useRef(layers);
  const hasFittedBounds = useRef(false);
  const abortControllerRef = useRef(null);

  // Resize listener a mobil állapot figyeléséhez
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Ablak átméretezéskor alaphelyzetbe állítjuk a drag-et (csak ha mobil)
      if (mobile) {
        dragEnabledRef.current = false;
        // Ha van leaflet map objektum, frissítjük a dragging beállítást
        if (leafletMapRef.current) {
          leafletMapRef.current.dragging.disable();
        }
      } else {
        // Gépen engedélyezzük a drag-et
        if (leafletMapRef.current) {
          leafletMapRef.current.dragging.enable();
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  const hungaryBounds = L.latLngBounds(L.latLng(45.737, 16.113), L.latLng(48.585, 22.897));
  const markerIcon = L.icon({
    iconUrl: '/marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    if (post?._id) loadGeometry(post._id).then(setGeometryData);
  }, [post?._id]);

  const clearGeometryLayer = useCallback(() => {
    if (geometryLayerRef.current && leafletMapRef.current) {
      leafletMapRef.current.removeLayer(geometryLayerRef.current);
      geometryLayerRef.current = null;
    }
  }, []);

  const renderGeometryLayer = useCallback((post, geometry) => {
    const map = leafletMapRef.current;
    if (!map || !geometry || !post) return;

    clearGeometryLayer();
    const layerGroup = L.layerGroup();
    const zoomLevel = map.getZoom();

    if (Array.isArray(geometry.street_line) && geometry.street_line.length > 0) {
      geometry.street_line.forEach(segment => {
        if (Array.isArray(segment) && segment.length > 0) {
          const coords = segment
            .filter(c => Array.isArray(c) && c.length === 2 && !isNaN(c[0]) && !isNaN(c[1]))
            .map(c => [c[1], c[0]]);
          if (coords.length > 0) {
            layerGroup.addLayer(L.polyline(coords, { 
              className: 'mini-map-polyline',
              color: 'green', weight: Math.max(2, Math.min(5, zoomLevel / 3)), opacity: 0.6
            }));
          }
        }
      });
    }

    if (Array.isArray(geometry.area_polygon) && geometry.area_polygon.length > 0) {
      const polygonCoords = geometry.area_polygon[0];
      if (Array.isArray(polygonCoords) && polygonCoords.length > 0) {
        const coords = polygonCoords
          .filter(c => Array.isArray(c) && c.length === 2 && !isNaN(c[0]) && !isNaN(c[1]))
          .map(c => [c[1], c[0]]);
        if (coords.length > 0) {
          layerGroup.addLayer(L.polygon(coords, 
            { className: 'mini-map-polygon',
            color: 'purple', weight: Math.max(1, Math.min(4, zoomLevel / 4)),
            opacity: 0.6, fillOpacity: 0.3
          }));
        }
      }
    }

    if (geometry.radius > 0 && post.geolocation?.lat && post.geolocation?.lon &&
        geometry.street_line.length === 0 && geometry.area_polygon.length === 0) {
      layerGroup.addLayer(L.circle([post.geolocation.lat, post.geolocation.lon], {
        className: 'mini-map-circle',
        radius: geometry.radius, color: 'green',
        weight: Math.max(1, Math.min(4, zoomLevel / 4)), opacity: 0.6, fillOpacity: 0.2
      }));
    }

    if (layerGroup.getLayers().length > 0) {
      layerGroup.addTo(map);
      geometryLayerRef.current = layerGroup;
    }
  }, [clearGeometryLayer]);


  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    if (!map.attributionControl) {
      map.attributionControl = L.control.attribution({
        position: 'bottomright',
        prefix: false
      }).addTo(map);
    }

    const text = 'Forrás: terkep.police.hu';

    if (layers.crimeHeat) {
      if (!map.attributionControl._attributions?.[text]) {
        map.attributionControl.addAttribution(text);
      }
    } else {
      map.attributionControl.removeAttribution(text);
    }

    return () => {
      if (map.attributionControl) {
        map.attributionControl.removeAttribution(text);
      }
    };
  }, [layers.crimeHeat]);

  const MapController = () => {
    const map = useMap();
    
    // Mentsük el a leaflet map objektumot a ref-be
    useEffect(() => {
      leafletMapRef.current = map;
      
      // Kezdeti beállítás: mobilon kikapcsoljuk a drag-et
      if (isMobile) {
        map.dragging.disable();
        dragEnabledRef.current = false;
      } else {
        map.dragging.enable();
        dragEnabledRef.current = true;
      }
    }, [map, isMobile]);

    // Zoom esemény figyelése - zoomoláskor engedélyezzük a drag-et mobilon
    useEffect(() => {
      if (!map) return;

      const handleZoom = () => {
        if (isMobile) {
          const currentZoom = map.getZoom();
          const defaultZoom = 14;
          
          // Ha zoomoltak (nem az alap zoom-on van), akkor engedélyezzük a drag-et
          if (currentZoom !== defaultZoom && !dragEnabledRef.current) {
            dragEnabledRef.current = true;
            map.dragging.enable();
          }
        }
      };

      map.on('zoomend', handleZoom);
      
      return () => {
        map.off('zoomend', handleZoom);
      };
    }, [map, isMobile]);

    // A többi useEffect változatlan marad...
    useEffect(() => {
      if (!leafletMapRef.current) return;

      const loadAllActiveLayers = async () => {
        const bounds = map.getBounds();
        const bbox = `${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng}`;

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const newData = { ...layerData };
        const fetchPromises = [];

        if (layers.religion && layerData.religion.length === 0) fetchPromises.push(fetchReligionData(bbox, controller.signal).then(d => ({ key: 'religion', data: d })));
        if (layers.health && layerData.health.length === 0) fetchPromises.push(fetchHealthData(bbox, controller.signal).then(d => ({ key: 'health', data: d })));
        if (layers.education && layerData.education.length === 0) fetchPromises.push(fetchEducationData(bbox, controller.signal).then(d => ({ key: 'education', data: d })));
        if (layers.shop && layerData.shop.length === 0) fetchPromises.push(fetchShopData(bbox, controller.signal).then(d => ({ key: 'shop', data: d })));
        if (layers.outdoor && layerData.outdoor.length === 0) fetchPromises.push(fetchOutdoorData(bbox, controller.signal).then(d => ({ key: 'outdoor', data: d })));
        if (layers.sport && layerData.sport.length === 0) fetchPromises.push(fetchSportData(bbox, controller.signal).then(d => ({ key: 'sport', data: d })));
        if (layers.bank && layerData.bank.length === 0) fetchPromises.push(fetchBankData(bbox, controller.signal).then(d => ({ key: 'bank', data: d })));

        if (fetchPromises.length === 0) return;

        try {
          const results = await Promise.allSettled(fetchPromises);
          results.forEach(result => {
            if (result.status === 'fulfilled') {
              const { key, data } = result.value;
              newData[key] = data || [];
            }
          });
          if (!controller.signal.aborted) {
            setLayerData(newData);
          }
        } catch (err) {
          if (err.name !== 'AbortError') console.error('Layer fetch error:', err);
        }
      };

      loadAllActiveLayers();
    }, [layers, layerData, map]);

    useEffect(() => {
      if (!leafletMapRef.current) return;

      const loadAllActiveLayers = async () => {
        const active = ['religion', 'health', 'education', 'shop', 'outdoor', 'sport', 'bank']
          .some(k => layersRef.current[k]);

        if (!active) return;

        const bounds = map.getBounds();
        const bbox = `${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng}`;

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const newData = { ...layerData };
        const fetchPromises = [];

        if (layersRef.current.religion) fetchPromises.push(fetchReligionData(bbox, controller.signal).then(d => ({ key: 'religion', data: d })));
        if (layersRef.current.health) fetchPromises.push(fetchHealthData(bbox, controller.signal).then(d => ({ key: 'health', data: d })));
        if (layersRef.current.education) fetchPromises.push(fetchEducationData(bbox, controller.signal).then(d => ({ key: 'education', data: d })));
        if (layersRef.current.shop) fetchPromises.push(fetchShopData(bbox, controller.signal).then(d => ({ key: 'shop', data: d })));
        if (layersRef.current.outdoor) fetchPromises.push(fetchOutdoorData(bbox, controller.signal).then(d => ({ key: 'outdoor', data: d })));
        if (layersRef.current.sport) fetchPromises.push(fetchSportData(bbox, controller.signal).then(d => ({ key: 'sport', data: d })));
        if (layersRef.current.bank) fetchPromises.push(fetchBankData(bbox, controller.signal).then(d => ({ key: 'bank', data: d })));

        try {
          const results = await Promise.allSettled(fetchPromises);
          results.forEach(result => {
            if (result.status === 'fulfilled') {
              const { key, data } = result.value;
              newData[key] = data || [];
            }
          });
          if (!controller.signal.aborted) {
            setLayerData(newData);
          }
        } catch (err) {
          if (err.name !== 'AbortError') console.error('Layer fetch error:', err);
        }
      };

      const debouncedLoad = debounce(loadAllActiveLayers, 600);

      map.on('moveend', debouncedLoad);
      map.on('zoomend', debouncedLoad);

      return () => {
        debouncedLoad.cancel();
        map.off('moveend', debouncedLoad);
        map.off('zoomend', debouncedLoad);
        if (abortRef.current) abortRef.current.abort();
      };
    }, [map, layerData]);



    useEffect(() => {
      if (!geometryData || !leafletMapRef.current) return;

      const currentMap = leafletMapRef.current;

      renderGeometryLayer(post, geometryData);

      const handler = debounce(() => renderGeometryLayer(post, geometryData), 100);
      currentMap.on('zoomend', handler);
      currentMap.on('moveend', handler);

      if (!hasFittedBounds.current && (geometryData.area_polygon?.length > 0 || geometryData.street_line?.length > 0 || geometryData.radius > 0)) {
        const allCoords = [];

        if (geometryData.area_polygon?.length > 0) {
          const polyCoords = geometryData.area_polygon[0]
            .filter(c => Array.isArray(c) && c.length === 2 && !isNaN(c[0]) && !isNaN(c[1]))
            .map(c => [c[1], c[0]]);
          allCoords.push(...polyCoords);
        }

        if (geometryData.street_line?.length > 0) {
          geometryData.street_line.forEach(segment => {
            if (Array.isArray(segment) && segment.length > 0) {
              const lineCoords = segment
                .filter(c => Array.isArray(c) && c.length === 2 && !isNaN(c[0]) && !isNaN(c[1]))
                .map(c => [c[1], c[0]]);
              allCoords.push(...lineCoords);
            }
          });
        }

        if (allCoords.length === 0 && geometryData.radius > 0 && post.geolocation?.lat && post.geolocation?.lon) {
          allCoords.push([post.geolocation.lat, post.geolocation.lon]);
        }

        if (allCoords.length >= 1) {
          const bounds = L.latLngBounds(allCoords);

          if (allCoords.length === 1) {
            currentMap.setView(allCoords[0], 16);
          } else {
            currentMap.fitBounds(bounds, {
              padding: [40, 40],
              maxZoom: 17,
              animate: true,
              duration: 1.2,
            });
          }

          hasFittedBounds.current = true;
        }
      }

      return () => {
        currentMap.off('zoomend', handler);
        currentMap.off('moveend', handler);
      };
    }, [geometryData, renderGeometryLayer, post]);

    useEffect(() => {
      const handleZoom = () => setZoom(map.getZoom());
      map.on('zoomend', handleZoom);
      return () => map.off('zoomend', handleZoom);
    }, [map]);

    return null;
  };

  const handleLayerChange = (key, checked) => {
    setLayers(prev => ({ ...prev, [key]: checked }));
  };

  const layerConfig = [
    { key: 'transport', label: 'Közlekedés', className: 'transport-label' },
    { key: 'crimeHeat', label: 'Közbiztonság', className: 'crimeheat-label' },
    { key: 'satellite', label: 'Műhold', className: 'satellite-label' },
    { key: 'shop', label: 'Boltok', className: 'shop-label' },
    { key: 'bank', label: 'Bank', className: 'bank-label' },
    { key: 'education', label: 'Oktatás', className: 'education-label' },
    { key: 'health', label: 'Egészségügy', className: 'health-label' },
    { key: 'outdoor', label: 'Szabadtér', className: 'outdoor-label' },
    { key: 'sport', label: 'Sport', className: 'sport-label' },
    { key: 'religion', label: 'Vallás', className: 'religion-label' },
  ];

  return (
    <div className="mini-map-container">
      <MapContainer
        center={[post.geolocation?.lat || 47.161, post.geolocation?.lon || 19.505]}
        zoom={14}
        minZoom={10}
        maxZoom={20}
        maxBounds={hungaryBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        // A dragging prop-ot nem használjuk, mert közvetlenül a leaflet map-en állítjuk be
        dragging={true}
        touchZoom={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap'
          zIndex={1}
          className="fade-layer"
        />

        {zoom >= 14 && !layers.satellite && (
          <TileLayer
            url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
            attribution='© MapTiler'
            zIndex={2}
            className="fade-layer"
          />
        )}

        {layers.transport && (
          <Suspense fallback={null}>
            <TileLayer
              url="https://pt.facilmap.org/tile/{z}/{x}/{y}.png"
              attribution='© <a href="https://facilmap.org">FacilMap</a> · © OpenStreetMap'
              opacity={0.9}
              zIndex={200}
              className="fade-layer"
              maxZoom={18}
            />
          </Suspense>
        )}

        {layers.satellite && (
          <Suspense fallback={null}>
            <TileLayer
              url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
              attribution='© MapTiler'
              zIndex={10}
              className="fade-layer"
              maxNativeZoom={18}
            />
          </Suspense>
        )}

        <ZoomControl position="topleft" />
        <MapController />

        {post.geolocation?.lat && post.geolocation?.lon && geometryData &&
         geometryData.area_polygon?.length === 0 && geometryData.street_line?.length === 0 && geometryData.radius === 0 && (
          <Marker position={[post.geolocation.lat, post.geolocation.lon]} icon={markerIcon} interactive={false} />
        )}

        {layers.religion && renderReligionLayer(layerData.religion, zoom)}
        {layers.health && renderHealthLayer(layerData.health, zoom)}
        {layers.education && renderEducationLayer(layerData.education, zoom)}
        {layers.shop && renderShopLayer(layerData.shop, zoom)}
        {layers.outdoor && renderOutdoorLayer(layerData.outdoor, zoom)}
        {layers.sport && renderSportLayer(layerData.sport, zoom)}
        {layers.bank && renderBankLayer(layerData.bank, zoom)}
      </MapContainer>

      <div className="mini-map-layer-bar">
        {layerConfig
          .filter(({ key }) => key === 'transport' || key === 'satellite' || key === 'crimeHeat')
          .map(({ key, label, className }) => (
            <label key={key} className={`mini-layer-control-label ${className} ${layers[key] ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={layers[key]}
                onChange={(e) => handleLayerChange(key, e.target.checked)}
              />
              <span className="layer-text">{label}</span>
            </label>
          ))}

        {layerConfig
          .filter(({ key }) => key !== 'transport' && key !== 'satellite' && key !== 'crimeHeat')
          .map(({ key, label, className }) => (
            <label key={key} className={`mini-layer-control-label ${className} ${layers[key] ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={layers[key]}
                onChange={(e) => handleLayerChange(key, e.target.checked)}
              />
              <span className="layer-text">{label}</span>
            </label>
          ))}
      </div>
    </div>
  );
});

export default MiniMapComponent;