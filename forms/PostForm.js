import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import '../styles/UploadPage.css';

import LocationPicker from './LocationPicker';
import { geocodeAddress } from '../utils/geocodeAddress';


const PostForm = forwardRef(({ rentData, setRentData, propertyType, setPropertyType }, ref) => {
  const initialState = {
    type: propertyType,          // ← EZT ADD HOZZÁ!
    listing_type: '',
    title: '',
    description: '',
    price: '',
    rental_price: '',
    kaucio: '',
    currency: 'HUF',
    common_charges: '',
    address: {
      house_number: '',
      street: '',
      region: '',
      city: '',
      district: '',
      postal_code: '',
      county: '',
    },
      geolocationMode: 'radius',           // ← új
  geolocation: {                       // ← új
    lat: null,
    lon: null,
    radius: null,
    street_line: [],
    area_polygon: [],
  },
      utilities: {
    electricity: '',
    gas: '',
    water: '',
    sewer: '',
    internet: '',
  },
    area: '',
    land_area: '',
    rooms: '',
    half_rooms: '',
    floor: '',
    total_floors: '',
    bathrooms_count: '',
    external_condition: '',
    internal_condition: '',
    heating_type: '',
    energy_class: '',
    monthly_utility_cost: '',
    furnished: '',
    air_conditioning: '',
    lift: '',
    building_material: '',
    year_built: '',
    new_build: false,
    csok_eligible: false,
    hasBalcony: false,
    hasTerrace: false,
    hasGarage: false,
    hasAirConditioning: false,
    hasLift: false,
    hasEnergyCertificate: false,
    parquetFloor: false,
    americanKitchen: false,
    links: { original_listing: '' },
    agent: { name: '', email: '', phone: '' },
  };

  const [generalData, setGeneralData] = useState(initialState);
  const [address, setAddress] = useState(initialState.address);
  const [errors, setErrors] = useState({});
    const [showLocationPicker, setShowLocationPicker] = useState(false); // ← ÚJ: alapból rejtve
  const [geocodeError, setGeocodeError] = useState(''); // ← hibának a gépi keresésnél
  const [originalGeolocation, setOriginalGeolocation] = useState(null);   // ← ÚJ: mentjük az előző állapotot


  useEffect(() => {
    setGeneralData((prev) => ({ ...prev, address }));
  }, [address]);

  const validatePhone = (phone) =>
    /^\+36\s?(1\s?\d{7}|\d{2}\s?\d{7,8})$/.test(phone)
      ? ''
      : 'Érvénytelen telefonszám (pl. +36201234567)';

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ? ''
      : 'Érvénytelen email formátum';

  const validateForm = () => {
    const newErrors = {};

    // Kötelezők
    if (!generalData.agent.name?.trim()) newErrors.agentName = 'Kapcsolattartó neve kötelező';
    if (!propertyType) newErrors.type = 'Ingatlan típusa kötelező';
    if (!generalData.listing_type) newErrors.listing_type = 'Hirdetés típusa kötelező';
    if (!generalData.title?.trim()) newErrors.title = 'Cím kötelező';
    if (!generalData.description?.trim()) newErrors.description = 'Leírás kötelező';
    if (!generalData.area || Number(generalData.area) <= 0) newErrors.area = 'Alapterület kötelező';
    if (generalData.listing_type === 'eladó' && (!generalData.price || Number(generalData.price) <= 0))
      newErrors.price = 'Ár kötelező';
    if (generalData.listing_type === 'kiadó' && (!generalData.rental_price || Number(generalData.rental_price) <= 0))
      newErrors.rental_price = 'Bérleti díj kötelező';

    if (!address.city?.trim()) newErrors.city = 'Város kötelező';
    if (!address.postal_code || !/^\d{4}$/.test(address.postal_code))
      newErrors.postal_code = 'Érvényes irányítószám (4 számjegy)';
    if (!address.county) newErrors.county = 'Vármegye kötelező';

    if (!generalData.agent.email?.trim()) newErrors.email = 'Email kötelező';
    else if (validateEmail(generalData.agent.email)) newErrors.email = validateEmail(generalData.agent.email);

    if (!generalData.agent.phone?.trim()) newErrors.phone = 'Telefonszám kötelező';
    else if (validatePhone(generalData.agent.phone)) newErrors.phone = validatePhone(generalData.agent.phone);

    // Opcionális, de ha megadták, akkor ellenőrizzük
    if (generalData.common_charges && Number(generalData.common_charges) < 0)
      newErrors.common_charges = 'Közös költség nem lehet negatív';
    


    // Ha kézzel szerkesztette a térképet, de nincs koordináta → hiba
    if (showLocationPicker && (!generalData.geolocation?.lat || !generalData.geolocation?.lon)) {
      newErrors.geolocation = 'Kérlek adj meg érvényes helyszínt a térképen';
    }

    // Ha gépre bízta, de még nem futott le geocode → nem kötelező, de jelezzük
    if (!showLocationPicker && !generalData.geolocation?.lat) {
      newErrors.geolocation = 'Kérlek használd a "gépre bízom" gombot vagy add meg kézzel';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

const handleManualLocation = () => {
  setOriginalGeolocation(generalData.geolocation);
  setShowLocationPicker(true);
  setGeocodeError('');
  // A picker initialMode már a generalData.geolocationMode-ból jön, nem kell itt állítani
};

// Gépi keresés után is mentjük az eredményt
const handleAutoGeocode = async () => {
  setGeocodeError('');

  if (!address.city?.trim() || !address.postal_code?.match(/^\d{4}$/) || !address.county?.trim()) {
    setGeocodeError('Add meg legalább a várost, irányítószámot és vármegyét!');
    return;
  }

  try {
    const geoData = await geocodeAddress({
      house_number: address.house_number || '',
      street: address.street || '',
      city: address.city,
      district: address.district || '',
      region: address.region || '',
      postal_code: address.postal_code,
      county: address.county,
      country: 'Magyarország',
    });

    if (!geoData.lat || !geoData.lon) {
      throw new Error('Nem található koordináta');
    }

    // ÚJ logika: döntsünk a módról a visszaadott adatok alapján
    let detectedMode = 'exact_point'; // alapértelmezett

    if (geoData.area_polygon?.length > 0 && geoData.area_polygon[0]?.length > 2) {
      detectedMode = 'random_polygon';
    } else if (geoData.street_line?.length > 0 && geoData.street_line[0]?.length > 1) {
      detectedMode = 'point_street';
    } else if (geoData.radius && geoData.radius > 0) {
      detectedMode = 'random_circle';
    }

    const newGeo = {
      lat: geoData.lat,
      lon: geoData.lon,
      radius: geoData.radius || (detectedMode === 'random_circle' ? 150 : null),
      street_line: detectedMode === 'point_street' ? geoData.street_line || [] : [],
      area_polygon: detectedMode === 'random_polygon' ? geoData.area_polygon || [] : [],
    };

    setGeneralData(prev => ({
      ...prev,
      geolocationMode: detectedMode,          // ← ezt állítjuk be!
      geolocation: newGeo
    }));

    setOriginalGeolocation(newGeo);

    alert(`Sikeresen megtaláltuk a helyszínt!\nMód: ${detectedMode === 'point_street' ? 'Utca vonal' : detectedMode === 'random_polygon' ? 'Poligon terület' : 'Pont + kör'}`);
  } catch (err) {
    console.error('Geocode hiba:', err);
    setGeocodeError('Nem sikerült a cím alapján megtalálni a helyszínt. Próbáld kézzel!');
  }
};

// Picker alatti gombok logikája
const applyLocationChanges = () => {
  // A picker onChange már frissítette a generalData.geolocation-t
  // Csak bezárjuk és megtartjuk az új értéket
  setShowLocationPicker(false);
  setOriginalGeolocation(null); // már nem kell a mentett verzió
};

const discardLocationChanges = () => {
  if (originalGeolocation) {
    setGeneralData(prev => ({
      ...prev,
      geolocation: originalGeolocation
    }));
  }
  setShowLocationPicker(false);
  setOriginalGeolocation(null);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUtilitiesChange = (e) => {
  const { name, value } = e.target;
  setGeneralData((prev) => ({
    ...prev,
    utilities: { ...prev.utilities, [name]: value },
  }));
};

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgentChange = (e) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({
      ...prev,
      agent: { ...prev.agent, [name]: value },
    }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: checked }));
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      ...generalData,
      type: propertyType || '',
      address,
    }),
    resetForm: () => {
      setGeneralData(initialState);
      setAddress(initialState.address);
      setErrors({});
      setShowLocationPicker(false);
      setGeocodeError('');
      setRentData?.({ deposit: null });
    },
    validateForm,
  }));

  const counties = [
    'Bács-Kiskun', 'Baranya', 'Békés', 'Borsod-Abaúj-Zemplén', 'Csongrád-Csanád',
    'Fejér', 'Győr-Moson-Sopron', 'Hajdú-Bihar', 'Heves', 'Jász-Nagykun-Szolnok',
    'Komárom-Esztergom', 'Nógrád', 'Pest', 'Somogy', 'Szabolcs-Szatmár-Bereg',
    'Tolna', 'Vas', 'Veszprém', 'Zala',
  ];

  return (
    <div className="post-form">

      {/* ============================================= */}
      {/*          K Ö T E L E Z Ő   A D A T O K         */}
      {/* ============================================= */}


      <fieldset className="upload-fieldset">
                <legend>Alap adatok *</legend>

        <div className={`form-group ${errors.type ? 'has-error' : ''}`}>
          <label>Ingatlan típusa *</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="form-select"
            required
          >
            <option value="">-- válassz --</option>
            <option value="Lakás">Lakás</option>
            <option value="Ház">Ház</option>
            <option value="Telek">Telek</option>
            <option value="Garázs">Garázs</option>
            <option value="Nyaraló">Nyaraló</option>
            <option value="Iroda">Iroda</option>
            <option value="Üzlethelyiség">Üzlethelyiség</option>
            {/* ... további opciók ha szükséges */}
          </select>
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>

        <div className={`form-group ${errors.listing_type ? 'has-error' : ''}`}>
          <label>Hirdetés típusa *</label>
          <select name="listing_type" value={generalData.listing_type} onChange={handleChange} required className="form-select">
            <option value="">-- válassz --</option>
            <option value="eladó">Eladó</option>
            <option value="kiadó">Kiadó</option>
          </select>
          {errors.listing_type && <span className="error-message">{errors.listing_type}</span>}
        </div>

        {generalData.listing_type === 'eladó' && (
          <div className={`form-group ${errors.price ? 'has-error' : ''}`}>
            <label>Eladási ár (millió Ft) *</label>
            <div className="input-with-unit">
              <input
                type="number"
                name="price"
                value={generalData.price}
                onChange={handleNumberChange}
                min="0"
                step="0.01"
                className="form-input"
              />

            </div>
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
        )}

        {generalData.listing_type === 'kiadó' && (
          <>
            <div className={`form-group ${errors.rental_price ? 'has-error' : ''}`}>
              <label>Bérleti díj (ezer Ft/hó) *</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  name="rental_price"
                  value={generalData.rental_price}
                  onChange={handleNumberChange}
                  min="0"
                  className="form-input"
                />

              </div>
              {errors.rental_price && <span className="error-message">{errors.rental_price}</span>}
            </div>

            <div className="form-group">
              <label>Kaució (ezer Ft)</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  name="kaucio"
                  value={generalData.kaucio}
                  onChange={handleNumberChange}
                  min="0"
                  className="form-input"
                />
              </div>
            </div>
          </>
        )}

                <div className={`form-group ${errors.area ? 'has-error' : ''}`}>
          <label>Alapterület (m²) *</label>
          <input type="number" name="area" value={generalData.area} onChange={handleNumberChange} min="1" required className="form-input" />
          {errors.area && <span className="error-message">{errors.area}</span>}
        </div>

        <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
          <label>Hirdetés címe *</label>
          <input type="text" name="title" value={generalData.title} onChange={handleChange} required className="form-input" />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
          <label>Leírás *</label>
          <textarea name="description" value={generalData.description} onChange={handleChange} required rows={5} className="form-input" />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        </fieldset>

        <fieldset className="upload-fieldset">
        <legend>Cím adatok *</legend>
   <div className={`form-group ${errors.house_number ? 'has-error' : ''}`}>
          <label>Házszám:</label>
          <input
            type="text"
            name="house_number"
            value={address.house_number}
            onChange={handleAddressChange}
            className="form-input"
            placeholder="Pl. 15"
          />
        </div>

        <div className={`form-group ${errors.street ? 'has-error' : ''}`}>
          <label>Utca:</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            className="form-input"
            placeholder="Pl. Baross tér"
          />
        </div>
        <div className={`form-group ${errors.region ? 'has-error' : ''}`}>
          <label>Környék:</label>
          <input
            type="text"
            name="region"
            value={address.region}
            onChange={handleAddressChange}
            className="form-input"
            placeholder="Pl. Népszínház negyed"
          />
        </div>
                <div className={`form-group ${errors.postal_code ? 'has-error' : ''}`}>
          <label>Irányítószám *:</label>
          <input
            type="text"
            name="postal_code"
            value={address.postal_code}
            onChange={handleAddressChange}
            className="form-input"
            pattern="[0-9]{4}"
            required
            placeholder="Pl. 1088"
          />
          {errors.postal_code && <span className="error-message">{errors.postal_code}</span>}
        </div>
        <div className={`form-group ${errors.city ? 'has-error' : ''}`}>
          <label>Város *:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            className="form-input"
            required
            placeholder="Pl. Budapest"
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        {address.city.toLowerCase() === 'budapest' && (
          <div className="form-group">
            <label>Kerület:</label>
            <input
              type="text"
              name="district"
              value={address.district}
              onChange={handleAddressChange}
              className="form-input"
              placeholder="Pl. VIII."
            />
          </div>
        )}

        <div className={`form-group ${errors.county ? 'has-error' : ''}`}>
          <label>Vármegye *</label>
          <select name="county" value={address.county} onChange={handleAddressChange} required className="form-select">
            <option value="">-- válassz --</option>
            {counties.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.county && <span className="error-message">{errors.county}</span>}
        </div>
        </fieldset>



<fieldset className="upload-fieldset">
  <legend>Helyszín megadása</legend>

  {!showLocationPicker ? (
    <div className="location-choice-buttons" style={{ 
      display: 'flex', 
      gap: '1.5rem', 
      justifyContent: 'center', 
      margin: '1.5rem 0' 
    }}>
      <button
        type="button"
        onClick={handleManualLocation}
        className="profile-button"
        style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
      >
        Én adom meg a helyszínt (térképen)
      </button>

      <button
        type="button"
        onClick={handleAutoGeocode}
        className="profile-button btn-secondary"
        style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
      >
        A gépre bízom – keresés a cím alapján!
      </button>
    </div>
  ) : (
    <>
      <LocationPicker
        initialMode={generalData.geolocationMode || 'exact_point'}
        initialLat={generalData.geolocation?.lat || 47.4979}
        initialLon={generalData.geolocation?.lon || 19.0402}
        initialRadius={generalData.geolocation?.radius || 100}
        initialStreetLine={generalData.geolocation?.street_line || []}
        initialAreaPolygon={generalData.geolocation?.area_polygon || []}
        onChange={(geo) => {
          setGeneralData(prev => ({
            ...prev,
            geolocationMode: geo.mode,
            geolocation: {
              lat: geo.lat,
              lon: geo.lon,
              radius: geo.radius,
              street_line: geo.street_line,
              area_polygon: geo.area_polygon,
            }
          }));
        }}
      />

      {/* ÚJ: gombok a picker alatt */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center', 
        marginTop: '1.5rem' 
      }}>
{/* A picker alatti gombok */}
<div className="location-picker-actions">
  <button
    type="button"
    onClick={applyLocationChanges}
    className="profile-button"
    style={{ background: '#27ae60', color: 'white' }}
  >
    Helyszín alkalmazása
  </button>

  <button
    type="button"
    onClick={discardLocationChanges}
    className="profile-button btn-danger"
  >
    Módosítások eldobása
  </button>
</div>
      </div>
    </>
  )}

  {geocodeError && (
    <div className="message error" style={{ textAlign: 'center', margin: '1rem 0' }}>
      {geocodeError}
    </div>
  )}

  {/* Ha gépi keresés után van adat, de még nem nyitotta meg a pickert */}
  {!showLocationPicker && generalData.geolocation?.lat && (
    <div style={{ textAlign: 'center', margin: '1rem 0', color: '#2ecc71' }}>
      Sikeresen megtaláltuk a helyszínt: {generalData.geolocation.lat.toFixed(5)}, {generalData.geolocation.lon.toFixed(5)}
      <br />
      <button 
        type="button" 
        onClick={handleManualLocation}
        style={{ marginTop: '0.8rem' }}
        className="profile-button btn-small"
      >
        Szerkesztem még a térképen
      </button>
    </div>
  )}
</fieldset>

        <fieldset className="upload-fieldset">
        <legend>Kapcsolattartási adatok *</legend>
<div className={`form-group ${errors.agentName ? 'has-error' : ''}`}>
  <label>Név (kapcsolattartó) *</label>
  <input name="name" value={generalData.agent.name} onChange={handleAgentChange} required className="form-input" />
  {errors.agentName && <span className="error-message">{errors.agentName}</span>}
</div>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label>Email (kapcsolattartó) *</label>
          <input type="email" name="email" value={generalData.agent.email} onChange={handleAgentChange} required className="form-input" />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
          <label>Telefonszám (kapcsolattartó) *</label>
          <input type="tel" name="phone" value={generalData.agent.phone} onChange={handleAgentChange} required className="form-input" />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </fieldset>


      {/* ============================================= */}
      {/*        O P C I O N Á L I S   A D A T O K       */}
      {/* ============================================= */}

      <fieldset className="upload-fieldset optional">
        <legend>További (opcionális) adatok</legend>

        <div className="form-group">
          <label>Telek, kert területe (m²)</label>
          <input type="number" name="land_area" value={generalData.land_area} onChange={handleNumberChange} min="0" className="form-input" />
        </div>

                <div className={`form-group ${errors.common_charges ? 'has-error' : ''}`}>
          <label>Közös költség (ezer Ft/hó)</label>
          <div className="input-with-unit">
            <input
              type="number"
              name="common_charges"
              value={generalData.common_charges}
              onChange={handleNumberChange}
              min="0"
              className="form-input"
            />
          </div>
          {errors.common_charges && <span className="error-message">{errors.common_charges}</span>}
        </div>



        <div className="form-group">
          <label>Szobák száma</label>
          <input type="number" name="rooms" value={generalData.rooms} onChange={handleNumberChange} min="0" className="form-input" />
        </div>

        <div className="form-group">
          <label>Fél szobák száma</label>
          <input type="number" name="half_rooms" value={generalData.half_rooms} onChange={handleNumberChange} min="0" className="form-input" />
        </div>

        <div className="form-group">
          <label>Fürdőszobák száma</label>
          <input type="number" name="bathrooms_count" value={generalData.bathrooms_count} onChange={handleNumberChange} min="0" className="form-input" />
        </div>

        <div className="form-group">
          <label>Építés éve</label>
          <input type="number" name="year_built" value={generalData.year_built} onChange={handleNumberChange} min="1800" max="2035" className="form-input" />
        </div>

        <div className="form-group">
          <label>Bútorozottság</label>
          <select name="furnished" value={generalData.furnished} onChange={handleChange} className="form-select">
            <option value="">-- válassz --</option>
            <option value="Bútorozott">Bútorozott</option>
            <option value="Részben bútorozott">Részben bútorozott</option>
            <option value="Bútorozatlan">Bútorozatlan</option>
            <option value="Gépesített">Gépesített</option>
          </select>
        </div>

        <div className="form-group">
          <label>Építési anyag / falazat</label>
          <select name="building_material" value={generalData.building_material} onChange={handleChange} className="form-select">
            <option value="">-- válassz --</option>
            <option value="Tégla">Tégla</option>
            <option value="Panel">Panel</option>
            <option value="Gázbeton, YTONG">Gázbeton, YTONG</option>
            <option value="Könnyűszerkezetes">Könnyűszerkezetes</option>
            <option value="Fa">Fa</option>
            <option value="Vályog">Vályog</option>
            <option value="Egyéb">Egyéb</option>
          </select>
        </div>

       <div className="form-group">
          <label>Energia osztály:</label>
          <select name="energy_class" value={generalData.energy_class} onChange={handleChange} className="form-select">
            <option value="">Nincs</option>
            <option value="A+++">A+++</option>
            <option value="A++">A++</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </div>


<div className="form-group">
  <label>Fűtés típusa</label>
  <select name="heating_type" value={generalData.heating_type} onChange={handleChange} className="form-select">
  <option value="">-- válassz --</option>
  <option value="Gázkazán">Gázkazán</option>
  <option value="Cirkó">Cirkó</option>
  <option value="Kondenzációs kazán">Kondenzációs kazán</option>
  <option value="Távfűtés">Távfűtés</option>
  <option value="Távfűtés egyedi méréssel">Távfűtés egyedi méréssel</option>
  <option value="Házközponti">Házközponti</option>
  <option value="Padlófűtés">Padlófűtés</option>
  <option value="Falfűtés">Falfűtés</option>
  <option value="Hőszivattyú">Hőszivattyú</option>
  <option value="Klímás hűtés-fűtés">Klímás hűtés-fűtés</option>
  <option value="Vegyes tüzelés">Vegyes tüzelés</option>
  <option value="Elektromos">Elektromos</option>
  <option value="Kandalló">Kandalló</option>
  </select>
</div>




        <div className="form-group">
          <label>Belső állapot</label>
          <select name="internal_condition" value={generalData.internal_condition} onChange={handleChange} className="form-select">
            <option value="">-- válassz --</option>
            <option value="Új építésű">Új építésű</option>
            <option value="Felújított">Felújított</option>
            <option value="Jó">Jó</option>
            <option value="Közepes állapotú">Közepes állapotú</option>
            <option value="Felújítandó">Felújítandó</option>
            <option value="Lakhatatlan">Lakhatatlan</option>
          </select>
        </div>

        {/* Külső állapot */}
<div className="form-group">
  <label>Külső állapot / homlokzat</label>
  <select name="external_condition" value={generalData.external_condition || ''} onChange={handleChange} className="form-select">
    <option value="">-- válassz --</option>
    <option value="Új építésű">Új építésű</option>
    <option value="Felújított">Felújított</option>
    <option value="Jó">Jó</option>
    <option value="Átlagos">Átlagos</option>
    <option value="Felújításra szoruló">Felújításra szoruló</option>
    <option value="Rossz">Rossz</option>
  </select>
</div>

{/* Komfortszint */}
<div className="form-group">
  <label>Komfortfokozat</label>
  <select name="comfort_level" value={generalData.comfort_level || ''} onChange={handleChange} className="form-select">
    <option value="">-- válassz --</option>
    <option value="Összkomfortos">Összkomfortos</option>
    <option value="Komfortos">Komfortos</option>
    <option value="Félkomfortos">Félkomfortos</option>
    <option value="Komfort nélküli">Komfort nélküli</option>
    <option value="Luxus">Luxus</option>
  </select>
</div>

        <div className="form-group">
          <label>Villany:</label>
          <select name="electricity" value={generalData.utilities.electricity} onChange={handleUtilitiesChange} className="form-select">
            <option value="">Nincs</option>
            <option value="Bevezetve (230 Volt)">Bevezetve (230 Volt)</option>
            <option value="Bevezetve (230 - 400 Volt)">Bevezetve (230 - 400 Volt)</option>
            <option value="Vezeték a telek előtt">Vezeték a telek előtt</option>
            <option value="Vezeték a közelben">Vezeték a közelben</option>
            <option value="Nincs a közelben vezeték">Nincs a közelben vezeték</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gáz:</label>
          <select name="gas" value={generalData.utilities.gas} onChange={handleUtilitiesChange} className="form-select">
            <option value="">Nincs</option>
            <option value="Vezetékes gáz">Vezetékes gáz</option>
            <option value="Gázcsonk a telken">Gázcsonk a telken</option>
            <option value="Gázvezeték a telek előtt">Gázvezeték a telek előtt</option>
            <option value="Nincs a közelben">Nincs a közelben</option>
            <option value="Gázpalackból">Gázpalackból</option>
            <option value="Telepített tartályból">Telepített tartályból</option>
          </select>
        </div>
        <div className="form-group">
          <label>Víz:</label>
          <select name="water" value={generalData.utilities.water} onChange={handleUtilitiesChange} className="form-select">
            <option value="">Nincs</option>
            <option value="Van">Van</option>
            <option value="Van, saját vízórával">Van, saját vízórával</option>
            <option value="Víz az épületben">Víz az épületben</option>
            <option value="Víz a telken">Víz a telken</option>
            <option value="Vízvezeték a telek előtt">Vízvezeték a telek előtt</option>
            <option value="Nincs vízvezeték">Nincs vízvezeték</option>
            <option value="Saját kút">Saját kút</option>
          </select>
        </div>
        <div className="form-group">
          <label>Csatorna:</label>
          <select name="sewer" value={generalData.utilities.sewer} onChange={handleUtilitiesChange} className="form-select">
            <option value="">Nincs</option>
            <option value="Közműhálózatba bekötve">Közműhálózatba bekötve</option>
            <option value="Derítő">Derítő</option>
            <option value="Csatorna az utcában">Csatorna az utcában</option>
            <option value="Csatorna a telekhatáron">Csatorna a telekhatáron</option>
            <option value="Csatorna a telken">Csatorna a telken</option>
          </select>
        </div>
        <div className="form-group">
          <label>Internet:</label>
          <select name="internet" value={generalData.utilities.internet} onChange={handleUtilitiesChange} className="form-select">
            <option value="">Nincs</option>
            <option value="Szélessávú">Szélessávú (10Mbps+)</option>
            <option value="Műholdas">Műholdas</option>
            <option value="Mikrohullámú">Mikrohullámú</option>
            <option value="ADSL / ADSL2">ADSL / ADSL2</option>
            <option value="ISDN">ISDN</option>
            <option value="Optikai">Optikai</option>
            <option value="Csak mobil internet">Csak mobil internet</option>
          </select>
        </div>

{/* Fürdő típusa */}
<div className="form-group">
  <label>Fürdőszoba típusa</label>
  <select name="bathroom_type" value={generalData.bathroom_type || ''} onChange={handleChange} className="form-select">
    <option value="">-- válassz --</option>
    <option value="Egyben">Egyben</option>
    <option value="Külön">Külön</option>
    <option value="Külön és egyben is">Külön és egyben is</option>
  </select>
</div>

{/* Kilátás */}
<div className="form-group">
  <label>Kilátás</label>
  <select name="view" value={generalData.view || ''} onChange={handleChange} className="form-select">
    <option value="">-- válassz --</option>
    <option value="Panorámás">Panorámás</option>
    <option value="Kertre néző">Kertre néző</option>
    <option value="Utcára néző">Utcára néző</option>
    <option value="Vízre néző">Vízre néző</option>
    <option value="Parkra néző">Parkra néző</option>
    <option value="Nincs">Nincs</option>
  </select>
</div>

{/* Tájolás */}
<div className="form-group">
  <label>Tájolás</label>
  <select name="orientation" value={generalData.orientation || ''} onChange={handleChange} className="form-select">
    <option value="">-- válassz --</option>
    <option value="Dél">Dél</option>
    <option value="Nyugat">Nyugat</option>
    <option value="Észak">Észak</option>
    <option value="Kelet">Kelet</option>
    <option value="Délnyugat">Délnyugat</option>
    <option value="Északnyugat">Északnyugat</option>
    <option value="Kelet-nyugat">Kelet-nyugat</option>
    <option value="Észak-dél">Észak-dél</option>
  </select>
</div>

{/* Parkolás típusa – részletesebb */}
<div className="form-group">
  <label>Parkolás típusa</label>
  <select name="parking_type" value={generalData.parking_type || ''} onChange={handleChange} className="form-select">
    <option value="">-- válassz --</option>
    <option value="Teremgarázs">Teremgarázs</option>
    <option value="Önálló garázs">Önálló garázs</option>
    <option value="Udvari beálló">Udvari beálló</option>
    <option value="Telken belüli fedett">Telken belüli fedett</option>
    <option value="Utcán ingyenes">Utcán ingyenes</option>
    <option value="Utcán fizetős">Utcán fizetős</option>
  </select>
</div>

                        <div className={`form-group ${errors.floor ? 'has-error' : ''}`}>
          <label>Emelet</label>
          <select name="floor" value={generalData.floor} onChange={handleChange} className="form-select" required>
            <option value="">-- válassz --</option>
            <option value="Földszint">Földszint</option>
            <option value="Félemelet">Félemelet</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="10+">10+</option>
            <option value="Tetőtér">Tetőtér</option>
            <option value="Pinceszint">Pinceszint / Alagsor</option>
          </select>
        </div>

        {/* Boolean extra checkboxok csoportosítva */}
        <fieldset className="upload-fieldset">
        <legend>Extrák:</legend>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="csok_eligible" checked={generalData.csok_eligible} onChange={handleCheckbox} />
            CSOK-ra alkalmas
              <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="hasBalcony" checked={generalData.hasBalcony} onChange={handleCheckbox} />
            Erkély / balkon
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="hasTerrace" checked={generalData.hasTerrace} onChange={handleCheckbox} />
            Terasz
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="new_build" checked={generalData.new_build} onChange={handleCheckbox} />
            Újépítésű
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>


          <label>
            <input type="checkbox" name="hasGarage" checked={generalData.hasGarage} onChange={handleCheckbox} />
            Garázs
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="hasAirConditioning" checked={generalData.hasAirConditioning} onChange={handleCheckbox} />
            Klíma van
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="hasLift" checked={generalData.hasLift} onChange={handleCheckbox} />
            Lift van
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="parquetFloor" checked={generalData.parquetFloor} onChange={handleCheckbox} />
            Parketta
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          <label>
            <input type="checkbox" name="americanKitchen" checked={generalData.americanKitchen} onChange={handleCheckbox} />
            Amerikai konyha
                          <span></span>  {/* <-- EZT ADD HOZZÁ! */}

          </label>

          {/* további extrák – nagyon keresettek */}

<label>
  <input type="checkbox" name="hasSauna" checked={generalData.hasSauna} onChange={handleCheckbox} />
  Szauna
  <span></span>
</label>

<label>
  <input type="checkbox" name="hasFireplace" checked={generalData.hasFireplace} onChange={handleCheckbox} />
  Kandalló
  <span></span>
</label>

<label>
  <input type="checkbox" name="gardenAccess" checked={generalData.gardenAccess} onChange={handleCheckbox} />
  Közvetlen kerti bejárat
  <span></span>
</label>

<label>
  <input type="checkbox" name="hasLivingRoom" checked={generalData.hasLivingRoom} onChange={handleCheckbox} />
  Külön nappali
  <span></span>
</label>

<label>
  <input type="checkbox" name="separateRooms" checked={generalData.separateRooms} onChange={handleCheckbox} />
  Különálló szobák
  <span></span>
</label>

<label>
  <input type="checkbox" name="multipleWc" checked={generalData.multipleWc} onChange={handleCheckbox} />
  Több WC
  <span></span>
</label>

<label>
  <input type="checkbox" name="insulatedBuilding" checked={generalData.insulatedBuilding} onChange={handleCheckbox} />
  Hőszigetelt épület
  <span></span>
</label>

<label>
  <input type="checkbox" name="newWindows" checked={generalData.newWindows} onChange={handleCheckbox} />
  Új nyílászárók
  <span></span>
</label>

<label>
  <input type="checkbox" name="quietArea" checked={generalData.quietArea} onChange={handleCheckbox} />
  Csendes környék
  <span></span>
</label>
        </div>
      </fieldset>
      </fieldset>
    </div>
  );
});

export default PostForm;