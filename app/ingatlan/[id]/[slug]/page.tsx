'use client';

import { useEffect, useState } from 'react';
import PostDetailsPage from '@/pages/PostDetailsPage';
import { getPostDetails } from '@/services/apiService';

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
    if (cookiesAccepted && window.gtag) {
      window.gtag('event', 'generate_lead', {
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