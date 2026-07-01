// src/utils/directAnalytics.js
'use client';

// 🔥 MODUL SZINTŰ VÁLTOZÓK
let sessionStarted = false;

// 🔥 EGYEDI CLIENT ID GENERÁLÁS
const getClientId = () => {
  if (typeof window === 'undefined') return 'anonymous';
  
  try {
    // Ellenőrizzük, hogy van-e már mentett client ID
    let clientId = localStorage.getItem('ga_client_id');
    
    if (!clientId) {
      // 🔥 Új egyedi azonosító generálása
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
      
      localStorage.setItem('ga_client_id', clientId);
      console.log('[DirectAnalytics] 🆕 Új Client ID generálva:', clientId);
    } else {
      console.log('[DirectAnalytics] ♻️ Meglévő Client ID használata:', clientId);
    }
    
    return clientId;
  } catch (error) {
    // Ha a localStorage nem elérhető (pl. incognito módban), használjunk sessionStorage-t
    console.warn('[DirectAnalytics] localStorage hiba, sessionStorage használata:', error);
    
    try {
      let clientId = sessionStorage.getItem('ga_client_id');
      if (!clientId) {
        clientId = 'tmp-' + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('ga_client_id', clientId);
      }
      return clientId;
    } catch (e) {
      return 'anonymous-' + Math.random().toString(36).substring(2, 10);
    }
  }
};

// 🔥 MEGLÉVŐ GA COOKIE ELLENŐRZÉS (opcionális)
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
    
    // 🔥 2. HA NINCS GA COOKIE, HASZNÁLJUK A SAJÁT GENERÁLTAT
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

// 🔥 SEGÉDFÜGGVÉNY: Client ID lekérdezése (debug célra)
export const getCurrentClientId = () => {
  if (typeof window === 'undefined') return null;
  
  // Először próbáljuk a GA cookie-t
  const gaId = getGaCookieClientId();
  if (gaId) return gaId;
  
  // Ha nincs, akkor a sajátunkat
  try {
    return localStorage.getItem('ga_client_id') || sessionStorage.getItem('ga_client_id') || null;
  } catch {
    return null;
  }
};

// 🔥 RESET FUNKCIÓ (teszteléshez)
export const resetClientId = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('ga_client_id');
    sessionStorage.removeItem('ga_client_id');
    console.log('[DirectAnalytics] 🔄 Client ID resetelve');
  } catch (e) {
    console.warn('[DirectAnalytics] Reset hiba:', e);
  }
};

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