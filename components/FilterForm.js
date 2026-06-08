import React, { useState } from 'react';
import RangeInput from './RangeInput';
import '../styles/FilterForm.css';

// Budapesti kerületek tömbje
const budapestDistricts = [
  { number: 1, name: 'Várnegyed', roman: 'I. kerület', value: 'Budapest, I. kerület', alias: ['varnegyed'] },
  { number: 2, name: 'Hegyvidék-Rózsadomb', roman: 'II. kerület', value: 'Budapest, II. kerület', alias: ['hegyvidek-rozsadomb', 'rozsadomb'] },
  { number: 3, name: 'Óbuda-Békásmegyer', roman: 'III. kerület', value: 'Budapest, III. kerület', alias: ['obuda', 'bekasmegyer', 'obuda-bekasmegyer'] },
  { number: 4, name: 'Újpest', roman: 'IV. kerület', value: 'Budapest, IV. kerület', alias: ['ujpest'] },
  { number: 5, name: 'Belváros-Lipótváros', roman: 'V. kerület', value: 'Budapest, V. kerület', alias: ['belvaros', 'lipotvaros', 'belvaros-lipotvaros'] },
  { number: 6, name: 'Terézváros', roman: 'VI. kerület', value: 'Budapest, VI. kerület', alias: ['terezvaros'] },
  { number: 7, name: 'Erzsébetváros', roman: 'VII. kerület', value: 'Budapest, VII. kerület', alias: ['erzsebetvaros'] },
  { number: 8, name: 'Józsefváros', roman: 'VIII. kerület', value: 'Budapest, VIII. kerület', alias: ['jozsefvaros'] },
  { number: 9, name: 'Ferencváros', roman: 'IX. kerület', value: 'Budapest, IX. kerület', alias: ['ferencvaros'] },
  { number: 10, name: 'Kőbánya', roman: 'X. kerület', value: 'Budapest, X. kerület', alias: ['kobanya'] },
  { number: 11, name: 'Újbuda', roman: 'XI. kerület', value: 'Budapest, XI. kerület', alias: ['ujbuda'] },
  { number: 12, name: 'Hegyvidék', roman: 'XII. kerület', value: 'Budapest, XII. kerület', alias: ['hegyvidek'] },
  { number: 13, name: 'Angyalföld', roman: 'XIII. kerület', value: 'Budapest, XIII. kerület', alias: ['angyalfold'] },
  { number: 14, name: 'Zugló', roman: 'XIV. kerület', value: 'Budapest, XIV. kerület', alias: ['zuglo'] },
  { number: 15, name: 'Rákospalota', roman: 'XV. kerület', value: 'Budapest, XV. kerület', alias: ['rakospalota'] },
  { number: 16, name: 'Mátyásföld', roman: 'XVI. kerület', value: 'Budapest, XVI. kerület', alias: ['matyasfold'] },
  { number: 17, name: 'Rákosmente', roman: 'XVII. kerület', value: 'Budapest, XVII. kerület', alias: ['rakosmente'] },
  { number: 18, name: 'Pestszentlőrinc', roman: 'XVIII. kerület', value: 'Budapest, XVIII. kerület', alias: ['pestszentlorinc'] },
  { number: 19, name: 'Kispest', roman: 'XIX. kerület', value: 'Budapest, XIX. kerület', alias: ['kispest'] },
  { number: 20, name: 'Pesterzsébet', roman: 'XX. kerület', value: 'Budapest, XX. kerület', alias: ['pesterzsebet'] },
  { number: 21, name: 'Csepel', roman: 'XXI. kerület', value: 'Budapest, XXI. kerület', alias: ['csepel'] },
  { number: 22, name: 'Budafok-Tétény', roman: 'XXII. kerület', value: 'Budapest, XXII. kerület', alias: ['budafok', 'teteny', 'budafok-teteny'] },
  { number: 23, name: 'Soroksár', roman: 'XXIII. kerület', value: 'Budapest, XXIII. kerület', alias: ['soroksar'] },
];

const FilterForm = ({
  listingType, setListingType,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  areaMin, setAreaMin,
  areaMax, setAreaMax,
  type, setType,
  minRooms, setMinRooms,
  maxRooms, setMaxRooms,
  onlyWithImages, setOnlyWithImages,
  totalFloorsMin, setTotalFloorsMin,
  totalFloorsMax, setTotalFloorsMax,
  yearBuiltMin, setYearBuiltMin,
  yearBuiltMax, setYearBuiltMax,
  condition, setCondition,
  heatingType, setHeatingType,
  parking, setParking,
  landAreaMin, setLandAreaMin,
  landAreaMax, setLandAreaMax,
  accuracy, setAccuracy,
  isNewBuildFilter, setIsNewBuildFilter,
  comfortLevel, setComfortLevel,
  locationSearchOpen,
  setLocationSearchOpen,
  selectedLocations,
  setSelectedLocations,
}) => {
  const [showDetailedSearch, setShowDetailedSearch] = useState(false);
  const [priceUnit, setPriceUnit] = useState(listingType === 'eladó' ? 'M' : 'E');

  const openLocationModal = () => {
    if (setLocationSearchOpen) {
      setLocationSearchOpen(true);
    }
  };

  const displayLocationName = (location, scope) => {
    if (scope === 'district') {
      const district = budapestDistricts.find(d => d.value === location);
      return district ? district.roman : location;
    }
    return location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, ' ');
  };

  const getLocationText = () => {
    if (selectedLocations.length === 0) {
      return '';
    }
    const locationNames = selectedLocations.map(locKey => {
      const [type, location] = locKey.split(':');
      return displayLocationName(location, type);
    });
    const visibleLocations = locationNames.slice(0, 2).join(', ');
    return locationNames.length > 2
      ? `${visibleLocations} +${locationNames.length - 2}`
      : visibleLocations;
  };

const handleNewBuildChange = (e) => {
  console.log('New build checkbox changed:', e.target.checked);
  if (setIsNewBuildFilter && typeof setIsNewBuildFilter === 'function') {
    setIsNewBuildFilter(e.target.checked);
  } else {
    console.error('setIsNewBuildFilter is not a function!', setIsNewBuildFilter);
  }
};

  const handleComfortLevelChange = (e) => {
    if (setComfortLevel && typeof setComfortLevel === 'function') {
      setComfortLevel(e.target.value);
    }
  };

  const safeSetTotalFloorsMin = (value) => {
  if (setTotalFloorsMin && typeof setTotalFloorsMin === 'function') {
    setTotalFloorsMin(value);
  } else {
    console.warn('setTotalFloorsMin is not a function');
  }
};

const safeSetTotalFloorsMax = (value) => {
  if (setTotalFloorsMax && typeof setTotalFloorsMax === 'function') {
    setTotalFloorsMax(value);
  } else {
    console.warn('setTotalFloorsMax is not a function');
  }
};

  return (
    <div className="filter-form">
      <div className="basic-filters">
        <div className="location-input-container">
          <input
            type="text"
            placeholder="Hol keresel?"
            value={getLocationText()}
            onClick={openLocationModal}
            readOnly
            className="location-input"
          />
        </div>

        <div className="filter-row type-row">
          <div className="select-container">
            <select
              value={listingType}
              onChange={(e) => {
                setListingType(e.target.value);
                setPriceUnit(e.target.value === 'eladó' ? 'M' : 'E');
              }}
            >
              <option value="eladó">Eladó</option>
              <option value="kiadó">Kiadó</option>
            </select>
          </div>
          <div className="select-container type-container">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Ingatlantípus</option>
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
          <div className="select-container accuracy-container mobile-only">
            <select
              value={accuracy}
              onChange={(e) => setAccuracy(e.target.value)}
              className="accuracy-select"
            >
              <option value="any">Pontosság</option>
              <option value="any">Bármilyen</option>
              <option value="street">Utca szintű</option>
              <option value="region">Környék szintű</option>
            </select>
          </div>
        </div>

        <div className="filter-row price-area-row">
          <RangeInput
            label="Ár"
            minValue={minPrice}
            maxValue={maxPrice}
            setMinValue={setMinPrice}
            setMaxValue={setMaxPrice}
            unit={priceUnit + ' Ft'}
          />
          <RangeInput
            label="Alapterület"
            minValue={areaMin}
            maxValue={areaMax}
            setMinValue={setAreaMin}
            setMaxValue={setAreaMax}
            unit="m²"
          />
        </div>

        <div className="filter-row rooms-and-button">
          <RangeInput
            label="Szobák száma"
            minValue={minRooms}
            maxValue={maxRooms}
            setMinValue={setMinRooms}
            setMaxValue={setMaxRooms}
            unit="db"
            step="0.5"
          />
          <div className="filter-row accuracy-and-button desktop-tablet-only">
            <div className="select-container accuracy-container">
              <select
                value={accuracy}
                onChange={(e) => setAccuracy(e.target.value)}
                className="accuracy-select"
              >
                <option value="any">Pontosság</option>
                <option value="any">Bármilyen</option>
                <option value="street">Utca szintű</option>
                <option value="region">Környék szintű</option>
              </select>
            </div>
            <button
              className="detailed-search-button"
              onClick={() => setShowDetailedSearch(!showDetailedSearch)}
            >
              {showDetailedSearch ? 'Egyszerű keresés' : 'Részletes keresés'}
            </button>
          </div>
          <button
            className="detailed-search-button mobile-only"
            onClick={() => setShowDetailedSearch(!showDetailedSearch)}
          >
            {showDetailedSearch ? 'Egyszerű keresés' : 'Részletes keresés'}
          </button>
        </div>
      </div>

      {showDetailedSearch && (
        <div className="detailed-filters">
          {/* Checkboxes in one row */}
          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={onlyWithImages}
                onChange={() => setOnlyWithImages(!onlyWithImages)}
              />
              Csak képes ingatlanok
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isNewBuildFilter || false}
                onChange={handleNewBuildChange}
              />
              Csak új építésű
            </label>
          </div>

          {/* Condition and Comfort in one row without labels */}
          <div className="select-row">
            <select 
              value={condition || ''} 
              onChange={(e) => setCondition(e.target.value)}
              className="filter-select"
            >
              <option value="">Állapot</option>
              <option value="kiváló">Kiváló</option>
              <option value="felújított">Felújított</option>
              <option value="jó">Jó</option>
              <option value="lakható">Lakható</option>
              <option value="felújítandó">Felújítandó</option>
            </select>

            <select 
              value={comfortLevel || ''} 
              onChange={handleComfortLevelChange}
              className="filter-select"
            >
              <option value="">Komfort szint</option>
              <option value="Komfort nélküli">Komfort nélküli</option>
              <option value="Szoba-konyha">Szoba-konyha</option>
              <option value="Félkomfortos">Félkomfortos</option>
              <option value="Komfortos">Komfortos</option>
              <option value="Összkomfortos">Összkomfortos</option>
              <option value="Duplakomfortos">Duplakomfortos</option>
              <option value="Luxus">Luxus</option>
            </select>
          </div>

          {/* Heating and Parking in one row without labels */}
          <div className="select-row">
            <select 
              value={heatingType || ''} 
              onChange={(e) => setHeatingType(e.target.value)}
              className="filter-select"
            >
              <option value="">Fűtés típusa</option>
              <option value="gáz">Gáz</option>
              <option value="elektromos">Elektromos</option>
              <option value="távfűtés">Távfűtés</option>
              <option value="fatüzelés">Fatüzelés</option>
              <option value="megújuló / hőszivattyú">Megújuló / hőszivattyú</option>
            </select>

            <select 
              value={parking || ''} 
              onChange={(e) => setParking(e.target.value)}
              className="filter-select"
            >
              <option value="">Parkolás</option>
              <option value="garázs">Garázs</option>
              <option value="beálló">Beálló</option>
              <option value="utcai">Utcai</option>
            </select>
          </div>

          <RangeInput
            label="Építés éve"
            minValue={yearBuiltMin}
            maxValue={yearBuiltMax}
            setMinValue={setYearBuiltMin}
            setMaxValue={setYearBuiltMax}
            unit="év"
          />

<RangeInput
  label="Emeletek száma"
  minValue={totalFloorsMin}
  maxValue={totalFloorsMax}
  setMinValue={safeSetTotalFloorsMin}
  setMaxValue={safeSetTotalFloorsMax}
  unit=". emelet"
/>

          <RangeInput
            label="Telekterület"
            minValue={landAreaMin}
            maxValue={landAreaMax}
            setMinValue={setLandAreaMin}
            setMaxValue={setLandAreaMax}
            unit="m²"
          />
        </div>
      )}
    </div>
  );
};

export default FilterForm;