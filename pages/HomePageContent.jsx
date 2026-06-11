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
import { useCookie } from '@/contexts/CookieContext';  // ← ADD EZT
import { 
  getFavoritePosts, 
  addFavoritePost, 
  removeFavoritePost, 
  isFavoritePost, 
  clearExpiredFavorites 
} from '@/utils/favoritePosts';
import SmartToolsPanel from '../components/SmartToolsPanel';

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
  
  // State-ek
    const [cookiesAccepted, setCookiesAccepted] = useState(false);

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
  const [isSmartToolsVisible, setIsSmartToolsVisible] = useState(true);
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
  
  const rightSidebarRef = useRef(null);
  const sidebarRef = useRef(null);
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

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
  } = useFilters(cookiesAccepted);
  
  const validDistricts = budapestDistricts.map(d => d.url);
  
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
      if (cookiesAccepted && window.gtag) {
        window.gtag('event', 'preview_open', {
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
  
  const loadListData = async (page = 1, append = false) => {
    if (listLoading) return;
    setListLoading(true);
    try {
      const filters = createFilters();
      const response = await getFilteredPostsList(filters, page, 30);
      if (response.success) {
        if (append) {
          setListPosts(prev => [...prev, ...response.data]);
        } else {
          setListPosts(response.data);
        }
        setListTotal(response.total);
        setListHasMore(page < response.pages);
        setListPage(page);
      }
    } catch (error) {
      console.error('Hiba a listás adatok betöltésekor:', error);
    } finally {
      setListLoading(false);
    }
  };
  
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
    const checkConsent = () => {
      const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
      setCookiesAccepted(hasConsent);
    };
    
    checkConsent();
    
    // Event listener a változásokhoz
    const handleConsentChange = () => {
      checkConsent();
    };
    
    window.addEventListener('cookieConsentChanged', handleConsentChange);
    
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange);
    };
  }, []);
  
  // URL beolvasása
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

  // Kedvencek betöltése
  useEffect(() => {
    setFavoritePosts(getFavoritePosts());
    clearExpiredFavorites();
  }, []);
  
  // Megtekintett posztok betöltése
  useEffect(() => {
    setViewedPosts(getViewedPosts());
  }, []);
  
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedPost?._id]);
  
  // Admin státusz ellenőrzés
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
  
  // Auth státusz ellenőrzés
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
  
  
  // ViewMode CSS osztály kezelés
  useEffect(() => {
    if (viewMode === 'list') {
      document.body.classList.add('list-mode-active');
    } else {
      document.body.classList.remove('list-mode-active');
    }
    return () => document.body.classList.remove('list-mode-active');
  }, [viewMode]);
  
  // Lista adatok betöltése
  useEffect(() => {
    if (viewMode === 'list') {
      loadListData(1, false);
    }
  }, [listingType, selectedLocations, minPrice, maxPrice, areaMin, areaMax, type, minRooms, maxRooms, onlyWithImages, totalFloorsMin, totalFloorsMax, yearBuiltMin, yearBuiltMax, condition, heatingType, energyClass, parking, landAreaMin, landAreaMax, accuracy, viewMode]);
  
  // ViewMode szinkronizáció az URL-lel
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
  
  // Mobil nézet detektálás
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
  
  // Sidebar width kezelés
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
  
  return (
    <div className="homepage-container">
      <div className="homepage-background">
        <div className="homepage-background-overlay"></div>
      </div>
      
      {(showFilterSidebar || showLayerSidebar) && (
        <>
          <div className="left-sidebar-container" ref={sidebarRef} style={{ width: `${sidebarWidth}px` }}>
            {showFilterSidebar && (
              <div className="sidebar-section filter-card" style={{ flex: `${filterHeight} 0 0` }}>
                <button className="close-button" onClick={() => setShowFilterSidebar(false)}>×</button>
                <FilterForm
                  listingType={listingType}
                  setListingType={setListingType}
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedLocations}
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
                  totalFloorsMax={totalFloorsMax}
                  setTotalFloorsMax={setTotalFloorsMax}
                  setTotalFloorsMin={setTotalFloorsMin}
                  yearBuiltMin={yearBuiltMin}
                  setYearBuiltMin={setYearBuiltMin}
                  yearBuiltMax={yearBuiltMax}
                  setYearBuiltMax={setYearBuiltMax}
                  condition={condition}
                  setCondition={setCondition}
                  heatingType={heatingType}
                  setHeatingType={setHeatingType}
                  energyClass={energyClass}
                  setEnergyClass={setEnergyClass}
                  utilityCostMin={utilityCostMin}
                  setUtilityCostMin={setUtilityCostMin}
                  utilityCostMax={utilityCostMax}
                  setUtilityCostMax={setUtilityCostMax}
                  view={view}
                  setView={setView}
                  parking={parking}
                  setParking={setParking}
                  orientation={orientation}
                  setOrientation={setOrientation}
                  comfort={comfort}
                  setComfort={setComfort}
                  ceilingHeightMin={ceilingHeightMin}
                  setCeilingHeightMin={setCeilingHeightMin}
                  ceilingHeightMax={ceilingHeightMax}
                  setCeilingHeightMax={setCeilingHeightMax}
                  landAreaMin={landAreaMin}
                  setLandAreaMin={setLandAreaMin}
                  landAreaMax={landAreaMax}
                  setLandAreaMax={setLandAreaMax}
                  accuracy={accuracy}
                  setAccuracy={setAccuracy}
                  locationSearchOpen={locationSearchOpen}
                  setLocationSearchOpen={setLocationSearchOpen}
                />
              </div>
            )}
            
            {showFilterSidebar && showLayerSidebar && (
              <div className="resize-handle vertical-resize" onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const rect = sidebarRef.current?.getBoundingClientRect();
                const startY = e.clientY;
                const startHeight = filterHeight;
                const sidebarHeight = rect?.height || 0;
                const onMove = (ev) => {
                  const dy = ev.clientY - startY;
                  const delta = (dy / sidebarHeight) * 100;
                  const newHeight = Math.max(20, Math.min(80, startHeight + delta));
                  setFilterHeight(newHeight);
                };
                const onUp = () => {
                  document.removeEventListener('mousemove', onMove);
                  document.removeEventListener('mouseup', onUp);
                  document.body.style.cursor = 'default';
                  document.body.style.userSelect = 'auto';
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
                document.body.style.cursor = 'ns-resize';
                document.body.style.userSelect = 'none';
              }}>
                <div className="handle-grip"></div>
              </div>
            )}
            
            {showLayerSidebar && !isMobile && (
              <div className="sidebar-section layer-card" style={{ flex: `${100 - filterHeight} 0 0` }}>
                <LayerPanel 
                  zoom={zoom}
                  layers={layers}
                  setLayers={setLayers}
                  onClose={() => setShowLayerSidebar(false)}
                  cookiesAccepted={cookiesAccepted}
                />  
              </div>
            )}
            
            <div className="resize-handle horizontal-resize" onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const startX = e.clientX;
              const startWidth = sidebarWidth;
              const onMove = (ev) => {
                const dx = ev.clientX - startX;
                const newWidth = Math.max(280, Math.min(window.innerWidth * 0.7, startWidth + dx));
                setSidebarWidth(newWidth);
              };
              const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                document.body.style.cursor = 'default';
                document.body.style.userSelect = 'auto';
              };
              document.addEventListener('mousemove', onMove);
              document.addEventListener('mouseup', onUp);
              document.body.style.cursor = 'ew-resize';
              document.body.style.userSelect = 'none';
            }}>
              <div className="handle-grip"></div>
            </div>
          </div>
        </>
      )}
      
      {selectedPost ? (
        <div className="right-sidebar-container" ref={rightSidebarRef} style={isMobile ? {} : { width: `${rightSidebarWidth}px` }}>
          <div className="resize-handle horizontal-resize left-side" onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startWidth = rightSidebarWidth;
            const onMove = (ev) => {
              const dx = startX - ev.clientX;
              const newWidth = Math.max(300, Math.min(window.innerWidth * 0.7, startWidth + dx));
              setRightSidebarWidth(newWidth);
            };
            const onUp = () => {
              document.removeEventListener('mousemove', onMove);
              document.removeEventListener('mouseup', onUp);
              document.body.style.cursor = 'default';
              document.body.style.userSelect = 'auto';
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
          }}>
            <div className="handle-grip"></div>
          </div>
          <div className="sidebar-section detail-card" style={isMobile && filterHeightPx > 0 ? { height: `${filterHeightPx}px`, minHeight: `${filterHeightPx}px`, maxHeight: `${filterHeightPx}px` } : {}}>
            <button className="close-button" onClick={() => setSelectedPost(null)}>×</button>
            <div className="detail-card-content">
              <div className="popup-header">
                <div className="title-bar">
                  <h3 className="popup-title">{selectedPost.title}</h3>
                  <p className="popup-address">
                    {selectedPost.address?.city && `${selectedPost.address.city}, `}
                    {selectedPost.address?.region && `${selectedPost.address.region}, `}
                    {selectedPost.address?.street}
                  </p>
                </div>
                <div className="price-area-container">
                  <span>Ár: {listingType === 'eladó' 
                    ? `${parseFloat(selectedPost.price).toFixed(1).replace(/\.0$/, '')} M Ft`
                    : `${parseFloat(selectedPost.rental_price).toFixed(1).replace(/\.0$/, '')} E Ft/hó`}
                  </span>
                  {selectedPost.area > 0 && <span>Terület: {selectedPost.area} m²</span>}
                </div>
              </div>
              <div className="detail-card-main-content">
                {Array.isArray(selectedPost.images) && selectedPost.images.length > 0 && (
                  <ImageGallery images={selectedPost.images.filter(img => img?.url).map(img => getFullImageUrl(img.url))} />
                )}
                <div className="description-column">
                  <p className="popup-description">{selectedPost.description || 'Nincs leírás.'}</p>
                  <div className="popup-actions">
                    <button onClick={() => {
                      if (cookiesAccepted && window.gtag) {
                        window.gtag('event', 'ad_view', {
                          post_id: selectedPost._id,
                          listing_type: selectedPost.listing_type,
                          price: selectedPost.price || selectedPost.rental_price,
                          value: 50,
                        });
                      }
                      const slug = generateSlug(selectedPost.title);
                      window.open(`/ingatlan/${selectedPost._id}/${slug}`, '_blank');
                    }} className="action-button view-button">Megtekintem</button>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      const postId = selectedPost._id;
                      const wasFavorite = isFavoritePost(postId);
                      if (wasFavorite) {
                        removeFavoritePost(postId);
                        setFavoritePosts(prev => new Set([...prev].filter(id => id !== postId)));
                      } else {
                        addFavoritePost(postId);
                        setFavoritePosts(prev => new Set([...prev, postId]));
                      }
                      if (cookiesAccepted && window.gtag) {
                        const eventName = wasFavorite ? 'remove_from_favorites' : 'add_to_favorites';
                        window.gtag('event', eventName, {
                          post_id: postId,
                          listing_type: selectedPost.listing_type || listingType,
                          price: selectedPost.price || selectedPost.rental_price || null,
                          type: selectedPost.type || null,
                        });
                      }
                      window.dispatchEvent(new Event('favoritesUpdated'));
                    }} className={`action-button favorite-button ${isFavoritePost(selectedPost._id) ? 'active' : ''}`}>
                      <img src={isFavoritePost(selectedPost._id) ? '/heart-filled.png' : '/heart-empty.png'} alt="Kedvenc" className="heart-icon" width={18} height={18} />
                    </button>
                  </div>
                </div>
              </div>
              {isAdmin && selectedPost && (
                <div className="admin-fb-queue-section">
                  <div>
                    <select value={selectedQuestionType} onChange={(e) => setSelectedQuestionType(e.target.value)}>
                      <option value="" disabled>Válassz...</option>
                      <option value="hiányzik">Hiányzik?</option>
                      <option value="laknál">Laknál itt?</option>
                      <option value="kedvenc">Kedvenc?</option>
                      <option value="megvennéd">Megvennéd?</option>
                    </select>
                    <button onClick={handleQueueToFacebook} disabled={!selectedQuestionType || isQueuing}>
                      {isQueuing ? '...' : 'Queue'}
                    </button>
                    {queueMessage && <p className={`text-${queueSuccess ? 'green' : 'red'}-600 visible`}>{queueMessage}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        !isMobile && isSmartToolsVisible && (
          <div className="right-sidebar-container" ref={rightSidebarRef} style={{ width: `${rightSidebarWidth}px` }}>
            <SmartToolsPanel 
              showDealColors={showDealColors}
              setShowDealColors={setShowDealColors}
              isStreetViewMode={isStreetViewMode}
              setIsStreetViewMode={setIsStreetViewMode}
              onClose={() => setIsSmartToolsVisible(false)}
              viewMode={viewMode}
              setViewMode={setViewMode}
              isMobile={isMobile}
              cookiesAccepted={cookiesAccepted}
            />
          </div>
        )
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
              selectedPost={selectedPost}
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
        
        {isMobile && viewMode === 'map' && (showLayerSidebar || isSmartToolsVisible) && (
          <div className="mobile-bottom-container" style={{ height: `${mobileBottomHeight}%`, minHeight: '15%', maxHeight: '60%' }}>
            <div className="mobile-resize-handle" onMouseDown={handleMobileResizeStart} onTouchStart={handleMobileResizeStart}>
              <div className="handle-grip"></div>
            </div>
            <div className={`mobile-layer-panel ${!showLayerSidebar ? 'closed' : ''}`}>
              <LayerPanel zoom={zoom} layers={layers} setLayers={setLayers} onClose={() => setShowLayerSidebar(false)} cookiesAccepted={cookiesAccepted} />
            </div>
            <div className={`mobile-smart-panel ${!isSmartToolsVisible ? 'closed' : ''}`}>
              <SmartToolsPanel 
                showDealColors={showDealColors}
                setShowDealColors={setShowDealColors}
                isStreetViewMode={isStreetViewMode}
                setIsStreetViewMode={setIsStreetViewMode}
                onClose={() => setIsSmartToolsVisible(false)}
                viewMode={viewMode}
                setViewMode={setViewMode}
                isMobile={isMobile}
                cookiesAccepted={cookiesAccepted}
              />
            </div>
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