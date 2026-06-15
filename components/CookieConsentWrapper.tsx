// CookieConsentWrapper.tsx - TELJESEN MŰKÖDŐ VERZIÓ

'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';
import Script from 'next/script';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [gtmReady, setGtmReady] = useState(false);

  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);

  // Ellenőrizzük, hogy a GTM script betöltődött-e
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      setGtmReady(true);
    } else {
      const checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && window.gtag) {
          setGtmReady(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, []);

  const handleAccept = () => {
    setCookiesAccepted(true);
    setCookie('ingatlanTerkepCookieConsent', 'true', { 
      maxAge: 150 * 24 * 60 * 60, 
      path: '/' 
    });
    
    // Várunk egy kicsit, hogy a GTM betöltődjön, majd consent update
    const sendConsentUpdate = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted'
        });
        console.log('[GA4] Consent granted via GTM');
        
        // Küldünk egy teszt eventet
        window.gtag('event', 'consent_granted_test', {
          'event_category': 'cookie_consent',
          'event_label': 'test_event'
        });
      } else {
        // Ha még nincs kész, próbáljuk újra 100ms múlva
        setTimeout(sendConsentUpdate, 100);
      }
    };
    
    sendConsentUpdate();
    
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('consent', 'grant');
      setTimeout(() => {
        window.fbq?.('track', 'PageView');
      }, 100);
    }
    
    window.dispatchEvent(new CustomEvent('cookiesAccepted'));
    console.log('[CookieConsent] Elfogadva');
  };

  const handleDecline = () => {
    setCookiesAccepted(false);
    setCookie('ingatlanTerkepCookieConsent', 'false', { 
      maxAge: 150 * 24 * 60 * 60, 
      path: '/' 
    });
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
    
    window.dispatchEvent(new CustomEvent('cookiesDeclined'));
    console.log('[CookieConsent] Elutasítva');
  };

  if (!mounted) return null;

  return (
    <>
      {/* ========== GOOGLE TAG MANAGER ========== */}
      <Script
        id="gtm-consent"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 500
            });
            
            console.log('[GTM] Consent mode initialized, gtag ready');
          `,
        }}
        onLoad={() => {
          console.log('[GTM] Consent script loaded');
          setGtmReady(true);
        }}
      />

      {/* GTM Container Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtm.js?id=GTM-WVS766GK"
        onLoad={() => {
          console.log('[GTM] Container loaded');
        }}
      />

      {/* GTM Noscript iframe */}
      <Script
        id="gtm-noscript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof document !== 'undefined') {
              var noscript = document.createElement('noscript');
              var iframe = document.createElement('iframe');
              iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-WVS766GK';
              iframe.height = '0';
              iframe.width = '0';
              iframe.style.display = 'none';
              iframe.style.visibility = 'hidden';
              noscript.appendChild(iframe);
              document.body.insertBefore(noscript, document.body.firstChild);
            }
          `,
        }}
      />

      {/* ========== META PIXEL - CSAK HA ELFOGADTÁK ========== */}
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
              console.log('[Meta Pixel] Loaded');
            `,
          }}
        />
      )}

      {/* ========== BARION PIXEL - MINDIG ========== */}
      <Script
        id="barion-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.bp = window.bp || function() {
                (window.bp.q = window.bp.q || []).push(arguments);
              };
              window.bp.l = 1 * new Date();
              window.barion_pixel_id = 'BP-YQqhhb7YpN-9B';
            }
          `,
        }}
      />
      <Script
        id="barion-pixel-loader"
        strategy="afterInteractive"
        src="https://pixel.barion.com/bp.js"
      />

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