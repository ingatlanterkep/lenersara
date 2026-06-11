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
  const [isClient, setIsClient] = useState(false);

  // Csak client oldalon olvassuk a sütit
  useEffect(() => {
    setIsClient(true);
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
  }, []);

  // Ha még nem client oldalon vagyunk, ne rendereljünk context-et
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <CookieContext.Provider value={{ cookiesAccepted, setCookiesAccepted }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookie() {
  const context = useContext(CookieContext);
  
  // Ha nincs context (SSR vagy hiba), adjunk vissza alapértelmezett értékeket
  if (!context) {
    // Ne dobjunk hibát, csak adjunk vissza default értékeket
    return { cookiesAccepted: false, setCookiesAccepted: () => {} };
  }
  
  return context;
}