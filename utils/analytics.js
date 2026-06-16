// src/utils/analytics.js

/**
 * Biztonságos analytics esemény küldés - contexten keresztül
 * Ezt a függvényt a komponensekben használd a useAnalytics hookkal
 */
export const sendAnalyticsEvent = (eventName, eventParams = {}, sendEventFn) => {
  if (typeof sendEventFn === 'function') {
    return sendEventFn(eventName, eventParams);
  }
  
  // Fallback: ha nincs sendEvent függvény, próbáljuk meg közvetlenül
  console.warn('[Analytics] sendEvent függvény nem elérhető, próbáljuk közvetlenül');
  
  if (typeof window === 'undefined') return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[Analytics] Kihagyva (nincs süti elfogadás): ${eventName}`);
    return false;
  }

  if (!window.gtag) {
    console.log(`[Analytics] gtag nem elérhető: ${eventName}`);
    return false;
  }

  try {
    window.gtag('event', eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
    console.log(`[Analytics] ✅ Elküldve: ${eventName}`, eventParams);
    return true;
  } catch (error) {
    console.error(`[Analytics] Hiba a küldés során (${eventName}):`, error);
    return false;
  }
};