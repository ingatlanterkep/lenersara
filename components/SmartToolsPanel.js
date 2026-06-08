'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const SmartToolsPanel = ({ 
  showDealColors, 
  setShowDealColors, 
  isStreetViewMode, 
  setIsStreetViewMode, 
  onClose,
  viewMode,
  setViewMode,
  isMobile,
  cookiesAccepted,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDealColorsChange = (e) => {
    const newValue = e.target.checked;
    
    if (cookiesAccepted && window.gtag) {
      window.gtag('event', 'toggle_deal_colors', {
        enabled: newValue,
        page_type: 'homepage'
      });
    }
    
    setShowDealColors(newValue);
  };

  const handleStreetViewChange = (e) => {
    const newValue = e.target.checked;
    
    if (cookiesAccepted && window.gtag) {
      window.gtag('event', 'toggle_street_view', {
        enabled: newValue,
        page_type: 'smart_tools_panel'
      });
    }
    
    setIsStreetViewMode(newValue);
  };

  const handleViewModeToggle = () => {
    // URL-ből kiszedjük a paramétereket
    const parts = pathname?.split('/').filter(Boolean) || [];
    const listingType = parts[0]; // elado vagy kiado
    const type = parts[1];         // lakas, haz, stb.
    const city = parts[2];         // optional
    const isCurrentlyList = pathname?.endsWith('/lista') || false;

    let newPath;

    if (listingType && type) {
      if (city && !isCurrentlyList) {
        // Volt város, most listára megyünk
        newPath = `/${listingType}/${type}/${city}/lista`;
      } else if (city && isCurrentlyList) {
        // Volt város listában, most térképre
        newPath = `/${listingType}/${type}/${city}`;
      } else if (!city && !isCurrentlyList) {
        // Nincs város, listára megyünk
        newPath = `/${listingType}/${type}/lista`;
      } else if (!city && isCurrentlyList) {
        // Nincs város listában, térképre
        newPath = `/${listingType}/${type}`;
      } else {
        newPath = isCurrentlyList ? '/' : '/lista';
      }
    } else {
      newPath = isCurrentlyList ? '/' : '/lista';
    }

    // GA esemény
    if (cookiesAccepted && window.gtag) {
      window.gtag('event', isCurrentlyList ? 'switch_to_map_view' : 'switch_to_list_view', {
        from_view: isCurrentlyList ? 'list' : 'map',
        to_view: isCurrentlyList ? 'map' : 'list',
        source: 'smart_tools_panel'
      });
    }

    // Next.js navigáció
    setViewMode(isCurrentlyList ? 'map' : 'list');
    router.push(newPath);
  };

  return (
    <div className="smart-tools-card">
      <button className="close-button" onClick={onClose}>×</button>
      
      {!isMobile && (
        <div className="smart-tools-header">
          <h3>Okos eszközök</h3>
        </div>
      )}
      
      <div className="smart-tools-content">
        
        {/* Ingatlan összehasonlítás */}
        <div className="tool-item">
          <label className="tool-toggle">
            <input
              type="checkbox"
              checked={showDealColors}
              onChange={handleDealColorsChange}
            />
            <span className="tool-label">
              Ingatlanok összehasonlítása
              <span className="info-icon" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>ⓘ</span>
            </span>
          </label>
          {showInfo && (
            <div className="info-bubble">
              <strong>📊 Információ az összehasonlításról</strong><br />
              A hirdetéseket a környező, hasonló ingatlanokhoz viszonyítva határoztuk meg. 
              A színek jelzik, hogy az adott ingatlan a környezetéhez képest 
              <strong> drágább</strong>(piros), 
              <strong> átlagos árfekvésű</strong> (sárga), vagy 
              <strong> olcsóbb</strong> (zöld).<br /><br />
              <em>Ez az összehasonlítás nem minősül értékbecslésnek, ajánlatnak vagy befektetési tanácsadásnak. 
              Az információk tájékoztató jellegűek, és nem veszik figyelembe az ingatlan egyedi jellemzőit, 
              állapotát vagy a pontos elhelyezkedését. Kérjük, minden esetben végezzen személyes helyszíni ellenőrzést!</em>
            </div>
          )}
          
          <div className="deal-legend">
            <div className="legend-item">
              <span className="color-dot good"></span>
              <span>Olcsóbb a környezeténél</span>
            </div>
            <div className="legend-item">
              <span className="color-dot normal"></span>
              <span>Átlagos ár</span>
            </div>
            <div className="legend-item">
              <span className="color-dot bad"></span>
              <span>Drágább a környezeténél</span>
            </div>
          </div>
        </div>

        {/* Street View */}
        <div className="tool-item">
          <label className="tool-toggle">
            <input
              type="checkbox"
              checked={isStreetViewMode}
              onChange={handleStreetViewChange}
            />
            <span className="tool-label">Street View mód bekapcsolása</span>
          </label>
          <small>Kattints a térképre → Google Street View nyílik meg</small>
        </div>

        {/* ⭐ Kerületi kvíz link */}
        <div className="tool-item quiz-link-item">
          <a 
            href="/melyik-kerulet-nekem-valo" 
            className="quiz-link-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="quiz-link-text">Segíts megtalálni a hozzám illő kerületet →</span>
          </a>
        </div>

        {/* Listás/Térkép váltó */}
        <div className="tool-item list-view-tool">
          <button 
            className="list-view-button"
            onClick={handleViewModeToggle}
          >
            {pathname?.endsWith('/lista') ? '🗺️ Térkép nézet' : '📋 Listás nézet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartToolsPanel;