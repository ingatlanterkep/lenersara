// src/utils/analytics.js

/**
 * Ellenőrzi, hogy elfogadta-e a sütiket
 */
const checkCookiesAccepted = () => {
  // 1. Ellenőrizzük a cookie-t
  if (typeof document !== 'undefined') {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (hasConsent) return true;
  }
  
  // 2. Ellenőrizzük a localStorage-t (ha esetleg ott is tároljuk)
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('cookieConsent');
    if (stored === 'true') return true;
  }
  
  return false;
};

/**
 * Biztonságos analytics esemény küldés - automatikusan ellenőrzi a cookie-t
 */
export const sendAnalyticsEvent = (eventName, eventParams = {}, cookiesAccepted = null) => {
  // Ha nincs átadva, ellenőrizzük magunktól
  const hasConsent = cookiesAccepted !== null ? cookiesAccepted : checkCookiesAccepted();
  
  if (!hasConsent) {
    console.log(`[Analytics] Kihagyva (nincs süti elfogadás): ${eventName}`);
    return false;
  }

  // Ellenőrizzük a gtag elérhetőségét
  if (typeof window === 'undefined' || !window.gtag) {
    console.log(`[Analytics] gtag nem elérhető, próbálom betölteni: ${eventName}`);
    
    try {
      // GA4 betöltése
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
      script.async = true;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'G-KWH607ZP7H');
      
      // Késleltetett küldés
      setTimeout(() => {
        if (window.gtag) {
          window.gtag('event', eventName, {
            ...eventParams,
            timestamp: new Date().toISOString(),
          });
          console.log(`[Analytics] ✅ Késleltetve elküldve: ${eventName}`);
        }
      }, 500);
      
      return true;
    } catch (error) {
      console.error('[Analytics] Hiba a gtag betöltésekor:', error);
      return false;
    }
  }

  // ESEMÉNY KÜLDÉSE
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

/**
 * Réteg váltás esemény küldése
 */
export const sendLayerToggleEvent = (layerKey, newState, activeLayers, cookiesAccepted) => {
  return sendAnalyticsEvent(
    'layer_toggle',
    {
      layer_name: layerKey,
      layer_state: newState ? 'enabled' : 'disabled',
      active_layers: activeLayers || 'none',
    },
    cookiesAccepted // Ha null, automatikusan ellenőrzi
  );
};