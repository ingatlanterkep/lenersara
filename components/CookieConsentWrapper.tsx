'use client';

import { useState, useEffect, useCallback } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie } from 'cookies-next';
import Script from 'next/script';
import { useCookie } from '@/contexts/CookieContext';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const { cookiesAccepted, setCookiesAccepted } = useCookie();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // BARION PIXEL - MINDIG BETÖLTŐDIK
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.bp) return;
    
    window.bp = function(...args: any[]) {
      (window.bp!.q = window.bp!.q || []).push(args);
    };
    window.bp.l = Date.now();
    
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = 'https://pixel.barion.com/bp.js';
    document.head.appendChild(scriptElement);
    
    window.barion_pixel_id = 'BP-YQqhhb7YpN-9B';
    
    setTimeout(() => {
      if (window.bp) {
        window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
        console.log('[Barion] Pixel betöltve (mindig)');
      }
    }, 500);
  }, []);
  
  // GTM betöltése (CSAK elfogadás után)
  useEffect(() => {
    if (!cookiesAccepted || scriptsLoaded) return;
    if (typeof window === 'undefined') return;
    
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
      console.log('[GTM] Google Tag Manager betöltve');
    }
    
    setScriptsLoaded(true);
  }, [cookiesAccepted, scriptsLoaded]);
  
  // GA4 betöltése (CSAK elfogadás után)
  useEffect(() => {
    if (!cookiesAccepted) return;
    if (typeof window === 'undefined') return;
    
    if (!window.gtag) {
      console.log('[GA4] Betöltés indul...');
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
      script.async = true;
      document.head.appendChild(script);
      
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };
      
      const now = new Date();
      window.gtag('js', now);
      window.gtag('config', 'G-KWH607ZP7H', {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure'
      });
      
      console.log('[GA4] Betöltve');
    }
  }, [cookiesAccepted]);
  
const handleAccept = useCallback(() => {
  setCookiesAccepted(true);
  setCookie('ingatlanTerkepCookieConsent', 'true', { maxAge: 150 * 24 * 60 * 60 });
  
  // Dispatch event más komponenseknek
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cookieConsentChanged'));
  }

    
    // GTM betöltése
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
      window.dataLayer.gtmLoaded = true;
    }
    
    // GA4 betöltése
    if (!window.gtag) {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
      script.async = true;
      document.head.appendChild(script);
      
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };
      
      const now = new Date();
      window.gtag('js', now);
      window.gtag('config', 'G-KWH607ZP7H');
    } else {
      window.gtag('event', 'page_view');
    }
    
    console.log('[CookieConsent] Elfogadva - trackerek betöltve');
  }, [setCookiesAccepted]);
  
  const handleDecline = useCallback(() => {
    console.log('[CookieConsent] Elutasítás - setCookiesAccepted(false)');
    setCookiesAccepted(false);
    setCookie('ingatlanTerkepCookieConsent', 'false', { maxAge: 150 * 24 * 60 * 60 });
    console.log('[CookieConsent] Elutasítva - marketing trackerek NEM letöltve');
  }, [setCookiesAccepted]);
  
  if (!mounted) return null;
  
  return (
    <>
      {/* BARION PIXEL - mindig betöltődik */}
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
        onLoad={() => {
          if (typeof window !== 'undefined' && window.bp && window.barion_pixel_id) {
            window.bp('init', 'addBarionPixelId', window.barion_pixel_id);
            console.log('[Barion] Pixel inicializálva');
          }
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