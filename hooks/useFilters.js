import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { getFilteredPosts } from '../services/apiService';

// Budapest kerületek tömbje
const budapestDistricts = [
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
  { name: 'Budapest', roman: 'Budapest', value: 'Budapest', alias: ['budapest'], side: 'All' },
  { name: 'Budai oldal', roman: 'Budai oldal', value: 'Budapest, Buda', alias: ['buda', 'budai', 'budai-oldal'], side: 'Buda' },
  { name: 'Pesti oldal', roman: 'Pesti oldal', value: 'Budapest, Pest', alias: ['pest', 'pesti', 'pesti-oldal'], side: 'Pest' },
];

const countyNameMap = {
  'pest-varmegye': 'Pest',
  'hajdu-bihar-varmegye': 'Hajdú-Bihar',
  'gyor-moson-sopron-varmegye': 'Győr-Moson-Sopron',
  'baranya-varmegye': 'Baranya',
  'borsod-abauj-zemplen-varmegye': 'Borsod-Abaúj-Zemplén',
  'szabolcs-szatmar-bereg-varmegye': 'Szabolcs-Szatmár-Bereg',
  'bacs-kiskun-varmegye': 'Bács-Kiskun',
  'bekes-varmegye': 'Békés',
  'csongrad-csanad-varmegye': 'Csongrád-Csanád',
  'fejer-varmegye': 'Fejér',
  'heves-varmegye': 'Heves',
  'komarom-esztergom-varmegye': 'Komárom-Esztergom',
  'nograd-varmegye': 'Nógrád',
  'somogy-varmegye': 'Somogy',
  'tolna-varmegye': 'Tolna',
  'vas-varmegye': 'Vas',
  'veszprem-varmegye': 'Veszprém',
  'zala-varmegye': 'Zala',
  'jasz-nagykun-szolnok-varmegye': 'Jász-Nagykun-Szolnok',
};

const useFilters = (cookiesAccepted = false, enableMapData = true) => {  // Állapotok
  
  const [listingType, setListingType] = useState('eladó');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [type, setType] = useState('Lakás');
  const [minRooms, setMinRooms] = useState('');
  const [maxRooms, setMaxRooms] = useState('');
  const [onlyWithImages, setOnlyWithImages] = useState(false);

  const [totalFloorsMin, setTotalFloorsMin] = useState('');
  const [totalFloorsMax, setTotalFloorsMax] = useState('');

  const [yearBuiltMin, setYearBuiltMin] = useState('');
  const [yearBuiltMax, setYearBuiltMax] = useState('');
  const [condition, setCondition] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [energyClass, setEnergyClass] = useState('');
  const [utilityCostMin, setUtilityCostMin] = useState('');
  const [utilityCostMax, setUtilityCostMax] = useState('');
  const [view, setView] = useState('');
  const [parking, setParking] = useState('');
  const [orientation, setOrientation] = useState('');
  const [comfort, setComfort] = useState({
    electricity: false,
    gas: false,
    water: false,
    internet: false,
    sewer: false,
  });
  const [ceilingHeightMin, setCeilingHeightMin] = useState('');
  const [ceilingHeightMax, setCeilingHeightMax] = useState('');
  const [landAreaMin, setLandAreaMin] = useState('');
  const [landAreaMax, setLandAreaMax] = useState('');
  const [accuracy, setAccuracy] = useState('any');

  const [isNewBuildFilter, setIsNewBuildFilter] = useState(false);
  const [comfortLevel, setComfortLevel] = useState('');

  const [posts, setPosts] = useState([]);
  const [shouldFitMap, setShouldFitMap] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [shouldLogMarkers, setShouldLogMarkers] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [onlyMyPosts, setOnlyMyPosts] = useState(false);

  const cacheRef = useRef(new Map());
  const abortControllerRef = useRef(null);
  const pendingPostsRef = useRef([]);
  const lastFilterHash = useRef('');

  // URL-ből olvasás – onlyMyPosts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('onlyMyPosts') === '1') {
      setOnlyMyPosts(true);
    }
  }, []);

  const formatCountyForBackend = (location) => {
    const normalizedLocation = location.toLowerCase().replace(/[-.\s]/g, '');
    const countyKey = Object.keys(countyNameMap).find(
      (key) =>
        key.toLowerCase().replace(/[-.\s]/g, '') === normalizedLocation ||
        countyNameMap[key].toLowerCase().replace(/[-.\s]/g, '') === normalizedLocation
    );
    if (countyKey) {
      return countyNameMap[countyKey];
    }
    const fallback = location.replace(/-varmegye$/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return fallback;
  };

  const formatLocationForBackend = (location, scope) => {
    if (scope === 'district') {
      if (location === 'Budapest') return 'Budapest';
      if (location === 'Budapest, Buda') return 'Buda';
      if (location === 'Budapest, Pest') return 'Pest';

      const normalizedLocation = location.toLowerCase().replace(/[-.\s]/g, '');
      const district = budapestDistricts.find(
        (d) =>
          d.value.toLowerCase() === location.toLowerCase() ||
          d.roman.toLowerCase().replace(/[-.\s]/g, '') === normalizedLocation ||
          d.name.toLowerCase().replace(/[-.\s]/g, '') === normalizedLocation ||
          d.alias.some((alias) => alias.toLowerCase().replace(/[-.\s]/g, '') === normalizedLocation)
      );
      if (district) return district.value;
      return `Budapest, ${location}`;
    } else if (scope === 'county') {
      return formatCountyForBackend(location);
    }
    return location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, ' ');
  };

  const displayLocationName = (location, scope) => {
    if (scope === 'district') {
      const district = budapestDistricts.find((d) => d.value === location);
      return district ? district.roman : location;
    } else if (scope === 'county') {
      return (
        countyNameMap[location.toLowerCase()] ||
        location.replace(/-varmegye$/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) + ' vármegye'
      );
    }
    return location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, ' ');
  };

  const createFilters = useCallback(() => {
    const orConditions = selectedLocations.reduce((acc, locKey) => {
      const [scope, location] = locKey.split(':');

      if (scope === 'district' && location === 'Budapest') {
        acc.push({ 'address.city': 'Budapest' });
        return acc;
      }

      const formattedLocation = formatLocationForBackend(location, scope);

      if (scope === 'city') {
        acc.push({ 'address.city': formattedLocation });
      } else if (scope === 'district') {
        if (formattedLocation === 'Buda') {
          const budaConditions = budapestDistricts
            .filter((d) => d.side === 'Buda' && d.value !== 'Budapest, Buda')
            .map((d) => ({ 'address.city': d.value }));
          acc.push(...budaConditions);
        } else if (formattedLocation === 'Pest') {
          const pestConditions = budapestDistricts
            .filter((d) => d.side === 'Pest' && d.value !== 'Budapest, Pest')
            .map((d) => ({ 'address.city': d.value }));
          acc.push(...pestConditions);
        } else {
          acc.push({ 'address.city': formattedLocation });
        }
      } else if (scope === 'county') {
        acc.push({ 'address.county': formattedLocation });
      }

      return acc;
    }, []).filter(Boolean);

    const filters = {
      listing_type: listingType || undefined,
      $or: orConditions.length > 0 ? JSON.stringify(orConditions) : undefined,
      ...(listingType === 'eladó' && (minPrice || maxPrice) && {
        price: `${minPrice || ''},${maxPrice || ''}`,
      }),
      ...(listingType === 'kiadó' && (minPrice || maxPrice) && {
        rental_price: `${minPrice || ''},${maxPrice || ''}`,
      }),
      area: areaMin || areaMax ? `${areaMin || ''},${areaMax || ''}` : undefined,
      type: type || undefined,
      rooms: minRooms || maxRooms ? `${minRooms || ''},${maxRooms || ''}` : undefined,
      images: onlyWithImages ? 'true' : undefined,
      total_floors: totalFloorsMin || totalFloorsMax ? `${totalFloorsMin || ''},${totalFloorsMax || ''}` : undefined,
      year_built: yearBuiltMin || yearBuiltMax ? `${yearBuiltMin || ''},${yearBuiltMax || ''}` : undefined,
      condition: condition || undefined,
      heating_type: heatingType || undefined,
      energy_class: energyClass || undefined,
      utility_cost: utilityCostMin || utilityCostMax ? `${utilityCostMin || ''},${utilityCostMax || ''}` : undefined,
      view: view || undefined,
      parking: parking || undefined,
      orientation: orientation || undefined,
      comfort: Object.values(comfort).some((v) => v) ? JSON.stringify(comfort) : undefined,
      ceiling_height: ceilingHeightMin || ceilingHeightMax ? `${ceilingHeightMin || ''},${ceilingHeightMax || ''}` : undefined,
      land_area: landAreaMin || landAreaMax ? `${landAreaMin || ''},${landAreaMax || ''}` : undefined,
      accuracy: accuracy !== 'any' ? accuracy : undefined,
      is_new_build: isNewBuildFilter ? 'true' : undefined,
      comfort_level: comfortLevel || undefined,
    };

    if (onlyMyPosts) {
      filters.onlyMyPosts = 'true';
      delete filters.type;
    }

    const finalFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    );

    return finalFilters;
  }, [
    listingType,
    selectedLocations,
    minPrice,
    maxPrice,
    areaMin,
    areaMax,
    type,
    minRooms,
    maxRooms,
    onlyWithImages,
    totalFloorsMin,
    totalFloorsMax,
    yearBuiltMin,
    yearBuiltMax,
    condition,
    heatingType,
    energyClass,
    utilityCostMin,
    utilityCostMax,
    view,
    parking,
    orientation,
    comfort,
    ceilingHeightMin,
    ceilingHeightMax,
    landAreaMin,
    landAreaMax,
    accuracy,
    isNewBuildFilter,
    comfortLevel,
    onlyMyPosts,
  ]);

const hasAnyFilter = useCallback(() => {
  return (
    selectedLocations.length > 0 ||
    !!minPrice ||
    !!maxPrice ||
    !!areaMin ||
    !!areaMax ||
    !!minRooms ||
    !!maxRooms ||
    !!onlyWithImages ||
    !!totalFloorsMin ||
    !!totalFloorsMax ||
    !!yearBuiltMin ||
    !!yearBuiltMax ||
    !!condition ||
    !!heatingType ||
    !!energyClass ||
    !!utilityCostMin ||
    !!utilityCostMax ||
    !!view ||
    !!parking ||
    !!orientation ||
    Object.values(comfort).some((v) => v) ||
    !!ceilingHeightMin ||
    !!ceilingHeightMax ||
    !!landAreaMin ||
    !!landAreaMax ||
    !!accuracy !== 'any' ||
    !!isNewBuildFilter ||
    !!comfortLevel ||
    !!type    // ← EZT ADD HOZZÁ!
  );
}, [ /* ugyanazok + type */ ]);

  const hasSpecificFilters = useCallback(() => {
    const anyFilter = hasAnyFilter();
    const isDefaultState = listingType === 'eladó' && type === 'Lakás' && !anyFilter && !onlyMyPosts;
    return anyFilter || isDefaultState || onlyMyPosts;
  }, [listingType, type, onlyMyPosts, hasAnyFilter]);

  const logFilterApplied = useCallback(
    debounce(() => {
      if (!cookiesAccepted || !window.gtag) return;

      const filters = createFilters();
      const currentHash = JSON.stringify(filters);
      if (currentHash === lastFilterHash.current) return;
      lastFilterHash.current = currentHash;

      const activeCount = Object.keys(filters).length - (listingType ? 1 : 0);

      window.gtag('event', 'filter_applied', {
        listing_type: listingType,
        property_type: type,
        location_count: selectedLocations.length,
        price_range:
          listingType === 'eladó'
            ? `${minPrice || '0'}-${maxPrice || '∞'}`
            : `${minPrice || '0'}-${maxPrice || '∞'}`,
        area_range: `${areaMin || '0'}-${areaMax || '∞'}`,
        has_images: onlyWithImages,
        is_new_build: isNewBuildFilter,
        total_active_filters: activeCount,
        is_default: !hasAnyFilter() && listingType === 'eladó' && type === 'Lakás',
      });
    }, 1200),
    [
      cookiesAccepted,
      listingType,
      type,
      selectedLocations,
      minPrice,
      maxPrice,
      areaMin,
      areaMax,
      onlyWithImages,
      isNewBuildFilter,
      createFilters,
      hasAnyFilter,
    ]
  );

  useEffect(() => {
    if (!cookiesAccepted || !window.gtag || selectedLocations.length === 0) return;

    const locations = selectedLocations.map((loc) => {
      const [scope, val] = loc.split(':');
      return { scope, value: val };
    });

    window.gtag('event', 'location_selected', {
      location_count: selectedLocations.length,
      most_common: locations[0]?.value || 'none',
      is_budapest: selectedLocations.some((l) => l.includes('Budapest')),
      locations_json: JSON.stringify(locations.slice(0, 5)),
    });
  }, [selectedLocations, cookiesAccepted]);

// 🔥 JAVÍTVA: fetchPosts - jobb abort kezelés
  const fetchPosts = async (filters) => {
    const startTime = Date.now();

    // Előző kérés megszakítása
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {
        // Ignore abort errors
      }
    }

    // Új AbortController
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setIsFiltering(true);
    setPosts([]);
    pendingPostsRef.current = [];
    setShouldFitMap(false);

    try {
      const cacheKey = JSON.stringify({ filters });
      const firstChunkCacheKey = `${cacheKey}:first`;

      // Cache első chunk
      if (cacheRef.current.has(firstChunkCacheKey)) {
        const cachedFirstChunk = cacheRef.current.get(firstChunkCacheKey);
        if (
          cachedFirstChunk?.length > 0 &&
          cachedFirstChunk.every((post) => post._id && post.geolocation?.lat && post.geolocation?.lon)
        ) {
          pendingPostsRef.current = cachedFirstChunk;
          setPosts(cachedFirstChunk);
          setShouldLogMarkers(hasSpecificFilters());
          setShouldFitMap(true);
        } else {
          cacheRef.current.delete(firstChunkCacheKey);
        }
      }

      // Teljes cache
      if (cacheRef.current.has(cacheKey)) {
        const cachedPosts = cacheRef.current.get(cacheKey);
        if (
          cachedPosts?.length > 0 &&
          cachedPosts.every((post) => post._id && post.geolocation?.lat && post.geolocation?.lon)
        ) {
          pendingPostsRef.current = cachedPosts;
          setPosts(cachedPosts);
          setShouldLogMarkers(hasSpecificFilters());
          setIsFiltering(false);
          return cachedPosts;
        } else {
          cacheRef.current.delete(cacheKey);
        }
      }

      console.log(`[useFilters] Stream kérés küldése: ${JSON.stringify(filters)}`);
      const response = await getFilteredPosts(filters, { signal });

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let firstChunkReceived = false;
      let firstChunkCount = 0;
      const maxFirstChunk = 100; // ← itt definiálva!

      while (true) {
        let done, value;
        try {
          ({ done, value } = await reader.read());
        } catch (error) {
          console.error('[useFilters] Stream olvasási hiba:', error);
          throw error;
        }

        if (done) {
          if (buffer.trim()) {
            try {
              let cleanBuffer = buffer.trim();
              if (cleanBuffer.startsWith('[,') || cleanBuffer.startsWith(',')) {
                cleanBuffer = '[' + cleanBuffer.slice(cleanBuffer.indexOf('{'));
              }
              if (!cleanBuffer.endsWith(']')) {
                cleanBuffer += ']';
              }
              console.log('[useFilters] Buffer tartalma (tisztítva):', cleanBuffer);
              const parsedData = JSON.parse(cleanBuffer);
              console.log('[useFilters] Parsolt adat:', parsedData);

              if (!Array.isArray(parsedData)) {
                console.warn('[useFilters] A válasz nem tömb, kihagyva:', parsedData);
                return pendingPostsRef.current;
              }

              const postsArray = parsedData.filter((post) => {
                if (
                  post &&
                  post._id &&
                  post.geolocation &&
                  typeof post.geolocation.lat === 'number' &&
                  typeof post.geolocation.lon === 'number'
                ) {
                  return true;
                } else {
                  console.warn('[useFilters] Érvénytelen poszt, kihagyva:', post?._id || 'ismeretlen');
                  return false;
                }
              });

              if (postsArray.length === 0) {
                console.warn('[useFilters] Nincsenek érvényes posztok a válaszban');
                setPosts([]);
                pendingPostsRef.current = [];
                setTotalRecords(0);
                setShouldFitMap(true);
                return pendingPostsRef.current;
              }

              // Első chunk a végén
              const firstChunk = postsArray.filter((post) => post.chunkId === 1);
              if (firstChunk.length > 0 && !firstChunkReceived) {
                console.log('[useFilters] Első chunk érkezett a végén:', firstChunk.length);
                const uniqueFirstChunk = Array.from(new Map(firstChunk.map((p) => [p._id, p])).values());
                pendingPostsRef.current = uniqueFirstChunk;
                setPosts(uniqueFirstChunk);
                cacheRef.current.set(firstChunkCacheKey, uniqueFirstChunk);
                setShouldLogMarkers(hasSpecificFilters());
                setShouldFitMap(true);
                firstChunkReceived = true;
              }

              // Teljes adathalmaz
              const allPosts = [...pendingPostsRef.current, ...postsArray];
              const uniquePosts = Array.from(new Map(allPosts.map((p) => [p._id, p])).values());
              console.log('[useFilters] Teljes hirdetések száma:', uniquePosts.length);
              pendingPostsRef.current = uniquePosts;
              setPosts(uniquePosts);
              cacheRef.current.set(cacheKey, uniquePosts);
              setTotalRecords(uniquePosts.length);
              setShouldLogMarkers(hasSpecificFilters());

              // GA4 search_executed
              if (cookiesAccepted && window.gtag) {
                const duration = Date.now() - startTime;
                window.gtag('event', 'search_executed', {
                  duration_ms: duration,
                  result_count: uniquePosts.length,
                  cache_hit: cacheRef.current.has(cacheKey),
                  visible_markers: uniquePosts.length,
                  is_empty: uniquePosts.length === 0,
                });
              }

              return uniquePosts;
            } catch (error) {
              console.error('[useFilters] JSON parse hiba:', error.message, 'Buffer:', buffer);
              return pendingPostsRef.current;
            }
          }

          console.log('[useFilters] Stream vége, üres buffer');
          setPosts([]);
          pendingPostsRef.current = [];
          setTotalRecords(0);
          setShouldFitMap(true);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        console.log('[useFilters] Új buffer rész hozzáadva, hossz:', buffer.length);

        // Folyamatos első chunk feldolgozás
        if (!firstChunkReceived && buffer.includes('"chunkId":1')) {
          try {
            const matches = buffer.match(/"chunkId":1/g);
            firstChunkCount = matches ? matches.length : 0;
            console.log('[useFilters] Első chunk rekordok száma:', firstChunkCount);

            if (firstChunkCount >= maxFirstChunk || buffer.includes('"chunkId":0')) {
              let braceCount = 0;
              let inString = false;
              let lastValidEnd = 0;

              for (let i = 0; i < buffer.length; i++) {
                if (buffer[i] === '"' && (i === 0 || buffer[i - 1] !== '\\')) {
                  inString = !inString;
                } else if (!inString && buffer[i] === '{') {
                  braceCount++;
                } else if (!inString && buffer[i] === '}') {
                  braceCount--;
                  if (braceCount === 0) {
                    lastValidEnd = i + 1;
                  }
                }
              }

              if (lastValidEnd > 0 && firstChunkCount >= maxFirstChunk - 2) {
                let firstChunkBuffer = buffer.slice(0, lastValidEnd);
                if (!firstChunkBuffer.startsWith('[')) {
                  firstChunkBuffer = '[' + firstChunkBuffer;
                }
                if (!firstChunkBuffer.endsWith(']')) {
                  firstChunkBuffer += ']';
                }

                try {
                  const firstChunkData = JSON.parse(firstChunkBuffer);
                  if (Array.isArray(firstChunkData)) {
                    const validFirstChunk = firstChunkData.filter((post) => {
                      return (
                        post &&
                        post._id &&
                        post.geolocation &&
                        typeof post.geolocation.lat === 'number' &&
                        typeof post.geolocation.lon === 'number'
                      );
                    });

                    if (validFirstChunk.length > 0) {
                      console.log('[useFilters] Első chunk feldolgozva:', validFirstChunk.length);
                      const uniqueFirstChunk = Array.from(new Map(validFirstChunk.map((p) => [p._id, p])).values());

                      pendingPostsRef.current = uniqueFirstChunk;
                      setPosts(uniqueFirstChunk);
                      cacheRef.current.set(firstChunkCacheKey, uniqueFirstChunk);
                      setShouldLogMarkers(hasSpecificFilters());
                      setShouldFitMap(true);
                      firstChunkReceived = true;

                      buffer = buffer.slice(lastValidEnd);
                      if (buffer.trim().startsWith(',')) buffer = buffer.trim().slice(1);
                      if (!buffer.trim().startsWith('[')) buffer = '[' + buffer.trim();
                      console.log('[useFilters] Buffer frissítve az első chunk után, hossz:', buffer.length);
                    }
                  }
                } catch (error) {
                  console.warn('[useFilters] Első chunk parsolási hiba:', error.message);
                }
              }
            }
          } catch (error) {
            console.warn('[useFilters] Első chunk feldolgozási hiba:', error.message);
          }
        }
      }
       } catch (error) {
      // 🔥 JAVÍTVA: Csak akkor logoljuk, ha nem AbortError
      if (error.name !== 'AbortError') {
        console.error('[useFilters] Hiba a streamelt hirdetések lekérésekor:', error);
        setPosts([]);
        pendingPostsRef.current = [];
        setTotalRecords(0);
        setShouldFitMap(true);
      }
      return pendingPostsRef.current;
    } finally {
      setIsFiltering(false);
    }
  };

    const debouncedFetchPosts = useCallback(debounce(fetchPosts, 1000), []);

  // 🔥 Cleanup - csak akkor abortálunk, ha van aktív kérés
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {
          // Ignore
        }
      }
      debouncedFetchPosts.cancel();
      logFilterApplied.cancel();
    };
  }, [debouncedFetchPosts, logFilterApplied]);



  // 🔥 CSAK akkor töltsük be a térkép adatokat, ha enableMapData true
  useEffect(() => {
    // Ha nincs engedélyezve a térkép adat, ne töltsünk semmit
    if (!enableMapData) {
      setPosts([]);
      pendingPostsRef.current = [];
      setShouldLogMarkers(false);
      cacheRef.current.clear();
      return;
    }
    
    const filters = createFilters();
    logFilterApplied();

    if (hasSpecificFilters()) {
      cacheRef.current.clear();
      debouncedFetchPosts(filters);
    } else {
      setPosts([]);
      pendingPostsRef.current = [];
      setShouldLogMarkers(false);
      cacheRef.current.clear();
    }

    return () => {
      debouncedFetchPosts.cancel();
      logFilterApplied.cancel();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    enableMapData,  // 🔥 ÚJ függőség
    listingType,
    selectedLocations,
    minPrice,
    maxPrice,
    areaMin,
    areaMax,
    type,
    minRooms,
    maxRooms,
    onlyWithImages,
    totalFloorsMin,
    totalFloorsMax,
    yearBuiltMin,
    yearBuiltMax,
    condition,
    heatingType,
    energyClass,
    utilityCostMin,
    utilityCostMax,
    view,
    parking,
    orientation,
    comfort,
    ceilingHeightMin,
    ceilingHeightMax,
    landAreaMin,
    landAreaMax,
    accuracy,
    isNewBuildFilter,
    comfortLevel,
    createFilters,
    hasSpecificFilters,
    logFilterApplied,
    debouncedFetchPosts,
  ]);
  return {
    listingType,
    setListingType,
    selectedLocations,
    setSelectedLocations,
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
    energyClass,
    setEnergyClass,
    utilityCostMin,
    setUtilityCostMin,
    utilityCostMax,
    setUtilityCostMax,
    view,
    setView,
    parking,
    setParking,
    orientation,
    setOrientation,
    comfort,
    setComfort,
    ceilingHeightMin,
    setCeilingHeightMin,
    ceilingHeightMax,
    setCeilingHeightMax,
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
    posts,
    setPosts,
    shouldFitMap,
    setShouldFitMap,
    isFiltering,
    shouldLogMarkers,
    totalRecords,
    hasSpecificFilters,
    displayLocationName,
    createFilters,  // ← EZT ADD HOZZÁ!
  };
};

export default useFilters;