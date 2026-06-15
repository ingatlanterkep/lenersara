// hooks/useGA4.ts
'use client';

import { useCallback, useEffect, useState } from 'react';

export const useGA4 = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkGtag = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (checkGtag()) return;

    const interval = setInterval(() => {
      if (checkGtag()) {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, []);

  const sendEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
      console.log(`[GA4] ${eventName}`, params);
    } else {
      console.log(`[GA4] SKIPPED - gtag not ready: ${eventName}`);
    }
  }, []);

  return { sendEvent, isReady };
};