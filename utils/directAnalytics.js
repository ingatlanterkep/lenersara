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
    const measurementId = 'G-KWH607ZP7H';
    
    // Client ID lekérése a _ga cookie-ból
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
    // Session ID lekérése
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

    // 🔥 PARAMÉTEREK - a sikeres GET kérés mintájára
    const params = new URLSearchParams();
    params.append('v', '2');
    params.append('tid', measurementId);
    params.append('cid', clientId);
    params.append('en', eventName);
    params.append('_s', sessionCount);
    params.append('sid', sessionId);
    params.append('sct', sessionCount);
    params.append('seg', '0');
    params.append('dl', window.location.href);
    params.append('dt', document.title);
    params.append('dr', document.referrer || '');
    params.append('ul', navigator.language || 'hu-hu');
    params.append('sr', `${window.screen.width}x${window.screen.height}`);
    params.append('_et', '0');
    params.append('_p', '1');
    params.append('_ss', '1');
    
    // 🔥 HIÁNYZÓ PARAMÉTEREK a sikeres kérésből
    params.append('gcd', '13l3l3l2l1l1');
    params.append('npa', '1');
    params.append('dma_cps', 'a');
    params.append('dma', '1');
    params.append('_eu', 'AEAAAAQ');
    params.append('ae', 'a');
    params.append('are', '1');
    params.append('frm', '0');
    params.append('pscdl', 'noapi');
    params.append('rcb', '1');
    
    // User agent adatok
    const ua = navigator.userAgent;
    params.append('uaa', '');
    params.append('uab', '64');
    params.append('uafvl', '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"');
    params.append('uam', 'Nexus 5');
    params.append('uamb', '1');
    params.append('uap', 'Android');
    params.append('uapv', '6.0');
    params.append('uaw', '0');
    
    // Tag exp
    params.append('tag_exp', '115938465~115938468~118395334~119392696~119392704~119456239~119456247');
    
    // Egyedi paraméterek
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Ha szám, akkor epn., ha string, akkor ep.
        if (typeof value === 'number') {
          params.append(`epn.${key}`, String(value));
        } else {
          params.append(`ep.${key}`, String(value));
        }
      }
    });
    
    // 🔥 IMAGE REQUEST - ez a legmegbízhatóbb módja a GA4 események küldésének
    // A region1.google-analytics.com-ot használjuk a sikeres kérés mintájára
    const url = `https://region1.google-analytics.com/g/collect?${params.toString()}`;
    
    // 🔥 Image objektummal küldjük - nincs CORS probléma
    const img = new Image(1, 1);
    img.src = url;
    
    // Nem kell várni a válaszra, az Image betöltése automatikusan elküldi a kérést
    console.log(`[DirectAnalytics] ✅ Elküldve (Image): ${eventName}`, eventParams);
    
    // Memory leak megelőzése
    setTimeout(() => {
      img.src = '';
    }, 10000);
    
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