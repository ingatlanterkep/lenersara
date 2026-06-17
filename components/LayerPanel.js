import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';
import '../styles/HomePage.css';

const LayerPanel = ({ zoom, layers, setLayers, onClose }) => {
  const { cookiesAccepted } = useAnalytics();
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

  // 🔥 EZ A KULCS: useEffect a layers változásának figyelésére (UGYANAZ, MINT A RÉGI KÓDBAN!)
  useEffect(() => {
    // Csak akkor küldünk, ha van cookie elfogadás ÉS létezik a gtag
    if (!cookiesAccepted || !window.gtag) {
      console.log('[LayerPanel] Analytics kihagyva:', { 
        cookiesAccepted, 
        gtagAvailable: !!window.gtag 
      });
      return;
    }

    const prevLayers = prevLayersRef.current;
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayers[key]
    );

    if (changedKeys.length > 0) {
      changedKeys.forEach(key => {
        // 🔥 KÖZVETLEN gtag HÍVÁS - UGYANAZ, MINT A RÉGI KÓDBAN!
        window.gtag('event', 'layer_toggle', {
          layer_name: key,
          layer_state: layers[key] ? 'enabled' : 'disabled',
          active_layers: Object.keys(layers).filter(k => layers[k]).join(',') || 'none',
          zoom_level: zoom || 7,
        });
        console.log(`[LayerPanel] ✅ layer_toggle elküldve (gtag): ${key} -> ${layers[key] ? 'enabled' : 'disabled'}`);
      });
    }

    // Frissítjük a ref-et a következő összehasonlításhoz
    prevLayersRef.current = layers;
  }, [layers, cookiesAccepted, zoom]); // ← zoom is függőség!

  const handleChange = (key, checked) => {
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