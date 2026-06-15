'use client';

import { useState, useEffect, useCallback } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';
import Script from 'next/script';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Inicializálás
  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);

  // BARION PIXEL - Mindig betöltődik
  useEffect(() => {
    if (typeof window === 'undefined' || window.bp) return;

    window.bp = function (...args: any[]) {
      (window.bp!.q = window.bp!.q || []).push(args);
    };
    window.bp.l = Date.now();
    window.barion_pixel_id = 'BP-YQqhhb7YpN-9B';

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pixel.barion.com/bp.js';
    document.head.appendChild(script);

    setTimeout(() => {
      if (window.bp) {
        window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
        console.log('[Barion] Pixel inicializálva');
      }
    }, 400);
  }, []);

  // ==================== ANALYTICS ====================
  const loadAnalytics = useCallback(() => {
    if (window.gtag) {
      console.log('[GA4] Már létezett');
      return;
    }

    console.log('[GA4] Betöltés elkezdődött...');

    window.dataLayer = window.dataLayer || [];

    // Biztonságos gtag definíció
    window.gtag = function (...args: any[]) {
      console.log('[GA4] gtag hívás:', args);
      window.dataLayer?.push(args);
    };

    // GA4 script betöltése
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
    document.head.appendChild(script);

    // Várunk a script betöltődésére
    setTimeout(() => {
      if (!window.gtag) return;

      window.gtag('js', new Date());
      window.gtag('config', 'G-KWH607ZP7H', {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure'
      });

      // Teszt event
      window.gtag('event', 'consent_accepted', {
        event_category: 'cookie_consent',
        event_label: 'user_accepted'
      });

      console.log('[GA4] Config + teszt event elküldve');
    }, 1200);
  }, []);

  const handleAccept = useCallback(() => {
    setCookiesAccepted(true);
    setCookie('ingatlanTerkepCookieConsent', 'true', { 
      maxAge: 150 * 24 * 60 * 60, 
      path: '/' 
    });

    window.dispatchEvent(new CustomEvent('cookiesAccepted'));
    loadAnalytics();

    console.log('[CookieConsent] Elfogadva → GA4 betöltése elindítva');
  }, [loadAnalytics]);

  const handleDecline = useCallback(() => {
    setCookiesAccepted(false);
    setCookie('ingatlanTerkepCookieConsent', 'false', { 
      maxAge: 150 * 24 * 60 * 60, 
      path: '/' 
    });
    window.dispatchEvent(new CustomEvent('cookiesDeclined'));
    console.log('[CookieConsent] Elutasítva');
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Barion Pixel */}
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

      {/* Meta Pixel */}
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