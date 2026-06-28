// src/context/AnalyticsContext.js
'use client';

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback,
  useRef  // ← IMPORTÁLVA!
} from 'react';

import { sendDirectAnalyticsEvent, sendPageView } from '@/utils/directAnalytics';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pageViewSentRef = useRef(false);

  // Cookie ellenőrzés
  const checkCookieConsent = useCallback(() => {
    if (typeof document === 'undefined') return false;
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (hasConsent !== cookiesAccepted) {
      setCookiesAccepted(hasConsent);
    }
    return hasConsent;
  }, [cookiesAccepted]);

  // Kezdeti ellenőrzés
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    setIsLoading(false);
    
    if (hasConsent && !pageViewSentRef.current) {
      pageViewSentRef.current = true;
      sendPageView(document.title, window.location.href);
    }
    
    const handleCookieUpdate = () => {
      const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
      setCookiesAccepted(hasConsent);
    };
    window.addEventListener('cookieConsentUpdated', handleCookieUpdate);
    
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleCookieUpdate);
    };
  }, []);

  // Esemény küldés
  const sendEvent = useCallback((eventName, eventParams = {}) => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    if (!hasConsent) {
      console.log(`[Analytics] ⛔ Kihagyva (nincs süti): ${eventName}`);
      return false;
    }
    return sendDirectAnalyticsEvent(eventName, eventParams);
  }, []);

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
    if (typeof window === 'undefined') {
      return {
        cookiesAccepted: false,
        isLoading: false,
        sendEvent: () => false,
        refreshConsent: () => false,
      };
    }
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};