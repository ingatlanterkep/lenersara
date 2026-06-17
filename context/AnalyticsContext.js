'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { sendDirectAnalyticsEvent, sendPageView } from '@/utils/directAnalytics';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkIntervalRef = useRef(null);
  const pendingEventsRef = useRef([]);
  const isInitializedRef = useRef(false);

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

  // 🔥 Függőben lévő események küldése
  const flushPendingEvents = useCallback(() => {
    if (pendingEventsRef.current.length === 0) return;
    
    const events = [...pendingEventsRef.current];
    pendingEventsRef.current = [];
    
    events.forEach(({ eventName, eventParams }) => {
      sendDirectAnalyticsEvent(eventName, eventParams);
    });
  }, []);

  // 🔥 Kezdeti ellenőrzés és gtag elérhetőség figyelése
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    console.log(`[AnalyticsContext] Kezdeti cookie állapot: ${hasConsent}`);
    setCookiesAccepted(hasConsent);
    setIsLoading(false);
    
    if (hasConsent) {
      // Küldjünk egy page_view-t
      setTimeout(() => {
        sendPageView(document.title, window.location.href);
      }, 500);
    }
    
    // 🔥 Rendszeres ellenőrzés
    checkIntervalRef.current = setInterval(() => {
      checkCookieConsent();
    }, 1000);
    
    // 🔥 Figyeljük a custom event-et
    const handleCookieUpdate = () => {
      console.log('[AnalyticsContext] 🔔 cookieConsentUpdated esemény fogadva');
      const hasConsentNow = document.cookie.includes('ingatlanTerkepCookieConsent=true');
      setCookiesAccepted(hasConsentNow);
      if (hasConsentNow) {
        sendPageView(document.title, window.location.href);
      }
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
  }, [checkCookieConsent]);

  // 🔥 ESEMÉNY KÜLDÉS
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    console.log(`[Analytics] sendEvent hívva: ${eventName}`, { 
      cookiesAccepted,
      hasConsent,
      gtagAvailable: !!window.gtag
    });
    
    if (!hasConsent) {
      console.log(`[Analytics] ⛔ Kihagyva (nincs süti elfogadás): ${eventName}`);
      return false;
    }

    if (hasConsent !== cookiesAccepted) {
      setCookiesAccepted(hasConsent);
    }

    // 🔥 KÖZVETLEN KÜLDÉS
    const result = sendDirectAnalyticsEvent(eventName, eventParams);
    
    if (!result) {
      // Ha nem sikerült, tegyük sorba
      pendingEventsRef.current.push({ eventName, eventParams });
      // Próbáljuk újra 1 másodperc múlva
      setTimeout(() => {
        if (pendingEventsRef.current.length > 0) {
          flushPendingEvents();
        }
      }, 1000);
    }
    
    return result;
  }, [cookiesAccepted, flushPendingEvents]);

  return (
    <AnalyticsContext.Provider value={{
      cookiesAccepted,
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