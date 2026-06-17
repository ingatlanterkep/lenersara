'use client';

/**
 * Közvetlen GA4 esemény küldés - gtag prioritással
 * Ha elérhető a gtag, azzal küld (ez működik custom eventekre),
 * különben Measurement Protocol-lal próbálkozik.
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
    // 🔥 1. PRIORITÁS: gtag használata (ez működik custom eventekre)
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...eventParams,
        send_to: 'G-KWH607ZP7H'
      });
      console.log(`[DirectAnalytics] ✅ Elküldve (gtag): ${eventName}`, eventParams);
      return true;
    }

    // 2. FALLBACK: Measurement Protocol (ha nincs gtag)
    console.log(`[DirectAnalytics] gtag nem elérhető, Measurement Protocol használata: ${eventName}`);
    
    const measurementId = 'G-KWH607ZP7H';
    
    // Client ID lekérése a GA cookie-ból
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
    // Session ID és session count lekérése
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

    // Paraméterek összeállítása
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
    
    // Egyedi paraméterek (ep. prefix)
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`ep.${key}`, String(value));
      }
    });
    
    const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;
    
    // Küldés sendBeaconnel vagy fetch-el
    if (navigator.sendBeacon) {
      const blob = new Blob([params.toString()], { type: 'application/x-www-form-urlencoded' });
      const success = navigator.sendBeacon(url, blob);
      if (success) {
        console.log(`[DirectAnalytics] ✅ Elküldve (beacon): ${eventName}`, eventParams);
        return true;
      }
    }
    
    fetch(url, {
      method: 'POST',
      keepalive: true,
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }).catch(() => {});
    
    console.log(`[DirectAnalytics] ✅ Elküldve (measurement): ${eventName}`, eventParams);
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