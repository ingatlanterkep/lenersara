import React, { useEffect, useRef } from 'react';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose }) => {
  const prevLayersRef = useRef(layers);
  const hasLoggedRef = useRef(false);
  
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

  // 🔥 LOGOLJUK A KOMPONENS ÁLLAPOTÁT
  useEffect(() => {
    if (!hasLoggedRef.current) {
      console.log('[LayerPanel] 🔍 Komponens betöltve:', {
        hasGtag: typeof window !== 'undefined' && !!window.gtag,
        cookiesAccepted: typeof document !== 'undefined' && document.cookie.includes('ingatlanTerkepCookieConsent=true'),
        layers: Object.keys(layers).filter(k => layers[k]),
        zoom
      });
      hasLoggedRef.current = true;
    }
  }, []);

  // 🔥 EZ A KULCS: useEffect a layers változásának figyelésére
  useEffect(() => {
    // Ellenőrizzük, hogy létezik-e a gtag
    const gtagAvailable = typeof window !== 'undefined' && !!window.gtag;
    
    // Cookie ellenőrzés
    const hasConsent = typeof document !== 'undefined' && 
      document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    console.log('[LayerPanel] 🔄 useEffect fut:', {
      hasConsent,
      gtagAvailable,
      changedKeys: Object.keys(layers).filter(key => layers[key] !== prevLayersRef.current[key]),
      currentLayers: Object.keys(layers).filter(k => layers[k])
    });
    
    // Csak akkor küldünk, ha van cookie elfogadás ÉS létezik a gtag
    if (!hasConsent || !gtagAvailable) {
      console.log('[LayerPanel] ⛔ Analytics kihagyva:', { 
        hasConsent, 
        gtagAvailable,
        reason: !hasConsent ? 'nincs cookie elfogadás' : 'nincs gtag'
      });
      return;
    }

    const prevLayers = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayers[key]
    );

    if (changedKeys.length > 0) {
      changedKeys.forEach(key => {
        // 🔥 KÖZVETLEN gtag HÍVÁS
        try {
          const eventData = {
            layer_name: key,
            layer_state: layers[key] ? 'enabled' : 'disabled',
            active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none',
            zoom_level: zoom || 7,
          };
          
          window.gtag('event', 'layer_toggle', eventData);
          console.log(`[LayerPanel] ✅ layer_toggle elküldve (gtag):`, eventData);
        } catch (error) {
          console.error('[LayerPanel] ❌ gtag hiba:', error);
        }
      });
    }

    // Frissítjük a ref-et a következő összehasonlításhoz
    prevLayersRef.current = layers;
  }, [layers, zoom]);

  const handleChange = (key, checked) => {
    console.log(`[LayerPanel] 👆 Réteg váltás: ${key} -> ${checked ? '✅ bekapcsolva' : '❌ kikapcsolva'}`);
    
    // 🔥 Csak a state-et frissítjük - az useEffect majd küldi az eseményt!
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