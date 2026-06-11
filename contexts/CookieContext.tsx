// contexts/CookieContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie } from 'cookies-next';

interface CookieContextType {
  cookiesAccepted: boolean;
  updateCookieConsent: (accepted: boolean) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Csak kliensoldalon fut
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);

  const updateCookieConsent = (accepted: boolean) => {
    setCookiesAccepted(accepted);
  };

  // Szerveroldalon egy placeholder értéket adunk vissza
  if (!mounted) {
    return (
      <CookieContext.Provider value={{ cookiesAccepted: false, updateCookieConsent }}>
        {children}
      </CookieContext.Provider>
    );
  }

  return (
    <CookieContext.Provider value={{ cookiesAccepted, updateCookieConsent }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent(): CookieContextType {
  const context = useContext(CookieContext);
  if (context === undefined) {
    // Szerveroldalon ne dobjunk errort, adjunk vissza egy default értéket
    if (typeof window === 'undefined') {
      return { cookiesAccepted: false, updateCookieConsent: () => {} };
    }
    throw new Error('useCookieConsent must be used within CookieProvider');
  }
  return context;
}