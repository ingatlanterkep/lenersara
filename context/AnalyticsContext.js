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

  // 🔥 Cookie ellenőrzés
  const checkCookieConsent = useCallback(() => {
    if (typeof document === 'undefined') return false;
    
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    if (hasConsent !== cookiesAccepted) {
      console.log(`[AnalyticsContext] Cookie állapot változás: ${cookiesAccepted} -> ${hasConsent}`);
      setCookiesAccepted(hasConsent);
    }
    return hasConsent;
  }, [cookiesAccepted]);

  // 🔥 Gtag állapot ellenőrzése - NEM írjuk felül!
  const checkGtagStatus = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Ha már létezik gtag, csak jelezzük
    if (window.gtag) {
      if (!isGtagLoaded) {
        console.log('[AnalyticsContext] ✅ gtag már betöltve (külsőleg)');
        setIsGtagLoaded(true);
        // Függőben lévő események küldése
        setTimeout(() => flushPendingEvents(), 100);
      }
      return;
    }
    
    // Ha nincs gtag, de a script már betöltődött, próbáljuk inicializálni
    if (document.querySelector('script[src*="gtag/js"]')) {
      console.log('[AnalyticsContext] GA4 script betöltve, inicializálás...');
      try {
        if (!window.dataLayer) {
          window.dataLayer = [];
        }
        window.gtag = function(...args) {
          window.dataLayer.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', 'G-KWH607ZP7H', {
          send_page_view: true,
          cookie_flags: 'SameSite=None;Secure'
        });
        setIsGtagLoaded(true);
        console.log('[AnalyticsContext] ✅ GA4 inicializálva');
        flushPendingEvents();
      } catch (error) {
        console.error('[AnalyticsContext] ❌ GA4 inicializálási hiba:', error);
      }
    }
  }, [isGtagLoaded]);

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
    
    // Ellenőrizzük a gtag állapotát
    setTimeout(checkGtagStatus, 500);
    
    // 🔥 Rendszeres ellenőrzés (minden 1 másodperc)
    checkIntervalRef.current = setInterval(() => {
      checkCookieConsent();
      checkGtagStatus();
    }, 1000);
    
    // 🔥 Figyeljük a custom event-et
    const handleCookieUpdate = () => {
      console.log('[AnalyticsContext] 🔔 cookieConsentUpdated esemény fogadva');
      checkCookieConsent();
      setTimeout(checkGtagStatus, 200);
    };
    window.addEventListener('cookieConsentUpdated', handleCookieUpdate);
    
    // 🔥 Figyeljük a storage változást
    const handleStorageChange = (e) => {
      if (e.key === 'ingatlanTerkepCookieConsent') {
        console.log('[AnalyticsContext] Storage változás:', e.newValue);
        checkCookieConsent();
        setTimeout(checkGtagStatus, 200);
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
  }, [checkCookieConsent, checkGtagStatus]);

  // 🔥 Biztonságos esemény küldés - KÖZVETLEN gtag használat
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
      
      // Próbáljuk újra 500ms múlva
      setTimeout(() => {
        if (window.gtag && pendingEventsRef.current.length > 0) {
          flushPendingEvents();
        }
      }, 500);
      
      return false;
    }

    // 🔥 ESEMÉNY KÜLDÉSE - KÖZVETLENÜL
    try {
      // 🔥 Biztosítsuk, hogy a config be van állítva (csak egyszer)
      if (!window._ga_configured) {
        window.gtag('config', 'G-KWH607ZP7H', {
          send_page_view: false,
          cookie_flags: 'SameSite=None;Secure',
        });
        window._ga_configured = true;
        console.log('[Analytics] GA4 konfigurálva');
      }
      
      // 🔥 ESEMÉNY KÜLDÉSE
      window.gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
        send_to: 'G-KWH607ZP7H',
      });
      
      console.log(`[Analytics] ✅ Elküldve: ${eventName}`, eventParams);
      return true;
    } catch (error) {
      console.error(`[Analytics] ❌ Hiba a küldés során (${eventName}):`, error);
      return false;
    }
  }, [cookiesAccepted, flushPendingEvents, isGtagLoaded]);

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