// components/MissingLocations.js
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import '../styles/MissingLocations.css';

// Modal beállítások - csak client oldalon
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

const MissingLocations = () => {
  const [missingLocations, setMissingLocations] = useState({ cities: [], regions: [] });
  const [isPolygonModalOpen, setIsPolygonModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [newPolygon, setNewPolygon] = useState(null);
  const [nominatimPolygon, setNominatimPolygon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);
  const [geocodeAddress, setGeocodeAddress] = useState(null);
  
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const router = useRouter();

  // Client oldali ellenőrzés
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dinamikus importok
  useEffect(() => {
    if (!isClient) return;

    const loadDependencies = async () => {
      try {
        const leafletModule = await import('leaflet');
        await import('leaflet-draw');
        await import('leaflet/dist/leaflet.css');
        await import('leaflet-draw/dist/leaflet.draw.css');
        
        const geocodeModule = await import('../utils/geocodeAddress');
        
        setL(leafletModule.default);
        setGeocodeAddress(() => geocodeModule.geocodeAddress);
      } catch (error) {
        console.error('Failed to load Leaflet dependencies:', error);
      }
    };

    loadDependencies();
  }, [isClient]);

  useEffect(() => {
    const fetchMissingLocations = async () => {
      try {
        setLoading(true);
        const { getMissingLocations } = await import('../services/apiService');
        const missingLocationsData = await getMissingLocations();
        setMissingLocations(missingLocationsData.data || { cities: [], regions: [] });
      } catch (err) {
        setError(err.message || 'Hiba történt a hiányzó helyszínek lekérésekor');
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchMissingLocations();
    }
  }, [isClient]);

  const handleAddPolygon = (location) => {
    let effectiveLocation = { ...location };

    if (location.city && !location.region) {
      effectiveLocation = {
        city: null,
        name: location.city,
        originalName: location.city,
        isDistrict: false,
      };
    } else if (location.city && location.region) {
      effectiveLocation = {
        city: location.city,
        region: location.region,
        originalName: `${location.city} - ${location.region}`,
        name: location.region,
      };
    }

    setSelectedLocation(effectiveLocation);
    setIsPolygonModalOpen(true);
  };

  const handlePolygonModalClose = () => {
    setIsPolygonModalOpen(false);
    setSelectedLocation(null);
    setNewPolygon(null);
    setNominatimPolygon(null);
    setMapInitialized(false);
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  const handleSavePolygon = async () => {
    if (!newPolygon) {
      alert('Kérlek, rajzolj egy poligont a térképen!');
      return;
    }

    try {
      const { addCityRegion, getMissingLocations } = await import('../services/apiService');
      
      let finalCity = selectedLocation.city || undefined;

      if (selectedLocation.city && selectedLocation.region) {
        const keruletMatch = selectedLocation.city.match(/Budapest,\s*([IVXLCDM]+)\. kerület/i);
        if (keruletMatch) {
          finalCity = selectedLocation.city;
        }
      }

      const data = {
        type: selectedLocation.city ? 'region' : 'city',
        name: selectedLocation.region || selectedLocation.name,
        city: finalCity,
        geometry: {
          type: 'Polygon',
          coordinates: [newPolygon],
        },
      };

      const response = await addCityRegion(data);
      const updatedMissingLocations = await getMissingLocations();
      setMissingLocations(updatedMissingLocations.data || { cities: [], regions: [] });

      const updatedPostsCount = response.updatedPostsCount || 0;
      alert(
        `Poligon sikeresen mentve! ${
          updatedPostsCount > 0
            ? `${updatedPostsCount} hirdetés geolokációja frissítve.`
            : 'Nem található érintett hirdetés.'
        }`
      );

      handlePolygonModalClose();
    } catch (error) {
      alert(error.message || 'Hiba történt a poligon mentése során!');
      console.error('[MissingLocations] Save error:', error);
    }
  };

  const initializeMapWithGeocodedLocation = async () => {
    if (!isClient || !L || !geocodeAddress || !selectedLocation || !isPolygonModalOpen || mapInitialized) return;

    const mapContainer = document.getElementById('missing-locations-polygon-map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    try {
      const geolocationData = await geocodeAddress({
        city: selectedLocation.city || selectedLocation.name,
        region: selectedLocation.region || '',
        country: 'Magyarország',
      });

      const { lat, lon, area_polygon } = geolocationData;

      if (area_polygon) {
        const polygonCoords = area_polygon.type === 'MultiPolygon' ? area_polygon[0][0] : Array.isArray(area_polygon[0][0]) ? area_polygon[0] : area_polygon;
        setNominatimPolygon(polygonCoords);
        setNewPolygon(polygonCoords);
      }

      const map = L.map('missing-locations-polygon-map').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      const drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems },
        draw: {
          polygon: true,
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
        },
      });
      map.addControl(drawControl);

      map.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItems.clearLayers();
        drawnItems.addLayer(layer);

        if (e.layerType === 'polygon') {
          const coords = layer.getLatLngs()[0].map((latlng) => [
            Number(latlng.lng.toFixed(6)),
            Number(latlng.lat.toFixed(6)),
          ]);
          if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
            coords.push(coords[0]);
          }
          setNewPolygon(coords);
        }
      });

      map.on('draw:edited', (e) => {
        e.layers.eachLayer((layer) => {
          if (layer instanceof L.Polygon) {
            const coords = layer.getLatLngs()[0].map((latlng) => [
              Number(latlng.lng.toFixed(6)),
              Number(latlng.lat.toFixed(6)),
            ]);
            if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
              coords.push(coords[0]);
            }
            setNewPolygon(coords);
          }
        });
      });

      map.on('draw:deleted', () => {
        setNewPolygon(null);
      });

      mapRef.current = map;
      setMapInitialized(true);
    } catch (error) {
      console.error('[MissingLocations] Geokódolási hiba:', error);
      alert('Nem sikerült megtalálni a helyszínt. Kérlek, próbáld manuálisan beállítani.');
      
      const map = L.map('missing-locations-polygon-map').setView([47.4979, 19.0402], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      const drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems },
        draw: {
          polygon: true,
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
        },
      });
      map.addControl(drawControl);

      map.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItems.clearLayers();
        drawnItems.addLayer(layer);
        if (e.layerType === 'polygon') {
          const coords = layer.getLatLngs()[0].map((latlng) => [
            Number(latlng.lng.toFixed(6)),
            Number(latlng.lat.toFixed(6)),
          ]);
          if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
            coords.push(coords[0]);
          }
          setNewPolygon(coords);
        }
      });

      map.on('draw:edited', (e) => {
        e.layers.eachLayer((layer) => {
          if (layer instanceof L.Polygon) {
            const coords = layer.getLatLngs()[0].map((latlng) => [
              Number(latlng.lng.toFixed(6)),
              Number(latlng.lat.toFixed(6)),
            ]);
            if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
              coords.push(coords[0]);
            }
            setNewPolygon(coords);
          }
        });
      });

      map.on('draw:deleted', () => {
        setNewPolygon(null);
      });

      mapRef.current = map;
      setMapInitialized(true);
    }
  };

  useEffect(() => {
    if (isPolygonModalOpen && !mapInitialized && isClient && L && geocodeAddress) {
      setTimeout(() => {
        initializeMapWithGeocodedLocation();
      }, 100);
    }
  }, [isPolygonModalOpen, selectedLocation, mapInitialized, isClient, L, geocodeAddress]);

  useEffect(() => {
    if (mapInitialized && nominatimPolygon && mapRef.current && drawnItemsRef.current && L) {
      drawnItemsRef.current.clearLayers();
      const leafletPolygon = L.polygon(
        nominatimPolygon.map(([lng, lat]) => [lat, lng]),
        { color: '#3388ff', weight: 3 }
      );
      drawnItemsRef.current.addLayer(leafletPolygon);
      mapRef.current.fitBounds(leafletPolygon.getBounds());
    }
  }, [nominatimPolygon, mapInitialized, L]);

  if (!isClient) {
    return <div className="missing-locations-loading">Betöltés...</div>;
  }

  if (loading) {
    return <div className="missing-locations-loading">Betöltés...</div>;
  }

  if (error) {
    return <div className="missing-locations-error">{error}</div>;
  }

  return (
    <div className="missing-locations-page">
      <div className="missing-locations-header">
        <h2>Hiányzó Helyszínek Kezelése</h2>
        <div className="missing-locations-header-actions">
          <button
            className="missing-locations-button"
            onClick={() => router.push('/profile/admin')}
          >
            Vissza az Admin Felületre
          </button>
        </div>
      </div>

      <div className="missing-locations-content">
        <div className="missing-locations-card">
          <h3>Hiányzó helyszínek az adatbázisból</h3>

          <h4>Hiányzó városok</h4>
          {missingLocations.cities.length > 0 ? (
            <ul className="missing-locations-list">
              {missingLocations.cities.map((item, index) => (
                <li key={`city-${index}`} className="missing-item">
                  <div className="location-info">
                    <span className="location-name">{item.city}</span>
                    <span className="location-count">({item.count} hirdetés)</span>
                  </div>
                  <button
                    className="missing-locations-button"
                    onClick={() => handleAddPolygon({ city: item.city })}
                  >
                    Poligon megadása
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nincsenek hiányzó városok.</p>
          )}

          <h4>Hiányzó régiók</h4>
          {missingLocations.regions.length > 0 ? (
            <ul className="missing-locations-list">
              {missingLocations.regions.map((item, index) => (
                <li key={`region-${index}`} className="missing-item">
                  <div className="location-info">
                    <span className="location-name">
                      {item.city} — {item.region}
                    </span>
                    <span className="location-count">({item.count} hirdetés)</span>
                  </div>
                  <button
                    className="missing-locations-button"
                    onClick={() => handleAddPolygon({ city: item.city, region: item.region })}
                  >
                    Poligon megadása
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nincsenek hiányzó régiók.</p>
          )}

          <Modal
            isOpen={isPolygonModalOpen}
            onRequestClose={handlePolygonModalClose}
            style={{
              content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '800px',
                height: 'auto',
                maxHeight: '90vh',
                padding: '20px',
                border: 'none',
                borderRadius: '0',
                background: '#fff',
                overflow: 'auto',
              },
              overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1000,
              },
            }}
          >
            <h3>
              Poligon megadása:{' '}
              {selectedLocation?.city
                ? `${selectedLocation.city} — ${selectedLocation.region || ''}`
                : selectedLocation?.name || 'Ismeretlen hely'}
            </h3>
            <div id="missing-locations-polygon-map" style={{ height: '400px', width: '100%' }}></div>
            <div className="missing-locations-modal-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button className="missing-locations-button" onClick={handleSavePolygon}>
                Mentés
              </button>
              <button
                className="missing-locations-button missing-locations-danger-button"
                onClick={handlePolygonModalClose}
              >
                Bezárás
              </button>
            </div>
            {newPolygon && (
              <div className="missing-locations-polygon-coordinates" style={{ marginTop: '20px' }}>
                <strong>Poligon koordináták:</strong>
                <pre style={{ fontSize: '12px', overflowX: 'auto' }}>{JSON.stringify(newPolygon, null, 2)}</pre>
              </div>
            )}
            {nominatimPolygon && (
              <p className="missing-locations-nominatim-info" style={{ marginTop: '10px', color: '#666' }}>
                Nominatim által javasolt poligon betöltve. Szerkesztheted, törölheted, vagy újat rajzolhatsz.
              </p>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MissingLocations;