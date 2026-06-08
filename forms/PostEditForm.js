import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import { geocodeAddress } from '../utils/geocodeAddress';
import '../styles/PostEditForm.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { debounce } from 'lodash';

// Leaflet alapértelmezett ikonok konfigurálása
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PostEditForm = ({ postId, postData, onSave, onCancel }) => {
  const [title, setTitle] = useState(postData.title || '');
  const [description, setDescription] = useState(postData.description || '');
  const [price, setPrice] = useState(postData.price || 0);
  const [rentalPrice, setRentalPrice] = useState(postData.rental_price || 0);
  const [status, setStatus] = useState(postData.status || 'aktív');
  const [availability, setAvailability] = useState(postData.availability || '');
  const [originalListing, setOriginalListing] = useState(postData.links?.original_listing || '');
  const [address, setAddress] = useState({
    street: postData.address?.street || '',
    house_number: postData.address?.house_number || '',
    city: postData.address?.city || '',
    district: postData.address?.district || '',
    region: postData.address?.region || '',
    postal_code: postData.address?.postal_code || '',
    county: postData.address?.county || '',
    country: 'Magyarország',
    displayOption: postData.address?.displayOption || 'exact',
    offsetRadius: postData.address?.offsetRadius || null,
  });
  const [lat, setLat] = useState(postData.geolocation?.lat || 47.4979);
  const [lon, setLon] = useState(postData.geolocation?.lon || 19.0402);
  const [radius, setRadius] = useState(postData.geolocation?.radius || 100);
  const [streetLine, setStreetLine] = useState(postData.geolocation?.street_line || []);
  const [areaPolygon, setAreaPolygon] = useState(postData.geolocation?.area_polygon || []);
  const [locationMode, setLocationMode] = useState('radius');
  const [errorMessage, setErrorMessage] = useState('');

  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const markerRef = useRef(null);
  const drawControlRef = useRef(null);

  // Koordináták kerekítése 6 tizedesjegyre
  const roundCoordinate = (coord) => parseFloat(coord.toFixed(6));

  // Debounced geolocation frissítés
  const debouncedSetLatLon = useRef(
    debounce((newLat, newLng) => {
      setLat(roundCoordinate(newLat));
      setLon(roundCoordinate(newLng));
    }, 100)
  ).current;

  // Térkép inicializálása egyszer
  useEffect(() => {
    const mapContainer = document.getElementById('post-edit-map-container');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    if (!mapRef.current) {
      mapRef.current = L.map('post-edit-map-container').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // L.FeatureGroup használata L.LayerGroup helyett
      drawnItemsRef.current = new L.FeatureGroup();
      mapRef.current.addLayer(drawnItemsRef.current);

      // Marker inicializálása
      markerRef.current = L.marker([lat, lon], {
        draggable: true,
        icon: new L.Icon.Default(), // Explicit módon használjuk az alapértelmezett ikont
      }).addTo(drawnItemsRef.current);

      markerRef.current.on('dragend', (e) => {
        const { lat: newLat, lng: newLng } = e.target.getLatLng();
        debouncedSetLatLon(newLat, newLng);
      });

      drawControlRef.current = new L.Control.Draw({
        edit: { featureGroup: drawnItemsRef.current },
        draw: {
          polygon: locationMode === 'polygon',
          polyline: locationMode === 'street_line',
          rectangle: false,
          circle: false,
          marker: false,
        },
      });
      mapRef.current.addControl(drawControlRef.current);

      mapRef.current.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItemsRef.current.clearLayers();
        drawnItemsRef.current.addLayer(markerRef.current);
        drawnItemsRef.current.addLayer(layer);

        if (e.layerType === 'polyline') {
          const coords = layer.getLatLngs().map((latlng) => [
            roundCoordinate(latlng.lng),
            roundCoordinate(latlng.lat),
          ]);
          setStreetLine([coords]);
          setAreaPolygon([]);
          setRadius(0);
        } else if (e.layerType === 'polygon') {
          const coords = layer.getLatLngs()[0].map((latlng) => [
            roundCoordinate(latlng.lng),
            roundCoordinate(latlng.lat),
          ]);
          setAreaPolygon([coords]);
          setStreetLine([]);
          setRadius(0);
        }
      });

      mapRef.current.on('draw:edited', (e) => {
        e.layers.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const { lat: newLat, lng: newLng } = layer.getLatLng();
            debouncedSetLatLon(newLat, newLng);
          } else if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            const coords = layer.getLatLngs().map((latlng) => [
              roundCoordinate(latlng.lng),
              roundCoordinate(latlng.lat),
            ]);
            setStreetLine([coords]);
            setAreaPolygon([]);
            setRadius(0);
          } else if (layer instanceof L.Polygon) {
            const coords = layer.getLatLngs()[0].map((latlng) => [
              roundCoordinate(latlng.lng),
              roundCoordinate(latlng.lat),
            ]);
            setAreaPolygon([coords]);
            setStreetLine([]);
            setRadius(0);
          }
        });
      });

      mapRef.current.on('draw:deleted', (e) => {
        e.layers.eachLayer((layer) => {
          if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            setStreetLine([]);
            setRadius(100);
          } else if (layer instanceof L.Polygon) {
            setAreaPolygon([]);
            setRadius(100);
          }
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Üres függőségi tömb: csak egyszer fut le

  // Rétegek frissítése
useEffect(() => {
  if (!mapRef.current || !drawnItemsRef.current || !markerRef.current) return;

  // Térkép nézet frissítése
  mapRef.current.setView([lat, lon], 13);

  // Rétegek törlése, de a marker megtartása
  drawnItemsRef.current.clearLayers();
  markerRef.current.setLatLng([lat, lon]);
  drawnItemsRef.current.addLayer(markerRef.current);

  // Draw control frissítése
  if (drawControlRef.current) {
    mapRef.current.removeControl(drawControlRef.current);
  }

  drawControlRef.current = new L.Control.Draw({
    edit: { featureGroup: drawnItemsRef.current },
    draw: {
      polygon: locationMode === 'polygon',
      polyline: locationMode === 'street_line',
      rectangle: false,
      circle: false,
      marker: false,
    },
  });
  mapRef.current.addControl(drawControlRef.current);

  // Rétegek hozzáadása az aktuális mód alapján
  if (locationMode === 'radius' && radius > 0) {
    L.circle([lat, lon], {
      radius,
      color: '#5099ce',
      fillColor: '#5099ce',
      fillOpacity: 0.2,
    }).addTo(drawnItemsRef.current);
  }

  if (locationMode === 'street_line' && streetLine?.length > 0) {
    // Iterálj végig az összes vonalszakaszon
    streetLine.forEach((segment) => {
      if (segment?.length > 0) {
        const coordsForLeaflet = segment.map(([lon, lat]) => [lat, lon]);
        L.polyline(coordsForLeaflet, { color: '#e74c3c', weight: 4 }).addTo(drawnItemsRef.current);
      }
    });
  }

  if (locationMode === 'polygon' && areaPolygon?.length > 0) {
    let polygonCoords = Array.isArray(areaPolygon[0][0]) ? areaPolygon[0] : areaPolygon;
    if (polygonCoords?.length > 0) {
      try {
        const coordsForLeaflet = polygonCoords.map(([lon, lat]) => [lat, lon]);
        L.polygon(coordsForLeaflet, {
          color: '#2ecc71',
          fillColor: '#2ecc71',
          fillOpacity: 0.3,
        }).addTo(drawnItemsRef.current);
      } catch (error) {
        console.error('Hiba a poligon kirajzolásakor:', error);
      }
    }
  }
}, [lat, lon, radius, streetLine, areaPolygon, locationMode]);

  const handleGeocode = async () => {
    try {
      const geolocationData = await geocodeAddress(address);
      setLat(roundCoordinate(geolocationData.lat));
      setLon(roundCoordinate(geolocationData.lon));
      setRadius(locationMode === 'radius' ? geolocationData.radius : 0);
      setStreetLine(locationMode === 'street_line' ? geolocationData.street_line || [] : []);
      setAreaPolygon(locationMode === 'polygon' ? geolocationData.area_polygon || [] : []);
      setErrorMessage('');
      alert('Geolokáció frissítve!');
    } catch (error) {
      console.error('Geolokáció hiba:', error);
      setErrorMessage('Hiba történt a geolokáció frissítésekor.');
    }
  };

  const handleReGeocode = async () => {
    try {
      const geolocationData = await geocodeAddress(postData.address);
      setLat(roundCoordinate(geolocationData.lat));
      setLon(roundCoordinate(geolocationData.lon));
      setRadius(locationMode === 'radius' ? geolocationData.radius : 0);
      setStreetLine(locationMode === 'street_line' ? geolocationData.street_line || [] : []);
      setAreaPolygon(locationMode === 'polygon' ? geolocationData.area_polygon || [] : []);
      setErrorMessage('');
      alert('Geolokáció frissítve a meglévő cím alapján!');
    } catch (error) {
      console.error('Újrageolokáció hiba:', error);
      setErrorMessage('Hiba történt az újrageolokáció során.');
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
    setErrorMessage('Kérlek, válassz egy érvényes helyet a térképen (szélesség és hosszúság szükséges).');
    return;
  }

  if (lat < -90 || lat > 90) {
    setErrorMessage('A szélesség (lat) értéke -90 és 90 között kell legyen.');
    return;
  }
  if (lon < -180 || lon > 180) {
    setErrorMessage('A hosszúság (lon) értéke -180 és 180 között kell legyen.');
    return;
  }

  try {
    setErrorMessage('');
    await onSave({
      title,
      description,
      price: postData.listing_type === 'eladó' ? parseFloat(price) || 0 : undefined,
      rental_price: postData.listing_type === 'kiadó' ? parseFloat(rentalPrice) || 0 : undefined,
      status,
      availability,
      address,
      geolocation: {
        lat: roundCoordinate(lat),
        lon: roundCoordinate(lon),
        radius: locationMode === 'radius' ? radius : 0,
        street_line: locationMode === 'street_line' ? streetLine : [], // Az összes vonalszakasz küldése
        area_polygon: locationMode === 'polygon' ? areaPolygon : [],
      },
      links: {
        ...postData.links,
        original_listing: originalListing,
      },
    });
  } catch (error) {
    console.error('Mentési hiba:', error);
    setErrorMessage(error.message || 'Hiba történt a mentés során. Kérlek, ellenőrizd a koordinátákat.');
  }
};

  return (
    <div id="post-edit-form-container">
      <form id="post-edit-form" onSubmit={handleSubmit}>
        <h3 id="post-edit-title">Hirdetés szerkesztése</h3>
        {errorMessage && <p id="post-edit-error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="post-edit-title-input">Cím:</label>
          <input
            id="post-edit-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-edit-description-input">Leírás:</label>
          <textarea
            id="post-edit-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {postData.listing_type === 'eladó' && (
          <div className="form-group">
            <label htmlFor="post-edit-price-input">Ár (Millió Ft):</label>
            <input
              id="post-edit-price-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        )}
        {postData.listing_type === 'kiadó' && (
          <div className="form-group">
            <label htmlFor="post-edit-rental-price-input">Bérleti díj (Ezer Ft):</label>
            <input
              id="post-edit-rental-price-input"
              type="number"
              value={rentalPrice}
              onChange={(e) => setRentalPrice(e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="post-edit-status-select">Státusz:</label>
          <select
            id="post-edit-status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="aktív">Aktív</option>
            <option value="inaktív">Inaktív</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="post-edit-availability-select">Költözhetőség:</label>
          <select
            id="post-edit-availability-select"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="">Nincs megadva</option>
            <option value="Azonnal költözhető">Azonnal költözhető</option>
            <option value="Egy hónapon belül költözhető">Egy hónapon belül költözhető</option>
            <option value="Egy hónap után költözhető">Egy hónap után költözhető</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="post-edit-original-listing-input">Eredeti hirdetés URL:</label>
          <input
            id="post-edit-original-listing-input"
            type="url"
            value={originalListing}
            onChange={(e) => setOriginalListing(e.target.value)}
            placeholder="https://example.com/listing"
          />
        </div>

        {/* Cím szerkesztése */}
        <fieldset id="post-edit-address-fieldset">
          <legend>Cím módosítása</legend>
          <div className="form-group">
            <label htmlFor="post-edit-city-input">Város:</label>
            <input
              id="post-edit-city-input"
              type="text"
              value={address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-street-input">Utca:</label>
            <input
              id="post-edit-street-input"
              type="text"
              value={address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-house-number-input">Házszám:</label>
            <input
              id="post-edit-house-number-input"
              type="text"
              value={address.house_number}
              onChange={(e) => handleAddressChange('house_number', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-district-input">Kerület:</label>
            <input
              id="post-edit-district-input"
              type="text"
              value={address.district}
              onChange={(e) => handleAddressChange('district', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-region-input">Régió:</label>
            <input
              id="post-edit-region-input"
              type="text"
              value={address.region}
              onChange={(e) => handleAddressChange('region', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-postal-code-input">Irányítószám:</label>
            <input
              id="post-edit-postal-code-input"
              type="text"
              value={address.postal_code}
              onChange={(e) => handleAddressChange('postal_code', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-county-input">Megye:</label>
            <input
              id="post-edit-county-input"
              type="text"
              value={address.county}
              onChange={(e) => handleAddressChange('county', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-display-option-select">Megjelenítési mód:</label>
            <select
              id="post-edit-display-option-select"
              value={address.displayOption}
              onChange={(e) => handleAddressChange('displayOption', e.target.value)}
            >
              <option value="exact">Pontos cím</option>
              <option value="random_offset">Random eltolás</option>
            </select>
          </div>
          {address.displayOption === 'random_offset' && (
            <div className="form-group">
              <label htmlFor="post-edit-offset-radius-input">Eltolási sugár (méter):</label>
              <input
                id="post-edit-offset-radius-input"
                type="number"
                value={address.offsetRadius || ''}
                onChange={(e) => handleAddressChange('offsetRadius', parseInt(e.target.value) || null)}
                min="10"
                max="1000"
              />
            </div>
          )}
          <button id="post-edit-geocode-button" type="button" onClick={handleGeocode}>
            Geolokáció frissítése (új cím alapján)
          </button>
          <button id="post-edit-regeocode-button" type="button" onClick={handleReGeocode}>
            Újrageolokálás (meglévő cím alapján)
          </button>
        </fieldset>

        {/* Térképes szerkesztés */}
        <fieldset id="post-edit-geolocation-fieldset">
          <legend>Geolokáció szerkesztése</legend>
          <div className="form-group">
            <label htmlFor="post-edit-location-mode-select">Helymeghatározási mód:</label>
            <select
              id="post-edit-location-mode-select"
              value={locationMode}
              onChange={(e) => setLocationMode(e.target.value)}
            >
              <option value="radius">Pont + Sugár</option>
              <option value="polygon">Poligon</option>
              <option value="street_line">Utca vonal</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-lat-input">Szélesség (Lat):</label>
            <input
              id="post-edit-lat-input"
              type="number"
              step="0.000001"
              min="-90"
              max="90"
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value) || 47.4979)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-edit-lon-input">Hosszúság (Lon):</label>
            <input
              id="post-edit-lon-input"
              type="number"
              step="0.000001"
              min="-180"
              max="180"
              value={lon}
              onChange={(e) => setLon(parseFloat(e.target.value) || 19.0402)}
              required
            />
          </div>
          {locationMode === 'radius' && (
            <div className="form-group">
              <label htmlFor="post-edit-radius-input">Sugár (méter):</label>
              <input
                id="post-edit-radius-input"
                type="number"
                value={radius || 100}
                onChange={(e) => setRadius(parseInt(e.target.value) || 100)}
                min="0"
              />
            </div>
          )}
          <div id="post-edit-map-container" style={{ height: '400px', width: '100%' }}></div>
          {locationMode === 'street_line' && (
            <div className="form-group">
              <strong>Vonal (street_line):</strong>
              <pre>{JSON.stringify(streetLine, null, 2)}</pre>
            </div>
          )}
          {locationMode === 'polygon' && (
            <div className="form-group">
              <strong>Poligon (area_polygon):</strong>
              <pre>{JSON.stringify(areaPolygon, null, 2)}</pre>
            </div>
          )}
        </fieldset>

        <div id="post-edit-buttons">
          <button id="post-edit-save-button" type="submit">Mentés</button>
          <button id="post-edit-cancel-button" type="button" onClick={onCancel}>
            Mégse
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditForm;