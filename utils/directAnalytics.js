// src/utils/directAnalytics.js
'use client';

export const sendDirectAnalyticsEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return false;
  
  const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
  if (!hasConsent) {
    console.log(`[DirectAnalytics] ⛔ Nincs süti elfogadás: ${eventName}`);
    return false;
  }

  try {
    const measurementId = 'G-TG5FRRRT0B';
    
    // Client ID lekérése
    let clientId = 'anonymous';
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const match = gaCookie.match(/GA1\.\d+\.(\d+)\.(\d+)/);
      if (match) {
        clientId = match[1] + '.' + match[2];
      }
    }
    
    // Session ID - sessionStorage-ból, hogy ne változzon minden eseménynél
    let sessionId = sessionStorage.getItem('ga_session_id');
    if (!sessionId) {
      sessionId = Math.floor(Date.now() / 1000).toString();
      sessionStorage.setItem('ga_session_id', sessionId);
    }

    const params = new URLSearchParams();
    
    // 🔥 CSAK A KÖTELEZŐ ÉS HASZNOS PARAMÉTEREK
    params.append('v', '2');
    params.append('tid', measurementId);
    params.append('cid', clientId);
    params.append('en', eventName);
    params.append('sid', sessionId);
    params.append('dl', window.location.href);
    params.append('dt', document.title);
    params.append('dr', document.referrer || '');
    params.append('ul', navigator.language || 'hu-hu');
    params.append('sr', `${window.screen.width}x${window.screen.height}`);
    
    // ✅ CSAK AZ ELSŐ PAGE_VIEW-NÁL KÜLDJÜK A SESSION STARTOT
    if (eventName === 'page_view' && !sessionStorage.getItem('ga_session_started')) {
      params.append('_ss', '1');
      sessionStorage.setItem('ga_session_started', 'true');
    }
    
    // ✅ EGYEDI ESEMÉNYPARAMÉTEREK
    Object.entries(eventParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'number') {
          params.append(`epn.${key}`, String(value));
        } else {
          params.append(`ep.${key}`, String(value));
        }
      }
    });
    
    const url = `https://region1.google-analytics.com/g/collect?${params.toString()}`;
    
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      keepalive: true,
      body: '',
    }).catch(() => {});
    
    console.log(`[DirectAnalytics] ✅ Elküldve: ${eventName}`, eventParams);
    return true;
    
  } catch (error) {
    console.error(`[DirectAnalytics] ❌ Hiba (${eventName}):`, error);
    return false;
  }
};

export const sendPageView = (pageTitle, pageLocation) => {
  return sendDirectAnalyticsEvent('page_view', {
    page_title: pageTitle || document.title,
    page_location: pageLocation || window.location.href,
  });
};

export const sendLayerToggle = (layerName, state, activeLayers, zoom) => {
  return sendDirectAnalyticsEvent('layer_toggle', {
    layer_name: layerName,
    layer_state: state ? 'enabled' : 'disabled',
    active_layers: activeLayers || 'none',
    zoom_level: zoom || 7,
  });
};

export const sendGenerateLead = (leadType, postId, value = 100) => {
  return sendDirectAnalyticsEvent('generate_lead', {
    lead_type: leadType,
    post_id: postId,
    value: value,
    currency: 'HUF'
  });
};

export const sendViewItem = (post, postId) => {
  return sendDirectAnalyticsEvent('view_item', {
    items: JSON.stringify([{
      item_id: postId,
      item_name: post?.title || 'Unknown',
      price: post?.listing_type === 'eladó' ? post?.price : post?.rental_price,
      currency: 'HUF'
    }]),
    value: post?.listing_type === 'eladó' ? post?.price : post?.rental_price,
    currency: 'HUF'
  });
};

export const sendAIQuestion = (questionKey, questionText, postId, postType, listingType, price) => {
  return sendDirectAnalyticsEvent('ai_question', {
    question_key: questionKey,
    question_text: questionText,
    post_id: postId,
    post_type: postType || 'unknown',
    listing_type: listingType || 'unknown',
    price: price || 0
  });
};

export const sendFavoriteToggle = (postId, action, listingType, price, postType) => {
  return sendDirectAnalyticsEvent(`${action}_favorites`, {
    post_id: postId,
    listing_type: listingType || 'unknown',
    price: price || 0,
    type: postType || 'unknown',
    page_type: 'detail_page'
  });
};

export const sendContactClick = (contactType, postId, adId) => {
  return sendDirectAnalyticsEvent('contact_click', {
    contact_type: contactType,
    post_id: postId,
    ad_id: adId || 'unknown',
    content_category: 'property_contact'
  });
};

export const sendScroll = (percentScrolled) => {
  return sendDirectAnalyticsEvent('scroll', {
    percent_scrolled: percentScrolled
  });
};

export const sendFirstVisit = () => {
  return sendDirectAnalyticsEvent('first_visit', {
    timestamp: new Date().toISOString()
  });
};