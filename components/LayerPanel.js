import React, { useEffect, useRef } from 'react';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose }) => {
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

  // 🔥 useEffect a layers változására
  useEffect(() => {
    // Ellenőrizzük a feltételeket
    const hasGtag = typeof window !== 'undefined' && typeof window.gtag === 'function';
    const hasConsent = typeof document !== 'undefined' && 
      document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    // Ha nincs gtag vagy nincs consent, ne küldjünk
    if (!hasGtag || !hasConsent) {
      console.log('[LayerPanel] ⛔ Nem küldhető:', { hasGtag, hasConsent });
      return;
    }

    const prevLayers = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayers[key]
    );

    if (changedKeys.length === 0) {
      return;
    }

    // 🔥 ESEMÉNYEK KÜLDÉSE
    changedKeys.forEach(key => {
      const eventData = {
        layer_name: key,
        layer_state: layers[key] ? 'enabled' : 'disabled',
        active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none',
        zoom_level: zoom || 7,
      };
      
      try {
        // 🔥 OPCIONÁLIS LÁNCOLÁS - BIZTONSÁGOS HÍVÁS
        if (window.gtag) {
          window.gtag('event', 'layer_toggle', eventData);
          console.log(`[LayerPanel] ✅ layer_toggle elküldve:`, eventData);
        } else {
          console.warn('[LayerPanel] ⚠️ gtag nem elérhető');
        }
      } catch (error) {
        console.error('[LayerPanel] ❌ Hiba:', error);
      }
    });

    // Frissítjük a ref-et
    prevLayersRef.current = layers;
  }, [layers, zoom]);

  const handleChange = (key, checked) => {
    console.log(`[LayerPanel] 👆 ${key} -> ${checked ? 'ON' : 'OFF'}`);
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