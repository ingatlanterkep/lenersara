// src/utils/directAnalytics.js
'use client';

// src/utils/directAnalytics.js - hibrid megoldás

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
    
    // 3. Session ID és session count lekérése a _ga cookie-ból
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
    
    // Ha nincs session cookie, generáljunk egyet
    if (!sessionId) {
      sessionId = Math.floor(Date.now() / 1000).toString();
      sessionCount = '1';
    }

    // 4. Paraméterek összeállítása
    const params = new URLSearchParams();
    params.append('v', '2'); // GA4 protocol version
    params.append('tid', measurementId); // Measurement ID
    params.append('cid', clientId); // Client ID
    params.append('en', eventName); // Event name
    
    // 🔥 SESSION PARAMÉTEREK - helyesen
    params.append('_s', sessionCount); // Session count
    params.append('sid', sessionId); // Session ID
    params.append('sct', sessionCount); // Session count
    params.append('seg', '1'); // Segment
    params.append('dl', window.location.href); // Document location
    params.append('dt', document.title); // Document title
    params.append('dr', document.referrer || ''); // Document referrer
    params.append('ul', navigator.language || 'hu-hu'); // User language
    params.append('sr', `${window.screen.width}x${window.screen.height}`); // Screen resolution
    params.append('_et', '0'); // Engagement time
    
    // 🔥 PRIVACY PARAMÉTER - EZ HIÁNYZOTT!
    params.append('_p', '1'); // Privacy: 1 = consented
    
    // Csak akkor küldjük a _ss paramétert, ha ez az első kérés
    if (sessionCount === '1') {
      params.append('_ss', '1');
    }
    
    // 5. Egyedi paraméterek hozzáadása (ep. prefix)
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`ep.${key}`, String(value));
      }
    });
    
    // 🔥 6. KÜLDÉS - POST helyett GET, mert a GA4 a GET-et preferálja a collect végponthoz
    const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;
    
    // 🔥 Használjunk navigator.sendBeacon-t a megbízhatóbb küldésért
    if (navigator.sendBeacon) {
      const blob = new Blob([params.toString()], { type: 'application/x-www-form-urlencoded' });
      const success = navigator.sendBeacon(url, blob);
      if (success) {
        console.log(`[DirectAnalytics] ✅ Elküldve (beacon): ${eventName}`, eventParams);
        return true;
      }
    }
    
    // Ha a beacon nem sikerült, használjuk a fetch-et
    fetch(url, {
      method: 'POST',
      keepalive: true,
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }).catch(() => {
      // no-cors módban nem látjuk a választ
    });
    
    console.log(`[DirectAnalytics] ✅ Elküldve (fetch): ${eventName}`, eventParams);
    return true;
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};


export const sendPageView = (pageTitle, pageLocation) => {
  return sendDirectAnalyticsEvent('page_view', {
    page_title: pageTitle || document.title,
    page_location: pageLocation || window.location.href,
  });
};

export const sendLayerToggle = (layerName, state, activeLayers, zoom) => {
  if (typeof window === 'undefined' || !window.gtag) return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) return false;

  try {
    window.gtag('event', 'layer_toggle', {
      layer_name: layerName,
      layer_state: state ? 'enabled' : 'disabled',
      active_layers: activeLayers || 'none',
      zoom_level: zoom || 7,
    });
    console.log(`[Analytics] ✅ layer_toggle elküldve gtag-gel: ${layerName}`);
    return true;
  } catch (error) {
    console.error('[Analytics] Hiba a gtag küldésnél:', error);
    return false;
  }
};