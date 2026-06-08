import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LayerControl from './LayerControl';
import { renderTransportLayer } from './layers/transportLayer';
import { renderReligionLayer } from './layers/religionLayer';
import { renderHealthLayer } from './layers/healthLayer';
import { renderEducationLayer } from './layers/educationLayer';
import { renderSatelliteLayer } from './layers/satelliteLayer';
import { renderCrimeHeatLayer } from './layers/crimeHeatLayer';  // ← named export
import { renderShopLayer } from './layers/shopLayer';
import { renderOutdoorLayer } from './layers/outdoorLayer';
import { renderSportLayer } from './layers/sportLayer';
import { renderBankLayer } from './layers/bankLayer';
import MarkerComponent from './MarkerComponent';
import { logMarkerViews } from '../services/statsService';
import { getPostGeometry } from '../services/apiService';
import { debounce, isEqual } from 'lodash';
import '../styles/MapComponent.css';
import { renderBasicLayer } from './layers/basicLayer';
import LayerPanel from './LayerPanel';
import pegmanIconUrl from 'leaflet/dist/images/marker-icon.png';

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';




const geometryCache = new Map();

const loadGeometry = async (postId) => {
  if (geometryCache.has(postId)) {
    const cachedData = geometryCache.get(postId);
    if (cachedData.area_polygon?.length || cachedData.street_line?.length || cachedData.radius) {
      console.log(`[loadGeometry] Cache hit for postId ${postId}:`, cachedData);
      return cachedData;
    }
    geometryCache.delete(postId);
  }

  try {
    const geometryResponse = await getPostGeometry(postId);
    const newGeometryData = {
      radius: geometryResponse.data?.radius || 0,
      street_line: Array.isArray(geometryResponse.data?.street_line) ? geometryResponse.data.street_line : [],
      area_polygon: Array.isArray(geometryResponse.data?.area_polygon) ? geometryResponse.data.area_polygon : [],
    };

    console.log(`[loadGeometry] API response for postId ${postId}:`, newGeometryData);

    if (!newGeometryData.area_polygon.length && !newGeometryData.street_line.length && !newGeometryData.radius) {
      geometryCache.delete(postId);
      console.log(`[loadGeometry] No valid geometry for postId ${postId}, returning null`);
      return null;
    }

    geometryCache.set(postId, newGeometryData);
    return newGeometryData;
  } catch (error) {
    console.error(`[loadGeometry] Error fetching geometry for postId ${postId}:`, error);
    geometryCache.delete(postId);
    return null;
  }
};

const MapComponent = React.forwardRef(
  ({
    posts,
    listingType,
    selectedPost,
    fetchPostDetails,
    getFullImageUrl,
    createCustomIcon,
    baseLayerOpacity,
    overlayLayerOpacity,
    setBaseLayerOpacity,
    setOverlayLayerOpacity,
    shouldFitMap,
    setShouldFitMap,
    layers,
    setLayers,
    zoom,        // ← ezt átveszed a HomePage-ből
    setZoom,     // ← ezt is    hasSpecificFilters,
    hasSpecificFilters,
    isFiltering,
    shouldLogMarkers,
    setSelectedPost,
    isAdmin,
    updatePost,
    deletePost,
    setPosts,
    cookiesAccepted,
    showFilterSidebar,
    activeSecondaryPanel,
    setActiveSecondaryPanel,
    isLoggedIn,
    onLogout,
    sidebarWidth,
    viewedPosts,  // ← ezt add hozzá!
    isMobile,
    isStreetViewMode,
  setIsStreetViewMode,
  showDealColors,
  }, ref) => {
console.log('[MapComponent] Komponens renderelése elkezdődött', {
  posts: posts.map(p => ({
    id: p._id,
    geolocation: p.geolocation,
    price: p.price,
    listing_type: p.listing_type,
    type: p.type
  })),
});

    // 🔥 ÚJ: posts-ból city kinyerés
    const getCurrentCity = useCallback(() => {
      if (!posts || posts.length === 0) return null;
      const firstPost = posts[0];
      return firstPost?.address?.city?.toLowerCase();
    }, [posts]);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [layerData, setLayerData] = useState({
      transport: [],
      religion: [],
      health: [],
      education: [],
      satellite: [],
      shop: [],
      outdoor: [],
      sport: [],
      bank: [],
      crimeHeat: []
    });
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [activeMarkerId, setActiveMarkerId] = useState(null);
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
    const [geometryData, setGeometryData] = useState(null);
    const [hoveredGeometryData, setHoveredGeometryData] = useState(null);
    const [mapBounds, setMapBounds] = useState(
      L.latLngBounds(
        L.latLng(44.637, 14.913),
        L.latLng(49.685, 24.097)
      )
    );
    const geometryLayerRef = useRef(null);
    const isMounted = useRef(true);
    const lastLoggedHash = useRef(null);
    const isUpdating = useRef(false);
    const mapRef = useRef(null);
    const isHoveringRef = useRef(false);
const abortControllerRef = useRef(null);
const realHoverActiveRef = useRef(false);



    const hungaryBounds = L.latLngBounds(
        L.latLng(44.637, 14.913),
        L.latLng(49.685, 24.097)
    );

    const cityZoomLevels = {
      budapest: { center: [47.4979, 19.0402], zoom: 12 },
      debrecen: { center: [47.5316, 21.6273], zoom: 12 },
      szentendre: { center: [47.6694, 19.0756], zoom: 13 },
      győr: { center: [47.6875, 17.6504], zoom: 12 },
    };



// 🔥 GA4: Map interakció (zoom vagy pan után, debounce-oltan)
const handleMapInteraction = useCallback(
  debounce(() => {
    if (!cookiesAccepted || !window.gtag || !mapRef.current) return;

    const zoomLevel = mapRef.current.getZoom();
    const visibleMarkers = visiblePosts.length;
    const activeLayers = Object.keys(layers)
      .filter((key) => layers[key])
      .join(',');

    window.gtag('event', 'map_interaction', {
      zoom_level: Math.round(zoomLevel),
      visible_markers_count: visibleMarkers,
      active_layers: activeLayers || 'none',
    });
  }, 1500),
  [cookiesAccepted, visiblePosts.length, layers]
);

// MapComponent.js - EZT CSERÉLD KI!

const lastBboxRef = useRef('');
const fetchControllerRef = useRef(null);

// Stabil fetchLayerData useCallback-al
const fetchLayerData = useCallback(async (layerName, bbox) => {
  if (!layers[layerName]) return;
  
  // UGYANAZ A BBOX → NE SPAMOLJON!
  if (bbox === lastBboxRef.current) return;
  lastBboxRef.current = bbox;
  
  // Előző kérés megszakítása
  if (fetchControllerRef.current) {
    fetchControllerRef.current.abort();
  }
  fetchControllerRef.current = new AbortController();
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/markers?layer=${layerName}&bbox=${bbox}`,
      { signal: fetchControllerRef.current.signal }
    );
    // ... rest of the code
  } catch (err) {
    if (err.name !== 'AbortError') console.error(err);
  }
}, [layers]);

// FŐ USEFFECT - JAVÍTOTT VERZIÓ
useEffect(() => {
  const map = mapRef.current;
  if (!map) return;

  // Csak egyszer fusson a komponens életciklusa alatt
  let isFirstRun = true;
  let timeoutId;

  const fetchAllLayers = () => {
    const currentZoom = Math.floor(map.getZoom());
    const bbox = map.getBounds().toBBoxString();
    
    const layersToFetch = ['health', 'shop', 'outdoor', 'sport', 'bank'];
    
    layersToFetch.forEach(layerName => {
      if (!layers[layerName]) return;
      
      // Zoom limit
      if (currentZoom < 13 && ['shop', 'health', 'outdoor', 'bank'].includes(layerName)) return;
      
      fetchLayerData(layerName, bbox);
    });
  };

  // Debounce a moveend/zoomend eseményekre
  const debouncedFetch = debounce(fetchAllLayers, 600);
  
  map.on('moveend', debouncedFetch);
  map.on('zoomend', debouncedFetch);
  
  // Első fetch - csak egyszer
  if (isFirstRun) {
    isFirstRun = false;
    timeoutId = setTimeout(fetchAllLayers, 500);
  }
  
  return () => {
    map.off('moveend', debouncedFetch);
    map.off('zoomend', debouncedFetch);
    debouncedFetch.cancel();
    if (timeoutId) clearTimeout(timeoutId);
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort();
    }
  };
}, []); // <- ÜRES FÜGGŐSÉGI TÖMB! Csak egyszer fusson!
useEffect(() => {
  if (!cookiesAccepted || !window.gtag) return;

  window.gtag('event', 'street_view_mode', {
    mode: isStreetViewMode ? 'activated' : 'deactivated',
  });
}, [isStreetViewMode, cookiesAccepted]);

    const clearGeometryLayer = useCallback(() => {
      const map = mapRef.current;
      if (geometryLayerRef.current && map) {
        map.removeLayer(geometryLayerRef.current);
        geometryLayerRef.current = null;
        console.log('[clearGeometryLayer] Geometry layer cleared');
      }
    }, []);

    const renderGeometryLayer = useCallback(
      (post, geometry) => {
        const map = mapRef.current;
        if (!map || !geometry || !post) {
          console.log('[renderGeometryLayer] Aborted: Missing map, geometry, or post', { map, post, geometry });
          return;
        }

        const zoomLevel = map.getZoom();
        clearGeometryLayer();

        const layerGroup = L.layerGroup();

        if (Array.isArray(geometry.street_line) && geometry.street_line.length > 0) {
          geometry.street_line.forEach((segment, index) => {
            if (Array.isArray(segment) && segment.length > 0) {
              const validSegment = segment
                .filter((coord) => Array.isArray(coord) && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1]))
                .map((coord) => {
                  const lat = coord[1];
                  const lon = coord[0];
                  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
                    console.log(`[renderGeometryLayer] Invalid coordinate in street_line[${index}]:`, coord);
                    return null;
                  }
                  return [lat, lon];
                })
                .filter((coord) => coord !== null);
              if (validSegment.length > 0) {
                const polyline = L.polyline(validSegment, {
                  color: 'rgb(255, 102, 0)',
                  weight: Math.max(2, Math.min(5, zoomLevel / 3)),
                  opacity: 0.6,
                });
                layerGroup.addLayer(polyline);
                console.log(`[renderGeometryLayer] Added polyline for street_line[${index}] with ${validSegment.length} coords`);
              } else {
                console.log(`[renderGeometryLayer] No valid coordinates for street_line[${index}]`);
              }
            }
          });
        }

        if (Array.isArray(geometry.area_polygon) && geometry.area_polygon.length > 0) {
          const polygonCoords = geometry.area_polygon[0];
          if (Array.isArray(polygonCoords) && polygonCoords.length > 0) {
            const validCoords = polygonCoords
              .filter((coord) => Array.isArray(coord) && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1]))
              .map((coord) => {
                const lat = coord[1];
                const lon = coord[0];
                if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
                  console.log('[renderGeometryLayer] Invalid coordinate in area_polygon:', coord);
                  return null;
                }
                return [lat, lon];
              })
              .filter((coord) => coord !== null);
            if (validCoords.length > 0) {
              const polygon = L.polygon(validCoords, {
                color: 'purple',
                weight: Math.max(1, Math.min(4, zoomLevel / 4)),
                opacity: 0.6,
                fillOpacity: 0.3,
              });
              layerGroup.addLayer(polygon);
              console.log(`[renderGeometryLayer] Added polygon with ${validCoords.length} coords`);
            } else {
              console.log('[renderGeometryLayer] No valid coordinates for area_polygon');
            }
          } else {
            console.log('[renderGeometryLayer] Invalid or empty area_polygon[0]');
          }
        }

        if (
          geometry.radius > 0 &&
          post.geolocation?.lat &&
          post.geolocation?.lon &&
          geometry.street_line.length === 0 &&
          geometry.area_polygon.length === 0
        ) {
          const circle = L.circle([post.geolocation.lat, post.geolocation.lon], {
            radius: geometry.radius,
            color: 'green',
            weight: Math.max(1, Math.min(4, zoomLevel / 4)),
            opacity: 0.6,
            fillOpacity: 0.2,
          });
          layerGroup.addLayer(circle);
          console.log(`[renderGeometryLayer] Added circle with radius ${geometry.radius} at [${post.geolocation.lat}, ${post.geolocation.lon}]`);
        }

        if (layerGroup.getLayers().length > 0) {
          layerGroup.addTo(map);
          geometryLayerRef.current = layerGroup;
          console.log('[renderGeometryLayer] Layer group added to map with', layerGroup.getLayers().length, 'layers');
        } else {
          console.log('[renderGeometryLayer] No layers to add to map');
        }
      },
      [clearGeometryLayer]
    );






        // MapComponent belül, a props után
useEffect(() => {
  if (selectedPost?._id) {
    // Amikor van kiválasztott hirdetés a sidebarban → aktiváljuk a markert
    setActiveMarkerId(selectedPost._id);
    setHoveredMarkerId(null); // hover ne írja felül
    setHoveredGeometryData(null);

    // Geometria betöltése és megjelenítése
    loadGeometry(selectedPost._id).then((geometry) => {
      if (geometry && mapRef.current) {
        setGeometryData(geometry);
        const post = posts.find(p => p._id === selectedPost._id);
        if (post) {
          renderGeometryLayer(post, geometry);
        }
      }
    });
  } else {
    // Sidebar bezárva → mindent törlünk
    setActiveMarkerId(null);
    setGeometryData(null);
    clearGeometryLayer();
  }
}, [selectedPost?._id, posts, renderGeometryLayer, clearGeometryLayer]);

    useEffect(() => {
      if (!mapRef.current) return;

      const post = posts.find((p) => p._id === (hoveredMarkerId || activeMarkerId));
      const geometry = hoveredMarkerId ? hoveredGeometryData : geometryData;

      if (!post || !geometry || (!hoveredMarkerId && !activeMarkerId)) {
        console.log('[useEffect] Skipping geometry render: no post or geometry', { post, geometry, hoveredMarkerId, activeMarkerId });
        return;
      }

      const map = mapRef.current;
      const debouncedRenderGeometry = debounce(() => {
        if ((hoveredMarkerId && hoveredGeometryData) || (activeMarkerId && geometryData)) {
          console.log(`[useEffect] Zoom/move end, re-rendering geometry for markerId: ${hoveredMarkerId || activeMarkerId}`);
          renderGeometryLayer(post, geometry);
        }
      }, 100);

      const handleZoomEnd = () => {
        console.log('[handleZoomEnd] Zoom changed, triggering geometry render');
        debouncedRenderGeometry();
      };

      const handleMoveEnd = () => {
        console.log('[handleMoveEnd] Map moved, triggering geometry render');
        debouncedRenderGeometry();
      };

      map.on('zoomend', handleZoomEnd);
      map.on('moveend', handleMoveEnd);

      return () => {
        map.off('zoomend', handleZoomEnd);
        map.off('moveend', handleMoveEnd);
        debouncedRenderGeometry.cancel();
      };
    }, [activeMarkerId, geometryData, hoveredMarkerId, hoveredGeometryData, posts, renderGeometryLayer]);

const handleMouseOver = useCallback(async (postId) => {
  if (selectedPost?._id) return; // tiltva, ha van kiválasztott

  realHoverActiveRef.current = true;
  setHoveredMarkerId(postId);
  isHoveringRef.current = true;

  clearGeometryLayer();

  const post = posts.find(p => p._id === postId);
  if (!post) return;

  const geometry = await loadGeometry(postId);
  if (geometry) {
    setHoveredGeometryData(geometry);
    renderGeometryLayer(post, geometry);
  }
}, [selectedPost?._id, clearGeometryLayer, posts, renderGeometryLayer]);


const handleMouseOut = useCallback((postId) => {   // ← most már kap postId-t is
  // Csak akkor törlünk, ha EZ a marker volt az utoljára hovered
  if (hoveredMarkerId === postId) {
    realHoverActiveRef.current = false;
    clearGeometryLayer();
    setHoveredMarkerId(null);
    setHoveredGeometryData(null);
    isHoveringRef.current = false;

    // Ha van aktív (kattintott) → visszaállítjuk annak geometriáját
    if (activeMarkerId && geometryData) {
      const post = posts.find(p => p._id === activeMarkerId);
      if (post) renderGeometryLayer(post, geometryData);
    }
  }
}, [hoveredMarkerId, activeMarkerId, geometryData, posts, renderGeometryLayer, clearGeometryLayer]);
    const enforceBounds = useCallback(() => {
      const map = mapRef.current;
      if (!map || selectedPost) {
        console.log(`[enforceBounds] Skipping bounds enforcement: selectedPost=${!!selectedPost}`);
        return;
      }
      const currentBounds = map.getBounds();
      if (!mapBounds.contains(currentBounds.getCenter())) {
        map.panTo(mapBounds.getCenter(), { animate: true, duration: 0.5 });
        console.log(`[Map] Enforced bounds to center: ${mapBounds.getCenter()}`);
      }
    }, [mapBounds, selectedPost]);

    useEffect(() => {
      const map = mapRef.current;
      if (map) {
        const debouncedEnforceBounds = debounce(enforceBounds, 100);
        map.on('moveend', debouncedEnforceBounds);
        return () => {
          map.off('moveend', debouncedEnforceBounds);
          debouncedEnforceBounds.cancel();
        };
      }
    }, [enforceBounds]);

    // 🔥 JAVÍTOTT: ÜRES filters logging-hoz
    const debouncedLogMarkerViews = useCallback(
      debounce(async (postIds, filtersHash) => {
        if (!isMounted.current || lastLoggedHash.current === filtersHash) {
          return;
        }
        try {
          lastLoggedHash.current = filtersHash;
          await logMarkerViews(postIds, {});
        } catch (error) {
          console.error('[debouncedLogMarkerViews] Error logging marker views:', error);
        }
      }, 1000),
      []
    );

        // A komponens elején, a props után, a többi useCallback mellett:

const checkRealHoverAfterInteraction = useCallback(
  debounce(() => {
    if (!mapRef.current) return;

    // Ha van kiválasztott hirdetés → ne bántsuk a hover-t
    if (selectedPost?._id) return;

    // Ha éppen most nyomkodjuk az egeret egy marker felett → ne töröljünk
    if (realHoverActiveRef.current) return;

    // Ha nincs hover marker ID → már eleve tiszta
    if (!hoveredMarkerId) return;

    // Itt már feltételezhető, hogy a zoom/move miatt "elhagytuk" a markert
    console.log("[checkRealHover] Zoom/move miatt töröljük a beragadt hover geometriát");

    clearGeometryLayer();
    setHoveredMarkerId(null);
    setHoveredGeometryData(null);
    isHoveringRef.current = false;

    // Ha volt aktív → visszaállítjuk
    if (activeMarkerId && geometryData) {
      const post = posts.find(p => p._id === activeMarkerId);
      if (post) renderGeometryLayer(post, geometryData);
    }
  }, 120), // kicsi debounce, hogy ne fussanak túl gyakran
  [
    hoveredMarkerId,
    activeMarkerId,
    geometryData,
    selectedPost?._id,
    clearGeometryLayer,
    renderGeometryLayer,
    posts,
  ]
);
const MapController = ({ isStreetViewMode, setIsStreetViewMode }) => {
  const map = useMap();
  mapRef.current = map;

useEffect(() => {
  if (!map) return;

  const handleClick = (e) => {
    setIsStreetViewMode(false);

    const { lat, lng } = e.latlng;
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat.toFixed(6)},${lng.toFixed(6)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const container = map.getContainer();

  if (isStreetViewMode) {
    // Pegman a crosshair fölött lebeg (lába pontosan a crosshair közepén)
container.style.cursor = 'url(https://maps.google.com/mapfiles/ms/micons/man.png) 16 32, crosshair';


    map.on('click', handleClick);
  } else {
    container.style.cursor = 'grab';
    map.off('click', handleClick);
  }

  return () => {
    map.off('click', handleClick);
    container.style.cursor = 'grab';
  };
}, [map, isStreetViewMode]);
      

      const updateVisiblePosts = useCallback(
        debounce(() => {
          if (!isMounted.current || isUpdating.current) {
            return;
          }
          isUpdating.current = true;

          const bounds = map.getBounds().pad(0.2);
          const maxMarkers = 100;

          let filteredPosts = posts.filter(
            (post) =>
              post &&
              post.geolocation &&
              post.geolocation.lat &&
              post.geolocation.lon &&
              bounds &&
              bounds.contains([post.geolocation.lat, post.geolocation.lon])
          );

          if (
            selectedPost &&
            selectedPost.geolocation &&
            selectedPost.geolocation.lat &&
            selectedPost.geolocation.lon
          ) {
            const selectedPostInView = filteredPosts.find((post) => post._id === selectedPost._id);
            if (!selectedPostInView) {
              filteredPosts = [selectedPost, ...filteredPosts].slice(0, maxMarkers);
            } else {
              filteredPosts = [
                selectedPost,
                ...filteredPosts.filter((post) => post._id !== selectedPost._id),
              ].slice(0, maxMarkers);
            }
          } else {
            filteredPosts = filteredPosts.slice(0, maxMarkers);
          }

          setVisiblePosts((prevVisiblePosts) => {
            const prevIds = prevVisiblePosts.map((p) => p._id).sort();
            const newIds = filteredPosts.map((p) => p._id).sort();
            if (isEqual(prevIds, newIds)) {
              return prevVisiblePosts;
            }
            return filteredPosts;
          });

          isUpdating.current = false;
        }, 500),
        [map, posts, selectedPost]
      );

useMapEvents({
  zoomend: () => {
    // Debounce ajánlott, különben nagyon sokszor futna
    checkRealHoverAfterInteraction();
  },
  moveend: () => {
    checkRealHoverAfterInteraction();
  },
  // esetleg dragend is, ha nagyon pontos akarsz lenni
});


// A MapController-en belül vagy a MapComponent-ben, ahol a useMapEvents van:
useMapEvents({
  click: () => {
    // Mobilon és desktopon is zárja be a kiválasztott hirdetést
    if (selectedPost) {
      setSelectedPost(null);
    }
  },
});
const fitMapToMarkers = useCallback(() => {
  console.log('[fitMapToMarkers] Hívva – posts hossza:', posts?.length || 0);

  if (!posts || posts.length === 0) {
    console.warn('[fitMapToMarkers] Nincsenek hirdetések → alap Magyarország nézet');
    map.flyTo([47.161, 19.505], 7, { animate: true, duration: 1.5 });
    setShouldFitMap(false);
    return;
  }

  // Csak érvényes koordinátákkal rendelkező posztok
  const validPosts = posts.filter(
    (post) =>
      post?.geolocation?.lat != null &&
      post?.geolocation?.lon != null &&
      !isNaN(post.geolocation.lat) &&
      !isNaN(post.geolocation.lon)
  );

  if (validPosts.length === 0) {
    console.warn('[fitMapToMarkers] Nincs egyetlen érvényes koordináta sem → alap nézet');
    map.flyTo([47.161, 19.505], 7, { animate: true, duration: 1.5 });
    setShouldFitMap(false);
    return;
  }

  // Határok számítása
  const bounds = L.latLngBounds(
    validPosts.map((post) => [post.geolocation.lat, post.geolocation.lon])
  );

  console.log(`[fitMapToMarkers] ${validPosts.length} érvényes ponttal – flyToBounds`);
  map.flyToBounds(bounds, {
    padding: [60, 60],
    animate: true,
    duration: 1.8,
  });

  setShouldFitMap(false);   // Fontos: mindig állítsd vissza!
}, [posts, map, setShouldFitMap]);
      useEffect(() => {
        if (isInitialLoad && map) {
          map.fitBounds(mapBounds, { padding: [50, 50], animate: false });
          map.setMaxBounds(mapBounds);
          setZoom(map.getZoom());
          setIsInitialLoad(false);
          console.log(`[Map] Initial map load with bounds: ${mapBounds.toBBoxString()}`);
        }
        

const zoomHandler = () => {
  const currentZoom = Math.round(map.getZoom());
  setZoom(currentZoom);
  handleMapInteraction(); // 🔥 esemény küldés
};

const moveHandler = () => {
  if (isUpdating.current) return;
  isUpdating.current = true;
  updateVisiblePosts();
  isUpdating.current = false;

  handleMapInteraction(); // 🔥 esemény küldés
};

map.on('zoomend', zoomHandler);
map.on('moveend', moveHandler);
        updateVisiblePosts();

        return () => {
          map.off('zoomend', zoomHandler);
          map.off('moveend', moveHandler);
          updateVisiblePosts.cancel();
        };
      }, [map, isInitialLoad, posts, selectedPost, updateVisiblePosts,setZoom]);

useEffect(() => {
  console.log('[MapController] shouldFitMap trigger:', { shouldFitMap, postsLength: posts.length });

  if (shouldFitMap && posts.length > 0) {
    console.log('[MapController] Végrehajtjuk a fitMapToMarkers-t');
    fitMapToMarkers();

    // 🔥 Kulcs: mi állítjuk vissza false-ra, miután meghívtuk!
    setShouldFitMap(false);
  }
}, [shouldFitMap, fitMapToMarkers]); // ← csak shouldFitMap változáskor fusson! NE legyen posts a függőségben!

      // 🔥 JAVÍTOTT logging - NINCS filters!
      useEffect(() => {
        if (isFiltering || !hasSpecificFilters() || visiblePosts.length === 0 || !shouldLogMarkers) {
          return;
        }

        const validPostIds = visiblePosts.map((post) => post._id);
        if (validPostIds.length > 0) {
          debouncedLogMarkerViews(validPostIds, 'default');
        }

        return () => {
          debouncedLogMarkerViews.cancel();
        };
      }, [visiblePosts, hasSpecificFilters, isFiltering, shouldLogMarkers, debouncedLogMarkerViews]);

      useEffect(() => {
        map.invalidateSize();
      }, [isMobile, showFilterSidebar, map]);

      return null;
    };

    const memoizedVisiblePosts = useMemo(() => visiblePosts, [visiblePosts.map((p) => p._id).join(',')]);



    
    // 🔥 JAVÍTOTT markers - NINCS filters!
    const markers = useMemo(() => {
      return memoizedVisiblePosts.map((post) => (
        <MarkerComponent
          key={post._id}
          post={post}
          listingType={listingType}
          selectedPost={selectedPost}
          fetchPostDetails={fetchPostDetails}
          getFullImageUrl={getFullImageUrl}
          createCustomIcon={createCustomIcon}
          // 🔥 ELTÁVOLÍTVA: filters={filters}
          setSelectedPost={setSelectedPost}
          isAdmin={isAdmin}
          updatePost={updatePost}
          deletePost={deletePost}
          setPosts={setPosts}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          cookiesAccepted={cookiesAccepted}
      viewedPosts={viewedPosts}  // ← átadjuk tovább!
        showDealColors={showDealColors}   // ← átadjuk
        />
      ));
    }, [
      memoizedVisiblePosts,
      listingType,
      selectedPost?._id,
      fetchPostDetails,
      getFullImageUrl,
      createCustomIcon,
      // 🔥 ELTÁVOLÍTVA: filters,
      isAdmin,
      handleMouseOver,
      handleMouseOut,
      cookiesAccepted,
        viewedPosts,  // ← hozzáadva a függőségekhez
          showDealColors,           // ← hozzáadva
    ]);

    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
        debouncedLogMarkerViews.cancel();
        clearGeometryLayer();
      };
    }, [clearGeometryLayer, debouncedLogMarkerViews]);

    React.useImperativeHandle(ref, () => ({
      getMapElement: () => document.querySelector('.leaflet-container'),
      getMapInstance: () => mapRef.current,
    }), []);

    useEffect(() => {
      console.log(`[Map] isHoveringRef.current changed: ${isHoveringRef.current}`);
    }, [isHoveringRef.current]);

    useEffect(() => {
      console.log(`[Map] Marker states changed: activeMarkerId=${activeMarkerId}, hoveredMarkerId=${hoveredMarkerId}`);
    }, [activeMarkerId, hoveredMarkerId]);

    return (
      <div style={{ height: isMobile ? '100%' : '100vh', width: '100%', position: 'relative' }}>
        <MapContainer
          center={[47.161, 19.505]}
          zoom={7}
          minZoom={6}
          maxBounds={mapBounds}
          maxBoundsViscosity={0.5}
          style={{ height: '100%', width: '100%' }}
            attributionControl={false}   // ← KI kapcsoljuk az alapértelmezetettet!

        >
{/* 1. Alapréteg: OSM mindig lent van (OSM fallback) */}
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='© OpenStreetMap'
  zIndex={1}
  opacity={baseLayerOpacity}
/>

{/* 2. BASIC réteg – CSAK ha zoom >=14 ÉS nincs műhold */}
{zoom >= 14 && !layers.satellite && renderBasicLayer()}

{/* 3. MŰHOLD réteg – CSAK ha zoom >=14 */}
{layers.satellite && renderSatelliteLayer()}

{/* 4. KÖZLEKEDÉS réteg – bármikor, ha be van kapcsolva és zoom >=10 */}
{layers.transport && renderTransportLayer()}

{/* 4. KÖZLEKEDÉS réteg – bármikor, ha be van kapcsolva és zoom >=10 */}
{layers.crimeHeat && renderCrimeHeatLayer()}



<MapController isStreetViewMode={isStreetViewMode} setIsStreetViewMode={setIsStreetViewMode} />
{layers.religion && renderReligionLayer(layerData.religion, zoom)}
{layers.health && renderHealthLayer(layerData.health, zoom)}
{layers.education && renderEducationLayer(layerData.education, zoom)}
{layers.shop && renderShopLayer(layerData.shop, zoom)}
{layers.outdoor && renderOutdoorLayer(layerData.outdoor, zoom)}
{layers.sport && renderSportLayer(layerData.sport, zoom)}
{layers.bank && renderBankLayer(layerData.bank, zoom)}
          {activeSecondaryPanel === 'menu' && (
            <div
              className="sidebar-menu"
              style={{
                top: isMobile ? '50px' : showFilterSidebar ? '60px' : '60px',
                right: isMobile ? '10px' : showFilterSidebar ? `60px` : '20px',
              }}
            >
              <button className="close-button" onClick={() => setActiveSecondaryPanel(null)}>
                ×
              </button>
              <div className="small-menu">
                <ul>
                  <li><a href="/">Főoldal</a></li>
                  <li><a href="/about">Rólunk</a></li>
                  <li><a href="/contact">Kapcsolat</a></li>
                  <li><a href="/privacy-policy">ÁSZF + Adatvédelmi tájékoztató</a></li>

                  {!isLoggedIn ? (
                    <>
                      <li><a href="/login">Bejelentkezés</a></li>
                      <li><a href="/signup">Regisztráció</a></li>
                    </>
                  ) : (
                    <>
                      <li><a href="/profile">Fiókom</a></li>
                      <li><button className="logout-button" onClick={onLogout}>Kilépés</button></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {markers}

          <LayerControl
            zoom={zoom}
            layers={layers}
            layerData={layerData}
            setLayerData={setLayerData}
          />

  {/* A rétegek renderelése – ezek az adatoktól függenek */}
  {zoom >= 14 && layers.religion && renderReligionLayer(layerData.religion, zoom)}
  {zoom >= 14 && layers.health && renderHealthLayer(layerData.health, zoom)}
  {zoom >= 14 && layers.education && renderEducationLayer(layerData.education, zoom)}
  {zoom >= 14 && layers.shop && renderShopLayer(layerData.shop, zoom)}
  {zoom >= 14 && layers.outdoor && renderOutdoorLayer(layerData.outdoor, zoom)}
  {zoom >= 14 && layers.sport && renderSportLayer(layerData.sport, zoom)}
  {zoom >= 14 && layers.bank && renderBankLayer(layerData.bank, zoom)}

  {/* 🔥 CSAK a UI panel – a logika már fent fut */}
  {activeSecondaryPanel === 'layers' && (
    <div className="floating-card layer-card"               style={{
                position: 'absolute',
                top: isMobile 
                  ? (showFilterSidebar ? 'calc(33.33vh + 20px)' : '80px')
                  : (showFilterSidebar ? '460px' : '100px'),  // desktop: szűrő alatt (360px + padding)
                right: isMobile ? '10px' : '20px',
                zIndex: 1000,
                width: isMobile ? 'calc(100vw - 20px)' : '340px',
                maxHeight: isMobile ? '60vh' : '70vh',
                overflowY: 'auto',
                pointerEvents: 'auto',
                transition: 'top 0.4s ease',
              }}>
      <button className="close-button" onClick={() => setActiveSecondaryPanel(null)}>×</button>
      <div className="layer-control-modern">
        {/* Itt már NE tedd bele a LayerControl-t! Helyette a LayerPanel-t használd */}
<LayerPanel
  zoom={zoom}
  layers={layers}
  setLayers={setLayers}
  onClose={() => setActiveSecondaryPanel(null)}
  cookiesAccepted={cookiesAccepted}  // ← ezt add hozzá
/>

              </div>
            </div>
          )}


        </MapContainer>
      </div>
    );
  }
);

export default React.memo(MapComponent);