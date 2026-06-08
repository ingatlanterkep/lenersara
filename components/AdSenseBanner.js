import React, { useEffect, useRef, useState } from 'react';

const AdSenseBanner = ({ adSlot, cookiesAccepted, onAdLoad, isAdsEnabled = false, className }) => {
  const adRef = useRef(null);
  const isAdPushed = useRef(false);
  const [isAdVisible, setIsAdVisible] = useState(false);

  // Logoljuk a prop-okat a hibakereséshez
  console.log('[AdSenseBanner] Initial props:', { isAdsEnabled, cookiesAccepted, adSlot, className });

  useEffect(() => {
    if (!isAdsEnabled || !cookiesAccepted || !adRef.current || isAdPushed.current) {
      console.log(
        '[AdSenseBanner] Ad not pushed. isAdsEnabled:',
        isAdsEnabled,
        'cookiesAccepted:',
        cookiesAccepted,
        'adRef:',
        !!adRef.current,
        'isAdPushed:',
        isAdPushed.current
      );
      return;
    }

    // Kényszerítjük az ad-container láthatóságát az inicializálás előtt
    if (adRef.current) {
      adRef.current.parentElement.style.display = 'block';
      adRef.current.parentElement.style.height = 'auto';
      adRef.current.style.height = 'auto';
    }

    const observer = new IntersectionObserver(
      (entries) => {
        console.log('[AdSenseBanner] IntersectionObserver triggered:', entries[0]);
        if (entries[0].isIntersecting) {
          console.log('[AdSenseBanner] Ad container is visible, pushing ad for slot:', adSlot);
          try {
            if (!adRef.current.hasAttribute('data-adsbygoogle-status')) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              console.log('[AdSenseBanner] Ad pushed for slot:', adSlot);
              isAdPushed.current = true;
              setIsAdVisible(true);
              if (onAdLoad) onAdLoad();
            } else {
              console.log('[AdSenseBanner] Ad already initialized for slot:', adSlot);
              setIsAdVisible(true);
            }
          } catch (e) {
            console.error('[AdSenseBanner] AdSense error for slot:', adSlot, e);
            setIsAdVisible(false);
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' // Extra margó a láthatóság növeléséhez
      }
    );

    if (adRef.current) {
      console.log('[AdSenseBanner] Observing adRef:', adRef.current);
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [cookiesAccepted, isAdsEnabled, adSlot, onAdLoad]);

  useEffect(() => {
    const checkAdContent = () => {
      if (adRef.current && adRef.current.hasAttribute('data-adsbygoogle-status')) {
        const isEmpty = adRef.current.children.length === 0 || adRef.current.innerHTML.trim() === '';
        console.log('[AdSenseBanner] Ad content check:', { isEmpty, status: adRef.current.getAttribute('data-adsbygoogle-status') });
        setIsAdVisible(!isEmpty);
      }
    };

    const observer = new MutationObserver(checkAdContent);
    if (adRef.current) {
      observer.observe(adRef.current, { childList: true, subtree: true });
    }

    checkAdContent();

    return () => observer.disconnect();
  }, []);

  if (!cookiesAccepted || !isAdsEnabled) {
    console.log('[AdSenseBanner] Not rendering ad. cookiesAccepted:', cookiesAccepted, 'isAdsEnabled:', isAdsEnabled);
    return null;
  }

  return (
    <div
      className={`ad-container ${className || ''}`}
      style={{
        margin: '10px 0',
        textAlign: 'center',
        width: '100%',
        minWidth: '300px',
        minHeight: '90px', // Minimum magasság biztosítása
        overflow: 'visible', // Overflow láthatóvá tétele
        display: 'block', // Mindig látható
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minWidth: '300px',
          minHeight: '90px', // Minimum magasság biztosítása
        }}
        data-ad-client="ca-pub-4830690556178393"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseBanner;