// contexts/CookieContext.tsx
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);

  // SSR alatt ne adjuk vissza a context-et, csak client oldalon
  if (!mounted) {
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
  
  // SSR alatt ne dobjon hibát
  if (typeof window === 'undefined') {
    return { cookiesAccepted: false, setCookiesAccepted: () => {} };
  }
  
  // Ha nincs context, akkor se dobjunk hibát, hanem adjunk vissza alapértelmezett értékeket
  if (!context) {
    console.warn('useCookie called outside of CookieProvider - returning default values');
    return { cookiesAccepted: false, setCookiesAccepted: () => {} };
  }
  
  return context;
}