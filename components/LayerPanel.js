// src/components/LayerPanel.js - JAVÍTOTT VERZIÓ (useGA4 hook-kal)
import React, { useEffect, useRef } from 'react';
import { useGA4 } from '@/hooks/useGA4';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose, cookiesAccepted }) => {
  const prevLayersRef = useRef(layers);
  const { sendEvent, isReady } = useGA4();  // ← EZ A LÉNYEG!

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

  useEffect(() => {
    // Csak akkor küldünk eventet, ha:
    // 1. Elfogadták a sütiket
    // 2. A GA4 készen áll (isReady === true)
    if (!cookiesAccepted || !isReady) return;

    const prevLayers = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayers[key]
    );

    if (changedKeys.length > 0) {
      changedKeys.forEach(key => {
        sendEvent('layer_toggle', {
          layer_name: key,
          layer_state: layers[key] ? 'enabled' : 'disabled',
          active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none'
        });
      });
    }

    prevLayersRef.current = layers;
  }, [layers, cookiesAccepted, isReady, sendEvent]);

  const handleChange = (key, checked) => {
    setLayers(prev => ({
      ...prev,
      [key]: checked
    }));
  };

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