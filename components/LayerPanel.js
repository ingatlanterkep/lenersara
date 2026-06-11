// src/components/LayerPanel.js
import React, { useEffect, useRef } from 'react';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose, cookiesAccepted }) => {
  const prevLayersRef = useRef(layers);
  const prevCookiesAcceptedRef = useRef(cookiesAccepted);

  // Külön useEffect a GA event küldéshez - függ a layers-től ÉS a cookiesAccepted-től is
  useEffect(() => {
    // Csak akkor küldünk, ha van consent ÉS van gtag
    if (!cookiesAccepted || typeof window === 'undefined' || !window.gtag) {
      console.log('[LayerPanel] GA skipped - cookiesAccepted:', cookiesAccepted, 'gtag:', !!window.gtag);
      return;
    }

    const prevLayers = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayers[key]
    );

    if (changedKeys.length > 0) {
      console.log('[LayerPanel] Sending GA events for changed layers:', changedKeys);
      changedKeys.forEach(key => {
        window.gtag('event', 'layer_toggle', {
          layer_name: key,
          layer_state: layers[key] ? 'enabled' : 'disabled',
          active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none'
        });
      });
    }

    // Frissítjük a ref-et
    prevLayersRef.current = layers;
  }, [layers, cookiesAccepted]); // ← cookiesAccepted is függőség!

  // Külön useEffect a zoom változásra
  useEffect(() => {
    if (!cookiesAccepted || typeof window === 'undefined' || !window.gtag) return;
    
    // Csak akkor küldünk, ha a zoom változott (első render kivéve)
    if (prevCookiesAcceptedRef.current !== undefined) {
      window.gtag('event', 'zoom_change', {
        zoom_level: zoom,
        active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none'
      });
    }
    prevCookiesAcceptedRef.current = cookiesAccepted;
  }, [zoom, cookiesAccepted, layers]);

  const handleChange = (key, checked) => {
    console.log('Réteg váltás:', key, checked);
    setLayers(prev => ({
      ...prev,
      [key]: checked
    }));
  };

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