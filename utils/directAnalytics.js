// src/utils/directAnalytics.js
'use client';

export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  // 1. Cookie ellenőrzés
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
    return false;
  }

  try {
    const measurementId = 'G-KWH607ZP7H';
    
    // 2. Client ID lekérése a GA cookie-ból
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
    // 3. Session ID és session count lekérése
    let sessionId = '';
    let sessionCount = '1';
    const gaSessionCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga_'));
    if (gaSessionCookie) {
      const match = gaSessionCookie.match(/GS1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        sessionId = match[1];
        sessionCount = match[2];
      }
    }
    
    if (!sessionId) {
      sessionId = Math.floor(Date.now() / 1000).toString();
      sessionCount = '1';
    }

    // 4. Paraméterek összeállítása - GET kéréshez
    const params = new URLSearchParams();
    params.append('v', '2');
    params.append('tid', measurementId);
    params.append('cid', clientId);
    params.append('en', eventName);
    params.append('_s', sessionCount);
    params.append('sid', sessionId);
    params.append('sct', sessionCount);
    params.append('seg', '1');
    params.append('dl', window.location.href);
    params.append('dt', document.title);
    params.append('dr', document.referrer || '');
    params.append('ul', navigator.language || 'hu-hu');
    params.append('sr', `${window.screen.width}x${window.screen.height}`);
    params.append('_et', '0');
    params.append('_p', '1');
    
    if (sessionCount === '1') {
      params.append('_ss', '1');
    }
    
    // Egyedi paraméterek
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`ep.${key}`, String(value));
      }
    });
    
    // 🔥 FONTOS: GET kérést küldünk a /g/collect végpontra
    const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;
    
    // 🔥 Mindig GET-et használjunk a /g/collect végponthoz
    // Használjuk a navigator.sendBeacon-t GET kéréssel
    if (navigator.sendBeacon) {
      // sendBeacon csak POST-ot támogat, de a /g/collect GET-et vár
      // Ezért inkább fetch-et használunk GET methoddal
      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        keepalive: true,
      }).catch(() => {
        // no-cors módban nem látjuk a választ
      });
      
      console.log(`[DirectAnalytics] ✅ Elküldve (GET): ${eventName}`, eventParams);
      return true;
    }
    
    // Fallback: Image request (legmegbízhatóbb)
    const img = new Image();
    img.src = url;
    img.onload = () => {
      console.log(`[DirectAnalytics] ✅ Elküldve (Image): ${eventName}`);
    };
    img.onerror = () => {
      console.log(`[DirectAnalytics] ⚠️ Image betöltési hiba (de lehet, hogy elküldve): ${eventName}`);
    };
    
    return true;
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};

// ... a többi export változatlan
export const sendPageView = (pageTitle, pageLocation) => {
  return sendDirectAnalyticsEvent('page_view', {
    page_title: pageTitle || document.title,
    page_location: pageLocation || window.location.href,
  });
};

/**
 * Layer toggle esemény
 */
export const sendLayerToggle = (layerName, state, activeLayers, zoom) => {
  return sendDirectAnalyticsEvent('layer_toggle', {
    layer_name: layerName,
    layer_state: state ? 'enabled' : 'disabled',
    active_layers: activeLayers || 'none',
    zoom_level: zoom || 7,
  });
};