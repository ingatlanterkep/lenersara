// src/context/AnalyticsContext.js
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [isGtagLoaded, setIsGtagLoaded] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cookie állapot ellenőrzése
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    setIsLoading(false);
  }, []);

  // Gtag betöltésének figyelése
  useEffect(() => {
    if (!cookiesAccepted) {
      setIsGtagLoaded(false);
      return;
    }

    // Ha már betöltött, ne töltsük újra
    if (window.gtag) {
      setIsGtagLoaded(true);
      return;
    }

    // Gtag betöltése
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
      window.gtag('config', 'G-KWH607ZP7H');
      setIsGtagLoaded(true);
      console.log('[AnalyticsContext] GA4 betöltve');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup (opcionális)
    };
  }, [cookiesAccepted]);

  // Biztonságos esemény küldés
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    if (!cookiesAccepted) {
      console.log(`[Analytics] Kihagyva (nincs süti elfogadás): ${eventName}`);
      return false;
    }

    if (!window.gtag) {
      console.log(`[Analytics] gtag nem elérhető, esemény sorba rakva: ${eventName}`);
      // Sorba rakjuk az eseményt a későbbi küldéshez
      if (!window._pendingEvents) {
        window._pendingEvents = [];
      }
      window._pendingEvents.push({ eventName, eventParams });
      
      // Próbáljuk újra betölteni a gtag-et
      if (!document.querySelector('script[src*="gtag/js?id=G-KWH607ZP7H"]')) {
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
          window.gtag('config', 'G-KWH607ZP7H');
          setIsGtagLoaded(true);
          
          // Függőben lévő események küldése
          if (window._pendingEvents) {
            window._pendingEvents.forEach(({ eventName: evt, eventParams: params }) => {
              window.gtag('event', evt, params);
              console.log(`[Analytics] ✅ Függőben lévő esemény elküldve: ${evt}`);
            });
            window._pendingEvents = [];
          }
        };
        document.head.appendChild(script);
      }
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
  }, [cookiesAccepted]);

  // Függőben lévő események küldése, amikor a gtag betöltődik
  useEffect(() => {
    if (isGtagLoaded && window._pendingEvents && window._pendingEvents.length > 0) {
      const events = [...window._pendingEvents];
      window._pendingEvents = [];
      events.forEach(({ eventName, eventParams }) => {
        if (window.gtag) {
          window.gtag('event', eventName, eventParams);
          console.log(`[Analytics] ✅ Függőben lévő esemény elküldve: ${eventName}`);
        }
      });
    }
  }, [isGtagLoaded]);

  return (
    <AnalyticsContext.Provider value={{
      cookiesAccepted,
      isGtagLoaded,
      isLoading,
      sendEvent,
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