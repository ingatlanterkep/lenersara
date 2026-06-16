// src/utils/directAnalytics.js
'use client';

/**
 * Közvetlen GA4 esemény küldés fetch-el
 * Nem függ a gtag-től, közvetlenül a GA4 API-nak küld
 */
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
    
    // 3. Session ID generálása (ha nincs)
    let sessionId = window._ga_session_id;
    if (!sessionId) {
      sessionId = Math.floor(Date.now() / 1000).toString();
      window._ga_session_id = sessionId;
    }
    
    // 4. Paraméterek összeállítása
    const params = new URLSearchParams();
    params.append('v', '2'); // GA4 protocol version
    params.append('tid', measurementId); // Measurement ID
    params.append('cid', clientId); // Client ID
    params.append('en', eventName); // Event name
    params.append('_s', '1'); // Session count
    params.append('_ss', '1'); // Session start
    params.append('sid', sessionId); // Session ID
    params.append('sct', '1'); // Session count
    params.append('seg', '1'); // Segment
    params.append('dl', window.location.href); // Document location
    params.append('dt', document.title); // Document title
    params.append('dr', document.referrer || ''); // Document referrer
    params.append('ul', navigator.language || 'hu-hu'); // User language
    params.append('sr', `${window.screen.width}x${window.screen.height}`); // Screen resolution
    params.append('_et', '0'); // Engagement time
    
    // 5. Egyedi paraméterek hozzáadása (ep. prefix)
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`ep.${key}`, String(value));
      }
    });
    
    // 🔥 6. KÜLDÉS
    const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;
    
    // 🔥 NO-CORS módban küldjük, hogy ne blokkolja a böngésző
    fetch(url, {
      method: 'POST',
      keepalive: true,
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch(() => {
      // no-cors módban nem látjuk a választ, de a fetch nem dob hibát
    });
    
    console.log(`[DirectAnalytics] ✅ Elküldve: ${eventName}`, eventParams);
    console.log(`[DirectAnalytics] 📤 URL: ${url}`);
    return true;
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};

/**
 * Page view küldés
 */
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