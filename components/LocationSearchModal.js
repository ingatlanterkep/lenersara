import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';
import apiClient from '../services/apiClient';
import '../styles/LocationSearchModal.css';

const budapestDistricts = [
    { name: 'Budapest', roman: 'Budapest', value: 'Budapest', alias: ['budapest'], side: 'All' },
  // Add Buda and Pest as side options
  { name: 'Budai oldal', roman: 'Budai oldal', value: 'Budapest, Buda', alias: ['buda', 'budai', 'budai-oldal'], side: 'Buda' },
  { name: 'Pesti oldal', roman: 'Pesti oldal', value: 'Budapest, Pest', alias: ['pest', 'pesti', 'pesti-oldal'], side: 'Pest' },
  { number: 1, name: 'Várnegyed', roman: 'I. kerület', value: 'Budapest, I. kerület', alias: ['varnegyed'], side: 'Buda' },
  { number: 2, name: 'Hegyvidék-Rózsadomb', roman: 'II. kerület', value: 'Budapest, II. kerület', alias: ['hegyvidek-rozsadomb', 'rozsadomb'], side: 'Buda' },
  { number: 3, name: 'Óbuda-Békásmegyer', roman: 'III. kerület', value: 'Budapest, III. kerület', alias: ['obuda', 'bekasmegyer', 'obuda-bekasmegyer'], side: 'Buda' },
  { number: 4, name: 'Újpest', roman: 'IV. kerület', value: 'Budapest, IV. kerület', alias: ['ujpest'], side: 'Pest' },
  { number: 5, name: 'Belváros-Lipótváros', roman: 'V. kerület', value: 'Budapest, V. kerület', alias: ['belvaros', 'lipotvaros', 'belvaros-lipotvaros'], side: 'Pest' },
  { number: 6, name: 'Terézváros', roman: 'VI. kerület', value: 'Budapest, VI. kerület', alias: ['terezvaros'], side: 'Pest' },
  { number: 7, name: 'Erzsébetváros', roman: 'VII. kerület', value: 'Budapest, VII. kerület', alias: ['erzsebetvaros'], side: 'Pest' },
  { number: 8, name: 'Józsefváros', roman: 'VIII. kerület', value: 'Budapest, VIII. kerület', alias: ['jozsefvaros'], side: 'Pest' },
  { number: 9, name: 'Ferencváros', roman: 'IX. kerület', value: 'Budapest, IX. kerület', alias: ['ferencvaros'], side: 'Pest' },
  { number: 10, name: 'Kőbánya', roman: 'X. kerület', value: 'Budapest, X. kerület', alias: ['kobanya'], side: 'Pest' },
  { number: 11, name: 'Újbuda', roman: 'XI. kerület', value: 'Budapest, XI. kerület', alias: ['ujbuda'], side: 'Buda' },
  { number: 12, name: 'Hegyvidék', roman: 'XII. kerület', value: 'Budapest, XII. kerület', alias: ['hegyvidek'], side: 'Buda' },
  { number: 13, name: 'Angyalföld', roman: 'XIII. kerület', value: 'Budapest, XIII. kerület', alias: ['angyalfold'], side: 'Pest' },
  { number: 14, name: 'Zugló', roman: 'XIV. kerület', value: 'Budapest, XIV. kerület', alias: ['zuglo'], side: 'Pest' },
  { number: 15, name: 'Rákospalota', roman: 'XV. kerület', value: 'Budapest, XV. kerület', alias: ['rakospalota'], side: 'Pest' },
  { number: 16, name: 'Mátyásföld', roman: 'XVI. kerület', value: 'Budapest, XVI. kerület', alias: ['matyasfold'], side: 'Pest' },
  { number: 17, name: 'Rákosmente', roman: 'XVII. kerület', value: 'Budapest, XVII. kerület', alias: ['rakosmente'], side: 'Pest' },
  { number: 18, name: 'Pestszentlőrinc', roman: 'XVIII. kerület', value: 'Budapest, XVIII. kerület', alias: ['pestszentlorinc'], side: 'Pest' },
  { number: 19, name: 'Kispest', roman: 'XIX. kerület', value: 'Budapest, XIX. kerület', alias: ['kispest'], side: 'Pest' },
  { number: 20, name: 'Pesterzsébet', roman: 'XX. kerület', value: 'Budapest, XX. kerület', alias: ['pesterzsebet'], side: 'Pest' },
  { number: 21, name: 'Csepel', roman: 'XXI. kerület', value: 'Budapest, XXI. kerület', alias: ['csepel'], side: 'Pest' },
  { number: 22, name: 'Budafok-Tétény', roman: 'XXII. kerület', value: 'Budapest, XXII. kerület', alias: ['budafok', 'teteny', 'budafok-teteny'], side: 'Buda' },
  { number: 23, name: 'Soroksár', roman: 'XXIII. kerület', value: 'Budapest, XXIII. kerület', alias: ['soroksar'], side: 'Pest' },
  // Add Budapest as a city option
];

const counties = [
  { name: 'Pest', value: 'pest-varmegye', display: 'Pest vármegye' },
  { name: 'Hajdú-Bihar', value: 'hajdu-bihar-varmegye', display: 'Hajdú-Bihar vármegye' },
  { name: 'Győr-Moson-Sopron', value: 'gyor-moson-sopron-varmegye', display: 'Győr-Moson-Sopron vármegye' },
  { name: 'Baranya', value: 'baranya-varmegye', display: 'Baranya vármegye' },
  { name: 'Borsod-Abaúj-Zemplén', value: 'borsod-abauj-zemplen-varmegye', display: 'Borsod-Abaúj-Zemplén vármegye' },
  { name: 'Szabolcs-Szatmár-Bereg', value: 'szabolcs-szatmar-bereg-varmegye', display: 'Szabolcs-Szatmár-Bereg vármegye' },
  { name: 'Bács-Kiskun', value: 'bacs-kiskun-varmegye', display: 'Bács-Kiskun vármegye' },
  { name: 'Békés', value: 'bekes-varmegye', display: 'Békés vármegye' },
  { name: 'Csongrád-Csanád', value: 'csongrad-csanad-varmegye', display: 'Csongrád-Csanád vármegye' },
  { name: 'Fejér', value: 'fejer-varmegye', display: 'Fejér vármegye' },
  { name: 'Heves', value: 'heves-varmegye', display: 'Heves vármegye' },
  { name: 'Komárom-Esztergom', value: 'komarom-esztergom-varmegye', display: 'Komárom-Esztergom vármegye' },
  { name: 'Nógrád', value: 'nograd-varmegye', display: 'Nógrád vármegye' },
  { name: 'Somogy', value: 'somogy-varmegye', display: 'Somogy vármegye' },
  { name: 'Tolna', value: 'tolna-varmegye', display: 'Tolna vármegye' },
  { name: 'Vas', value: 'vas-varmegye', display: 'Vas vármegye' },
  { name: 'Veszprém', value: 'veszprem-varmegye', display: 'Veszprém vármegye' },
  { name: 'Zala', value: 'zala-varmegye', display: 'Zala vármegye' },
  { name: 'Jász-Nagykun-Szolnok', value: 'jasz-nagykun-szolnok-varmegye', display: 'Jász-Nagykun-Szolnok vármegye' },
];
const LocationSearchModal = ({ 
  isOpen, 
  onClose, 
  selectedLocations, 
  onLocationChange,
  onApply 
}) => {
  const [tab, setTab] = useState('counties');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const districts = budapestDistricts.map(d => d.value);

  // 🔥 Módosított getLocationDisplay a roman formátumhoz
  const getLocationDisplay = (location, type) => {
    if (type === 'district') {
      const district = budapestDistricts.find(d => d.value === location);
      return district ? district.roman : location;
    }
    return location;
  };

const convertToDistrictFormat = (query) => {
  const normalizedQuery = query.trim().toLowerCase().replace(/[-.\s]/g, '');
  const district = budapestDistricts.find(d => 
    d.roman.toLowerCase().replace(/[-.\s]/g, '') === normalizedQuery || 
    d.name.toLowerCase().replace(/[-.\s]/g, '') === normalizedQuery ||
    d.value.toLowerCase().replace(/[-.\s]/g, '') === normalizedQuery ||
    d.alias.some(alias => alias.toLowerCase().replace(/[-.\s]/g, '') === normalizedQuery)
  );
  if (district) {
    console.log('[LocationSearchModal] convertToDistrictFormat:', {
      input: query,
      output: district.value
    });
    return district.value; // Returns: "Budapest", "Budapest, Buda", "Budapest, Pest", or "Budapest, X. kerület"
  }
  console.warn('[LocationSearchModal] convertToDistrictFormat (not district):', query);
  return query;
};

const debouncedSearchCities = debounce(async (query) => {
  if (query.length < 2) {
    setSearchResults([]);
    return;
  }
  
  setLoading(true);
  try {
    const convertedQuery = convertToDistrictFormat(query);
    const isDistrict = budapestDistricts.some(d => d.value === convertedQuery);
    
    if (isDistrict) {
      setSearchResults([convertedQuery]);
    } else {
      const response = await apiClient.get('/posts/cities', { params: { query } });
      const cities = response.data.data || [];
      setSearchResults([
        ...cities.filter(city => 
          city.toLowerCase().includes(query.toLowerCase()) && city !== 'Budapest'
        ),
        // Add Budapest, Buda, Pest if they match the query
        ...(query.toLowerCase().includes('budapest') ? ['Budapest'] : []),
        ...(query.toLowerCase().includes('buda') ? ['Budapest, Buda'] : []),
        ...(query.toLowerCase().includes('pest') ? ['Budapest, Pest'] : []),
      ]);
    }
  } catch (error) {
    console.error('Error searching cities:', error);
    setSearchResults([]);
  } finally {
    setLoading(false);
  }
}, 300);

  useEffect(() => {
    if (searchQuery) {
      debouncedSearchCities(searchQuery);
    } else {
      setSearchResults([]);
    }
    return () => debouncedSearchCities.cancel();
  }, [searchQuery]);

  
  const removeLocation = (locKey) => {
    const newSelected = selectedLocations.filter(key => key !== locKey);
    onLocationChange(newSelected);
    console.log('[LocationSearchModal] removeLocation:', { locKey, newSelected });
  };



// LocationSearchModal.jsx – javított filteredCounties
const filteredCounties = counties.filter(c =>
  c.display.toLowerCase().includes(searchQuery.toLowerCase()) ||
  c.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const filteredDistricts = budapestDistricts
  .filter(d =>
    d.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.roman.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.alias.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  .map(d => d.value);

const toggleLocation = (location, type) => {
  let finalLocation;
  let locationKey;

  if (type === 'county') {
    const countyObj = counties.find(c => c.value === location || c.name === location);
    finalLocation = countyObj ? countyObj.value : location;
    locationKey = `county:${finalLocation}`;
  } else if (type === 'district') {
    finalLocation = convertToDistrictFormat(location);
    locationKey = `district:${finalLocation}`;
  } else {
    finalLocation = location;
    locationKey = `city:${finalLocation}`;
  }

  let newSelected = [...selectedLocations];

  if (newSelected.includes(locationKey)) {
    newSelected = newSelected.filter(loc => loc !== locationKey);
  } else {
    newSelected = [...newSelected, locationKey];
  }

  onLocationChange(newSelected);
};

const isSelected = (location, type) => {
  let finalLocation;
  if (type === 'county') {
    const countyObj = counties.find(c => c.value === location || c.name === location);
    finalLocation = countyObj ? countyObj.value : location;
  } else if (type === 'district') {
    finalLocation = convertToDistrictFormat(location);
  } else {
    finalLocation = location;
  }
  return selectedLocations.includes(`${type}:${finalLocation}`);
};



  const handleApply = () => {
    console.log('[LocationSearchModal] handleApply:', selectedLocations);
    onApply(selectedLocations);
    onClose();
  };

  const handleClose = () => {
    console.log('[LocationSearchModal] handleClose: clearing selected locations');
    onApply([]);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div 
        className="location-modal-overlay" 
        onClick={handleClose}
        style={{ zIndex: 10000 }}
      >
        <div 
          className="location-modal" 
          onClick={(e) => e.stopPropagation()}
          style={{ zIndex: 10001 }}
        >
          <div className="modal-header">
            <h3>Hol keresel?</h3>
            <button className="modal-close" onClick={handleClose}>×</button>
          </div>

          <div className="search-tabs-with-input">
            <div className="search-tabs">
              <button 
                className={`lsm-tab-btn ${tab === 'counties' ? 'active' : ''}`}
                onClick={() => { setTab('counties'); setSearchQuery(''); }}
              >
                Vármegyék
              </button>
              <button 
                className={`lsm-tab-btn ${tab === 'districts' ? 'active' : ''}`}
                onClick={() => { setTab('districts'); setSearchQuery(''); }}
              >
                Budapest
              </button>
            </div>
            
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Keresés (városok, megyék, kerületek...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="location-search-input"
              />
            </div>
          </div>

          {selectedLocations.length > 0 && (
            <div className="selected-locations">
              {selectedLocations.map((locKey, index) => {
                const [type, location] = locKey.split(':');
                return (
                  <div 
                    key={index} 
                    className="selected-tag"
                    onClick={() => removeLocation(locKey)}
                    title="Kattints a törléshez"
                  >
                    <span>{getLocationDisplay(location, type)} </span>
                    <span className="selected-tag-remove">×</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="locations-list">
{searchResults.length > 0 && (
  <div className="city-search-results">
    {loading && <div className="loading">Keresés...</div>}
    {searchResults.map((city, index) => {
      const locationType = budapestDistricts.some(d => d.value === city) ? 'district' : 'city';
      console.log('[LocationSearchModal] Rendering search result:', { city, locationType });
      return (
        <button
          key={`city-${index}`}
          className={`city-search-item ${isSelected(city, locationType) ? 'selected' : ''}`}
          onClick={() => toggleLocation(city, locationType)}
        >
          {getLocationDisplay(city, locationType)}
        </button>
      );
    })}
    {searchResults.length === 0 && !loading && (
      <div className="no-results">Nincs találat</div>
    )}
  </div>
)}

            {searchResults.length === 0 && (
              <>

{tab === 'counties' && filteredCounties.length > 0 && (
  <div className="checkbox-grid-list">
    {filteredCounties.map((countyObj, index) => (
      <label
        key={`county-${index}`}
        className={`lsm-checkbox-grid-item ${isSelected(countyObj.value, 'county') ? 'selected' : ''}`}
      >
        <input
          type="checkbox"
          className="lsm-checkbox-input"
          checked={isSelected(countyObj.value, 'county')}
          onChange={() => toggleLocation(countyObj.value, 'county')}  // ← value-t adjuk át!
        />
        <span className={`lsm-checkbox-label ${isSelected(countyObj.value, 'county') ? 'selected' : ''}`}>
          {countyObj.display} 
        </span>
      </label>
    ))}
  </div>
)}

{tab === 'districts' && filteredDistricts.length > 0 && (
  <div className="checkbox-grid-list">
    {filteredDistricts.map((districtValue, index) => {
      const district = budapestDistricts.find(d => d.value === districtValue);
      return (
        <label 
          key={`district-${index}`}
          className={`lsm-checkbox-grid-item ${isSelected(districtValue, 'district') ? 'selected' : ''}`}
        >
          <input
            type="checkbox"
            className="lsm-checkbox-input"
            checked={isSelected(districtValue, 'district')}
            onChange={() => toggleLocation(districtValue, 'district')}
          />
          <span className={`lsm-checkbox-label ${isSelected(districtValue, 'district') ? 'selected' : ''}`}>
            {district ? district.roman : districtValue}
          </span>
        </label>
      );
    })}
  </div>
)}
              </>
            )}
          </div>

          <div className="modal-actions">
            <button className="lsm-btn-secondary" onClick={handleClose}>
              Mindenhol keresés
            </button>
            <button className="lsm-btn-primary" onClick={handleApply}>
              Alkalmazás ({selectedLocations.length})
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default LocationSearchModal;