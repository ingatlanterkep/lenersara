// src/components/LayerPanel.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';
import '../styles/HomePage.css';

// Ikonok a rétegekhez - egyszerű SVG ikonok
const LAYER_ICONS = {
  satellite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16h16" />
      <path d="M8 12l4-4 4 4" />
      <path d="M8 16l4-4 4 4" />
    </svg>
  ),
  crimeHeat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  transport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="12" rx="2" ry="2" />
      <circle cx="6" cy="16" r="2" />
      <circle cx="18" cy="16" r="2" />
      <path d="M6 8h12" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
      <path d="M2 10l10-5 10 5" />
      <path d="M12 5v14" />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9-4-18-3 9H2" />
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="10" width="20" height="12" rx="2" ry="2" />
      <line x1="6" y1="10" x2="6" y2="18" />
      <line x1="10" y1="10" x2="10" y2="18" />
      <line x1="14" y1="10" x2="14" y2="18" />
      <line x1="18" y1="10" x2="18" y2="18" />
      <polyline points="2 10 12 4 22 10" />
    </svg>
  ),
  outdoor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  sport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M4.93 4.93l14.14 14.14" />
      <path d="M19.07 4.93L4.93 19.07" />
    </svg>
  ),
  religion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

interface LayerPanelProps {
  zoom: number;
  layers: Record<string, boolean>;
  setLayers: (layers: Record<string, boolean>) => void;
  onClose: () => void;
  compact?: boolean;
  isStreetViewMode?: boolean;
  setIsStreetViewMode?: (value: boolean) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({ 
  zoom, 
  layers, 
  setLayers, 
  onClose, 
  compact = false,
  isStreetViewMode = false,
  setIsStreetViewMode = () => {},
}) => {
  const { cookiesAccepted, sendEvent } = useAnalytics();
  const prevLayersRef = useRef(layers);
  
  const allLayers = [
    { key: 'satellite', name: 'Műhold', shortName: 'Műhold' },
    { key: 'crimeHeat', name: 'Közbiztonság', shortName: 'Biztonság' },
    { key: 'transport', name: 'Közlekedés', shortName: 'Közlek.' },
    { key: 'education', name: 'Oktatás', shortName: 'Oktatás' },
    { key: 'shop', name: 'Boltok', shortName: 'Boltok' },
    { key: 'health', name: 'Egészségügy', shortName: 'Eü.' },
    { key: 'bank', name: 'Bankok', shortName: 'Bankok' },
    { key: 'outdoor', name: 'Szabadtér', shortName: 'Szabad' },
    { key: 'sport', name: 'Sport', shortName: 'Sport' },
    { key: 'religion', name: 'Vallás', shortName: 'Vallás' },
  ];

  const handleLayerToggle = (key: string, checked: boolean) => {
    const newLayers = {
      ...layers,
      [key]: checked
    };
    setLayers(newLayers);

    const activeLayers = Object.keys(newLayers)
      .filter(k => newLayers[k])
      .join(',');

    setTimeout(() => {
      sendEvent('layer_toggle', {
        layer_name: key,
        layer_state: checked ? 'enabled' : 'disabled',
        active_layers: activeLayers || 'none',
        zoom_level: zoom || 7,
      });
    }, 50);
  };

  // 🔥 UGYANAZ A LOGIKA, MINT A SmartToolsPanel-BEN!
  const handleStreetViewToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    console.log('[LayerPanel] Street View toggle:', { 
      current: isStreetViewMode, 
      new: newValue 
    });
    setIsStreetViewMode(newValue);
    sendEvent('street_view_toggle', {
      state: newValue ? 'enabled' : 'disabled',
    });
  };

  useEffect(() => {
    const changedKeys = Object.keys(layers).filter(
      key => layers[key] !== prevLayersRef.current[key]
    );

    if (changedKeys.length > 0 && cookiesAccepted) {
      console.log('[LayerPanel] Változás észlelve:', changedKeys);
    }

    prevLayersRef.current = layers;
  }, [layers, cookiesAccepted]);

  return (
    <div className={`layer-panel-modern ${compact ? 'layer-panel-compact' : ''}`}>
      {!compact && (
        <button className="close-button" onClick={onClose}>×</button>
      )}
      
      <div className="layer-panel-content">
        {/* STREET VIEW - KÜLÖN BLOKK, ELKÜLÖNÍTETT */}
        {compact && setIsStreetViewMode && typeof setIsStreetViewMode === 'function' && (
          <div className="street-view-section">
            <label 
              className={`layer-control-label street-view-label ${isStreetViewMode ? 'active' : ''}`}
            >
              <input
                type="checkbox"
                checked={isStreetViewMode}
                onChange={handleStreetViewToggle}  // ← MOST MÁR JÓ!
              />
              <span className="layer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19 9l-4 4-4-4-4 4-4-4" />
                  <path d="M5 15l4-4 4 4 4-4 4 4" />
                  <path d="M12 3v3" />
                  <path d="M12 18v3" />
                  <path d="M3 12h3" />
                  <path d="M18 12h3" />
                </svg>
              </span>
              <span className="layer-name">Street View</span>
            </label>
            <div className="street-view-divider"></div>
          </div>
        )}

        {/* RÉTEGEK LISTÁJA */}
        <div className="layers-list">
          {allLayers.map(({ key, name, shortName }) => (
            <label
              key={key}
              className={`layer-control-label ${key}-label ${layers[key] ? 'checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={!!layers[key]}
                onChange={(e) => handleLayerToggle(key, e.target.checked)}
              />
              <span className="layer-icon">
                {LAYER_ICONS[key as keyof typeof LAYER_ICONS] || null}
              </span>
              <span className="layer-name">
                {compact ? shortName : name}
              </span>
            </label>
          ))}
        </div>
        
        {!compact && <div className="zoom-hint">Zoom: {zoom}</div>}
      </div>
    </div>
  );
};

export default LayerPanel;