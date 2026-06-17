'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
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

  // 🔥 Függőben lévő események küldése
  const flushPendingEvents = useCallback(() => {
    if (pendingEventsRef.current.length === 0) return;
    
    const events = [...pendingEventsRef.current];
    pendingEventsRef.current = [];
    
    events.forEach(({ eventName, eventParams }) => {
      sendDirectEvent(eventName, eventParams);
    });
  }, []);

  // 🔥 Közvetlen esemény küldés
  const sendDirectEvent = useCallback((eventName, eventParams = {}) => {
    if (typeof window === 'undefined') return false;
    
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (!hasConsent) {
      console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
      return false;
    }

    try {
      // 🔥 PRÓBÁLJUK GTAG-GEL
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
        console.log(`[DirectAnalytics] ✅ Elküldve (gtag): ${eventName}`, eventParams);
        return true;
      }
      
      // 🔥 HA NINCS GTAG, PRÓBÁLJUK MEASUREMENT PROTOCOL-LAL
      const measurementId = 'G-KWH607ZP7H';
      let clientId = 'anonymous';
      const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
      if (gaCookie) {
        const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
        if (match) {
          clientId = match[1] + '.' + match[2];
        }
      }
      
      let sessionId = Math.floor(Date.now() / 1000).toString();
      
      const params = new URLSearchParams();
      params.append('v', '2');
      params.append('tid', measurementId);
      params.append('cid', clientId);
      params.append('en', eventName);
      params.append('sid', sessionId);
      params.append('sct', '1');
      params.append('seg', '1');
      params.append('dl', window.location.href);
      params.append('dt', document.title);
      params.append('dr', document.referrer || '');
      params.append('ul', navigator.language || 'hu-hu');
      params.append('sr', `${window.screen.width}x${window.screen.height}`);
      params.append('_et', '0');
      params.append('_p', '1');
      params.append('_ss', '1');
      params.append('_s', '1');
      
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
  }, []);

  // 🔥 Kezdeti ellenőrzés
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    console.log(`[AnalyticsContext] Kezdeti cookie állapot: ${hasConsent}`);
    setCookiesAccepted(hasConsent);
    setIsLoading(false);
    
    if (hasConsent) {
      setTimeout(() => {
        sendDirectEvent('page_view', {
          page_title: document.title,
          page_location: window.location.href,
        });
      }, 500);
    }
    
    // 🔥 Rendszeres ellenőrzés
    checkIntervalRef.current = setInterval(() => {
      checkCookieConsent();
    }, 1000);
    
    // 🔥 Figyeljük a custom event-eket
    const handleCookieUpdate = () => {
      console.log('[AnalyticsContext] 🔔 cookieConsentUpdated esemény fogadva');
      checkCookieConsent();
      if (cookiesAccepted) {
        sendDirectEvent('page_view', {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    };
    window.addEventListener('cookieConsentUpdated', handleCookieUpdate);
    
    // 🔥 FIGYELJÜK A GTAG BETÖLTŐDÉSÉT
    const handleGtagLoaded = () => {
      console.log('[AnalyticsContext] 🔔 gtagLoaded esemény fogadva');
      // Ha van függőben lévő esemény, küldjük el
      if (pendingEventsRef.current.length > 0) {
        flushPendingEvents();
      }
    };
    window.addEventListener('gtagLoaded', handleGtagLoaded);
    
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
      window.removeEventListener('gtagLoaded', handleGtagLoaded);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkCookieConsent, cookiesAccepted, flushPendingEvents, sendDirectEvent]);

  // 🔥 ESEMÉNY KÜLDÉS
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    
    console.log(`[Analytics] sendEvent hívva: ${eventName}`, { 
      cookiesAccepted,
      hasConsent,
    });
    
    if (!hasConsent) {
      console.log(`[Analytics] ⛔ Kihagyva (nincs süti elfogadás): ${eventName}`);
      return false;
    }

    if (hasConsent !== cookiesAccepted) {
      setCookiesAccepted(hasConsent);
    }

    // 🔥 KÖZVETLEN KÜLDÉS
    const result = sendDirectEvent(eventName, eventParams);
    
    if (!result) {
      // Ha nem sikerült, tegyük sorba
      pendingEventsRef.current.push({ eventName, eventParams });
      setTimeout(() => {
        if (pendingEventsRef.current.length > 0) {
          flushPendingEvents();
        }
      }, 1000);
    }
    
    return result;
  }, [cookiesAccepted, flushPendingEvents, sendDirectEvent]);

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