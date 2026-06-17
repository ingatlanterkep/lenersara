import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext'; // ha van
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose }) => {
  const prevLayersRef = useRef(layers);
  const { sendEvent } = useAnalytics?.() || {}; // ha van context

  const allLayers = [
    { key: 'satellite', name: 'Műhold' },
    { key: 'crimeHeat', name: 'Közbiztonság' },
    { key: 'transport', name: 'Közlekedés' },
    // ... többi
  ];

  // === FŐ ANALYTICS LOGIKA (useEffect) ===
  useEffect(() => {
    if (!document.cookie.includes('ingatlanTerkepCookieConsent=true')) return;

    const prev = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(key => layers[key] !== prev[key]);

    if (changedKeys.length > 0) {
      changedKeys.forEach(key => {
        const newState = layers[key];

        // 1. gtag (legjobb)
        if (window.gtag) {
          window.gtag('event', 'layer_toggle', {
            layer_name: key,
            layer_state: newState ? 'enabled' : 'disabled',
            active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none',
            zoom_level: zoom || 7,
          });
        } 
        // 2. context fallback
        else if (sendEvent) {
          sendEvent('layer_toggle', {
            layer_name: key,
            layer_state: newState ? 'enabled' : 'disabled',
            active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none',
            zoom_level: zoom || 7,
          });
        }
      });
    }

    prevLayersRef.current = { ...layers };
  }, [layers, zoom, sendEvent]);

  const handleChange = (key, checked) => {
    setLayers(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="layer-panel-modern">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="layer-panel-content">
        <div className="layer-bar-scrollable">
          <div className="layer-bar">
            {allLayers.map(({ key, name }) => (
              <label key={key} className={`layer-control-label ${key}-label ${layers[key] ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!layers[key]}
                  onChange={e => handleChange(key, e.target.checked)}
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