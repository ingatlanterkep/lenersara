'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FilterForm from '../components/FilterForm';
import useFilters from '@/hooks/useFilters';
import { getPostDetails, updatePost, deletePost, getFilteredPostsList } from '@/services/apiService';
import { getCurrentUser } from '@/services/usersService';
import TutorialBubble from '../components/TutorialBubble';
import LocationSearchModal from '../components/LocationSearchModal';
import LayerPanel from '../components/LayerPanel';
import FacebookFollowLabel from '../components/FacebookFollowLabel';
import ImageGallery from '../components/ImageGallery';
import { getViewedPosts, addViewedPost } from '@/utils/viewedPosts';
import apiClient from '@/services/apiClient';
import PropertyCard from '../components/PropertyCard';
import { 
  getFavoritePosts, 
  addFavoritePost, 
  removeFavoritePost, 
  isFavoritePost, 
  clearExpiredFavorites 
} from '@/utils/favoritePosts';

import { useAnalytics } from '@/context/AnalyticsContext';
import HomePageSEO from '../components/HomePageSEO';
import TopSearchBar from '../components/TopSearchBar';

const MapComponentDynamic = dynamic(
  () => import('../components/MapComponent'),
  { 
    ssr: false,
    loading: () => <div className="map-loading">Térkép betöltése...</div>
  }
);

// Konstansok
const budapestDistricts = [
  { number: 1, name: 'Várnegyed', roman: 'I. kerület', value: 'Budapest, I. kerület', url: 'budapest-i-kerulet', alias: ['varnegyed'] },
  { number: 2, name: 'Hegyvidék-Rózsadomb', roman: 'II. kerület', value: 'Budapest, II. kerület', url: 'budapest-ii-kerulet', alias: ['hegyvidek-rozsadomb', 'rozsadomb'] },
  { number: 3, name: 'Óbuda-Békásmegyer', roman: 'III. kerület', value: 'Budapest, III. kerület', url: 'budapest-iii-kerulet', alias: ['obuda', 'bekasmegyer', 'obuda-bekasmegyer'] },
  { number: 4, name: 'Újpest', roman: 'IV. kerület', value: 'Budapest, IV. kerület', url: 'budapest-iv-kerulet', alias: ['ujpest'] },
  { number: 5, name: 'Belváros-Lipótváros', roman: 'V. kerület', value: 'Budapest, V. kerület', url: 'budapest-v-kerulet', alias: ['belvaros', 'lipotvaros', 'belvaros-lipotvaros'] },
  { number: 6, name: 'Terézváros', roman: 'VI. kerület', value: 'Budapest, VI. kerület', url: 'budapest-vi-kerulet', alias: ['terezvaros'] },
  { number: 7, name: 'Erzsébetváros', roman: 'VII. kerület', value: 'Budapest, VII. kerület', url: 'budapest-vii-kerulet', alias: ['erzsebetvaros'] },
  { number: 8, name: 'Józsefváros', roman: 'VIII. kerület', value: 'Budapest, VIII. kerület', url: 'budapest-viii-kerulet', alias: ['jozsefvaros'] },
  { number: 9, name: 'Ferencváros', roman: 'IX. kerület', value: 'Budapest, IX. kerület', url: 'budapest-ix-kerulet', alias: ['ferencvaros'] },
  { number: 10, name: 'Kőbánya', roman: 'X. kerület', value: 'Budapest, X. kerület', url: 'budapest-x-kerulet', alias: ['kobanya'] },
  { number: 11, name: 'Újbuda', roman: 'XI. kerület', value: 'Budapest, XI. kerület', url: 'budapest-xi-kerulet', alias: ['ujbuda'] },
  { number: 12, name: 'Hegyvidék', roman: 'XII. kerület', value: 'Budapest, XII. kerület', url: 'budapest-xii-kerulet', alias: ['hegyvidek'] },
  { number: 13, name: 'Angyalföld', roman: 'XIII. kerület', value: 'Budapest, XIII. kerület', url: 'budapest-xiii-kerulet', alias: ['angyalfold'] },
  { number: 14, name: 'Zugló', roman: 'XIV. kerület', value: 'Budapest, XIV. kerület', url: 'budapest-xiv-kerulet', alias: ['zuglo'] },
  { number: 15, name: 'Rákospalota', roman: 'XV. kerület', value: 'Budapest, XV. kerület', url: 'budapest-xv-kerulet', alias: ['rakospalota'] },
  { number: 16, name: 'Mátyásföld', roman: 'XVI. kerület', value: 'Budapest, XVI. kerület', url: 'budapest-xvi-kerulet', alias: ['matyasfold'] },
  { number: 17, name: 'Rákosmente', roman: 'XVII. kerület', value: 'Budapest, XVII. kerület', url: 'budapest-xvii-kerulet', alias: ['rakosmente'] },
  { number: 18, name: 'Pestszentlőrinc', roman: 'XVIII. kerület', value: 'Budapest, XVIII. kerület', url: 'budapest-xviii-kerulet', alias: ['pestszentlorinc'] },
  { number: 19, name: 'Kispest', roman: 'XIX. kerület', value: 'Budapest, XIX. kerület', url: 'budapest-xix-kerulet', alias: ['kispest'] },
  { number: 20, name: 'Pesterzsébet', roman: 'XX. kerület', value: 'Budapest, XX. kerület', url: 'budapest-xx-kerulet', alias: ['pesterzsebet'] },
  { number: 21, name: 'Csepel', roman: 'XXI. kerület', value: 'Budapest, XXI. kerület', url: 'budapest-xxi-kerulet', alias: ['csepel'] },
  { number: 22, name: 'Budafok-Tétény', roman: 'XXII. kerület', value: 'Budapest, XXII. kerület', url: 'budapest-xxii-kerulet', alias: ['budafok', 'teteny', 'budafok-teteny'] },
  { number: 23, name: 'Soroksár', roman: 'XXIII. kerület', value: 'Budapest, XXIII. kerület', url: 'budapest-xxiii-kerulet', alias: ['soroksar'] },
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

const typeMap = {
  lakas: 'Lakás',
  haz: 'Ház',
  iroda: 'Iroda',
  telek: 'Telek',
  garazs: 'Garázs',
  nyaralo: 'Nyaraló',
  raktar: 'Raktár',
  luxus_ingatlan: 'Luxus ingatlan',
  fejlesztesi_cel: 'Fejlesztési cél',
  mezogazdasagi_cel: 'Mezőgazdasági cél',
  uzleti_cel: 'Üzleti cél',
  intezmeny: 'Intézmény'
};

const validCounties = [
  'pest-varmegye', 'hajdu-bihar-varmegye', 'gyor-moson-sopron-varmegye',
  'baranya-varmegye', 'borsod-abauj-zemplen-varmegye', 'szabolcs-szatmar-bereg-varmegye',
  'bacs-kiskun-varmegye', 'bekes-varmegye', 'csongrad-csanad-varmegye',
  'fejer-varmegye', 'heves-varmegye', 'komarom-esztergom-varmegye',
  'nograd-varmegye', 'somogy-varmegye', 'tolna-varmegye',
  'vas-varmegye', 'veszprem-varmegye', 'zala-varmegye',
  'jasz-nagykun-szolnok-varmegye'
];

export default function HomePageContent({ 
  listingType: urlListingType, 
  type: urlType, 
  city: urlLocation,
  viewModeDefault = 'map',
  serverLocationContent = null,
  serverSeoQuickPosts = [],
  hideFooter = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isInitialized = useRef(false);
  
  const navigate = useCallback((url, options) => {
    if (options?.replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  }, [router]);
  
  const { cookiesAccepted, sendEvent } = useAnalytics();
  
  // State-ek
  const [isStreetViewMode, setIsStreetViewMode] = useState(false);
  const [viewMode, setViewMode] = useState(viewModeDefault);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(true);
  const [showLayerSidebar, setShowLayerSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavbarMenuOpen, setNavbarMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState('');
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueMessage, setQueueMessage] = useState('');
  const [queueSuccess, setQueueSuccess] = useState(false);
  const [activeSecondaryPanel, setActiveSecondaryPanel] = useState(null);
  const [baseLayerOpacity, setBaseLayerOpacity] = useState(1);
  const [overlayLayerOpacity, setOverlayLayerOpacity] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mapElement, setMapElement] = useState(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [hasFitted, setHasFitted] = useState(false);
  const [favoritePosts, setFavoritePosts] = useState(new Set());
  const [listPosts, setListPosts] = useState([]);
  const [listTotal, setListTotal] = useState(0);
  const [listPage, setListPage] = useState(1);
  const [listLoading, setListLoading] = useState(false);
  const [listHasMore, setListHasMore] = useState(true);
  const [showDealColors, setShowDealColors] = useState(false);
  const [mobileBottomHeight, setMobileBottomHeight] = useState(30);
  const [layers, setLayers] = useState({
    transport: false, crimeHeat: false, religion: false, health: false,
    education: false, satellite: false, shop: false, outdoor: false,
    sport: false, bank: false,
  });
  const [zoom, setZoom] = useState(7);
  const [layerData, setLayerData] = useState({
    crimeHeat: [], transport: [], religion: [], health: [], education: [],
    satellite: [], shop: [], outdoor: [], sport: [], bank: [],
  });
  const [filterHeight, setFilterHeight] = useState(67);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(320);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewedPosts, setViewedPosts] = useState(new Set());
  const [filterHeightPx, setFilterHeightPx] = useState(0);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const rightSidebarRef = useRef(null);
  const sidebarRef = useRef(null);
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [isMobileLayerOpen, setIsMobileLayerOpen] = useState(false);
  const [activeLayerCount, setActiveLayerCount] = useState(0);
  const listAbortControllerRef = useRef(null);

  useEffect(() => {
    setShowMap(true);
  }, []);
  
  const {
    listingType, setListingType,
    selectedLocations, setSelectedLocations,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    areaMin, setAreaMin, areaMax, setAreaMax,
    type, setType,
    minRooms, setMinRooms, maxRooms, setMaxRooms,
    onlyWithImages, setOnlyWithImages,
    totalFloorsMin, setTotalFloorsMin,
    totalFloorsMax, setTotalFloorsMax,
    yearBuiltMin, setYearBuiltMin, yearBuiltMax, setYearBuiltMax,
    condition, setCondition, heatingType, setHeatingType,
    energyClass, setEnergyClass, utilityCostMin, setUtilityCostMin,
    utilityCostMax, setUtilityCostMax, view, setView,
    parking, setParking, orientation, setOrientation,
    comfort, setComfort, ceilingHeightMin, setCeilingHeightMin,
    ceilingHeightMax, setCeilingHeightMax, landAreaMin, setLandAreaMin,
    landAreaMax, setLandAreaMax, accuracy, setAccuracy,
    posts, setPosts,
    shouldFitMap, setShouldFitMap,
    isFiltering, shouldLogMarkers, hasSpecificFilters, createFilters,
    isNewBuildFilter, setIsNewBuildFilter,
    comfortLevel, setComfortLevel,
  } = useFilters(cookiesAccepted);

  const generateSlug = (title) => {
    if (!title) return 'unknown';
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };
  
  const convertLocationToFormat = (urlLocation) => {
    const decodedLocation = decodeURIComponent(urlLocation);
    const normalized = decodedLocation.toLowerCase().replace(/_/g, '-');
    
    if (validCounties.includes(normalized)) {
      return { scope: 'county', value: normalized, locationKey: `county:${normalized}` };
    }
    
    const district = budapestDistricts.find(d =>
      d.url === normalized || d.alias.includes(normalized.replace(/-/g, ''))
    );
    if (district) {
      return { scope: 'district', value: district.value, locationKey: `district:${district.value}` };
    }
    
    let cityName = decodedLocation;
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    
    return { scope: 'city', value: cityName, locationKey: `city:${cityName}` };
  };

  const getFullImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${imagePath}`;
  };

  const createCustomIcon = (price) => {
    if (typeof window === 'undefined' || !window.L) {
      return null;
    }
    return window.L.divIcon({
      className: 'custom-marker-icon',
      html: `<div style="background-color: white; border: 2px solid #0078A8; border-radius: 50%; padding: 5px; font-size: 12px; font-weight: bold; color: #0078A8;">${price}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };
  
  const fetchPostDetails = async (postId) => {
    try {
      const postDetails = await getPostDetails(postId);
      const newPost = postDetails.data;
      if (cookiesAccepted) {
        sendEvent('preview_open', {
          post_id: newPost._id,
          listing_type: newPost.listing_type,
          price: newPost.price || newPost.rental_price,
        });
      }
      setSelectedPost(newPost);
      addViewedPost(newPost._id);
      setViewedPosts(prev => new Set(prev).add(newPost._id));
      return postDetails;
    } catch (error) {
      console.error('Hiba a hirdetés részleteinek lekérdezésekor:', error);
      throw error;
    }
  };

// HomePageContent.tsx - loadListData javítva

const loadListData = useCallback(async (page = 1, append = false) => {
  // Ha már tölt és nem append, ne induljon újra
  if (listLoading && !append) return;
  
  // Ha nincs több találat, ne próbálkozzunk
  if (!listHasMore && append) return;

  if (listAbortControllerRef.current) {
    try {
      listAbortControllerRef.current.abort();
    } catch (e) {}
  }

  listAbortControllerRef.current = new AbortController();
  const { signal } = listAbortControllerRef.current;

  setListLoading(true);
  
  try {
    const filters = createFilters();
    
    console.log('[ListPage] Szűrők:', filters);
    
    const hasFilters = Object.keys(filters).length > 0;
    if (!hasFilters && !append) {
      setListPosts([]);
      setListTotal(0);
      setListHasMore(false);
      setListLoading(false);
      return;
    }
    
    const response = await getFilteredPostsList(filters, page, 30, { signal });
    
    if (response.success) {
      if (append) {
        setListPosts(prev => [...prev, ...response.data]);
      } else {
        setListPosts(response.data);
      }
      setListTotal(response.total);
      const hasMore = page < response.pages;
      setListHasMore(hasMore);
      setListPage(page);
    } else {
      setListHasMore(false);
    }
  } catch (error) {
    if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
      console.error('Hiba a listás adatok betöltésekor:', error);
    }
  } finally {
    setListLoading(false);
  }
}, [listLoading, listHasMore, createFilters]);

  // Aktív rétegek számlálása
  useEffect(() => {
    const count = Object.values(layers).filter(Boolean).length;
    setActiveLayerCount(count);
  }, [layers]);

  // MOBIL: Alsó sáv gombok kezelése
  const handleLayerButton = () => {
    setIsMobileLayerOpen(true);
  };

  const handleListButton = () => {
    setViewMode('list');
    const isCurrentlyList = window.location.pathname.endsWith('/lista');
    let newPath = window.location.pathname;
    if (isCurrentlyList) {
      newPath = newPath.replace(/\/lista$/, '') || '/';
    } else {
      newPath = newPath.endsWith('/') ? `${newPath}lista` : `${newPath}/lista`;
    }
    navigate(newPath, { replace: false });
  };

  const handleStreetViewButton = () => {
    setIsStreetViewMode(!isStreetViewMode);
  };

  useEffect(() => {
    const updateMapHeight = () => {
      const navbar = document.querySelector('.navbar');
      const searchBar = document.querySelector('.top-search-bar');
      
      if (navbar && searchBar) {
        const navbarHeight = navbar.getBoundingClientRect().height;
        const searchBarHeight = searchBar.getBoundingClientRect().height;
        const totalTopOffset = navbarHeight + searchBarHeight;
        
        document.documentElement.style.setProperty('--total-top-offset', `${totalTopOffset}px`);
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
        document.documentElement.style.setProperty('--searchbar-height', `${searchBarHeight}px`);
        
        const mapWrapper = document.querySelector('.map-wrapper');
        if (mapWrapper) {
          const viewportHeight = window.innerHeight;
          const newHeight = viewportHeight - totalTopOffset;
          mapWrapper.style.height = `${newHeight}px`;
          mapWrapper.style.top = `${totalTopOffset}px`;
        }
        
        const leftSidebar = document.querySelector('.left-sidebar-container');
        if (leftSidebar) {
          const viewportHeight = window.innerHeight;
          const newHeight = viewportHeight - totalTopOffset;
          leftSidebar.style.height = `${newHeight}px`;
          leftSidebar.style.top = `${totalTopOffset}px`;
        }
      }
    };
    
    setTimeout(updateMapHeight, 50);
    window.addEventListener('resize', updateMapHeight);
    
    const searchBar = document.querySelector('.top-search-bar');
    if (searchBar) {
      const observer = new MutationObserver(() => {
        updateMapHeight();
      });
      observer.observe(searchBar, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    const observer = new MutationObserver(() => {
      updateMapHeight();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      window.removeEventListener('resize', updateMapHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const mapWrapper = document.querySelector('.map-wrapper');
    const leftSidebar = document.querySelector('.left-sidebar-container');
    
    if (mapWrapper && leftSidebar) {
      leftSidebar.style.width = `${sidebarWidth}px`;
      document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
      mapWrapper.style.left = `${sidebarWidth}px`;
      mapWrapper.style.width = `calc(100% - ${sidebarWidth}px)`;
    }
  }, [sidebarWidth]);

  // 🔥 VIEWMODE FIGYELÉS
  useEffect(() => {
    if (pathname?.toLowerCase().endsWith('/lista')) {
      setViewMode('list');
    } else if (pathname?.toLowerCase().endsWith('/terkep') || !pathname?.includes('/lista')) {
      setViewMode('map');
    }
  }, [pathname]);

  // 🔥 LISTA BETÖLTÉS - AMIKOR VIEWMODE VÁLTOZIK
  useEffect(() => {
    if (viewMode === 'list') {
      loadListData(1, false);
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === 'list') {
      loadListData(1, false);
    }
    
    return () => {
      if (listAbortControllerRef.current) {
        try {
          listAbortControllerRef.current.abort();
        } catch (e) {}
      }
    };
  }, [
    viewMode,
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
    parking,
    landAreaMin,
    landAreaMax,
    accuracy,
    createFilters,
    loadListData
  ]);

  const handleQueueToFacebook = async () => {
    if (!selectedQuestionType) return;
    setIsQueuing(true);
    setQueueMessage('');
    setQueueSuccess(false);
    try {
      const res = await apiClient.post(`/posts/queue-for-fb/${selectedPost._id}`, { questionType: selectedQuestionType });
      if (res.data.success) {
        setQueueSuccess(true);
        setQueueMessage(res.data.message || 'Sikeresen a queue-ba került!');
      }
    } catch (err) {
      console.error('Queue hiba:', err);
      setQueueSuccess(false);
      setQueueMessage(err.response?.data?.message || 'Hiba történt a queue-ba helyezéskor');
    } finally {
      setIsQueuing(false);
    }
  };
  
  useEffect(() => {
    if (isInitialized.current) return;
    
    if (urlListingType && urlType) {
      const listingTypeMap = { elado: 'eladó', kiado: 'kiadó' };
      const validListingTypes = ['elado', 'kiado'];
      const validTypes = Object.keys(typeMap);
      
      if (validListingTypes.includes(urlListingType.toLowerCase()) && validTypes.includes(urlType.toLowerCase())) {
        setListingType(listingTypeMap[urlListingType.toLowerCase()]);
        setType(typeMap[urlType.toLowerCase()]);
        
        if (urlLocation) {
          const { locationKey } = convertLocationToFormat(urlLocation);
          setSelectedLocations([locationKey]);
        } else {
          setSelectedLocations([]);
        }
        
        setShouldFitMap(true);
        setHasFitted(false);
      }
    } else if (!urlListingType && !urlType && !urlLocation) {
      setListingType('eladó');
      setType('Lakás');
      setSelectedLocations([]);
      setShouldFitMap(true);
      setHasFitted(false);
    }
    
    isInitialized.current = true;
  }, [urlListingType, urlType, urlLocation, setListingType, setType, setSelectedLocations, setShouldFitMap, setHasFitted]);

  useEffect(() => {
    setFavoritePosts(getFavoritePosts());
    clearExpiredFavorites();
  }, []);
  
  useEffect(() => {
    setViewedPosts(getViewedPosts());
  }, []);
  
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedPost?._id]);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const currentUser = await getCurrentUser();
        setIsAdmin(currentUser?.isAdmin || false);
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, []);
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        if (pathname?.startsWith('/profile')) {
          navigate('/login', { replace: true });
        }
        setIsLoading(false);
        return;
      }
      try {
        const currentUser = await getCurrentUser();
        setIsLoggedIn(!!currentUser);
      } catch (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          if (pathname?.includes('/profile') || pathname?.includes('/admin')) {
            navigate('/login', { replace: true });
          }
        } else {
          setIsLoggedIn(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [pathname, navigate]);
  
  useEffect(() => {
    if (viewMode === 'list') {
      document.body.classList.add('list-mode-active');
    } else {
      document.body.classList.remove('list-mode-active');
    }
    return () => document.body.classList.remove('list-mode-active');
  }, [viewMode]);
  
  useEffect(() => {
    let targetView = viewModeDefault;
    if (pathname?.toLowerCase().endsWith('/lista')) {
      targetView = 'list';
    } else if (pathname?.toLowerCase().endsWith('/terkep') || !pathname?.includes('/lista')) {
      targetView = 'map';
    }
    if (viewMode !== targetView) {
      setViewMode(targetView);
    }
  }, [pathname, viewModeDefault]);
  
  useEffect(() => {
    if (window.innerWidth <= 480) {
      setIsMobile(true);
      setShowFilterSidebar(true);
      setShowLayerSidebar(true);
      setFilterHeight(35);
    } else {
      setIsMobile(false);
    }
  }, []);
  
  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth <= 480) {
        setIsMobile(true);
        setSidebarWidth(window.innerWidth);
      } else if (window.innerWidth <= 768) {
        setIsMobile(false);
        setSidebarWidth(220);
      } else {
        setIsMobile(false);
        setSidebarWidth(320);
      }
    };
    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, []);
  
  useEffect(() => {
    if (selectedPost) setRightSidebarWidth(320);
  }, [selectedPost, sidebarWidth]);
  
  useEffect(() => {
    if (!isMobile || !selectedPost) return;
    const measureFilter = () => {
      const filterCard = document.querySelector('.sidebar-section.filter-card');
      if (filterCard) {
        const height = filterCard.offsetHeight;
        if (height > 0) setFilterHeightPx(height);
      }
    };
    setTimeout(measureFilter, 100);
  }, [isMobile, selectedPost]);
  
  const handleMobileResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY || e.touches?.[0]?.clientY;
    const startHeight = mobileBottomHeight;
    const windowHeight = window.innerHeight;
    const onMove = (ev) => {
      const currentY = ev.clientY || ev.touches?.[0]?.clientY;
      const dy = startY - currentY;
      const deltaPercent = (dy / windowHeight) * 100;
      let newHeight = startHeight + deltaPercent;
      newHeight = Math.min(60, Math.max(25, newHeight));
      setMobileBottomHeight(newHeight);
      const container = document.querySelector('.mobile-bottom-container');
      if (container) container.style.height = `${newHeight}%`;
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onUp);
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };
  
  useEffect(() => {
    if (isMobile && selectedPost) {
      document.body.classList.add('has-selected-post');
    } else {
      document.body.classList.remove('has-selected-post');
    }
    return () => document.body.classList.remove('has-selected-post');
  }, [isMobile, selectedPost]);
  
  const memoizedPosts = useMemo(() => posts, [posts.map(p => p._id).join(',')]);
  
  const handleBackToMap = useCallback(() => {
    const basePath = pathname?.replace(/\/lista$/, '');
    if (basePath && basePath !== pathname) {
      navigate(basePath, { replace: true });
    }
    setViewMode('map');
  }, [pathname, navigate]);
  
  if (isLoading) {
    return <div className="loading">Betöltés...</div>;
  }

  // ==================== MOBIL NÉZET ====================
  if (isMobile) {
    return (
      <>
        <TopSearchBar
          listingType={listingType}
          setListingType={setListingType}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          onLocationSearchOpen={() => setLocationSearchOpen(true)}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          areaMin={areaMin}
          setAreaMin={setAreaMin}
          areaMax={areaMax}
          setAreaMax={setAreaMax}
          type={type}
          setType={setType}
          minRooms={minRooms}
          setMinRooms={setMinRooms}
          maxRooms={maxRooms}
          setMaxRooms={setMaxRooms}
          onlyWithImages={onlyWithImages}
          setOnlyWithImages={setOnlyWithImages}
          totalFloorsMin={totalFloorsMin}
          setTotalFloorsMin={setTotalFloorsMin}
          totalFloorsMax={totalFloorsMax}
          setTotalFloorsMax={setTotalFloorsMax}
          yearBuiltMin={yearBuiltMin}
          setYearBuiltMin={setYearBuiltMin}
          yearBuiltMax={yearBuiltMax}
          setYearBuiltMax={setYearBuiltMax}
          condition={condition}
          setCondition={setCondition}
          heatingType={heatingType}
          setHeatingType={setHeatingType}
          parking={parking}
          setParking={setParking}
          landAreaMin={landAreaMin}
          setLandAreaMin={setLandAreaMin}
          landAreaMax={landAreaMax}
          setLandAreaMax={setLandAreaMax}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
          isNewBuildFilter={isNewBuildFilter}
          setIsNewBuildFilter={setIsNewBuildFilter}
          comfortLevel={comfortLevel}
          setComfortLevel={setComfortLevel}
          isMobile={isMobile}
          onFilterToggle={() => {}}
          isFilterOpen={false}
        />

        {/* Térkép - CSAK MAP NÉZETBEN */}
        {viewMode === 'map' && (
          <div className="map-wrapper mobile-map-wrapper">
            <MapComponentDynamic
              key="map-component-mobile"
              isStreetViewMode={isStreetViewMode}
              setIsStreetViewMode={setIsStreetViewMode}
              ref={mapRef}
              posts={memoizedPosts}
              listingType={listingType}
              fetchPostDetails={fetchPostDetails}
              getFullImageUrl={getFullImageUrl}
              createCustomIcon={createCustomIcon}
              baseLayerOpacity={baseLayerOpacity}
              setBaseLayerOpacity={setBaseLayerOpacity}
              setOverlayLayerOpacity={setOverlayLayerOpacity}
              shouldFitMap={shouldFitMap}
              setShouldFitMap={setShouldFitMap}
              layers={layers}
              setLayers={setLayers}
              hasSpecificFilters={hasSpecificFilters}
              isFiltering={isFiltering}
              shouldLogMarkers={shouldLogMarkers}
              setSelectedPost={setSelectedPost}
              isAdmin={isAdmin}
              updatePost={updatePost}
              deletePost={deletePost}
              setPosts={setPosts}
              cookiesAccepted={cookiesAccepted}
              showFilterSidebar={false}
              activeSecondaryPanel={activeSecondaryPanel}
              setActiveSecondaryPanel={setActiveSecondaryPanel}
              isLoggedIn={isLoggedIn}
              onLogout={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', { replace: true });
              }}
              isMobile={isMobile}
              hasFitted={hasFitted}
              setHasFitted={setHasFitted}
              zoom={zoom}
              setZoom={setZoom}
              layerData={layerData}
              setLayerData={setLayerData}
              viewedPosts={viewedPosts}
              showDealColors={showDealColors}
              setShowDealColors={setShowDealColors}
              sendEvent={sendEvent}
              setViewedPosts={setViewedPosts}
            />
            <FacebookFollowLabel />
          </div>
        )}

    {/* Lista nézet - CSAK LIST NÉZETBEN */}
      {viewMode === 'list' && (
        <div className="mobile-list-wrapper">
          <div className="list-container-white">
            <div className="list-container-inner">
              <div className="list-header">
                <h2>{listTotal} találat</h2>
                <button 
                  onClick={() => {
                    setViewMode('map');
                    const currentPath = window.location.pathname;
                    const mapPath = currentPath.replace(/\/lista$/, '') || '/';
                    navigate(mapPath);
                  }} 
                  className="back-to-map-btn"
                >
                  ← Vissza a térképre
                </button>
              </div>
              {listLoading && listPosts.length === 0 ? (
                <div className="loading-spinner">Betöltés...</div>
              ) : listPosts.length === 0 ? (
                <div className="no-results">Nincs találat a keresési feltételeknek</div>
              ) : (
                <>
                  <div className="similar-posts-grid">
                    {listPosts.map((post) => (
  <PropertyCard
                          key={post._id}
                          post={post}
                          listingType={listingType}
                          cookiesAccepted={cookiesAccepted}
                          onPostClick={() => {
                            const slug = generateSlug(post.title);
                            window.open(`/ingatlan/${post._id}/${slug}`, '_blank');
                          }}
                          onFavoriteToggle={(postId) => {
                            const wasFavorite = isFavoritePost(postId);
                            if (wasFavorite) {
                              removeFavoritePost(postId);
                              setFavoritePosts(prev => new Set([...prev].filter(id => id !== postId)));
                            } else {
                              addFavoritePost(postId);
                              setFavoritePosts(prev => new Set([...prev, postId]));
                            }
                          }}
                        />
                    ))}
                  </div>
                  {listHasMore && (
                    <div className="load-more-container">
                      <button 
                        onClick={() => {
                          if (!listLoading && listHasMore) {
                            loadListData(listPage + 1, true);
                          }
                        }} 
                        disabled={listLoading || !listHasMore} 
                        className="load-more-btn"
                      >
                        {listLoading ? 'Betöltés...' : 'Továbbiak betöltése'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
                        {/* 🔥 SEO szekció - mobilon is */}
      {!hideFooter && (
        <div style={{ marginTop: '20px', padding: '0 10px 20px' }}>
          <HomePageSEO seoQuickPosts={serverSeoQuickPosts} />
        </div>
      )}
        </div>
        
      )}

        {/* MOBIL ALSÓ SÁV - 3 GOMB */}
        <div className="mobile-bottom-bar">
          <button 
            className={`mobile-bottom-btn ${isMobileLayerOpen ? 'active' : ''}`}
            onClick={handleLayerButton}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <line x1="2" y1="8" x2="22" y2="8" />
              <line x1="2" y1="14" x2="22" y2="14" />
            </svg>
            <span className="btn-label">Rétegek</span>
            {activeLayerCount > 0 && (
              <span className="layer-badge">{activeLayerCount}</span>
            )}
          </button>

          <button 
            className="mobile-bottom-btn"
            onClick={handleListButton}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="4" rx="1"/>
              <rect x="3" y="10" width="18" height="4" rx="1"/>
              <rect x="3" y="16" width="18" height="4" rx="1"/>
            </svg>
            <span className="btn-label">Lista</span>
          </button>

          <button 
            className={`mobile-bottom-btn ${isStreetViewMode ? 'active' : ''}`}
            onClick={handleStreetViewButton}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19 9l-4 4-4-4-4 4-4-4" />
              <path d="M5 15l4-4 4 4 4-4 4 4" />
              <path d="M12 3v3" />
              <path d="M12 18v3" />
              <path d="M3 12h3" />
              <path d="M18 12h3" />
            </svg>
            <span className="btn-label">Street View</span>
          </button>
        </div>

        {/* MOBIL RÉTEGPANEL OVERLAY */}
        {isMobileLayerOpen && (
          <>
            <div 
              className="mobile-layer-overlay"
              onClick={() => setIsMobileLayerOpen(false)}
            />
            <div className="mobile-layer-panel">
              <div className="mobile-layer-header">
                <h3>Rétegek</h3>
                <button 
                  className="mobile-layer-close"
                  onClick={() => setIsMobileLayerOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="mobile-layer-grid">
                <div className="street-view-section">
                  <label 
                    className={`street-view-label ${isStreetViewMode ? 'active' : ''}`}
                    onClick={() => {
                      setIsStreetViewMode(!isStreetViewMode);
                    }}
                  >
                    <span className="layer-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19 9l-4 4-4-4-4 4-4-4" />
                        <path d="M5 15l4-4 4 4 4-4 4 4" />
                        <path d="M12 3v3" />
                        <path d="M12 18v3" />
                        <path d="M3 12h3" />
                        <path d="M18 12h3" />
                      </svg>
                    </span>
                    <span className="layer-name">Street View</span>
                  </label>
                </div>

                {[
                  { key: 'satellite', name: 'Műhold' },
                  { key: 'crimeHeat', name: 'Biztonság' },
                  { key: 'transport', name: 'Közlek.' },
                  { key: 'education', name: 'Oktatás' },
                  { key: 'shop', name: 'Boltok' },
                  { key: 'health', name: 'Eü.' },
                  { key: 'bank', name: 'Bankok' },
                  { key: 'outdoor', name: 'Szabad' },
                  { key: 'sport', name: 'Sport' },
                  { key: 'religion', name: 'Vallás' },
                ].map(({ key, name }) => (
                  <label
                    key={key}
                    className={`layer-control-label ${layers[key] ? 'checked' : ''}`}
                    onClick={() => {
                      const newLayers = {
                        ...layers,
                        [key]: !layers[key]
                      };
                      setLayers(newLayers);
                    }}
                  >
                    <span className="layer-icon">
                      {/* Ikonok */}
                      {key === 'satellite' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4v16h16" />
                          <path d="M8 12l4-4 4 4" />
                          <path d="M8 16l4-4 4 4" />
                        </svg>
                      )}
                      {key === 'crimeHeat' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                      {key === 'transport' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="12" rx="2" ry="2" />
                          <circle cx="6" cy="16" r="2" />
                          <circle cx="18" cy="16" r="2" />
                          <path d="M6 8h12" />
                        </svg>
                      )}
                      {key === 'education' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
                          <path d="M2 10l10-5 10 5" />
                          <path d="M12 5v14" />
                        </svg>
                      )}
                      {key === 'shop' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      )}
                      {key === 'health' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-4l-3 9-4-18-3 9H2" />
                        </svg>
                      )}
                      {key === 'bank' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="10" width="20" height="12" rx="2" ry="2" />
                          <line x1="6" y1="10" x2="6" y2="18" />
                          <line x1="10" y1="10" x2="10" y2="18" />
                          <line x1="14" y1="10" x2="14" y2="18" />
                          <line x1="18" y1="10" x2="18" y2="18" />
                          <polyline points="2 10 12 4 22 10" />
                        </svg>
                      )}
                      {key === 'outdoor' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      )}
                      {key === 'sport' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2v20" />
                          <path d="M2 12h20" />
                          <path d="M4.93 4.93l14.14 14.14" />
                          <path d="M19.07 4.93L4.93 19.07" />
                        </svg>
                      )}
                      {key === 'religion' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </span>
                    <span className="layer-name">{name}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <LocationSearchModal
          isOpen={locationSearchOpen}
          onClose={() => setLocationSearchOpen(false)}
          selectedLocations={selectedLocations}
          onLocationChange={setSelectedLocations}
          onApply={setSelectedLocations}
        />

      </>
    );
  }

  // ==================== ASZTALI NÉZET ====================
  return (
    <div className="homepage-container">
      <div className="homepage-background">
        <div className="homepage-background-overlay"></div>
        <TopSearchBar
          listingType={listingType}
          setListingType={setListingType}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          onLocationSearchOpen={() => setLocationSearchOpen(true)}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          areaMin={areaMin}
          setAreaMin={setAreaMin}
          areaMax={areaMax}
          setAreaMax={setAreaMax}
          type={type}
          setType={setType}
          minRooms={minRooms}
          setMinRooms={setMinRooms}
          maxRooms={maxRooms}
          setMaxRooms={setMaxRooms}
          onlyWithImages={onlyWithImages}
          setOnlyWithImages={setOnlyWithImages}
          totalFloorsMin={totalFloorsMin}
          setTotalFloorsMin={setTotalFloorsMin}
          totalFloorsMax={totalFloorsMax}
          setTotalFloorsMax={setTotalFloorsMax}
          yearBuiltMin={yearBuiltMin}
          setYearBuiltMin={setYearBuiltMin}
          yearBuiltMax={yearBuiltMax}
          setYearBuiltMax={setYearBuiltMax}
          condition={condition}
          setCondition={setCondition}
          heatingType={heatingType}
          setHeatingType={setHeatingType}
          parking={parking}
          setParking={setParking}
          landAreaMin={landAreaMin}
          setLandAreaMin={setLandAreaMin}
          landAreaMax={landAreaMax}
          setLandAreaMax={setLandAreaMax}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
          isNewBuildFilter={isNewBuildFilter}
          setIsNewBuildFilter={setIsNewBuildFilter}
          comfortLevel={comfortLevel}
          setComfortLevel={setComfortLevel}
          isMobile={isMobile}
          onFilterToggle={() => setShowFilterSidebar(!showFilterSidebar)}
          isFilterOpen={showFilterSidebar}
        />
      </div>
      
      {(showFilterSidebar || showLayerSidebar) && (
        <div className="left-sidebar-container" ref={sidebarRef}>
          <div className="sidebar-section layer-card">
            <LayerPanel 
              zoom={zoom}
              layers={layers}
              setLayers={setLayers}
              onClose={() => {}}
              compact={true}
              isStreetViewMode={isStreetViewMode}
              setIsStreetViewMode={setIsStreetViewMode}
            />
          </div>
        </div>
      )}
      
      <div className={`content-area ${selectedPost ? 'has-sidebar' : ''}`}>
        {viewMode === 'map' && showMap ? (
          <div className={`map-wrapper ${selectedPost ? 'has-active-marker' : ''}`}>
            <MapComponentDynamic
              key="map-component-static-key"
              isStreetViewMode={isStreetViewMode}
              setIsStreetViewMode={setIsStreetViewMode}
              ref={mapRef}
              posts={memoizedPosts}
              listingType={listingType}
              fetchPostDetails={fetchPostDetails}
              getFullImageUrl={getFullImageUrl}
              createCustomIcon={createCustomIcon}
              baseLayerOpacity={baseLayerOpacity}
              setBaseLayerOpacity={setBaseLayerOpacity}
              setOverlayLayerOpacity={setOverlayLayerOpacity}
              shouldFitMap={shouldFitMap}
              setShouldFitMap={setShouldFitMap}
              layers={layers}
              setLayers={setLayers}
              hasSpecificFilters={hasSpecificFilters}
              isFiltering={isFiltering}
              shouldLogMarkers={shouldLogMarkers}
              setSelectedPost={setSelectedPost}
              isAdmin={isAdmin}
              updatePost={updatePost}
              deletePost={deletePost}
              setPosts={setPosts}
              cookiesAccepted={cookiesAccepted}
              showFilterSidebar={showFilterSidebar || showLayerSidebar}
              activeSecondaryPanel={activeSecondaryPanel}
              setActiveSecondaryPanel={setActiveSecondaryPanel}
              isLoggedIn={isLoggedIn}
              onLogout={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', { replace: true });
              }}
              isMobile={isMobile}
              hasFitted={hasFitted}
              setHasFitted={setHasFitted}
              zoom={zoom}
              setZoom={setZoom}
              layerData={layerData}
              setLayerData={setLayerData}
              viewedPosts={viewedPosts}
              showDealColors={showDealColors}
              setShowDealColors={setShowDealColors}
              sendEvent={sendEvent}
              setViewedPosts={setViewedPosts}
            />
            <FacebookFollowLabel />
          </div>
        ) : (
          <div className="list-view-wrapper" style={{ marginLeft: showFilterSidebar ? `${sidebarWidth}px` : '0' }}>
            <div className="list-container-white">
              <div className="list-container-inner">
                <div className="list-header">
                  <h2>{listTotal} találat</h2>
                  <button onClick={handleBackToMap} className="back-to-map-btn">← Vissza a térképre</button>
                </div>
                {listLoading && listPosts.length === 0 ? (
                  <div className="loading-spinner">Betöltés...</div>
                ) : listPosts.length === 0 ? (
                  <div className="no-results">Nincs találat a keresési feltételeknek</div>
                ) : (
                  <>
                    <div className="similar-posts-grid">
                      {listPosts.map((post) => (
                        <PropertyCard
                          key={post._id}
                          post={post}
                          listingType={listingType}
                          cookiesAccepted={cookiesAccepted}
                          onPostClick={() => {
                            const slug = generateSlug(post.title);
                            window.open(`/ingatlan/${post._id}/${slug}`, '_blank');
                          }}
                          onFavoriteToggle={(postId) => {
                            const wasFavorite = isFavoritePost(postId);
                            if (wasFavorite) {
                              removeFavoritePost(postId);
                              setFavoritePosts(prev => new Set([...prev].filter(id => id !== postId)));
                            } else {
                              addFavoritePost(postId);
                              setFavoritePosts(prev => new Set([...prev, postId]));
                            }
                          }}
                        />
                      ))}
                    </div>
                    {listHasMore && (
                      <div className="load-more-container">
                        <button onClick={() => loadListData(listPage + 1, true)} disabled={listLoading} className="load-more-btn">
                          {listLoading ? 'Betöltés...' : 'Továbbiak betöltése'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        <LocationSearchModal
          isOpen={locationSearchOpen}
          onClose={() => setLocationSearchOpen(false)}
          selectedLocations={selectedLocations}
          onLocationChange={setSelectedLocations}
          onApply={setSelectedLocations}
        />

        {!hideFooter && (
          <div style={{ marginTop: 'calc(100vh - var(--total-top-offset))' }}>
            <HomePageSEO seoQuickPosts={serverSeoQuickPosts} />
          </div>
        )}

        {!hideFooter && (
          <footer className="app-footer">
            <div className="footer-main">
              <div className="footer-column logo-column">
                <img src="/barion-logo.png" alt="Barion biztonságos online fizetési logó" className="barion-logo" />
                <img src="/Large-nobg-light.png" alt="Barion elfogadott fizetési kártyák és módszerek logója" className="barion-logo" />
                <p className="footer-tagline">Biztonságos fizetés a Barionnal<br />A bankkártya adatok hozzánk nem jutnak el.</p>
              </div>
              <div className="footer-column">
                <h4>Oldalak</h4>
                <ul><li><a href="/">Kezdőlap</a></li><li><a href="/about">Rólunk</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Kapcsolat</a></li></ul>
              </div>
              <div className="footer-column">
                <h4>Jogi információk</h4>
                <ul><li><a href="/privacy-policy">Adatvédelmi nyilatkozat</a></li><li><a href="/aszf">Általános Szerződési Feltételek</a></li></ul>
              </div>
              <div className="footer-column">
                <h4>Közösség</h4>
                <ul><li><a href="https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/" target="_blank" rel="noopener">Facebook</a></li></ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="copyright">© 2026 Ingatlan-Térkép.hu – Minden jog fenntartva</p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}