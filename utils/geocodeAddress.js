// geocodeAddress.js (Frontend)

import apiClient from '../services/apiClient';
import { LRUCache } from 'lru-cache';

// Cache inicializálása LRUCache használatával
const cache = new LRUCache({
  max: 500, // Maximum 500 elem tárolása
  ttl: 1000 * 60 * 60, // 1 óra TTL (3600 másodperc)
});

// Ideiglenes cache törlés teszteléshez
cache.clear();
console.log('[geocodeAddress] Cache törölve teszteléshez');

// pLimit inicializálása
let pLimitInstance = null;

const initializePLimit = async () => {
  if (!pLimitInstance) {
    const pLimitModule = await import('p-limit');
    pLimitInstance = pLimitModule.default;
  }
  return pLimitInstance;
};

// Logolás segédfüggvény
const log = (level, message, data = {}) => {
  console[level](`[${new Date().toISOString()}] ${message}`, data);
};

// Segédfüggvények
const getRandomPointInRadius = (lat, lon, minRadius, maxRadius) => {
  const earthRadius = 6371000;
  const randomDistance = minRadius + Math.random() * (maxRadius - minRadius);
  const randomAngle = Math.random() * 2 * Math.PI;
  const deltaLat = (randomDistance * Math.cos(randomAngle)) / earthRadius;
  const deltaLon = (randomDistance * Math.sin(randomAngle)) / (earthRadius * Math.cos((lat * Math.PI) / 180));
  return { lat: lat + (deltaLat * 180) / Math.PI, lon: lon + (deltaLon * 180) / Math.PI };
};

const getRandomPointInPolygon = (polygon) => {
  const coords = Array.isArray(polygon[0][0]) ? polygon[0] : polygon;
  const lons = coords.map((p) => p[0]);
  const lats = coords.map((p) => p[1]);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  const minDistance = 0.001; // Körülbelül 100 méter
  const adjustedMinLon = minLon - minDistance;
  const adjustedMaxLon = maxLon + minDistance;
  const adjustedMinLat = minLat - minDistance;
  const adjustedMaxLat = maxLat + minDistance;

  let randomPoint;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    const lon = adjustedMinLon + Math.random() * (adjustedMaxLon - adjustedMinLon);
    const lat = adjustedMinLat + Math.random() * (adjustedMaxLat - adjustedMinLat);
    randomPoint = [lon, lat];
    attempts++;
  } while (!isPointInPolygon(randomPoint, coords) && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    log('warn', 'Nem sikerült poligonon belüli pontot generálni, középpont használata', { polygon });
    const avgLat = (minLat + maxLat) / 2;
    const avgLon = (minLon + maxLon) / 2;
    return { lat: avgLat, lon: avgLon };
  }

  return { lat: randomPoint[1], lon: randomPoint[0] };
};

const getRandomPointOnStreetLine = (streetLine) => {
  const allPoints = streetLine.flat();
  const randomIndex = Math.floor(Math.random() * allPoints.length);
  return { lat: allPoints[randomIndex][1], lon: allPoints[randomIndex][0] };
};

const isPointInPolygon = (point, polygon) => {
  const [lon, lat] = point;
  let inside = false;
  const coords = Array.isArray(polygon[0][0]) ? polygon[0] : polygon;

  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const xi = coords[i][0], yi = coords[i][1];
    const xj = coords[j][0], yj = coords[j][1];
    const intersect = (yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

const getAreaBoundingBoxAndPolygon = async (areaName, context = 'Magyarország') => {
  const cacheKey = `bbox_${areaName}_${context}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    log('info', `Cache találat bbox-hoz: ${areaName}`);
    return cached;
  }

  try {
    let query = areaName;
    // Ha Budapest kerületről van szó, fordítsd meg a sorrendet
    if (areaName.match(/Budapest,\s*\w+\.\s*kerület/)) {
      const [, city, kerulet] = areaName.match(/(Budapest),\s*(\w+\.\s*kerület)/);
      query = `${kerulet}, ${city}, ${context}`;
    } else {
      query = `${areaName}, ${context}`;
    }

    const response = await apiClient.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1&limit=1&addressdetails=1`,
      { headers: { 'User-Agent': 'ingatlan-terkep/1.0' } }
    );
    if (!response.data.length) {
      log('warn', `Nem található bbox/poligon: ${areaName}`);
      return { bbox: '(47.3,18.9,47.7,19.5)', polygon: null };
    }

    const { boundingbox, geojson } = response.data[0];
    const result = {
      bbox: `(${boundingbox[0]},${boundingbox[2]},${boundingbox[1]},${boundingbox[3]})`,
      polygon: geojson && ['Polygon', 'MultiPolygon'].includes(geojson.type) ? geojson.coordinates : null
    };
    cache.set(cacheKey, result);
    log('info', `Új bbox/poligon tárolva: ${areaName}`, result);
    return result;
  } catch (error) {
    log('error', `Hiba bbox lekérdezésnél (${areaName})`, { error: error.message });
    return { bbox: '(47.3,18.9,47.7,19.5)', polygon: null };
  }
};

const isPointOnWater = async (lat, lon) => {
  const waterQuery = `
    [out:json][timeout:25];
    (
      way["natural"="water"](around:100,${lat},${lon});
      relation["natural"="water"](around:100,${lat},${lon});
    );
    out center;
  `;

  const waterResponse = await apiClient.post('https://overpass-api.de/api/interpreter', waterQuery, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const isWater = waterResponse.data.elements.length > 0;
  if (isWater) {
    log('warn', `Pont vízfelületen található: ${lat}, ${lon}`);
  }
  return isWater;
};

const addSmallOffset = (lat, lon) => {
  const offset = getRandomPointInRadius(lat, lon, 10, 50);
  return { lat: offset.lat, lon: offset.lon };
};

const getRandomPointInResidentialArea = async (cityName) => {
  const cacheKey = `cityPolygon_${cityName}`;
  let cityPolygon = cache.get(cacheKey);

  if (!cityPolygon) {
    const nominatimResponse = await apiClient.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)},Magyarország&format=json&polygon_geojson=1&limit=1&addressdetails=1`,
      { headers: { 'User-Agent': 'ingatlan-terkep/1.0' } }
    );

    if (nominatimResponse.data.length === 0 || !nominatimResponse.data[0].geojson || !['Polygon', 'MultiPolygon'].includes(nominatimResponse.data[0].geojson.type)) {
      log('error', `Nem található a város poligonja: ${cityName}`);
      throw new Error('Nem található a város poligonja');
    }

    cityPolygon = nominatimResponse.data[0].geojson.coordinates;
    if (nominatimResponse.data[0].geojson.type === 'Polygon') {
      cityPolygon = [cityPolygon[0]];
    } else {
      cityPolygon = cityPolygon.map(poly => poly[0]);
    }
    cache.set(cacheKey, cityPolygon);
    log('info', `Új város poligon tárolva: ${cityName}`, { polygon: cityPolygon });
  }

  let attempts = 0;
  let point;
  let isResidential = false;
  let isWater = false;
  const maxAttempts = 100;

  do {
    attempts++;
    point = getRandomPointInPolygon(cityPolygon);

    isWater = await isPointOnWater(point.lat, point.lon);
    if (isWater) continue;

    const residentialQuery = `
      [out:json][timeout:25];
      (
        way["landuse"="residential"](around:200,${point.lat},${point.lon});
        relation["landuse"="residential"](around:200,${point.lat},${point.lon});
      );
      out center;
    `;

    const residentialResponse = await apiClient.post('https://overpass-api.de/api/interpreter', residentialQuery, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    isResidential = residentialResponse.data.elements.length > 0;

    if (attempts > maxAttempts) {
      log('warn', `Túl sok próbálkozás (${attempts}), Nominatim használata: ${cityName}`);
      const nominatimResult = await attemptNominatim(cityName, null);
      if (nominatimResult) {
        const offsetPoint = addSmallOffset(nominatimResult.lat, nominatimResult.lon);
        return { lat: offsetPoint.lat, lon: offsetPoint.lon, radius: 0, area_polygon: cityPolygon };
      }
      return { lat: point.lat, lon: point.lon, radius: 0, area_polygon: cityPolygon };
    }
  } while (!isResidential || isWater);

  log('info', `Lakóövezetben talált pont: ${cityName}`, { lat: point.lat, lon: point.lon });
  return { lat: point.lat, lon: point.lon, radius: 0, area_polygon: cityPolygon };
};

// Utca és házszám szétválasztása (bővített verzió az első kódból)
const parseStreetAndHouseNumber = (street) => {
  if (!street || typeof street !== 'string') {
    return { streetName: null, houseNumber: null };
  }

  // Tisztítjuk a bemenetet: eltávolítjuk a felesleges szóközöket és a pontokat a végén
  const cleanedStreet = street.trim().replace(/\.$/, '');

  // Reguláris kifejezés a házszámok kezelésére:
  // - Szám, opcionálisan betű vagy törtet tartalmazhat (pl. 134/B, 7a, 23)
  // - Lehet szóköz, kötőjel vagy pont előtt (pl. "Villám utca 7", "Villám utca-7", "Villám utca 7.")
  const houseNumberRegex = /\s*([-]?\s*(\d+[a-zA-Z]?\/\d*[a-zA-Z]?|\d+[a-zA-Z]?))\s*$/;
  const match = cleanedStreet.match(houseNumberRegex);

  if (match) {
    // Ha találtunk házszámot, az utcanév a házszám előtti rész
    const houseNumber = match[1].replace(/[-]/g, '').trim();
    const streetName = cleanedStreet.slice(0, cleanedStreet.length - match[0].length).trim();
    return {
      streetName: streetName || null, // Ha üres az utcanév, null-t adunk
      houseNumber
    };
  }

  // Ha nem találtunk házszámot, az egész string az utcanév
  return {
    streetName: cleanedStreet || null,
    houseNumber: null
  };
};

const attemptHereGeocode = async (street, houseNumber, city, district, region) => {
  const cacheKey = `here_${street}_${houseNumber || ''}_${city}_${district || ''}_${region || ''}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    log('info', `Cache találat HERE-hoz: ${street} ${houseNumber || ''}, ${city}`);
    return cached;
  }

  try {
    let queryParams = new URLSearchParams({
      street,
      city,
      houseNumber: houseNumber || '',
      district: district || '',
      region: region || '',
    });

    const response = await apiClient.get(`/posts/geolocation/here-geocode?${queryParams.toString()}`);

    if (!response.data.success || !response.data.data) {
      log('warn', `Nem található HERE eredmény: ${street} ${houseNumber || ''}, ${city}`);
      return null;
    }

    const result = {
      lat: response.data.data.lat,
      lon: response.data.data.lon,
      street_line: null,
      area_polygon: null,
    };

    cache.set(cacheKey, result);
    log('info', `Új HERE eredmény tárolva: ${street} ${houseNumber || ''}, ${city}`, result);
    return result;
  } catch (error) {
    log('error', `Hiba HERE geokódolásnál (${street} ${houseNumber || ''}, ${city})`, { error: error.message });
    return null;
  }
};

const fetchPolygonFromBackend = async (city, region) => {
  const cacheKey = `polygon_${city}_${region || ''}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    log('info', `Cache találat poligonhoz: ${city}, ${region || ''}`);
    return cached;
  }

  try {
    const response = await apiClient.get('/posts/geolocation/getPolygonData', {
      params: { city, region },
    });

    if (!response.data.success) {
      log('warn', `Nem található poligon a backendben: ${city}, ${region || ''}`);
      return null;
    }

    const result = response.data.data;
    cache.set(cacheKey, result);
    log('info', `Új poligon tárolva: ${city}, ${region || ''}`, result);
    return result;
  } catch (error) {
    log('error', `Hiba a backend poligon lekérdezésnél: ${city}, ${region || ''}`, { error: error.message });
    return null;
  }
};

const fetchStreetLineFromOverpass = async (streetName, city, district, region, fallbackName = null) => {
  const streetSuffixes = ['', 'utca', 'út', 'tér', 'dűlő'];
  const resultsWithLine = [];
  const resultsWithPoint = [];

  const tryWithName = async (currentStreetName) => {
    const cacheKey = `street_${currentStreetName}_${city}_${district || ''}_${region || ''}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      log('info', `Cache találat utcához: ${currentStreetName}`);
      if (cached.street_line) {
        resultsWithLine.push(cached);
      } else {
        resultsWithPoint.push(cached);
      }
      return true;
    }

    try {
      const { bbox, polygon: cityPolygon } = await getAreaBoundingBoxAndPolygon(city);
      const districtPolygon = district && district !== 'Nincs megadva' ? (await getAreaBoundingBoxAndPolygon(district, city)).polygon : null;
      const regionPolygon = region && region !== 'Nincs megadva' ? (await getAreaBoundingBoxAndPolygon(region, city)).polygon : null;

      // Javított lekérdezés
      const query = `[out:json][timeout:25];(way["name"="${currentStreetName}"]${bbox};);out geom;`;
      const response = await apiClient.post('https://overpass-api.de/api/interpreter', query, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const ways = response.data.elements.filter(e => e.type === 'way' && e.geometry);
      if (!ways.length) {
        log('warn', `Nem található utca: ${currentStreetName}`);
        return false;
      }

      let filteredWays = ways.filter(way => {
        const midPoint = way.geometry[Math.floor(way.geometry.length / 2)];
        return (!cityPolygon || isPointInPolygon([midPoint.lon, midPoint.lat], cityPolygon)) &&
               (!districtPolygon || isPointInPolygon([midPoint.lon, midPoint.lat], districtPolygon)) &&
               (!regionPolygon || isPointInPolygon([midPoint.lon, midPoint.lat], regionPolygon));
      });

      if (!filteredWays.length) {
        log('warn', `Nem található megfelelő utca a poligonban: ${currentStreetName}`);
        return false;
      }

      const streetLines = filteredWays.map(way => way.geometry.map(point => [point.lon, point.lat]));
      const randomPoint = getRandomPointOnStreetLine(streetLines);
      const result = { lat: randomPoint.lat, lon: randomPoint.lon, street_line: streetLines, area_polygon: null };
      cache.set(cacheKey, result);
      resultsWithLine.push(result);
      log('info', `Új utca tárolva vonallal: ${currentStreetName}`, result);
      return true;
    } catch (error) {
      log('error', `Hiba Overpass streetnél (${currentStreetName})`, { error: error.message });
      return false;
    }
  };

  for (const suffix of streetSuffixes) {
    const currentStreetName = suffix ? `${streetName} ${suffix}` : streetName;
    if (await tryWithName(currentStreetName)) {
      break;
    }
  }

  if (resultsWithLine.length === 0 && resultsWithPoint.length === 0 && fallbackName && fallbackName !== streetName) {
    log('info', `Újrapróbálkozás Overpass-szal a Nominatim által javasolt névvel: ${fallbackName}`);
    for (const suffix of streetSuffixes) {
      const currentStreetName = suffix ? `${fallbackName} ${suffix}` : fallbackName;
      if (await tryWithName(currentStreetName)) {
        break;
      }
    }
  }

  if (resultsWithLine.length > 0) {
    const selectedResult = resultsWithLine[0];
    log('info', `Vonalas találat kiválasztva: ${streetName}`, selectedResult);
    return selectedResult;
  }

  if (resultsWithPoint.length > 0) {
    const selectedResult = resultsWithPoint[0];
    log('info', `Pont találat kiválasztva: ${streetName}`, selectedResult);
    return selectedResult;
  }

  log('warn', `Nem található utca egyetlen végződéssel sem: ${streetName}${fallbackName ? ` (fallback: ${fallbackName})` : ''}`);
  return null;
};

const attemptNominatim = async (q, city, preferPolygon = false) => {
  const cacheKey = `nominatim_${q}_${city || ''}_${preferPolygon}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    log('info', `Cache találat Nominatimhoz: ${q}`);
    return cached;
  }

  try {
    let query = city ? `${q}, ${city}, Magyarország` : `${q}, Magyarország`;
    log('info', `Nominatim lekérdezés: ${query}`);
    let response = await apiClient.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1&limit=1&addressdetails=1`,
      { headers: { 'User-Agent': 'ingatlan-terkep/1.0' } }
    );

    // Ha nem talált eredményt, próbálkozzunk egyszerűbb lekérdezéssel
    if (!response.data.length && city) {
      query = `${q}, Budapest, Magyarország`;
      log('info', `Nominatim újrapróbálkozás egyszerűbb lekérdezéssel: ${query}`);
      response = await apiClient.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1&limit=1&addressdetails=1`,
        { headers: { 'User-Agent': 'ingatlan-terkep/1.0' } }
      );
    }

    if (!response.data.length) {
      log('warn', `Nem található Nominatim eredmény: ${q}`);
      return null;
    }

    const { lat, lon, geojson, address } = response.data[0];
    const area_polygon = geojson && ['Polygon', 'MultiPolygon'].includes(geojson.type) ? geojson.coordinates : null;
    const suggestedName = address.road || address.suburb || address.neighbourhood || address.village || q;

    // Ha van poligon és preferPolygon igaz, használjuk a poligonból generált pontot
    if (preferPolygon && area_polygon) {
      const randomPoint = getRandomPointInPolygon(area_polygon);
      log('info', `Régió poligonból generált pont: ${q}`, { lat: randomPoint.lat, lon: randomPoint.lon });
      const result = {
        lat: randomPoint.lat,
        lon: randomPoint.lon,
        street_line: null,
        area_polygon,
        suggestedName
      };
      cache.set(cacheKey, result);
      return result;
    }

    // Ellenőrizzük, hogy a pont a város poligonján belül van-e
    if (city) {
      const { polygon: cityPolygon } = await getAreaBoundingBoxAndPolygon(city, 'Magyarország');
      if (cityPolygon) {
        const point = [parseFloat(lon), parseFloat(lat)];
        if (!isPointInPolygon(point, cityPolygon)) {
          log('warn', `Nominatim eredmény nem esik a város poligonjába, de poligon használata: ${q}, ${city}`, { lat, lon });
          // Ha van poligon, használjuk azt
          if (area_polygon) {
            const randomPoint = getRandomPointInPolygon(area_polygon);
            log('info', `Régió poligonból generált pont: ${q}`, { lat: randomPoint.lat, lon: randomPoint.lon });
            const result = {
              lat: randomPoint.lat,
              lon: randomPoint.lon,
              street_line: null,
              area_polygon,
              suggestedName
            };
            cache.set(cacheKey, result);
            return result;
          }
          // Ha nincs poligon, elutasítjuk az eredményt
          log('warn', `Nominatim eredmény elutasítva, nincs poligon: ${q}, ${city}`, { lat, lon });
          return null;
        }
      } else {
        log('warn', `Nem sikerült lekérni a város poligonját: ${city}, kihagyjuk a poligon ellenőrzést`);
      }
    }

    // Ha nincs poligon vagy nem preferáljuk, használjuk a Nominatim koordinátákat
    const result = {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      street_line: null,
      area_polygon: null,
      suggestedName
    };

    cache.set(cacheKey, result);
    log('info', `Új Nominatim eredmény tárolva: ${q}`, { ...result, suggestedName });
    return result;
  } catch (error) {
    log('error', `Hiba Nominatimnál (${q})`, { error: error.message });
    return null;
  }
};

const geocodeAddress = async (address) => {
  let { city, district, region, street, house_number } = address;

  log('info', 'Geocoding kezdése', { address });

  // 1. Utca keresése (legmagasabb prioritás)
  if (street && street !== 'Nincs megadva' && city && city !== 'Nincs megadva') {
    const { streetName: cleanedStreet, houseNumber } = parseStreetAndHouseNumber(street);
    log('info', `Tisztított utcanév: ${cleanedStreet || 'nincs'}, házszám: ${houseNumber || 'nincs'}`, { original: street });

    // 1.1. HERE API próbálkozás
    if (houseNumber) {
      if (!cleanedStreet && region && region !== 'Nincs megadva') {
        log('info', `Csak házszám található, régió használata utcanévként: ${region}`);
        const hereResult = await attemptHereGeocode(region, houseNumber, city, null, null);
        if (hereResult) {
          log('info', `Házszám megtalálva HERE API-val (régió mint utca): ${region} ${houseNumber}, ${city}`, {
            lat: hereResult.lat,
            lon: hereResult.lon
          });
          return {
            lat: hereResult.lat,
            lon: hereResult.lon,
            radius: 0,
            street_line: null,
            area_polygon: null
          };
        }
        log('warn', `Nem található HERE eredmény régióval mint utcával: ${region} ${houseNumber}, ${city}`);
      }

      if (cleanedStreet) {
        const hereResult = await attemptHereGeocode(cleanedStreet, houseNumber, city, null, region);
        if (hereResult) {
          log('info', `Házszám megtalálva HERE API-val: ${cleanedStreet} ${houseNumber}, ${city}`, {
            lat: hereResult.lat,
            lon: hereResult.lon
          });
          return {
            lat: hereResult.lat,
            lon: hereResult.lon,
            radius: 0,
            street_line: null,
            area_polygon: null
          };
        }
      }
    }

    if (cleanedStreet) {
      let streetResult = await fetchStreetLineFromOverpass(cleanedStreet, city, null, region);
      if (streetResult && streetResult.street_line) {
        const randomPoint = getRandomPointOnStreetLine(streetResult.street_line);
        const offsetPoint = addSmallOffset(randomPoint.lat, randomPoint.lon);
        log('info', `Utca megtalálva Overpass API-val: ${cleanedStreet}`, { lat: offsetPoint.lat, lon: offsetPoint.lon });
        return {
          lat: offsetPoint.lat,
          lon: offsetPoint.lon,
          radius: 0,
          street_line: streetResult.street_line,
          area_polygon: null
        };
      }

      const nominatimResult = await attemptNominatim(cleanedStreet, city);
      if (nominatimResult) {
        if (nominatimResult.suggestedName && nominatimResult.suggestedName !== cleanedStreet) {
          log('info', `Újrapróbálkozás Overpass-szal Nominatim javasolt névvel: ${nominatimResult.suggestedName}`);
          streetResult = await fetchStreetLineFromOverpass(nominatimResult.suggestedName, city, null, region);
          if (streetResult && streetResult.street_line) {
            const randomPoint = getRandomPointOnStreetLine(streetResult.street_line);
            const offsetPoint = addSmallOffset(randomPoint.lat, randomPoint.lon);
            log('info', `Utca megtalálva Overpass API-val (Nominatim javasolt névvel): ${nominatimResult.suggestedName}`, {
              lat: offsetPoint.lat,
              lon: offsetPoint.lon
            });
            return {
              lat: offsetPoint.lat,
              lon: offsetPoint.lon,
              radius: 0,
              street_line: streetResult.street_line,
              area_polygon: null
            };
          }
        }

        const randomPoint = getRandomPointInRadius(nominatimResult.lat, nominatimResult.lon, 10, 100);
        const offsetPoint = addSmallOffset(randomPoint.lat, randomPoint.lon);
        log('info', `Utca Nominatimmal (nincs utcavonal): ${cleanedStreet}`, { lat: offsetPoint.lat, lon: offsetPoint.lon });
        return {
          lat: offsetPoint.lat,
          lon: offsetPoint.lon,
          radius: 100,
          street_line: null,
          area_polygon: nominatimResult.area_polygon
        };
      }
    }
  }

  // 2. Poligonok lekérdezése (régió, város)
  if (city && city !== 'Nincs megadva') {
    const polygonData = await fetchPolygonFromBackend(city, region);

    // 2.1. Régió keresése
    if (region && region !== 'Nincs megadva') {
      // 2.1.1. Backend keresés
      if (polygonData?.regionPolygon) {
        const randomPoint = getRandomPointInPolygon(polygonData.regionPolygon);
        log('info', `Régió megtalálva a backendben: ${region}`, { lat: randomPoint.lat, lon: randomPoint.lon });
        // Ellenőrizzük, hogy a pont valóban a régió poligonjában van-e
        if (!isPointInPolygon([randomPoint.lon, randomPoint.lat], polygonData.regionPolygon)) {
          log('error', `Generált pont nem a régió poligonjában: ${region}`, { lat: randomPoint.lat, lon: randomPoint.lon });
          // Próbáljunk újra
          const retryPoint = getRandomPointInPolygon(polygonData.regionPolygon);
          log('info', `Újrapróbálkozás régió ponttal: ${region}`, { lat: retryPoint.lat, lon: retryPoint.lon });
          return {
            lat: retryPoint.lat,
            lon: retryPoint.lon,
            radius: 0,
            street_line: null,
            area_polygon: polygonData.regionPolygon
          };
        }
        return {
          lat: randomPoint.lat,
          lon: randomPoint.lon,
          radius: 0,
          street_line: null,
          area_polygon: polygonData.regionPolygon
        };
      }

      // 2.1.2. Nominatim/Overpass keresés, ha a backend nem találja
      const nominatimResult = await attemptNominatim(region, city, true);
      if (nominatimResult?.area_polygon) {
        const randomPoint = getRandomPointInPolygon(nominatimResult.area_polygon);
        log('info', `Régió megtalálva Nominatimmal (poligon): ${region}`, { lat: randomPoint.lat, lon: randomPoint.lon });
        return {
          lat: randomPoint.lat,
          lon: randomPoint.lon,
          radius: 0,
          street_line: null,
          area_polygon: nominatimResult.area_polygon
        };
      }
      if (nominatimResult) {
        const randomPoint = getRandomPointInRadius(nominatimResult.lat, nominatimResult.lon, 10, 750);
        const offsetPoint = addSmallOffset(randomPoint.lat, randomPoint.lon);
        log('info', `Régió megtalálva Nominatimmal: ${region}`, { lat: offsetPoint.lat, lon: offsetPoint.lon });
        return {
          lat: offsetPoint.lat,
          lon: offsetPoint.lon,
          radius: 750,
          street_line: null,
          area_polygon: null
        };
      }
      log('warn', `Régió nem található sem a backendben, sem Nominatimmal: ${region}`);
    }

    // 2.2. Város keresése (csak ha nincs régió vagy a régió nem található)
    if (polygonData?.cityPolygon) {
      const randomPoint = getRandomPointInPolygon(polygonData.cityPolygon);
      log('info', `Város megtalálva a backendben: ${city}`, { lat: randomPoint.lat, lon: randomPoint.lon });
      return {
        lat: randomPoint.lat,
        lon: randomPoint.lon,
        radius: 0,
        street_line: null,
        area_polygon: polygonData.cityPolygon
      };
    }

    // 2.3. Város lakóövezetben (Nominatim/Overpass)
    try {
      const residentialPoint = await getRandomPointInResidentialArea(city);
      if (residentialPoint) {
        log('info', `Város lakóövezetben: ${city}`, { lat: residentialPoint.lat, lon: residentialPoint.lon });
        return { ...residentialPoint, street_line: null };
      }
    } catch (error) {
      log('error', `Nem sikerült lakóövezetben pontot generálni: ${city}`, { error: error.message });
    }

    // 2.4. Nominatim visszaesés városra
    const nominatimResult = await attemptNominatim(city, null, true);
    if (nominatimResult?.area_polygon) {
      const randomPoint = getRandomPointInPolygon(nominatimResult.area_polygon);
      log('info', `Város Nominatimmal (poligon): ${city}`, { lat: randomPoint.lat, lon: randomPoint.lon });
      return {
        lat: randomPoint.lat,
        lon: randomPoint.lon,
        radius: 0,
        street_line: null,
        area_polygon: nominatimResult.area_polygon
      };
    }
    if (nominatimResult) {
      const randomPoint = getRandomPointInRadius(nominatimResult.lat, nominatimResult.lon, 10, 1000);
      const offsetPoint = addSmallOffset(randomPoint.lat, randomPoint.lon);
      log('info', `Város Nominatimmal: ${city}`, { lat: offsetPoint.lat, lon: offsetPoint.lon });
      return {
        lat: offsetPoint.lat,
        lon: offsetPoint.lon,
        radius: 1000,
        street_line: null,
        area_polygon: null
      };
    }
  }

  log('warn', 'Nem sikerült geocodolni a címet', { address });
  return { lat: null, lon: null, radius: 100, street_line: null, area_polygon: null };
};

const geocodeAddresses = async (addresses) => {
  const pLimit = await initializePLimit();
  if (!pLimit) {
    log('error', 'Nem sikerült inicializálni a pLimit-et');
    throw new Error('Nem sikerült inicializálni a pLimit-et');
  }

  const limit = pLimit(2);
  if (!limit) {
    log('error', 'Nem sikerült létrehozni a limit változót');
    throw new Error('Nem sikerült létrehozni a limit változót');
  }

  log('info', `Geocoding ${addresses.length} cím kezdése`);
  const startTime = Date.now();
  const results = await Promise.all(addresses.map(address => limit(() => geocodeAddress(address))));
  const endTime = Date.now();
  log('info', `Geocoding ${addresses.length} cím befejezve`, { duration: (endTime - startTime) / 1000 + 's' });
  return results;
};

export { geocodeAddress, geocodeAddresses };