// src/utils/directAnalytics.js - hibrid megoldás

export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
    return false;
  }

  try {
    let success = false;
    
    // 1. Próbáljuk gtag-gel (ez a legmegbízhatóbb custom eventekhez)
    if (window.gtag) {
      try {
        window.gtag('event', eventName, {
          ...eventParams,
          send_to: 'G-KWH607ZP7H'
        });
        console.log(`[DirectAnalytics] ✅ Elküldve (gtag): ${eventName}`, eventParams);
        success = true;
      } catch (gtagError) {
        console.warn('[DirectAnalytics] gtag hiba, próbálom Measurement Protocol-lal:', gtagError);
      }
    }
    
    // 2. Mindig küldjük Measurement Protocol-lal is (kettős küldés)
    // Ez biztosítja, hogy a GA4 DebugView-ban is látszódjon
    const measurementId = 'G-KWH607ZP7H';
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
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
    
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`ep.${key}`, String(value));
      }
    });
    
    const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;
    
    if (navigator.sendBeacon) {
      const blob = new Blob([params.toString()], { type: 'application/x-www-form-urlencoded' });
      navigator.sendBeacon(url, blob);
    } else {
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
    }
    
    console.log(`[DirectAnalytics] ✅ Elküldve (measurement): ${eventName}`, eventParams);
    return true;
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};