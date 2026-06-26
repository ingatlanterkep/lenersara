// src/components/LayerPanel.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';
import '../styles/HomePage.css';

// 🔥 Ikonok elérési útjai a public mappában
const LAYER_ICONS = {
  satellite: '/icons/alap-muhold.png',
  crimeHeat: '/icons/alap-kozbiztonsag.png',
  transport: '/icons/alap-kozlek.png',
  education: '/icons/alap-oktatas.png',
  shop: '/icons/alap-bolt.png',
  health: '/icons/alap-egeszseg.png',
  bank: '/icons/alap-bank.png',
  outdoor: '/icons/alap-szabad.png',
  sport: '/icons/alap-sport.png',
  religion: '/icons/alap-vallas.png',
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

  const handleStreetViewToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
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

        {/* STREET VIEW - PEGMAN PNG IKONNAL */}
        {compact && setIsStreetViewMode && typeof setIsStreetViewMode === 'function' && (
          <div className="street-view-section">
            <label 
              className={`layer-control-label street-view-label ${isStreetViewMode ? 'active' : ''}`}
            >
              <input
                type="checkbox"
                checked={isStreetViewMode}
                onChange={handleStreetViewToggle}
              />
              <span className="layer-icon">
                <img 
                  src="/icons/pegman.png" 
                  alt="Street View"
                  className="layer-icon-img street-view-icon"
                  width={20}
                  height={20}
                />
              </span>
              <span className="layer-name">Street View</span>
            </label>
            <div className="street-view-divider"></div>
          </div>
        )}

        {/* RÉTEGEK LISTÁJA - PNG IKONOKKAL */}
        <div className="layers-list">
          {/* 🔥 "RÉTEGEK" FELIRAT - A KÉPEK FÖLÖTT */}
          {compact && (
            <div className="layer-panel-header">
              <span className="layer-panel-title">Rétegek</span>
            </div>
          )}
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
                <img 
                  src={LAYER_ICONS[key as keyof typeof LAYER_ICONS]} 
                  alt={name}
                  className="layer-icon-img"
                  width={20}
                  height={20}
                />
              </span>
              {/* 🔥 A név csak hoverre jelenik meg (kivéve Street View) */}
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