// src/utils/analyticsDebug.js
export const testAnalytics = () => {
  console.log('=== ANALYTICS DEBUG ===');
  console.log('Cookies:', document.cookie);
  console.log('Has consent:', document.cookie.includes('ingatlanTerkepCookieConsent=true'));
  console.log('window.gtag:', typeof window.gtag);
  console.log('window.dataLayer:', window.dataLayer);
  
  if (window.gtag) {
    window.gtag('event', 'test_event', {
      test_param: 'test_value',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Test event sent');
  } else {
    console.log('❌ gtag not available');
  }
};

// Használat a böngésző konzolból:
// import { testAnalytics } from '@/utils/analyticsDebug';
// testAnalytics();