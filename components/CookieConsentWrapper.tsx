// CookieConsentWrapper.tsx - JAVÍTOTT VERZIÓ
'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;

    fbq?: (...args: any[]) => void;
  }
}

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);

  // GA4 betöltése CSAK elfogadás után
  useEffect(() => {
    if (!cookiesAccepted) return;
    if ((window as any).ga4Loaded) return;

    console.log('[GA4] Betöltése...');

    // 1. gtag.js betöltése
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
    script.async = true;
    document.head.appendChild(script);

    // 2. Várunk a script betöltődésére, majd inicializálunk
    script.onload = () => {
      console.log('[GA4] Script betöltődött');
      
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', 'G-KWH607ZP7H', {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure'
      });

      (window as any).ga4Loaded = true;
      console.log('[GA4] Inicializálva');

      // Teszt event
      gtag('event', 'consent_granted', {
        event_category: 'cookie_consent',
        event_label: 'user_accepted'
      });
      console.log('[GA4] Teszt event elküldve');
    };

    script.onerror = () => {
      console.error('[GA4] Script betöltési hiba');
    };

  }, [cookiesAccepted]);

  const handleAccept = () => {
    setCookiesAccepted(true);
    setCookie('ingatlanTerkepCookieConsent', 'true', { 
      maxAge: 150 * 24 * 60 * 60, 
      path: '/' 
    });
    window.dispatchEvent(new CustomEvent('cookiesAccepted'));
    console.log('[CookieConsent] Elfogadva');
  };

  const handleDecline = () => {
    setCookiesAccepted(false);
    setCookie('ingatlanTerkepCookieConsent', 'false', { 
      maxAge: 150 * 24 * 60 * 60, 
      path: '/' 
    });
    window.dispatchEvent(new CustomEvent('cookiesDeclined'));
    console.log('[CookieConsent] Elutasítva');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Meta Pixel - CSAK HA ELFOGADTÁK */}
      {cookiesAccepted && (
        <script
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
              console.log('[Meta Pixel] Betöltve');
            `,
          }}
        />
      )}

      {/* Barion Pixel - MINDIG */}
      <script
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
      <script src="https://pixel.barion.com/bp.js" async />

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