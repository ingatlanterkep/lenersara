// src/context/AnalyticsContext.js
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [isGtagLoaded, setIsGtagLoaded] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkIntervalRef = useRef(null);
  const pendingEventsRef = useRef([]);
  const isGtagLoadingRef = useRef(false);
  const gaMeasurementId = 'G-KWH607ZP7H';

  // 🔥 Gtag inicializálás - EGYSZERŰSÍTETT verzió
  const initGtag = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.gtag) {
      setIsGtagLoaded(true);
      return true;
    }

    try {
      console.log('[AnalyticsContext] GA4 inicializálása...');
      
      // DataLayer inicializálás
      if (!window.dataLayer) {
        window.dataLayer = [];
      }

      // Gtag függvény definiálása
      window.gtag = function(...args) {
        window.dataLayer.push(args);
        console.log('[AnalyticsContext] gtag hívva:', args);
      };

      // GA4 konfiguráció
      window.gtag('js', new Date());
      window.gtag('config', gaMeasurementId, {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure',
        cookie_domain: 'auto',
        cookie_expires: 63072000, // 2 év
      });

      setIsGtagLoaded(true);
      console.log('[AnalyticsContext] ✅ GA4 inicializálva');
      
      // 🔥 Küldjünk egy page_view eseményt
      window.gtag('event', 'page_view', {
        page_title: document.title || 'Ingatlan-Térkép',
        page_location: window.location.href,
      });
      
      return true;
    } catch (error) {
      console.error('[AnalyticsContext] ❌ GA4 inicializálási hiba:', error);
      return false;
    }
  }, [gaMeasurementId]);

  // 🔥 Gtag script betöltés
  const loadGtagScript = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (isGtagLoadingRef.current) return;
    if (document.querySelector('script[src*="gtag/js"]')) {
      isGtagLoadingRef.current = true;
      // Ha a script már létezik, próbáljuk inicializálni
      setTimeout(() => {
        if (!window.gtag) {
          initGtag();
        }
      }, 500);
      return;
    }

    console.log('[AnalyticsContext] GA4 script betöltése...');
    isGtagLoadingRef.current = true;
    
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    script.async = true;
    script.onload = () => {
      console.log('[AnalyticsContext] ✅ GA4 script betöltve');
      initGtag();
      isGtagLoadingRef.current = false;
      // Függőben lévő események küldése
      flushPendingEvents();
    };
    script.onerror = () => {
      console.error('[AnalyticsContext] ❌ GA4 script betöltési hiba');
      isGtagLoadingRef.current = false;
      // Ha a script nem töltődik be, próbáljuk közvetlenül
      setTimeout(() => {
        if (!window.gtag) {
          initGtag();
        }
      }, 1000);
    };
    document.head.appendChild(script);
  }, [gaMeasurementId, initGtag]);

  // 🔥 Cookie ellenőrzés
  const checkCookieConsent = useCallback(() => {
    if (typeof document === 'undefined') return false;
    
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    if (hasConsent !== cookiesAccepted) {
      console.log(`[AnalyticsContext] Cookie állapot változás: ${cookiesAccepted} -> ${hasConsent}`);
      setCookiesAccepted(hasConsent);
      
      if (hasConsent) {
        // Próbáljuk betölteni a gtag-et
        if (!window.gtag) {
          loadGtagScript();
        } else {
          initGtag();
        }
        setTimeout(() => flushPendingEvents(), 500);
      }
    }
    return hasConsent;
  }, [cookiesAccepted, loadGtagScript, initGtag]);

  // 🔥 Függőben lévő események küldése
  const flushPendingEvents = useCallback(() => {
    if (!window.gtag || pendingEventsRef.current.length === 0) return;
    
    const events = [...pendingEventsRef.current];
    pendingEventsRef.current = [];
    
    events.forEach(({ eventName, eventParams }) => {
      try {
        window.gtag('event', eventName, {
          ...eventParams,
          timestamp: new Date().toISOString(),
        });
        console.log(`[Analytics] ✅ Függőben lévő esemény elküldve: ${eventName}`, eventParams);
      } catch (error) {
        console.error(`[Analytics] Hiba a függőben lévő esemény küldésekor (${eventName}):`, error);
        // Ha hiba van, tegyük vissza a sorba
        pendingEventsRef.current.push({ eventName, eventParams });
      }
    });
  }, []);

  // 🔥 Kezdeti ellenőrzés
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    console.log(`[AnalyticsContext] Kezdeti cookie állapot: ${hasConsent}`);
    setCookiesAccepted(hasConsent);
    setIsLoading(false);
    
    if (hasConsent) {
      loadGtagScript();
    }
    
    // 🔥 Rendszeres ellenőrzés (minden 500ms)
    checkIntervalRef.current = setInterval(() => {
      checkCookieConsent();
    }, 500);
    
    // 🔥 Figyeljük a custom event-et
    const handleCookieUpdate = () => {
      console.log('[AnalyticsContext] 🔔 cookieConsentUpdated esemény fogadva');
      checkCookieConsent();
    };
    window.addEventListener('cookieConsentUpdated', handleCookieUpdate);
    
    // 🔥 Figyeljük a storage változást
    const handleStorageChange = (e) => {
      if (e.key === 'ingatlanTerkepCookieConsent') {
        console.log('[AnalyticsContext] Storage változás:', e.newValue);
        checkCookieConsent();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      window.removeEventListener('cookieConsentUpdated', handleCookieUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkCookieConsent, loadGtagScript]);

  // 🔥 Biztonságos esemény küldés
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    console.log(`[Analytics] sendEvent hívva: ${eventName}`, { 
      cookiesAccepted,
      hasConsent,
      gtagExists: !!window.gtag,
      isGtagLoaded,
    });
    
    if (!hasConsent) {
      console.log(`[Analytics] ⛔ Kihagyva (nincs süti elfogadás): ${eventName}`);
      return false;
    }

    if (hasConsent !== cookiesAccepted) {
      setCookiesAccepted(hasConsent);
    }

    // 🔥 Ha nincs gtag, próbáljuk betölteni
    if (!window.gtag) {
      console.log(`[Analytics] ⏳ gtag nem elérhető, esemény sorba rakva: ${eventName}`);
      pendingEventsRef.current.push({ eventName, eventParams });
      loadGtagScript();
      
      // Próbáljuk újra 500ms múlva
      setTimeout(() => {
        if (window.gtag && pendingEventsRef.current.length > 0) {
          flushPendingEvents();
        }
      }, 500);
      
      return false;
    }

    // 🔥 ESEMÉNY KÜLDÉSE
    try {
      // 🔥 Biztosítsuk, hogy a config be van állítva
      if (!window._ga_configured) {
        window.gtag('config', 'G-KWH607ZP7H', {
          send_page_view: false,
          cookie_flags: 'SameSite=None;Secure',
        });
        window._ga_configured = true;
      }
      
      window.gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
        send_to: 'G-KWH607ZP7H', // 🔥 KÜLÖN MEGADJUK A CÉLT!
      });
      
      console.log(`[Analytics] ✅ Elküldve: ${eventName}`, eventParams);
      return true;
    } catch (error) {
      console.error(`[Analytics] ❌ Hiba a küldés során (${eventName}):`, error);
      return false;
    }
  }, [cookiesAccepted, loadGtagScript, flushPendingEvents, isGtagLoaded]);

  return (
    <AnalyticsContext.Provider value={{
      cookiesAccepted,
      isGtagLoaded,
      isLoading,
      sendEvent,
      refreshConsent: checkCookieConsent,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};