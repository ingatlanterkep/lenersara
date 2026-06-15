// hooks/useGA4.ts - ÚJ HOOK a központi GA4 kezeléshez
'use client';

import { useCallback, useEffect, useState } from 'react';

let gtagReady = false;
const gtagCallbacks: (() => void)[] = [];

const waitForGtag = (callback: () => void) => {
  if (typeof window !== 'undefined' && window.gtag) {
    callback();
  } else {
    gtagCallbacks.push(callback);
  }
};

// Globális gtag ellenőrzés
if (typeof window !== 'undefined') {
  const checkInterval = setInterval(() => {
    if (window.gtag && !gtagReady) {
      gtagReady = true;
      gtagCallbacks.forEach(cb => cb());
      gtagCallbacks.length = 0;
      clearInterval(checkInterval);
    }
  }, 100);
  
  setTimeout(() => clearInterval(checkInterval), 5000);
}

export const useGA4 = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      setIsReady(true);
    } else {
      waitForGtag(() => setIsReady(true));
    }
  }, []);

  const sendEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
      console.log(`[GA4] ${eventName}`, params);
    } else {
      // Ha még nem kész, próbáljuk újra
      waitForGtag(() => {
        if (window.gtag) {
          window.gtag('event', eventName, params);
          console.log(`[GA4] ${eventName} (delayed)`, params);
        }
      });
    }
  }, []);

  return { sendEvent, isReady };
};