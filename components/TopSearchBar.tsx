// components/TopSearchBar.tsx

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import '../styles/TopSearchBar.css';

// ============================================
// INTERFÉSZ - EGÉSZÍTSD KI A HIÁNYZÓ PROPS-OKKAL
// ============================================
interface TopSearchBarProps {
  listingType: string;
  setListingType: (value: string) => void;
  selectedLocations: string[];
  setSelectedLocations: (value: string[]) => void;
  onLocationSearchOpen: () => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  areaMin: string;
  setAreaMin: (value: string) => void;
  areaMax: string;
  setAreaMax: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  minRooms: string;
  setMinRooms: (value: string) => void;
  maxRooms: string;
  setMaxRooms: (value: string) => void;
  onlyWithImages: boolean;
  setOnlyWithImages: (value: boolean) => void;
  totalFloorsMin: string;
  setTotalFloorsMin: (value: string) => void;
  totalFloorsMax: string;
  setTotalFloorsMax: (value: string) => void;
  yearBuiltMin: string;
  setYearBuiltMin: (value: string) => void;
  yearBuiltMax: string;
  setYearBuiltMax: (value: string) => void;
  condition: string;
  setCondition: (value: string) => void;
  heatingType: string;
  setHeatingType: (value: string) => void;
  parking: string;
  setParking: (value: string) => void;
  landAreaMin: string;
  setLandAreaMin: (value: string) => void;
  landAreaMax: string;
  setLandAreaMax: (value: string) => void;
  accuracy: string;
  setAccuracy: (value: string) => void;
  isNewBuildFilter: boolean;
  setIsNewBuildFilter: (value: boolean) => void;
  comfortLevel: string;
  setComfortLevel: (value: string) => void;
  isMobile: boolean;
  onFilterToggle: () => void;
  isFilterOpen: boolean;
}

const TopSearchBar: React.FC<TopSearchBarProps> = ({
  listingType,
  setListingType,
  selectedLocations,
  setSelectedLocations,
  onLocationSearchOpen,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  areaMin,
  setAreaMin,
  areaMax,
  setAreaMax,
  type,
  setType,
  minRooms,
  setMinRooms,
  maxRooms,
  setMaxRooms,
  onlyWithImages,
  setOnlyWithImages,
  totalFloorsMin,
  setTotalFloorsMin,
  totalFloorsMax,
  setTotalFloorsMax,
  yearBuiltMin,
  setYearBuiltMin,
  yearBuiltMax,
  setYearBuiltMax,
  condition,
  setCondition,
  heatingType,
  setHeatingType,
  parking,
  setParking,
  landAreaMin,
  setLandAreaMin,
  landAreaMax,
  setLandAreaMax,
  accuracy,
  setAccuracy,
  isNewBuildFilter,
  setIsNewBuildFilter,
  comfortLevel,
  setComfortLevel,
  isMobile,
  onFilterToggle,
  isFilterOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 🔥 ASZTALI: részletes keresés állapota
  const [showDetailedSearch, setShowDetailedSearch] = useState(false);
  
  // 🔥 MOBIL: NINCS SZÜKSÉG KÜLÖN showDetailedSearch-re, mert alapból nyitva van
  const [priceUnit, setPriceUnit] = useState(listingType === 'eladó' ? 'M' : 'E');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const displayLocation = selectedLocations.length > 0 
    ? selectedLocations[0].replace(/^(city:|district:|county:)/, '') 
    : '';

  const handleListingTypeChange = (type: string) => {
    setListingType(type);
    setPriceUnit(type === 'eladó' ? 'M' : 'E');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/kereses/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleFocus = () => {
    if (isMobile) {
      setIsMobileSearchOpen(true);
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      setTimeout(() => {
        setIsMobileSearchOpen(false);
      }, 150);
    }
  };

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (areaMin) count++;
    if (areaMax) count++;
    if (type && type !== 'Lakás') count++;
    if (minRooms) count++;
    if (maxRooms) count++;
    if (onlyWithImages) count++;
    if (totalFloorsMin) count++;
    if (totalFloorsMax) count++;
    if (yearBuiltMin) count++;
    if (yearBuiltMax) count++;
    if (condition) count++;
    if (heatingType) count++;
    if (parking) count++;
    if (landAreaMin) count++;
    if (landAreaMax) count++;
    if (accuracy && accuracy !== 'any') count++;
    if (isNewBuildFilter) count++;
    if (comfortLevel) count++;
    return count;
  }, [
    minPrice, maxPrice, areaMin, areaMax, type, minRooms, maxRooms,
    onlyWithImages, totalFloorsMin, totalFloorsMax, yearBuiltMin,
    yearBuiltMax, condition, heatingType, parking, landAreaMin,
    landAreaMax, accuracy, isNewBuildFilter, comfortLevel
  ]);

  const activeFilterCount = getActiveFilterCount();

  useEffect(() => {
    if (isMobile && isMobileSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMobileSearchOpen]);

  // ============================================
  // ASZTALI NÉZET
  // ============================================
  if (!isMobile) {
    return (
      <div className="top-search-bar">
        <div className="search-bar-container">
          {/* Típus választó */}
          <div className="search-type-toggle">
            <button 
              className={`type-btn ${listingType === 'eladó' ? 'active' : ''}`}
              onClick={() => handleListingTypeChange('eladó')}
            >
              Eladó
            </button>
            <button 
              className={`type-btn ${listingType === 'kiadó' ? 'active' : ''}`}
              onClick={() => handleListingTypeChange('kiadó')}
            >
              Kiadó
            </button>
          </div>

          {/* Helyszín */}
          <div className="search-location" onClick={onLocationSearchOpen}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="location-text">
              {displayLocation || 'Város, kerület, megye...'}
            </span>
            {displayLocation && (
              <button 
                className="clear-location"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocations([]);
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Ingatlantípus */}
          <div className="search-type-select">
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="type-select"
            >
              <option value="Lakás">Lakás</option>
              <option value="Ház">Ház</option>
              <option value="Telek">Telek</option>
              <option value="Garázs">Garázs</option>
              <option value="Nyaraló">Nyaraló</option>
              <option value="Iroda">Iroda</option>
              <option value="Raktár">Raktár</option>
              <option value="Üzleti cél">Üzleti cél</option>
              <option value="Mezőgazdasági cél">Mezőgazdasági cél</option>
              <option value="Ipari cél">Ipari cél</option>
              <option value="Fejlesztési cél">Fejlesztési cél</option>
              <option value="Intézmény">Intézmény</option>
              <option value="Luxus ingatlan">Luxus ingatlan</option>
            </select>
          </div>

          {/* Ár tartomány */}
          <div className="search-range price-range">
            <input
              type="number"
              placeholder="Min ár"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="range-input"
              step="any"
            />
            <span className="range-separator">-</span>
            <input
              type="number"
              placeholder="Max ár"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="range-input"
              step="any"
            />
            <span className="range-unit">{priceUnit} Ft</span>
          </div>

          {/* Alapterület */}
          <div className="search-range area-range">
            <input
              type="number"
              placeholder="Min m²"
              value={areaMin}
              onChange={(e) => setAreaMin(e.target.value)}
              className="range-input"
              step="any"
            />
            <span className="range-separator">-</span>
            <input
              type="number"
              placeholder="Max m²"
              value={areaMax}
              onChange={(e) => setAreaMax(e.target.value)}
              className="range-input"
              step="any"
            />
            <span className="range-unit">m²</span>
          </div>

          {/* Részletes keresés gomb */}
          <button 
            className={`action-btn ${showDetailedSearch ? 'active' : ''}`}
            onClick={() => setShowDetailedSearch(!showDetailedSearch)}
            style={{ position: 'relative' }}
          >
            <span className="btn-label">Részletes</span>
            {activeFilterCount > 0 && (
              <span className="filter-badge">{activeFilterCount}</span>
            )}
          </button>

          {/* Lista gomb */}
          <button 
            className="action-btn"
            onClick={() => {
              const isCurrentlyList = window.location.pathname.endsWith('/lista');
              let newPath = window.location.pathname;
              if (isCurrentlyList) {
                newPath = newPath.replace(/\/lista$/, '') || '/';
              } else {
                newPath = newPath.endsWith('/') ? `${newPath}lista` : `${newPath}/lista`;
              }
              window.location.href = newPath;
            }}
          >
            <span className="btn-label">Lista</span>
          </button>
        </div>

        {/* Részletes keresés panel - ASZTALI */}
        {showDetailedSearch && (
          <div className="detailed-search-panel">
            <div className="detailed-search-grid">
              <div className="detail-group">
                <label>Szobák</label>
                <div className="range-input-group">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minRooms}
                    onChange={(e) => setMinRooms(e.target.value)}
                    step="any"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxRooms}
                    onChange={(e) => setMaxRooms(e.target.value)}
                    step="any"
                  />
                </div>
              </div>

              <div className="detail-group">
                <label>Építés éve</label>
                <div className="range-input-group">
                  <input
                    type="number"
                    placeholder="Min"
                    value={yearBuiltMin}
                    onChange={(e) => setYearBuiltMin(e.target.value)}
                    step="any"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={yearBuiltMax}
                    onChange={(e) => setYearBuiltMax(e.target.value)}
                    step="any"
                  />
                </div>
              </div>

              <div className="detail-group">
                <label>Emeletek</label>
                <div className="range-input-group">
                  <input
                    type="number"
                    placeholder="Min"
                    value={totalFloorsMin}
                    onChange={(e) => setTotalFloorsMin(e.target.value)}
                    step="any"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={totalFloorsMax}
                    onChange={(e) => setTotalFloorsMax(e.target.value)}
                    step="any"
                  />
                </div>
              </div>

              <div className="detail-group">
                <label>Telekterület</label>
                <div className="range-input-group">
                  <input
                    type="number"
                    placeholder="Min"
                    value={landAreaMin}
                    onChange={(e) => setLandAreaMin(e.target.value)}
                    step="any"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={landAreaMax}
                    onChange={(e) => setLandAreaMax(e.target.value)}
                    step="any"
                  />
                </div>
              </div>

              <div className="detail-group">
                <label>Állapot</label>
                <select 
                  value={condition || ''} 
                  onChange={(e) => setCondition(e.target.value)}
                  className="detail-select"
                >
                  <option value="">Bármilyen</option>
                  <option value="kiváló">Kiváló</option>
                  <option value="felújított">Felújított</option>
                  <option value="jó">Jó</option>
                  <option value="lakható">Lakható</option>
                  <option value="felújítandó">Felújítandó</option>
                </select>
              </div>

              <div className="detail-group">
                <label>Fűtés</label>
                <select 
                  value={heatingType || ''} 
                  onChange={(e) => setHeatingType(e.target.value)}
                  className="detail-select"
                >
                  <option value="">Bármilyen</option>
                  <option value="gáz">Gáz</option>
                  <option value="elektromos">Elektromos</option>
                  <option value="távfűtés">Távfűtés</option>
                  <option value="fatüzelés">Fatüzelés</option>
                  <option value="megújuló / hőszivattyú">Megújuló</option>
                </select>
              </div>

              <div className="detail-group">
                <label>Parkolás</label>
                <select 
                  value={parking || ''} 
                  onChange={(e) => setParking(e.target.value)}
                  className="detail-select"
                >
                  <option value="">Bármilyen</option>
                  <option value="garázs">Garázs</option>
                  <option value="beálló">Beálló</option>
                  <option value="utcai">Utcai</option>
                </select>
              </div>

              <div className="detail-group">
                <label>Komfort</label>
                <select 
                  value={comfortLevel || ''} 
                  onChange={(e) => setComfortLevel(e.target.value)}
                  className="detail-select"
                >
                  <option value="">Bármilyen</option>
                  <option value="Komfort nélküli">Komfort nélküli</option>
                  <option value="Szoba-konyha">Szoba-konyha</option>
                  <option value="Félkomfortos">Félkomfortos</option>
                  <option value="Komfortos">Komfortos</option>
                  <option value="Összkomfortos">Összkomfortos</option>
                  <option value="Duplakomfortos">Duplakomfortos</option>
                  <option value="Luxus">Luxus</option>
                </select>
              </div>

              <div className="detail-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={onlyWithImages}
                    onChange={() => setOnlyWithImages(!onlyWithImages)}
                  />
                  Csak képes
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isNewBuildFilter || false}
                    onChange={() => setIsNewBuildFilter(!isNewBuildFilter)}
                  />
                  Új építésű
                </label>
              </div>

              <div className="detail-group">
                <label>Pontosság</label>
                <select
                  value={accuracy}
                  onChange={(e) => setAccuracy(e.target.value)}
                  className="detail-select"
                >
                  <option value="any">Bármilyen</option>
                  <option value="street">Utca szintű</option>
                  <option value="region">Környék szintű</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // MOBIL NÉZET - RÉSZLETES KERESŐ ALAPBÓL NYITVA
  // ============================================
  return (
    <>
      {/* MOBIL: Vékony csík a keresőmezővel */}
      <div 
        className="top-search-bar mobile-search-bar"
        onClick={() => setIsMobileSearchOpen(true)}
      >
        <div className="mobile-search-row">
          <svg className="search-icon-mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="mobile-search-placeholder">
            {displayLocation ? `${displayLocation} • ${type}` : 'Keresés ingatlanok között...'}
          </span>
          {activeFilterCount > 0 && (
            <span className="mobile-filter-badge">{activeFilterCount}</span>
          )}
        </div>
      </div>

      {/* MOBIL: Teljes keresőpanel (overlay) - RÉSZLETES KERESŐ ALAPBÓL NYITVA */}
      {isMobileSearchOpen && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-panel">
            <div className="mobile-search-header">
              <h2>Keresés</h2>
              <button 
                className="mobile-search-close"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mobile-search-content">
              {/* Típus választó */}
              <div className="search-type-toggle">
                <button 
                  className={`type-btn ${listingType === 'eladó' ? 'active' : ''}`}
                  onClick={() => handleListingTypeChange('eladó')}
                >
                  Eladó
                </button>
                <button 
                  className={`type-btn ${listingType === 'kiadó' ? 'active' : ''}`}
                  onClick={() => handleListingTypeChange('kiadó')}
                >
                  Kiadó
                </button>
              </div>

              {/* Helyszín */}
              <div className="search-location" onClick={() => {
                setIsMobileSearchOpen(false);
                onLocationSearchOpen();
              }}>
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="location-text">
                  {displayLocation || 'Város, kerület, megye...'}
                </span>
              </div>

              {/* Ingatlantípus */}
              <div className="search-type-select">
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="type-select"
                >
                  <option value="Lakás">Lakás</option>
                  <option value="Ház">Ház</option>
                  <option value="Telek">Telek</option>
                  <option value="Garázs">Garázs</option>
                  <option value="Nyaraló">Nyaraló</option>
                  <option value="Iroda">Iroda</option>
                  <option value="Raktár">Raktár</option>
                  <option value="Üzleti cél">Üzleti cél</option>
                  <option value="Mezőgazdasági cél">Mezőgazdasági cél</option>
                  <option value="Ipari cél">Ipari cél</option>
                  <option value="Fejlesztési cél">Fejlesztési cél</option>
                  <option value="Intézmény">Intézmény</option>
                  <option value="Luxus ingatlan">Luxus ingatlan</option>
                </select>
              </div>

              {/* Ár tartomány */}
              <div className="search-range price-range">
                <input
                  type="number"
                  placeholder="Min ár"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="range-input"
                  step="any"
                />
                <span className="range-separator">-</span>
                <input
                  type="number"
                  placeholder="Max ár"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="range-input"
                  step="any"
                />
                <span className="range-unit">{priceUnit} Ft</span>
              </div>

              {/* Alapterület */}
              <div className="search-range area-range">
                <input
                  type="number"
                  placeholder="Min m²"
                  value={areaMin}
                  onChange={(e) => setAreaMin(e.target.value)}
                  className="range-input"
                  step="any"
                />
                <span className="range-separator">-</span>
                <input
                  type="number"
                  placeholder="Max m²"
                  value={areaMax}
                  onChange={(e) => setAreaMax(e.target.value)}
                  className="range-input"
                  step="any"
                />
                <span className="range-unit">m²</span>
              </div>

              {/* 🔥 RÉSZLETES KERESŐ - ALAPBÓL NYITVA (NINCS KÜLÖN GOMB) */}
              <div className="detailed-search-panel mobile-detailed-panel" style={{ marginTop: 0 }}>
                <div className="detailed-search-grid">
                  <div className="detail-group">
                    <label>Szobák</label>
                    <div className="range-input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minRooms}
                        onChange={(e) => setMinRooms(e.target.value)}
                        step="any"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxRooms}
                        onChange={(e) => setMaxRooms(e.target.value)}
                        step="any"
                      />
                    </div>
                  </div>

                  <div className="detail-group">
                    <label>Építés éve</label>
                    <div className="range-input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        value={yearBuiltMin}
                        onChange={(e) => setYearBuiltMin(e.target.value)}
                        step="any"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={yearBuiltMax}
                        onChange={(e) => setYearBuiltMax(e.target.value)}
                        step="any"
                      />
                    </div>
                  </div>

                  <div className="detail-group">
                    <label>Emeletek</label>
                    <div className="range-input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        value={totalFloorsMin}
                        onChange={(e) => setTotalFloorsMin(e.target.value)}
                        step="any"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={totalFloorsMax}
                        onChange={(e) => setTotalFloorsMax(e.target.value)}
                        step="any"
                      />
                    </div>
                  </div>

                  <div className="detail-group">
                    <label>Telekterület</label>
                    <div className="range-input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        value={landAreaMin}
                        onChange={(e) => setLandAreaMin(e.target.value)}
                        step="any"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={landAreaMax}
                        onChange={(e) => setLandAreaMax(e.target.value)}
                        step="any"
                      />
                    </div>
                  </div>

                  <div className="detail-group">
                    <label>Állapot</label>
                    <select 
                      value={condition || ''} 
                      onChange={(e) => setCondition(e.target.value)}
                      className="detail-select"
                    >
                      <option value="">Bármilyen</option>
                      <option value="kiváló">Kiváló</option>
                      <option value="felújított">Felújított</option>
                      <option value="jó">Jó</option>
                      <option value="lakható">Lakható</option>
                      <option value="felújítandó">Felújítandó</option>
                    </select>
                  </div>

                  <div className="detail-group">
                    <label>Fűtés</label>
                    <select 
                      value={heatingType || ''} 
                      onChange={(e) => setHeatingType(e.target.value)}
                      className="detail-select"
                    >
                      <option value="">Bármilyen</option>
                      <option value="gáz">Gáz</option>
                      <option value="elektromos">Elektromos</option>
                      <option value="távfűtés">Távfűtés</option>
                      <option value="fatüzelés">Fatüzelés</option>
                      <option value="megújuló / hőszivattyú">Megújuló</option>
                    </select>
                  </div>

                  <div className="detail-group">
                    <label>Parkolás</label>
                    <select 
                      value={parking || ''} 
                      onChange={(e) => setParking(e.target.value)}
                      className="detail-select"
                    >
                      <option value="">Bármilyen</option>
                      <option value="garázs">Garázs</option>
                      <option value="beálló">Beálló</option>
                      <option value="utcai">Utcai</option>
                    </select>
                  </div>

                  <div className="detail-group">
                    <label>Komfort</label>
                    <select 
                      value={comfortLevel || ''} 
                      onChange={(e) => setComfortLevel(e.target.value)}
                      className="detail-select"
                    >
                      <option value="">Bármilyen</option>
                      <option value="Komfort nélküli">Komfort nélküli</option>
                      <option value="Szoba-konyha">Szoba-konyha</option>
                      <option value="Félkomfortos">Félkomfortos</option>
                      <option value="Komfortos">Komfortos</option>
                      <option value="Összkomfortos">Összkomfortos</option>
                      <option value="Duplakomfortos">Duplakomfortos</option>
                      <option value="Luxus">Luxus</option>
                    </select>
                  </div>

                  <div className="detail-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={onlyWithImages}
                        onChange={() => setOnlyWithImages(!onlyWithImages)}
                      />
                      Csak képes
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={isNewBuildFilter || false}
                        onChange={() => setIsNewBuildFilter(!isNewBuildFilter)}
                      />
                      Új építésű
                    </label>
                  </div>

                  <div className="detail-group">
                    <label>Pontosság</label>
                    <select
                      value={accuracy}
                      onChange={(e) => setAccuracy(e.target.value)}
                      className="detail-select"
                    >
                      <option value="any">Bármilyen</option>
                      <option value="street">Utca szintű</option>
                      <option value="region">Környék szintű</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                className="mobile-apply-btn"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                Keresés
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopSearchBar;