'use client';

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie } from 'cookies-next';

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const handleAccept = () => {
    setCookie('ingatlanTerkepCookieConsent', 'true', { maxAge: 150 * 24 * 60 * 60 });
    // GTM, GA4, Meta Pixel betöltése itt...
  };
  
  const handleDecline = () => {
    setCookie('ingatlanTerkepCookieConsent', 'false', { maxAge: 150 * 24 * 60 * 60 });
  };
  
  return (
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
    >
      Ez a weboldal sütiket használ a felhasználói élmény javítására...
      <a href="/privacy-policy" style={{ color: "#0078A8" }}>Adatvédelmi nyilatkozat</a>
    </CookieConsent>
  );
}