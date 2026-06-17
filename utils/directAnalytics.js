'use client';

export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;

  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[Analytics] ⛔ Nincs consent: ${eventName}`);
    return false;
  }

  try {
    // 1. Elsődleges: gtag (ajánlott)
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...eventParams,
        send_to: 'G-KWH607ZP7H'
      });
      console.log(`[Analytics] ✅ gtag elküldve: ${eventName}`, eventParams);
      return true;
    }

    // 2. Tartalék: Measurement Protocol
    console.warn('[Analytics] gtag nincs → Measurement Protocol');
    
    const measurementId = 'G-KWH607ZP7H';
    const clientId = getOrCreateClientId();
    const sessionId = getOrCreateSessionId();

    const params = new URLSearchParams({
      v: '2',
      tid: measurementId,
      cid: clientId,
      en: eventName,
      sid: sessionId,
      _s: '1',
      sct: '1',
      seg: '1',
      dl: window.location.href,
      dt: document.title,
      ul: navigator.language || 'hu-hu',
      sr: `${window.screen.width}x${window.screen.height}`,
    });

    Object.entries(eventParams).forEach(([key, value]) => {
      if (value != null) params.append(`ep.${key}`, String(value));
    });

    const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([], { type: 'text/plain' }));
    } else {
      fetch(url, { 
        method: 'POST', 
        keepalive: true, 
        mode: 'no-cors' 
      });
    }

    console.log(`[Analytics] ✅ MP elküldve: ${eventName}`);
    return true;
  } catch (e) {
    console.error('[Analytics] Hiba:', e);
    return false;
  }
};

// === HIÁNYZÓ FÜGGVÉNYEK ===
export const sendPageView = (pageTitle, pageLocation) => {
  return sendDirectAnalyticsEvent('page_view', {
    page_title: pageTitle || document.title,
    page_location: pageLocation || window.location.href,
  });
};

export const sendLayerToggle = (layerName, state, activeLayers, zoom = 7) => {
  return sendDirectAnalyticsEvent('layer_toggle', {
    layer_name: layerName,
    layer_state: state ? 'enabled' : 'disabled',
    active_layers: activeLayers || 'none',
    zoom_level: zoom,
  });
};

// Segédfüggvények
function getOrCreateClientId() {
  let cid = 'anonymous';
  const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
  if (gaCookie) {
    const match = gaCookie.match(/GA1\.\d+\.(.+)/);
    if (match) cid = match[1];
  }
  return cid;
}

function getOrCreateSessionId() {
  let sid = Date.now().toString();
  const sessionCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga_'));
  if (sessionCookie) {
    const match = sessionCookie.match(/GS1\.\d+\.(\d+)\./);
    if (match) sid = match[1];
  }
  return sid;
}