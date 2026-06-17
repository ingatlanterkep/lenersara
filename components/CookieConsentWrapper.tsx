'use client';

import { useState, useEffect, useCallback } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';
import Script from 'next/script';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [gtagLoaded, setGtagLoaded] = useState(false);
  
  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
    
    // HA MÁR VAN CONSENT, TÖLTSD BE A GTAG-ET
    if (hasConsent && typeof window !== 'undefined' && !window.gtag) {
      loadGtag();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // 🔥 GTAG BETÖLTÉS FÜGGVÉNY
  const loadGtag = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.gtag) {
      console.log('[GTAG] Már betöltve');
      setGtagLoaded(true);
      return;
    }
    
    console.log('[GTAG] Betöltés indul...');
    
    try {
      // 1. DataLayer inicializálása
      window.dataLayer = window.dataLayer || [];
      
      // 2. gtag függvény definiálása
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };
      
      // 3. gtag.js script betöltése
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
      script.async = true;
      script.onload = () => {
        console.log('[GTAG] Script betöltve');
        
        // 4. Konfiguráció - HASZNÁLJUK AZ OPCIONÁLIS LÁNCOLÁST
        if (window.gtag) {
          window.gtag('js', new Date());
          window.gtag('config', 'G-KWH607ZP7H', {
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });
          
          console.log('[GTAG] Konfigurálva');
          setGtagLoaded(true);
          
          // 5. ESEMÉNYEK KÜLDÉSE
          window.dispatchEvent(new Event('gtagLoaded'));
          
          // 6. Page view küldése
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
          });
          
          console.log('[GTAG] ✅ Page view elküldve');
        }
      };
      script.onerror = () => {
        console.error('[GTAG] ❌ Betöltési hiba');
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('[GTAG] Hiba:', error);
    }
  }, []);
  
  // 🔥 BARION PIXEL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (window.bp) {
      console.log('[Barion] Pixel már inicializálva');
      return;
    }
    
    try {
      window.bp = function(...args: any[]) {
        if (!window.bp) {
          window.bp = function() {};
          (window.bp as any).q = [];
        }
        ((window.bp as any).q = (window.bp as any).q || []).push(args);
      };
      (window.bp as any).l = Date.now();
      
      if (!document.querySelector('script[src*="pixel.barion.com/bp.js"]')) {
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.src = 'https://pixel.barion.com/bp.js';
        scriptElement.onload = () => {
          if (window.bp && window.barion_pixel_id) {
            window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
            console.log('[Barion] ✅ Pixel betöltve');
          }
        };
        scriptElement.onerror = () => {
          console.error('[Barion] ❌ Pixel betöltési hiba');
        };
        document.head.appendChild(scriptElement);
      }
      
      window.barion_pixel_id = 'BP-YQqhhb7YpN-9B';
      
      if (window.bp && window.barion_pixel_id) {
        setTimeout(() => {
          if (window.bp && window.barion_pixel_id) {
            window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
            console.log('[Barion] Pixel inicializálva (késleltetve)');
          }
        }, 500);
      }
    } catch (error) {
      console.error('[Barion] Hiba:', error);
    }
  }, []);
  
  // 🔥 Cookie elfogadás kezelése
  const handleAccept = useCallback(() => {
    console.log('[CookieConsent] Elfogadva - cookie beállítása...');
    
    // 1. Cookie beállítása
    setCookie('ingatlanTerkepCookieConsent', 'true', { 
      maxAge: 150 * 24 * 60 * 60,
      path: '/',
    });
    
    setCookiesAccepted(true);
    
    // 2. GTAG betöltése (ha még nincs)
    if (!window.gtag) {
      loadGtag();
    } else {
      // Ha már betöltött, küldjünk eseményeket
      console.log('[CookieConsent] GTAG már betöltve');
      window.dispatchEvent(new Event('gtagLoaded'));
      // 🔥 OPCIONÁLIS LÁNCOLÁS
      if (window.gtag) {
        window.gtag('event', 'page_view');
      }
    }
    
    // 3. Cookie consent frissítés
    try {
      window.dispatchEvent(new Event('cookieConsentUpdated'));
    } catch (error) {
      console.error('[CookieConsent] Hiba:', error);
    }
    
  }, [loadGtag]);
  
  const handleDecline = useCallback(() => {
    try {
      setCookie('ingatlanTerkepCookieConsent', 'false', { maxAge: 150 * 24 * 60 * 60 });
      setCookiesAccepted(false);
      console.log('[CookieConsent] Elutasítva');
      window.dispatchEvent(new Event('cookieConsentUpdated'));
    } catch (error) {
      console.error('[CookieConsent] Hiba:', error);
    }
  }, []);
  
  if (!mounted) return null;
  
  return (
    <>
      <Script
        id="barion-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              try {
                window.bp = window.bp || function() {
                  (window.bp.q = window.bp.q || []).push(arguments);
                };
                window.bp.l = 1 * new Date();
                window.barion_pixel_id = 'BP-YQqhhb7YpN-9B';
              } catch(e) {
                console.error('[Barion] Hiba:', e);
              }
            }
          `,
        }}
      />
      <Script
        id="barion-pixel-loader"
        strategy="afterInteractive"
        src="https://pixel.barion.com/bp.js"
        onLoad={() => {
          try {
            if (typeof window !== 'undefined' && window.bp && window.barion_pixel_id) {
              window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
              console.log('[Barion] ✅ Pixel inicializálva');
            }
          } catch (error) {
            console.error('[Barion] Hiba:', error);
          }
        }}
      />
      
      {cookiesAccepted && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1588029335599358');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
      
      <CookieConsent
        location="bottom"
        buttonText="Elfogadom"
        declineButtonText="Elutasítom"
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        cookieName="ingatlanTerkepCookieConsent"
        style={{ background: "#2B373B", color: "#fff", padding: "15px", zIndex: 10000 }}
        buttonStyle={{ background: "#0078A8", color: "#fff", fontSize: "14px", padding: "10px 20px", borderRadius: "5px" }}
        declineButtonStyle={{ background: "#6c757d", color: "#fff", fontSize: "14px", padding: "10px 20px", borderRadius: "5px" }}
        expires={150}
        overlay={true}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}
      >
        Ez a weboldal sütiket használ a felhasználói élmény javítására, analitikai és marketing célokra. 
        További információ: <a href="/privacy-policy" style={{ color: "#0078A8" }}>Adatvédelmi nyilatkozat</a>.
      </CookieConsent>
    </>
  );
}