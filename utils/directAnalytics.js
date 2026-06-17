// src/utils/directAnalytics.js
'use client';

// Egyszerűbb megoldás - Measurement Protocol
export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
    return false;
  }

  try {
    const measurementId = 'G-KWH607ZP7H';
    const apiSecret = 'YOUR_API_SECRET'; // 🔥 EZT ÁLLÍTSD BE A GA4-BEN!
    
    // Client ID lekérése
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
    // 🔥 Measurement Protocol - ez garantáltan működik
    const payload = {
      client_id: clientId,
      events: [{
        name: eventName,
        params: {
          ...eventParams,
          session_id: Math.floor(Date.now() / 1000).toString(),
          engagement_time_msec: '0',
        }
      }]
    };
    
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
    });
    
    console.log(`[DirectAnalytics] ✅ Elküldve (MP): ${eventName}`, eventParams);
    return true;
    
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};

// A többi export változatlan...
export const sendPageView = (pageTitle, pageLocation) => {
  return sendDirectAnalyticsEvent('page_view', {
    page_title: pageTitle || document.title,
    page_location: pageLocation || window.location.href,
  });
};

/**
 * Layer toggle esemény
 */
export const sendLayerToggle = (layerName, state, activeLayers, zoom) => {
  return sendDirectAnalyticsEvent('layer_toggle', {
    layer_name: layerName,
    layer_state: state ? 'enabled' : 'disabled',
    active_layers: activeLayers || 'none',
    zoom_level: zoom || 7,
  });
};