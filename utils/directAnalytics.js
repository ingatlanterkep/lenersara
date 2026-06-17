// src/utils/directAnalytics.js
'use client';

export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
    return false;
  }

  try {
    // 🔥 1. ELSŐSORBAN GTAG HASZNÁLATA
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
      console.log(`[DirectAnalytics] ✅ Elküldve (gtag): ${eventName}`, eventParams);
      return true;
    }
    
    // 🔥 2. FALLBACK: HA NINCS GTAG, AKKOR SAJÁT KÉRÉS
    console.warn('[DirectAnalytics] ⚠️ gtag nem elérhető, fallback módszer');
    
    const measurementId = 'G-KWH607ZP7H';
    
    // Client ID lekérése
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
    // 🔥 PARAMÉTEREK - POST kéréshez (mint a sikeres példában)
    const params = new URLSearchParams();
    params.append('v', '2');
    params.append('tid', measurementId);
    params.append('cid', clientId);
    params.append('en', eventName);
    params.append('_p', Date.now().toString());
    params.append('gcd', '13l3l3l2l1l1');
    params.append('npa', '1');
    params.append('dma_cps', 'a');
    params.append('dma', '1');
    params.append('_eu', 'AAAAAAQ');
    params.append('are', '1');
    params.append('frm', '0');
    params.append('pscdl', 'noapi');
    params.append('rcb', '7');
    params.append('sr', `${window.screen.width}x${window.screen.height}`);
    params.append('ul', navigator.language || 'hu-hu');
    params.append('dl', window.location.href);
    params.append('dt', document.title);
    
    // Session adatok
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
    }
    params.append('sid', sessionId);
    params.append('sct', sessionCount);
    params.append('_s', sessionCount);
    params.append('seg', '0');
    
    // Egyedi paraméterek
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'number') {
          params.append(`epn.${key}`, String(value));
        } else {
          params.append(`ep.${key}`, String(value));
        }
      }
    });
    
    // 🔥 POST KÉRÉS KÜLDÉSE (ugyanúgy, ahogy a GA4 teszi)
    const url = `https://region1.google-analytics.com/g/collect?${params.toString()}`;
    
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      keepalive: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: '', // Üres body, minden paraméter az URL-ben van
    });
    
    console.log(`[DirectAnalytics] ✅ Elküldve (fallback POST): ${eventName}`, eventParams);
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
  return sendDirectAnalyticsEvent('layer_toggle', {
    layer_name: layerName,
    layer_state: state ? 'enabled' : 'disabled',
    active_layers: activeLayers || 'none',
    zoom_level: zoom || 7,
  });
};