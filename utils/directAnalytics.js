// src/utils/directAnalytics.js
'use client';

// 🔥 MODUL SZINTŰ VÁLTOZÓK
let sessionStarted = false;

// 🔥 EGYEDI CLIENT ID GENERÁLÁS - INKOGNITÓ BIZTOS
const getClientId = () => {
  if (typeof window === 'undefined') return 'anonymous';
  
  try {
    // 🔥 1. PRÓBÁLJUK LOCALSTORAGE-T (normál mód)
    let clientId = null;
    
    try {
      clientId = localStorage.getItem('ga_client_id');
      if (clientId) {
        console.log('[DirectAnalytics] ♻️ LocalStorage-ból:', clientId);
        return clientId;
      }
    } catch (e) {
      console.warn('[DirectAnalytics] localStorage nem elérhető (valószínűleg inkognitó)');
    }
    
    // 🔥 2. PRÓBÁLJUK SESSIONSTORAGE-T (inkognitóban is működik)
    try {
      clientId = sessionStorage.getItem('ga_client_id');
      if (clientId) {
        console.log('[DirectAnalytics] ♻️ SessionStorage-ból:', clientId);
        return clientId;
      }
    } catch (e) {
      console.warn('[DirectAnalytics] sessionStorage nem elérhető');
    }
    
    // 🔥 3. GENERÁLJUNK ÚJAT ÉS MENTSÜK EL MINDENHOVÁ
    if (crypto.randomUUID) {
      clientId = crypto.randomUUID();
    } else {
      // Fallback régi böngészőkre
      clientId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    console.log('[DirectAnalytics] 🆕 ÚJ Client ID generálva:', clientId);
    
    // 🔥 MENTSÜK EL MINDEN LEHETSÉGES TÁROLÓBA
    try {
      localStorage.setItem('ga_client_id', clientId);
    } catch (e) {
      // Inkognitóban ez dobhat hibát
    }
    
    try {
      sessionStorage.setItem('ga_client_id', clientId);
    } catch (e) {
      // Ha ez is hibát dob, akkor sajnos nem tudjuk tárolni
    }
    
    // 🔥 GA COOKIE GENERÁLÁSA (ha nincs)
    generateGaCookie();
    
    return clientId;
    
  } catch (error) {
    console.error('[DirectAnalytics] Client ID hiba:', error);
    // 🔥 ULTIMÁT FALLBACK - random ID memóriában
    return 'fallback-' + Math.random().toString(36).substring(2, 15);
  }
};

// 🔥 GA4 COOKIE GENERÁLÁS (ha nincs)
const generateGaCookie = () => {
  if (typeof document === 'undefined') return;
  
  try {
    // Ellenőrizzük, hogy van-e már _ga cookie
    if (document.cookie.includes('_ga=')) return;
    
    // Generáljunk egyet
    const timestamp = Math.floor(Date.now() / 1000);
    const random1 = Math.floor(Math.random() * 2147483647);
    const random2 = Math.floor(Math.random() * 2147483647);
    const gaValue = `GA1.1.${random1}.${random2}`;
    
    // 2 év expiráció
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 2);
    
    document.cookie = `_ga=${gaValue}; expires=${expiry.toUTCString()}; path=/; SameSite=Lax`;
    console.log('[DirectAnalytics] 🍪 GA cookie generálva:', gaValue);
  } catch (e) {
    console.warn('[DirectAnalytics] GA cookie generálási hiba:', e);
  }
};

// 🔥 MEGLÉVŐ GA COOKIE ELLENŐRZÉS
const getGaCookieClientId = () => {
  try {
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        return match[1] + '.' + match[2];
      }
    }
  } catch (e) {
    // Ha hiba van a cookie olvasásban, csendben tovább
  }
  return null;
};

// 🔥 GA4 GID COOKIE HASZNÁLATA
const getGidClientId = () => {
  try {
    const gidCookie = document.cookie.split(';').find(c => c.trim().startsWith('_gid='));
    if (gidCookie) {
      const match = gidCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        return match[1] + '.' + match[2];
      }
    }
  } catch (e) {}
  return null;
};

export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
    return false;
  }

  try {
    const measurementId = 'G-TG5FRRRT0B';
    
    // 🔥 1. PRÓBÁLJUK MEG A GA COOKIE-BÓL (ha létezik)
    let clientId = getGaCookieClientId();
    
    // 🔥 2. PRÓBÁLJUK A GID COOKIE-BÓL
    if (!clientId) {
      clientId = getGidClientId();
    }
    
    // 🔥 3. HA NINCS GA COOKIE, HASZNÁLJUK A SAJÁT GENERÁLTAT
    if (!clientId) {
      clientId = getClientId();
    }
    
    // 🔥 BIZTONSÁGI ELLENŐRZÉS: soha ne legyen 'anonymous'
    if (!clientId || clientId === 'anonymous') {
      clientId = getClientId(); // Újrapróbálkozás
    }
    
    // Session ID kezelés
    let sessionId = sessionStorage.getItem('ga_session_id');
    if (!sessionId) {
      sessionId = Math.floor(Date.now() / 1000).toString();
      sessionStorage.setItem('ga_session_id', sessionId);
    }
    
    // 🔥 SESSION START EVENT KÜLDÉSE (HA ÚJ SESSION)
    const isNewSession = !sessionStarted && !sessionStorage.getItem('ga_session_started');
    
    // Paraméterek összeállítása
    const params = new URLSearchParams();
    params.append('v', '2');
    params.append('tid', measurementId);
    params.append('cid', clientId);
    params.append('en', eventName);
    params.append('sid', sessionId);
    params.append('dl', window.location.href);
    params.append('dt', document.title);
    params.append('dr', document.referrer || '');
    params.append('ul', navigator.language || 'hu-hu');
    params.append('sr', `${window.screen.width}x${window.screen.height}`);
    
    // 🔥 HA ÚJ SESSION, KÜLDJÜK A _ss=1 PARAMÉTERT
    if (eventName === 'page_view' && isNewSession) {
      params.append('_ss', '1');
      sessionStarted = true;
      sessionStorage.setItem('ga_session_started', 'true');
      console.log('[DirectAnalytics] 🔥 ÚJ SESSION INDÍTVA - CID:', clientId);
    }
    
    // Custom paraméterek
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'number') {
          params.append(`epn.${key}`, String(value));
        } else {
          params.append(`ep.${key}`, String(value));
        }
      }
    });
    
    const url = `https://region1.google-analytics.com/g/collect?${params.toString()}`;
    
    console.log(`[DirectAnalytics] 📤 Küldés: ${eventName}`, {
      cid: clientId,
      sid: sessionId,
      isNewSession,
      url: url.substring(0, 200) + '...'
    });
    
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      keepalive: true,
      body: '',
    }).catch(() => {});
    
    return true;
    
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};

// 🔥 SEGÉDFÜGGVÉNYEK GLOBÁLISSÁ TÉTELE (debug-hoz)
if (typeof window !== 'undefined') {
  window.getCurrentClientId = () => {
    try {
      const gaId = getGaCookieClientId();
      if (gaId) return gaId;
      
      const gidId = getGidClientId();
      if (gidId) return gidId;
      
      const localId = localStorage.getItem('ga_client_id');
      if (localId) return localId;
      
      const sessionId = sessionStorage.getItem('ga_client_id');
      if (sessionId) return sessionId;
      
      return 'NINCS_CLIENT_ID';
    } catch (e) {
      return 'HIBA: ' + e.message;
    }
  };
  
  window.resetClientId = () => {
    try {
      localStorage.removeItem('ga_client_id');
      sessionStorage.removeItem('ga_client_id');
      document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      console.log('[DirectAnalytics] 🔄 Client ID és GA cookie-k resetelve');
    } catch (e) {
      console.warn('[DirectAnalytics] Reset hiba:', e);
    }
  };
  
  window.forceNewClientId = () => {
    const newId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36);
    try {
      localStorage.setItem('ga_client_id', newId);
      sessionStorage.setItem('ga_client_id', newId);
      generateGaCookie();
    } catch (e) {}
    console.log('[DirectAnalytics] 🔄 ÚJ Client ID kényszerítve:', newId);
    return newId;
  };
  
  window.analyticsDebug = {
    getClientId: window.getCurrentClientId,
    resetClientId: window.resetClientId,
    forceNewClientId: window.forceNewClientId,
    getCookies: () => {
      return document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key.startsWith('_ga') || key.startsWith('_gid')) {
          acc[key] = value;
        }
        return acc;
      }, {});
    },
    getStorage: () => {
      return {
        localStorage: localStorage.getItem('ga_client_id'),
        sessionStorage: sessionStorage.getItem('ga_client_id')
      };
    }
  };
}

// ... a többi export változatlan
export const sendPageView = (pageTitle, pageLocation) => {
  return sendDirectAnalyticsEvent('page_view', {
    page_title: pageTitle || document.title,
    page_location: pageLocation || window.location.href,
  });
};

export const sendLayerToggle = (layerName, state, activeLayers, zoom) => {
  return sendDirectAnalyticsEvent('layer_toggle', {
    layer_name: layerName,
    layer_state: state ? 'enabled' : 'disabled',
    active_layers: activeLayers || 'none',
    zoom_level: zoom || 7,
  });
};

export const sendGenerateLead = (leadType, postId, value = 100) => {
  return sendDirectAnalyticsEvent('generate_lead', {
    lead_type: leadType,
    post_id: postId,
    value: value,
    currency: 'HUF'
  });
};

export const sendViewItem = (post, postId) => {
  return sendDirectAnalyticsEvent('view_item', {
    items: JSON.stringify([{
      item_id: postId,
      item_name: post?.title || 'Unknown',
      price: post?.listing_type === 'eladó' ? post?.price : post?.rental_price,
      currency: 'HUF'
    }]),
    value: post?.listing_type === 'eladó' ? post?.price : post?.rental_price,
    currency: 'HUF'
  });
};

export const sendAIQuestion = (questionKey, questionText, postId, postType, listingType, price) => {
  return sendDirectAnalyticsEvent('ai_question', {
    question_key: questionKey,
    question_text: questionText,
    post_id: postId,
    post_type: postType || 'unknown',
    listing_type: listingType || 'unknown',
    price: price || 0
  });
};

export const sendFavoriteToggle = (postId, action, listingType, price, postType) => {
  return sendDirectAnalyticsEvent(`${action}_favorites`, {
    post_id: postId,
    listing_type: listingType || 'unknown',
    price: price || 0,
    type: postType || 'unknown',
    page_type: 'detail_page'
  });
};

export const sendContactClick = (contactType, postId, adId) => {
  return sendDirectAnalyticsEvent('contact_click', {
    contact_type: contactType,
    post_id: postId,
    ad_id: adId || 'unknown',
    content_category: 'property_contact'
  });
};

export const sendScroll = (percentScrolled) => {
  return sendDirectAnalyticsEvent('scroll', {
    percent_scrolled: percentScrolled
  });
};

export const sendFirstVisit = () => {
  return sendDirectAnalyticsEvent('first_visit', {
    timestamp: new Date().toISOString()
  });
};

// 🔥 INICIALIZÁLÁS
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // GA cookie generálás, ha nincs
  generateGaCookie();
  
  // Client ID előkészítés
  const clientId = getClientId();
  console.log('[DirectAnalytics] 🚀 Analitika inicializálva - Client ID:', clientId);
};