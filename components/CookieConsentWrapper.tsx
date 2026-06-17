// src/components/CookieConsentWrapper.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';
import Script from 'next/script';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  
  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);
  
  // 🔥 BARION PIXEL - BIZTONSÁGOS INICIALIZÁLÁS
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Ellenőrizzük, hogy a bp már létezik-e
    if (window.bp) {
      console.log('[Barion] Pixel már inicializálva');
      return;
    }
    
    try {
      // Biztonságos definiálás
      window.bp = function(...args: any[]) {
        if (!window.bp) {
          window.bp = function() {};
          (window.bp as any).q = [];
        }
        (window.bp.q = window.bp.q || []).push(args);
      };
      window.bp.l = Date.now();
      
      // Ellenőrizzük, hogy a script már létezik-e
      if (!document.querySelector('script[src*="pixel.barion.com/bp.js"]')) {
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.src = 'https://pixel.barion.com/bp.js';
        scriptElement.onload = () => {
          if (window.bp && window.barion_pixel_id) {
            window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
            console.log('[Barion] ✅ Pixel betöltve (mindig)');
          }
        };
        scriptElement.onerror = () => {
          console.error('[Barion] ❌ Pixel betöltési hiba');
        };
        document.head.appendChild(scriptElement);
      }
      
      window.barion_pixel_id = 'BP-YQqhhb7YpN-9B';
      
      // Ha a script már betöltődött (pl. másik komponens által)
      if (window.bp && window.barion_pixel_id) {
        // Kis késleltetés, hogy a script betöltődjön
        setTimeout(() => {
          if (window.bp && window.barion_pixel_id) {
            window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
            console.log('[Barion] Pixel inicializálva (késleltetve)');
          }
        }, 500);
      }
    } catch (error) {
      console.error('[Barion] Hiba a pixel inicializálása során:', error);
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
    
    // 2. GTM betöltése
    try {
      if (!window.dataLayer?.gtmLoaded) {
        if (!window.dataLayer) {
          window.dataLayer = [];
        }
        
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WVS766GK');`;
        document.head.appendChild(gtmScript);
        
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVS766GK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
        
        window.dataLayer.gtmLoaded = true;
        console.log('[CookieConsent] GTM betöltve');
      }
    } catch (error) {
      console.error('[CookieConsent] Hiba a GTM betöltésekor:', error);
    }
    
    // 3. GA4 betöltése
    try {
      if (!window.gtag) {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
        script.async = true;
        script.onload = () => {
          if (!window.dataLayer) {
            window.dataLayer = [];
          }
          window.gtag = function(...args: any[]) {
            window.dataLayer.push(args);
          };
          window.gtag('js', new Date());
          window.gtag('config', 'G-KWH607ZP7H', {
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });
          console.log('[CookieConsent] GA4 betöltve');
          
          // 🔥 COLLECT ESEMÉNY KÜLDÉSE
          if (window.gtag) {
            window.gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
            });
            console.log('[CookieConsent] ✅ Page view esemény elküldve');
          }
        };
        script.onerror = () => {
          console.error('[CookieConsent] ❌ GA4 betöltési hiba');
        };
        document.head.appendChild(script);
      } else {
        // Ha már betöltött, csak küldjünk egy eseményt
        if (window.gtag) {
          window.gtag('event', 'page_view');
          console.log('[CookieConsent] ✅ Page view esemény elküldve (már betöltött)');
        }
      }
    } catch (error) {
      console.error('[CookieConsent] Hiba a GA4 betöltésekor:', error);
    }
    
    // 🔥 4. ÉRTESÍTSÜK AZ ANALYTICS PROVIDER-T
    try {
      window.dispatchEvent(new Event('cookieConsentUpdated'));
      console.log('[CookieConsent] 🔔 cookieConsentUpdated esemény elküldve');
    } catch (error) {
      console.error('[CookieConsent] Hiba az esemény küldésekor:', error);
    }
    
  }, []);
  
  const handleDecline = useCallback(() => {
    try {
      setCookie('ingatlanTerkepCookieConsent', 'false', { maxAge: 150 * 24 * 60 * 60 });
      setCookiesAccepted(false);
      console.log('[CookieConsent] Elutasítva - marketing trackerek NEM letöltve');
      
      // Értesítjük az AnalyticsProvider-t
      window.dispatchEvent(new Event('cookieConsentUpdated'));
    } catch (error) {
      console.error('[CookieConsent] Hiba az elutasítás során:', error);
    }
  }, []);
  
  if (!mounted) return null;
  
  return (
    <>
      {/* 🔥 BARION PIXEL - MINDIG BETÖLTŐDIK (függetlenül a süti állapottól) */}
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
                console.error('[Barion] Inicializálási hiba:', e);
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
            console.error('[Barion] Hiba a pixel inicializálása során:', error);
          }
        }}
        onError={() => {
          console.error('[Barion] ❌ Pixel betöltési hiba');
        }}
      />
      
      {/* Meta Pixel - CSAK elfogadás után */}
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