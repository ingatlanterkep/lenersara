// app/ingatlan/[id]/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 🔥 HASZNÁLD A next/dynamic-ot RÖGTÖN az import után
const PostDetailsPage = dynamic(
  () => import('@/pages/PostDetailsPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Hirdetés betöltése...</div>
      </div>
    )
  }
);

// 🔥 EZUTÁN jöhet az export - MÁS NÉVEN!
export const dynamicConfig = 'force-dynamic';
export const revalidate = 0;

export default function PropertyDetails({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiesDecided, setCookiesDecided] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    setCookiesDecided(!!document.cookie.includes('ingatlanTerkepCookieConsent'));
    
    params.then((p) => setPostId(p.id));
  }, [params]);
  
  const handleLeadEvent = (type: string, postId: string) => {
    if (cookiesAccepted && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        lead_type: type,
        post_id: postId,
        value: 100,
        currency: 'HUF'
      });
    }
  };
  
  if (!postId) return <div>Betöltés...</div>;
  
  return <PostDetailsPage 
    cookiesAccepted={cookiesAccepted} 
    cookiesDecided={cookiesDecided} 
    onLeadEvent={handleLeadEvent} 
  />;
}