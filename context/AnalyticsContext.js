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

  // 🔥 Cookie ellenőrzés - rendszeresen és eseményekre
  const checkCookieConsent = useCallback(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (hasConsent !== cookiesAccepted) {
      console.log(`[AnalyticsContext] Cookie állapot változás: ${cookiesAccepted} -> ${hasConsent}`);
      setCookiesAccepted(hasConsent);
      
      // Ha most lett elfogadva, próbáljuk betölteni a gtag-et
      if (hasConsent) {
        loadGtag();
      }
    }
    return hasConsent;
  }, [cookiesAccepted]);

  // 🔥 Gtag betöltése
  const loadGtag = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Ha már betöltött, ne töltsük újra
    if (window.gtag) {
      setIsGtagLoaded(true);
      // Függőben lévő események küldése
      flushPendingEvents();
      return;
    }

    // Ellenőrizzük, hogy a script már létezik-e
    if (document.querySelector('script[src*="gtag/js?id=G-KWH607ZP7H"]')) {
      return;
    }

    console.log('[AnalyticsContext] GA4 betöltése...');
    
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
      console.log('[AnalyticsContext] ✅ GA4 betöltve');
      
      // Függőben lévő események küldése
      flushPendingEvents();
    };
    script.onerror = () => {
      console.error('[AnalyticsContext] ❌ GA4 betöltési hiba');
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

  // 🔥 Kezdeti cookie ellenőrzés
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    setIsLoading(false);
    
    if (hasConsent) {
      loadGtag();
    }
    
    // 🔥 Rendszeres ellenőrzés (minden 2 másodperc)
    checkIntervalRef.current = setInterval(() => {
      checkCookieConsent();
    }, 2000);
    
    // 🔥 Figyeljük a cookie változását (storage event)
    const handleStorageChange = () => {
      checkCookieConsent();
    };
    window.addEventListener('storage', handleStorageChange);
    
    // 🔥 Figyeljük a custom event-et
    const handleCookieUpdate = () => {
      checkCookieConsent();
    };
    window.addEventListener('cookieConsentUpdated', handleCookieUpdate);
    
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentUpdated', handleCookieUpdate);
    };
  }, [checkCookieConsent, loadGtag]);

  // 🔥 Biztonságos esemény küldés
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    console.log(`[Analytics] sendEvent hívva: ${eventName}`, { cookiesAccepted, isGtagLoaded });
    
    // 1. Ellenőrizzük a cookie-t
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (!hasConsent) {
      console.log(`[Analytics] ⛔ Kihagyva (nincs süti elfogadás): ${eventName}`);
      return false;
    }

    // 2. Ellenőrizzük a gtag-et
    if (!window.gtag) {
      console.log(`[Analytics] ⏳ gtag nem elérhető, esemény sorba rakva: ${eventName}`);
      pendingEventsRef.current.push({ eventName, eventParams });
      
      // Próbáljuk betölteni a gtag-et
      loadGtag();
      
      // Várunk 1 másodpercet, majd újrapróbálkozunk
      setTimeout(() => {
        if (window.gtag && pendingEventsRef.current.length > 0) {
          flushPendingEvents();
        }
      }, 1000);
      
      return false;
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
      console.error(`[Analytics] ❌ Hiba a küldés során (${eventName}):`, error);
      return false;
    }
  }, [loadGtag, flushPendingEvents]);

  return (
    <AnalyticsContext.Provider value={{
      cookiesAccepted,
      isGtagLoaded,
      isLoading,
      sendEvent,
      // 🔥 Extra: frissítés manuális triggereléséhez
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