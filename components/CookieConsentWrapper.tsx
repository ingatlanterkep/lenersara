// src/components/CookieConsentWrapper.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';
import Script from 'next/script';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const barionInitialized = useRef(false);

  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);
  
  // 🔥 BARION PIXEL - CSAK EGYSZER INICIALIZÁLÓDIK
  useEffect(() => {
    if (typeof window === 'undefined' || barionInitialized.current) return;
    
    try {
      // Csak akkor inicializáljuk, ha még nem létezik
      if (!window.bp) {
        // Egyszerűbb inicializálás - a Barion script úgyis felülírja
        const bpFn = function(this: any, ...args: any[]) {
          if (!this.q) this.q = [];
          this.q.push(args);
        };
        bpFn.l = Date.now();
        
        // Type assertion a window.bp-hez
        window.bp = bpFn as Window['bp'];
        
        barionInitialized.current = true;
        console.log('[Barion] Pixel inicializálva');
      }
    } catch (error) {
      console.error('[Barion] Hiba a pixel inicializálása során:', error);
    }
  }, []);

  // 🔥 Cookie elfogadás kezelése
  const handleAccept = useCallback(() => {
    console.log('[CookieConsent] Elfogadva - cookie beállítása...');
    
    setCookie('ingatlanTerkepCookieConsent', 'true', { 
      maxAge: 150 * 24 * 60 * 60,
      path: '/',
    });
    
    setCookiesAccepted(true);
    
    
  }, []);
  
  const handleDecline = useCallback(() => {
    try {
      setCookie('ingatlanTerkepCookieConsent', 'false', { maxAge: 150 * 24 * 60 * 60 });
      setCookiesAccepted(false);
      console.log('[CookieConsent] Elutasítva - marketing trackerek NEM letöltve');
      
      window.dispatchEvent(new Event('cookieConsentUpdated'));
    } catch (error) {
      console.error('[CookieConsent] Hiba az elutasítás során:', error);
    }
  }, []);
  
  if (!mounted) return null;
  
  return (
    <>
      {/* 🔥 BARION PIXEL - CSAK EGYSZER BETÖLTŐDIK */}
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
          console.warn('[Barion] Pixel betöltése sikertelen (nem kritikus)');
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