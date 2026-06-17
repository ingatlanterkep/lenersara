'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { sendDirectAnalyticsEvent, sendPageView, sendLayerToggle } from '@/utils/directAnalytics';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkIntervalRef = useRef(null);
  const pendingEventsRef = useRef([]);

  const checkCookieConsent = useCallback(() => {
    if (typeof document === 'undefined') return false;
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (hasConsent !== cookiesAccepted) {
      setCookiesAccepted(hasConsent);
    }
    return hasConsent;
  }, [cookiesAccepted]);

  const flushPendingEvents = useCallback(() => {
    if (pendingEventsRef.current.length === 0) return;
    const events = [...pendingEventsRef.current];
    pendingEventsRef.current = [];
    
    events.forEach(({ eventName, eventParams }) => {
      sendDirectAnalyticsEvent(eventName, eventParams);
    });
  }, []);

  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    setIsLoading(false);

    if (hasConsent) {
      setTimeout(() => sendPageView(), 800);
    }

    checkIntervalRef.current = setInterval(checkCookieConsent, 1000);

    const handleCookieUpdate = () => {
      checkCookieConsent();
      if (document.cookie.includes('ingatlanTerkepCookieConsent=true')) {
        sendPageView();
      }
    };

    window.addEventListener('cookieConsentUpdated', handleCookieUpdate);
    window.addEventListener('gtagLoaded', handleCookieUpdate);

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      window.removeEventListener('cookieConsentUpdated', handleCookieUpdate);
      window.removeEventListener('gtagLoaded', handleCookieUpdate);
    };
  }, [checkCookieConsent]);

  const sendEvent = useCallback((eventName, eventParams = {}) => {
    if (!document.cookie.includes('ingatlanTerkepCookieConsent=true')) {
      console.log(`[Analytics] ⛔ Nincs consent: ${eventName}`);
      return false;
    }

    const result = sendDirectAnalyticsEvent(eventName, eventParams);

    if (!result) {
      pendingEventsRef.current.push({ eventName, eventParams });
      setTimeout(flushPendingEvents, 800);
    }

    return result;
  }, [flushPendingEvents]);

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
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};