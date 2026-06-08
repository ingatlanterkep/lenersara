// src/components/LayerControl.js
import React, { useEffect, useCallback, useRef } from 'react';
import { useMap } from 'react-leaflet';

import { fetchReligionData } from './layers/religionLayer';
import { fetchHealthData } from './layers/healthLayer';
import { fetchTransportData } from './layers/transportLayer';
import { fetchEducationData } from './layers/educationLayer';
import { fetchSatelliteData } from './layers/satelliteLayer';
import { fetchShopData } from './layers/shopLayer';
import { fetchOutdoorData } from './layers/outdoorLayer';
import { fetchSportData } from './layers/sportLayer';
import { fetchBankData } from './layers/bankLayer';

const LayerControl = ({ zoom, layers, layerData, setLayerData }) => {
  const map = useMap();
  const abortControllerRef = useRef(null);
  const prevZoomRef = useRef(zoom);
  const prevLayersRef = useRef(layers);

  const fetchFunctions = {
    transport: fetchTransportData,
    religion: fetchReligionData,
    health: fetchHealthData,
    education: fetchEducationData,
    satellite: fetchSatelliteData,
    shop: fetchShopData,
    outdoor: fetchOutdoorData,
    sport: fetchSportData,
    bank: fetchBankData,
  };

  const loadDataForVisibleArea = useCallback(async () => {
    // Ha zoom < 14, csak a nem zoom-függő rétegeket tartsuk (pl. transport, satellite

    const bounds = map.getBounds();
    const bbox = `${bounds.getSouthWest().lat},${bounds.getSouthWest().lng},${bounds.getNorthEast().lat},${bounds.getNorthEast().lng}`;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const newData = { ...layerData };

    const promises = Object.keys(layers).map(async (key) => {
      if (layers[key] && fetchFunctions[key]) {
        try {
          const data = await fetchFunctions[key](bbox, controller.signal);
          if (!controller.signal.aborted) {
            newData[key] = data;
          }
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error(`Error fetching ${key} data:`, err);
          }
        }
      } else {
        // Ha ki van kapcsolva a layer, ürítsük az adatát
        newData[key] = layers[key] ? newData[key] : [];
      }
    });

    await Promise.all(promises);

    if (!controller.signal.aborted) {
      setLayerData(newData);
    }
  }, [zoom, layers, map, setLayerData]); // layerData KIMARAD a deps-ből!

  // Csak akkor hívjuk, ha zoom vagy layers változott
  useEffect(() => {
    const zoomChanged = prevZoomRef.current !== zoom;
    const layersChanged = JSON.stringify(prevLayersRef.current) !== JSON.stringify(layers);

    console.log('[LayerControl] Triggered by zoom/layers change:', { zoom, layers, zoomChanged, layersChanged });

    if (zoomChanged || layersChanged) {
      loadDataForVisibleArea();
      prevZoomRef.current = zoom;
      prevLayersRef.current = layers;
    }
  }, [zoom, layers, loadDataForVisibleArea]);

  // Map mozgatásakor (panning) újratöltés
  useEffect(() => {
const handleMoveEnd = () => {
  loadDataForVisibleArea(); // Mindig lekéri, ha mozog a térkép
};

    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('moveend', handleMoveEnd);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [map, zoom, loadDataForVisibleArea]);

  return null;
};

export default LayerControl;