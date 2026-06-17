// src/components/LayerPanel.js
import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose }) => {
  const { cookiesAccepted, sendEvent } = useAnalytics();
  const prevLayersRef = useRef(layers);
  
  const allLayers = [
    { key: 'satellite', name: 'Műhold' },
    { key: 'crimeHeat', name: 'Közbiztonság' },
    { key: 'transport', name: 'Közlekedés' },
    { key: 'education', name: 'Oktatás' },
    { key: 'shop', name: 'Boltok' },
    { key: 'health', name: 'Egészségügy' },
    { key: 'bank', name: 'Bankok' },
    { key: 'outdoor', name: 'Szabadtér' },
    { key: 'sport', name: 'Sport' },
    { key: 'religion', name: 'Vallás' },
  ];

const handleChange = (key, checked) => {
  // 1. Frissítjük a state-et
  setLayers(prev => ({
    ...prev,
    [key]: checked
  }));

  // 2. Aktív rétegek listája
  const currentLayers = { ...layers, [key]: checked };
  const activeLayers = Object.keys(currentLayers)
    .filter(k => currentLayers[k])
    .join(',');

  // 3. 🔥 ANALYTICS KÜLDÉS - KIS KÉSLELTETÉSSEL, HOGY A STATE FRISSÜLJÖN
  setTimeout(() => {
    const result = sendEvent('layer_toggle', {
      layer_name: key,
      layer_state: checked ? 'enabled' : 'disabled',
      active_layers: activeLayers || 'none',
      zoom_level: zoom || 7,
    });
    
    console.log(`[LayerPanel] Réteg váltás: ${key} -> ${checked ? '✅' : '❌'} (analytics: ${result ? '✅' : '❌'})`);
  }, 50);
};
  // Változások nyomon követése (opcionális)
  useEffect(() => {
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayersRef.current[key]
    );

    if (changedKeys.length > 0 && cookiesAccepted) {
      console.log('[LayerPanel] Változás észlelve (már elküldve a handleChange által):', changedKeys);
    }

    prevLayersRef.current = layers;
  }, [layers, cookiesAccepted]);

  return (
    <div className="layer-panel-modern">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="layer-panel-content">
        <div className="layer-bar-scrollable">
          <div className="layer-bar">
            {allLayers.map(({ key, name }) => (
              <label
                key={key}
                className={`layer-control-label ${key}-label ${layers[key] ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={!!layers[key]}
                  onChange={(e) => handleChange(key, e.target.checked)}
                />
                <span className="layer-text">{name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayerPanel;