// src/utils/analytics.js

/**
 * Biztonságos analytics esemény küldés
 * @param {string} eventName - Az esemény neve
 * @param {Object} eventParams - Az esemény paraméterei
 * @param {boolean} cookiesAccepted - A süti elfogadás állapota
 * @returns {boolean} - Sikeres volt-e a küldés
 */
export const sendAnalyticsEvent = (eventName, eventParams = {}, cookiesAccepted = false) => {
  // 1. Ellenőrizzük a süti elfogadást
  if (!cookiesAccepted) {
    console.log(`[Analytics] Kihagyva (nincs süti elfogadás): ${eventName}`);
    return false;
  }

  // 2. Ellenőrizzük a gtag elérhetőségét
  if (typeof window === 'undefined' || !window.gtag) {
    console.log(`[Analytics] Kihagyva (gtag nem elérhető): ${eventName}`);
    
    // Próbáljuk meg betölteni a gtag-et
    try {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
      script.async = true;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'G-KWH607ZP7H');
      
      // Újrapróbálkozás a betöltés után
      setTimeout(() => {
        if (window.gtag) {
          window.gtag('event', eventName, eventParams);
          console.log(`[Analytics] ✅ Késleltetve elküldve: ${eventName}`);
        }
      }, 500);
      
      return true;
    } catch (error) {
      console.error('[Analytics] Hiba a gtag betöltésekor:', error);
      return false;
    }
  }

  // 3. ESEMÉNY KÜLDÉSE
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
    cookiesAccepted
  );
};