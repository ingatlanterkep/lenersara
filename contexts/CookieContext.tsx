'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie } from 'cookies-next';

interface CookieContextType {
  cookiesAccepted: boolean;
  setCookiesAccepted: (value: boolean) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
  }, []);

  return (
    <CookieContext.Provider value={{ cookiesAccepted, setCookiesAccepted }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookie() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within CookieProvider');
  }
  return context;
}