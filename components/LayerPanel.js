// src/components/LayerPanel.js
import React, { useEffect, useRef } from 'react';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose, cookiesAccepted }) => {
  const prevLayersRef = useRef(layers); // Inicializáljuk a jelenlegi layers-szel

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
  if (!cookiesAccepted || !window.gtag) {
    console.log('[LayerPanel] GA4 skipped', { cookiesAccepted, gtag: !!window.gtag });
    return;
  }

    const prevLayers = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayers[key]
    );

    if (changedKeys.length > 0) {
      changedKeys.forEach(key => {
        window.gtag('event', 'layer_toggle', {
          layer_name: key,
          layer_state: layers[key] ? 'enabled' : 'disabled',
          active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none'
        });
      });
    }

    // Frissítjük a ref-et a következő összehasonlításhoz
    prevLayersRef.current = layers;
  }, [layers, cookiesAccepted]);

  const handleChange = (key, checked) => {
    console.log('Réteg váltás:', key, checked); // Debug, ha kell

    setLayers(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const visibleLayers = allLayers;

  return (
    <div className="layer-panel-modern">
      <button className="close-button" onClick={onClose}>×</button>

      <div className="layer-panel-content">
        <div className="layer-bar-scrollable">
          <div className="layer-bar">
            {visibleLayers.map(({ key, name }) => (
              <label
                key={key}
                className={`layer-control-label ${key}-label ${layers[key] ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={!!layers[key]} // biztonság kedvéért !!
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