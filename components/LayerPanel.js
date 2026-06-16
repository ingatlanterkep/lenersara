// src/components/LayerPanel.js
import React, { useEffect, useRef } from 'react';
import { sendLayerToggleEvent } from '@/utils/analytics';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose, cookiesAccepted }) => {
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

  // Ellenőrizzük a cookie-t a komponens mountolásakor
  const [hasConsent, setHasConsent] = React.useState(() => {
    // Ellenőrizzük a cookie-t rögtön a mount előtt
    if (typeof document !== 'undefined') {
      return document.cookie.includes('ingatlanTerkepCookieConsent=true');
    }
    return cookiesAccepted || false;
  });

  // Frissítsük, ha változik a prop
  useEffect(() => {
    if (cookiesAccepted) {
      setHasConsent(true);
    }
  }, [cookiesAccepted]);

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

    // 3. 🔥 KÖZVETLEN ANALYTICS KÜLDÉS - átadjuk a tényleges consent állapotot
    // A sendLayerToggleEvent automatikusan ellenőrzi a cookie-t, ha a cookiesAccepted null/undefined
    const result = sendLayerToggleEvent(key, checked, activeLayers, hasConsent);
    
    console.log(`[LayerPanel] Réteg váltás: ${key} -> ${checked ? '✅' : '❌'} (analytics: ${result ? '✅' : '❌'})`);
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