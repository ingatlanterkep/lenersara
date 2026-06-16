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

  // 🔥 Cookie ellenőrzés
  const checkCookieConsent = useCallback(() => {
    if (typeof document === 'undefined') return false;
    
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    if (hasConsent !== cookiesAccepted) {
      console.log(`[AnalyticsContext] Cookie állapot változás: ${cookiesAccepted} -> ${hasConsent}`);
      setCookiesAccepted(hasConsent);
      
      if (hasConsent) {
        loadGtag();
        setTimeout(() => flushPendingEvents(), 300);
      }
    }
    return hasConsent;
  }, [cookiesAccepted]);

  // 🔥 Gtag betöltése
  const loadGtag = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (isGtagLoadingRef.current) return;
    
    if (window.gtag) {
      setIsGtagLoaded(true);
      flushPendingEvents();
      return;
    }

    if (document.querySelector('script[src*="gtag/js?id=G-KWH607ZP7H"]')) {
      isGtagLoadingRef.current = true;
      return;
    }

    console.log('[AnalyticsContext] GA4 betöltése...');
    isGtagLoadingRef.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
    script.async = true;
    script.onload = () => {
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
      isGtagLoadingRef.current = false;
      console.log('[AnalyticsContext] ✅ GA4 betöltve');
      
      flushPendingEvents();
    };
    script.onerror = () => {
      console.error('[AnalyticsContext] ❌ GA4 betöltési hiba');
      isGtagLoadingRef.current = false;
    };
    document.head.appendChild(script);
  }, []);

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
      loadGtag();
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
  }, [checkCookieConsent, loadGtag]);

  // 🔥 Biztonságos esemény küldés
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    // 🔥 1. Ellenőrizzük a cookie-t (MINDIG friss értéket olvasunk)
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    console.log(`[Analytics] sendEvent hívva: ${eventName}`, { 
      cookiesAccepted,        // State értéke (lehet elavult)
      hasConsent,            // Friss cookie érték
      isGtagLoaded,
      gtagExists: !!window.gtag
    });
    
    // 🔥 2. Frissítsük a state-et, ha a cookie és a state eltér
    if (hasConsent !== cookiesAccepted) {
      console.log(`[Analytics] 🔄 State frissítése: ${cookiesAccepted} -> ${hasConsent}`);
      setCookiesAccepted(hasConsent);
      
      // Ha most lett elfogadva, töltsük be a gtag-et
      if (hasConsent && !window.gtag) {
        loadGtag();
      }
    }
    
    // 🔥 3. Ha nincs elfogadás, ne küldjünk
    if (!hasConsent) {
      console.log(`[Analytics] ⛔ Kihagyva (nincs süti elfogadás): ${eventName}`);
      return false;
    }

    // 🔥 4. Ellenőrizzük a gtag-et
    if (!window.gtag) {
      console.log(`[Analytics] ⏳ gtag nem elérhető, esemény sorba rakva: ${eventName}`);
      pendingEventsRef.current.push({ eventName, eventParams });
      
      loadGtag();
      
      setTimeout(() => {
        if (window.gtag && pendingEventsRef.current.length > 0) {
          flushPendingEvents();
        }
      }, 500);
      
      return false;
    }

    // 🔥 5. ESEMÉNY KÜLDÉSE
    try {
      window.gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
      });
      console.log(`[Analytics] ✅ Elküldve: ${eventName}`, eventParams);
      return true;
    } catch (error) {
      console.error(`[Analytics] ❌ Hiba a küldés során (${eventName}):`, error);
      return false;
    }
  }, [cookiesAccepted, loadGtag, flushPendingEvents]);

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