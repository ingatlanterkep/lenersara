// CookieConsentWrapper.tsx - PONTOSAN ÚGY, MINT A RÉGIBEN

'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie, getCookie } from 'cookies-next';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const hasConsent = getCookie('ingatlanTerkepCookieConsent') === 'true';
    setCookiesAccepted(hasConsent);
    setMounted(true);
  }, []);

  // GTM és GA4 betöltése CSAK elfogadás után - PONTOSAN ÚGY, MINT A RÉGIBEN
  useEffect(() => {
    if (!cookiesAccepted) return;
    
    // Ellenőrizzük, hogy már betöltöttük-e
    if ((window as any).gtmLoaded) return;
    
    console.log('[GTM] Google Tag Manager betöltése...');
    
    // 1. GTM fő script betöltése (head-be)
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WVS766GK');`;
    document.head.appendChild(gtmScript);
    
    // 2. GTM noscript iframe (body legelső gyermekeként)
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVS766GK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
    
    // 3. GA4 gtag betöltése
    const gaScript = document.createElement('script');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-KWH607ZP7H';
    gaScript.async = true;
    document.head.appendChild(gaScript);
    
    // 4. gtag függvény definiálása
    function gtag(...args: any[]) {
      ((window as any).dataLayer = (window as any).dataLayer || []).push(args);
    }
    (window as any).gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', 'G-KWH607ZP7H', {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure'
    });
    
    (window as any).gtmLoaded = true;
    
    console.log('[GTM] Google Tag Manager betöltve');
    console.log('[GA4] GA4 inicializálva');
    
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