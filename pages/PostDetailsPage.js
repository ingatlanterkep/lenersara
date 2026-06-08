'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getPostDetails, getSimilarPosts } from '../services/apiService';
import PostDetailsGallery from '../components/PostDetailsGallery';
import L from 'leaflet';
import sanitizeHtml from 'sanitize-html';
import '../styles/PostDetailsPage.css';
import { analyzePropertyAI } from '../services/apiService';
import { 
  getFavoritePosts, 
  addFavoritePost,  
  removeFavoritePost, 
  isFavoritePost, 
  clearExpiredFavorites 
} from '../utils/favoritePosts';
import ReCAPTCHA from "react-google-recaptcha";

const LazyMiniMapComponent = React.lazy(() => import('../components/MiniMapComponent'));

const generateSlug = (title) => {
  if (!title) return 'unknown';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const maskPhoneNumber = (phone) => {
  if (!phone) return 'Nincs megadva';
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length >= 9) {
    const lastThree = cleanPhone.slice(-3);
    const countryCode = cleanPhone.startsWith('36') ? '+36' : phone.slice(0, phone.length - cleanPhone.length + 2);
    return `${countryCode} *** *** ${lastThree}`;
  }
  return phone;
};

const maskEmail = (email) => {
  if (!email) return 'Nincs megadva';
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  const localLength = localPart.length;
  if (localLength <= 3) return `***@${domain}`;
  const firstTwo = localPart.slice(0, 2);
  const lastOne = localPart.slice(-1);
  return `${firstTwo}***${lastOne}@${domain.slice(0, 1)}***${domain.slice(-4)}`;
};

const PostDetailsPage = React.memo(({ cookiesAccepted, cookiesDecided, onLeadEvent }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const postId = params?.id;
  const title = params?.slug;

  const [post, setPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [phoneButtonChanging, setPhoneButtonChanging] = useState(false);
  const [emailButtonChanging, setEmailButtonChanging] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [aiQuestion, setAiQuestion] = useState(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswerData, setAiAnswerData] = useState({});
  const [favoritePosts, setFavoritePosts] = useState(new Set());
  const [aiPreview, setAiPreview] = useState('');
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeAiQuestion, setActiveAiQuestion] = useState(null);
  const [lastSentQuestion, setLastSentQuestion] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [sendingLead, setSendingLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';

  useEffect(() => {
    setFavoritePosts(getFavoritePosts());
    clearExpiredFavorites();
  }, []);

  const getAdSource = useCallback(() => {
    return searchParams.get('ad_source') || 'unknown';
  }, [searchParams]);

  const cleanHtml = useCallback((html) => {
    if (!html) return '';
    return sanitizeHtml(html, {
      allowedTags: ['p', 'br', 'span', 'strong', 'em', 'ul', 'li', 'b', 'i'],
      allowedAttributes: { span: ['style'] },
      allowedStyles: {
        '*': {
          'color': [/^#(0-9a-fA-F){6}$/],
          'font-size': [/^\d+(?:\.\d+)?px$/],
          'font-weight': [/^bold$/],
          'font-style': [/^italic$/],
        },
      },
      transformTags: { 'w:WordDocument': () => null, 'xml': () => null },
    });
  }, []);

  const handleSendLead = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setLeadError('Kérlek, erősítsd meg, hogy nem vagy robot!');
      return;
    }

    setSendingLead(true);
    setLeadError('');

    try {
      const response = await fetch(`${baseUrl}/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          name: leadFormData.name,
          email: leadFormData.email,
          phone: leadFormData.phone,
          message: leadFormData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setLeadSent(true);
        
        if (acceptedPrivacy) {
          try {
            const marketingResponse = await fetch(`${baseUrl}/api/subscribe-marketing`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: leadFormData.email,
                name: leadFormData.name,
                postId: postId,
                source: 'contact_form'
              })
            });
            
            const marketingData = await marketingResponse.json();
            if (marketingData.success) {
              console.log('[Marketing] Sikeres feliratkozás:', marketingData.message);
            } else {
              console.warn('[Marketing] Feliratkozási hiba:', marketingData.message);
            }
          } catch (marketingErr) {
            console.error('[Marketing] Hiba a feliratkozás közben:', marketingErr);
          }
        }
        
        if (cookiesAccepted && window.gtag) {
          window.gtag('event', 'generate_lead', {
            lead_type: 'contact_form',
            post_id: postId
          });
        }
      } else {
        throw new Error(data.message || 'Hiba történt');
      }
    } catch (err) {
      setLeadError(err.message || 'Hiba történt. Próbáld újra.');
    } finally {
      setSendingLead(false);
    }
  };

  const handleContactClick = useCallback((type, postId, adId = null) => {
    const adSource = getAdSource();
    const eventData = { postId, ad_id: adId || adSource, content_category: 'property_contact' };
    if (window.fbq && cookiesAccepted) {
      window.fbq('trackCustom', `Contact_${type}`, eventData);
    }
  }, [getAdSource, cookiesAccepted]);

  const handleRevealPhone = useCallback(() => {
    setPhoneButtonChanging(true);
    setTimeout(() => {
      setShowPhoneNumber(true);
      setPhoneButtonChanging(false);
      handleContactClick('Phone_Reveal', postId, post?.ad_id || getAdSource());
      if (cookiesAccepted && window.gtag) {
        window.gtag('event', 'generate_lead', {
          lead_type: 'phone_reveal',
          post_id: postId,
          value: 100,
          currency: 'HUF'
        });
      }
      if (onLeadEvent) {
        onLeadEvent('phone_reveal', postId);
      }
    }, 300);
  }, [postId, post?.ad_id, handleContactClick, getAdSource, onLeadEvent, cookiesAccepted]);

  const handleRevealEmail = useCallback(() => {
    setEmailButtonChanging(true);
    setTimeout(() => {
      setShowEmail(true);
      setEmailButtonChanging(false);
      handleContactClick('Email_Reveal', postId, post?.ad_id || getAdSource());
      if (cookiesAccepted && window.gtag) {
        window.gtag('event', 'generate_lead', {
          lead_type: 'email_reveal',
          post_id: postId,
          value: 100,
          currency: 'HUF'
        });
      }
      if (onLeadEvent) {
        onLeadEvent('email_reveal', postId);
      }
    }, 300);
  }, [postId, post?.ad_id, handleContactClick, getAdSource, onLeadEvent, cookiesAccepted]);

  const trackAIUsage = useCallback((questionKey, questionText) => {
    if (!cookiesAccepted || !window.gtag) return;
    window.gtag('event', 'ai_question', {
      question_key: questionKey,
      question_text: questionText,
      post_id: postId,
      post_type: post?.type,
      listing_type: post?.listing_type,
      price: post?.price || post?.rental_price,
      page_type: 'detail_page'
    });
  }, [cookiesAccepted, postId, post]);

  const aiQuestions = [
    { 
      key: 'ar', 
      text: 'Alul/túlárazott?', 
      full: 'Alul vagy túl van árazva ez az ingatlan? Hasonlítsd össze a környék aktuális eladó és kiadó négyzetméter áraival 2026-ban. Reális, túláarzott, vagy alulárazott szerinted összességében? Mennyi lehet egy reális ingatlan alku itt? Inkább jó, vagy rossz ajánlat?' 
    },
    { 
      key: 'kinek', 
      text: 'Kiknek ajánlott?', 
      full: 'Kiknek ajánlott ez az ingatlan (család, befektető, nyugdíjas, fiatal párok stb.) és miért?' 
    },
    { 
      key: 'koltsegek', 
      text: 'Plusz költségek?', 
      full: 'Milyen reális plusz költségekre kell számítani vásárlás után (rezsi, felújítás, illeték, közös költség, stb.) Adsz egy összefoglaló becslést?' 
    },
    { 
      key: 'befektetes', 
      text: 'Megéri befektetni?', 
      full: 'Megéri-e befektetni? Milyen módon lehet befektetni? Ha ki lehet adni, mennyi lehet a reális nettó hozam? Hány év alatt térülhet meg? Fejlődik-e a környék? Értékálló lesz-e?' 
    },
    { 
      key: 'rejtek', 
      text: 'Rejtett előnyök/hátrányok?', 
      full: 'Milyen rejtett előnyei és hátrányai lehetnek ennek az ingatlannak, amik nem látszanak a hirdetésből, amire nem tér ki a leírás?' 
    },
  ];

  const AI_DISCLAIMER = `
<br /><br />
<small style="color: #666; font-size: 0.85rem;">
  <strong>Figyelem:</strong> Ez az elemzés mesterséges intelligencia által készült, 
  tájékoztató jellegű, és nem minősül szakvéleménynek vagy értékbecslésnek. 
  Az AI nem helyettesíti a szakértői véleményt. Minden döntés saját felelősségre történik.
</small>`;

  const formatAIAnswer = (text) => {
    if (!text) return '';
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/^### (.*?)$/gm, '<h4>$1</h4>')
      .replace(/^## (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^# (.*?)$/gm, '<h2>$1</h2>')
      .replace(/\n/g, '<br />');
    return formatted + AI_DISCLAIMER;
  };

  const handleAIQuestion = async (q) => {
    if (lastSentQuestion === q.key) return;

    setAiLoading(true);
    setActiveAiQuestion(q.key);
    setAiPreview('');
    setShowEmailGate(false);
    setEmailSent(false);
    trackAIUsage(q.key, q.text);

    try {
      const result = await analyzePropertyAI(
        postId, 
        q.full, 
        q.key, 
        null, 
        'preview'
      );

      if (result.success && result.mode === 'preview') {
        setAiPreview(result.previewText);
        setShowEmailGate(true);
        console.log('[Frontend] Preview sikeresen érkezett');
      }
    } catch (err) {
      console.error('[handleAIQuestion] Hiba:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || !activeAiQuestion) return;

    const fullQuestion = aiQuestions.find(q => q.key === activeAiQuestion)?.full;
    if (!fullQuestion) return;

    setAiLoading(true);

    try {
      const result = await analyzePropertyAI(
        postId, 
        fullQuestion, 
        activeAiQuestion, 
        emailInput, 
        'full'
      );

      if (result.success && result.mode === 'full') {
        setEmailSent(true);
        setShowEmailGate(false);
        setLastSentQuestion(activeAiQuestion);
        setAiPreview(''); 
        console.log('✅ Teljes elemzés elküldve');
      }
    } catch (err) {
      console.error('[handleEmailSubmit] Hiba:', err);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (cookiesAccepted && post && window.gtag) {
      window.gtag('event', 'view_item', {
        items: [{
          item_id: postId,
          item_name: post.title,
          price: post.listing_type === 'eladó' ? post.price : post.rental_price,
          currency: 'HUF'
        }],
        value: post.listing_type === 'eladó' ? post.price : post.rental_price,
        currency: 'HUF',
        send_to: 'G-KWH607ZP7H'
      });
    }
  }, [post, cookiesAccepted, postId]);

  const handlePhoneClick = useCallback(() => {
    handleContactClick('Phone_Click', postId, post?.ad_id || getAdSource());
  }, [postId, post?.ad_id, handleContactClick, getAdSource]);

  const handleEmailClick = useCallback(() => {
    handleContactClick('Email_Click', postId, post?.ad_id || getAdSource());
  }, [postId, post?.ad_id, handleContactClick, getAdSource]);

  const handleReadMore = () => {
    setIsDescriptionExpanded(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postResponse, similarResponse] = await Promise.all([
          getPostDetails(postId),
          getSimilarPosts(postId, { limit: 10 }),
        ]);
        const cleanedData = {
          ...postResponse.data,
          rooms: postResponse.data.rooms > 0 ? postResponse.data.rooms : null,
          total_floors: postResponse.data.total_floors && postResponse.data.total_floors !== '' && postResponse.data.total_floors !== '0' && postResponse.data.total_floors !== '00' ? postResponse.data.total_floors : null,
          floor_count: postResponse.data.floor_count > 0 ? postResponse.data.floor_count : null,
          energy_class: postResponse.data.energy_class && postResponse.data.energy_class !== '' && postResponse.data.energy_class !== '0' && postResponse.data.energy_class !== '00' ? postResponse.data.energy_class : null,
          utility_cost: postResponse.data.utility_cost > 0 ? postResponse.data.utility_cost : null,
          year_built: postResponse.data.year_built > 0 ? postResponse.data.year_built : null,
          year_renovated: postResponse.data.year_renovated > 0 ? postResponse.data.year_renovated : null,
          ceiling_height: postResponse.data.ceiling_height && postResponse.data.ceiling_height !== '0' && postResponse.data.ceiling_height !== '00' ? postResponse.data.ceiling_height : null,
          view: postResponse.data.view && postResponse.data.view !== '' && postResponse.data.view !== '0' && postResponse.data.view !== '00' ? postResponse.data.view : null,
          parking: postResponse.data.parking && postResponse.data.parking !== '' && postResponse.data.parking !== '0' && postResponse.data.parking !== '00' ? postResponse.data.parking : null,
          orientation: postResponse.data.orientation && postResponse.data.orientation !== '' && postResponse.data.orientation !== '0' && postResponse.data.orientation !== '00' ? postResponse.data.orientation : null,
          attic: postResponse.data.attic && postResponse.data.attic !== '' && postResponse.data.attic !== '0' && postResponse.data.attic !== '00' ? postResponse.data.attic : null,
          basement: postResponse.data.basement && postResponse.data.basement !== '' && postResponse.data.basement !== '0' && postResponse.data.basement !== '00' ? postResponse.data.basement : null,
          land_area: postResponse.data.land_area > 0 ? postResponse.data.land_area : null,
          type: postResponse.data.type && postResponse.data.type !== '' && postResponse.data.type !== '0' && postResponse.data.type !== '00' ? postResponse.data.type : null,
          condition: postResponse.data.condition && postResponse.data.condition !== '' && postResponse.data.condition !== '0' && postResponse.data.condition !== '00' ? postResponse.data.condition : null,
          heating_type: postResponse.data.heating_type && postResponse.data.heating_type !== '' && postResponse.data.heating_type !== '0' && postResponse.data.heating_type !== '00' ? postResponse.data.heating_type : null,
          comfort_level: postResponse.data.comfort_level && postResponse.data.comfort_level !== '' && postResponse.data.comfort_level !== '0' && postResponse.data.comfort_level !== '00' ? postResponse.data.comfort_level : null,
          status: postResponse.data.status && postResponse.data.status !== '' && postResponse.data.status !== '0' && postResponse.data.status !== '00' ? postResponse.data.status : null,
          agent: postResponse.data.agent ? {
            ...postResponse.data.agent,
            bio: cleanHtml(postResponse.data.agent.bio),
          } : null,
        };
        setPost(cleanedData);
        setSimilarPosts(similarResponse.data || []);

        const expectedSlug = generateSlug(cleanedData.title);
        if (title !== expectedSlug) {
          window.history.replaceState(null, '', `/ingatlan/${postId}/${expectedSlug}`);
        }
      } catch (err) {
        setError('Hiba történt a hirdetés betöltésekor.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId, title, cleanHtml]);

  const getAgentName = () => {
    if (post?.agent?.name) {
      return post.agent.name;
    }
    return 'Értékesítő';
  };

  const setTemplateMessageWithName = (messageBody) => {
    const agentName = getAgentName();
    const fullMessage = `Kedves ${agentName}! ${messageBody}`;
    setLeadFormData({...leadFormData, message: fullMessage});
  };

  const formatAddress = useCallback((address) => {
    if (!address) return null;
    const { street, city, region, county } = address;
    const parts = [city || '', region || '', street || '', county ? `${county} vármegye` : ''].filter(part => part.trim() !== '');
    return parts.length > 0 ? parts.join(', ') : null;
  }, []);

  const formatPrice = useCallback((listingType, price, rentalPrice, currency) => {
    if (listingType === 'eladó') {
      if (!price) return null;
      const formattedPrice = Number(price.toFixed(2)).toString();
      return `${formattedPrice} Millió Ft`;
    } else {
      if (!rentalPrice) return null;
      const formattedRentalPrice = Number(rentalPrice.toFixed(2)).toString();
      return `${formattedRentalPrice} Ezer Ft`;
    }
  }, []);

  const formatDescription = useCallback((description) => {
    if (!description) return null;
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  }, []);

  const renderFeatures = useCallback((features) => {
    if (!features) return null;
    const featureList = Object.entries(features)
      .filter(([_, value]) => value === true)
      .map(([key]) => {
        const featureNames = {
          balcony: 'Erkély',
          garage: 'Garázs',
          air_conditioning: 'Légkondicionáló',
          smoking: 'Dohányzás megengedett',
          gallery: 'Galéria',
          elevator: 'Lift',
          furnished: 'Bútorozott',
          pets_allowed: 'Háziállat megengedett',
          wheelchair_accessible: 'Akadálymentesített',
          smart_home: 'Okosotthon',
          basement: 'Pince',
          attic: 'Padlás',
          terrace: 'Terasz',
          pool: 'Medence',
          orchard: 'Gyümölcsöskert',
        };
        const featureName = featureNames[key] || key;
        return featureName.charAt(0).toUpperCase() + featureName.slice(1);
      });

    if (featureList.length === 0) return null;
    return (
      <ul className="features-list">
        {featureList.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    );
  }, []);

  const renderUtilities = useCallback((utilities) => {
    if (!utilities) return null;
    const utilityItems = Object.entries(utilities)
      .filter(([_, value]) => value && value !== 'Nincs' && value !== 'Nincs megadva' && value !== '0' && value !== 0 && value !== '00')
      .map(([key, value]) => {
        const utilityNames = { electricity: 'Villany', gas: 'Gáz', water: 'Víz', internet: 'Internet', sewer: 'Csatorna' };
        const utilityName = utilityNames[key] || key;
        return (
          <li key={key}>
            <span className="detail-label">{utilityName}:</span> {value}
          </li>
        );
      });

    if (utilityItems.length === 0) return null;
    return <ul className="features-list">{utilityItems}</ul>;
  }, []);

  const renderBio = useCallback((bio) => {
    if (!bio) return <p>Nincs megadva bemutatkozás.</p>;
    return <div className="agent-bio" dangerouslySetInnerHTML={{ __html: bio }} />;
  }, []);

  const getFullImageUrl = useCallback((imagePath) => {
    const path = typeof imagePath === 'object' && imagePath?.url 
      ? imagePath.url 
      : imagePath;

    if (!path || typeof path !== 'string') {
      console.warn('getFullImageUrl: invalid path', path);
      return '/placeholder.jpg';
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `${baseUrl}${path}`;
  }, [baseUrl]);

  const getImageUrls = useCallback((image) => {
    const baseUrlImg = getFullImageUrl(image);
    const lqipUrl = `${baseUrlImg}?tr=w-20,bl-10`;
    const webpUrl = `${baseUrlImg}?tr=f-webp`;
    const srcSet = [
      `${baseUrlImg}?tr=w-300 300w`,
      `${baseUrlImg}?tr=w-600 600w`,
      `${baseUrlImg}?tr=w-900 900w`,
    ].join(', ');
    return { lqipUrl, webpUrl, srcSet, baseUrl: baseUrlImg };
  }, [getFullImageUrl]);

  const createCustomIcon = useCallback((price, unit) => {
    const formattedPrice = parseFloat(price).toFixed(1).replace(/\.0$/, '');
    const priceText = `${formattedPrice} ${unit}`;
    const estimatedWidth = priceText.length * 6 + 16;
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div style="
          background-color: rgba(151, 212, 255, 0.6);
          border: 2px solid rgb(80, 153, 206);
          border-radius: 15px;
          padding: 6px 12px;
          font-size: 10px;
          font-weight: bold;
          color: rgb(255, 255, 255);
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
          white-space: nowrap;
          width: ${estimatedWidth}px;
          display: inline-block;
          font-family: 'Poppins', sans-serif;
        ">
          ${priceText}
        </div>
      `,
      iconSize: [estimatedWidth, 18],
      iconAnchor: [estimatedWidth / 2, 9],
    });
  }, []);

  const renderSimilarPosts = useCallback(() => {
    if (!similarPosts.length) {
      return <p>Nincsenek hasonló ingatlanok.</p>;
    }

    return (
      <>
        <h2>Hasonló ingatlanok</h2>
        {similarPosts.length < 6 && (
          <p className="warning-text">
            Kevesebb hasonló ingatlan található a városban, ezért a megyéből vagy országosan is mutatunk találatokat.
          </p>
        )}
        <div className="similar-posts-grid">
          {similarPosts.map((similarPost) => (
            <a
              key={similarPost._id}
              href={`/ingatlan/${similarPost._id}/${generateSlug(similarPost.title)}`}
              className="similar-post-card"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick('Similar_Post_Click', postId, similarPost._id)}
            >
              <div className="similar-post-image">
                {similarPost.images && similarPost.images.length > 0 ? (
                  <picture>
                    <source srcSet={getImageUrls(similarPost.images[0]).webpUrl} type="image/webp" />
                    <img
                      src={getImageUrls(similarPost.images[0]).lqipUrl}
                      srcSet={getImageUrls(similarPost.images[0]).srcSet}
                      sizes="(max-width: 768px) 300px, 600px"
                      alt={similarPost.title || 'Ingatlan kép'}
                      loading="lazy"
                      width="300"
                      height="150"
                    />
                  </picture>
                ) : (
                  <div className="no-image">Nincs kép</div>
                )}
              </div>
              <div className="similar-post-content">
                <h3>{similarPost.title || 'Nincs megadva'}</h3>
                <p className="similar-post-price">
                  {formatPrice(
                    similarPost.listing_type,
                    similarPost.price,
                    similarPost.rental_price,
                    similarPost.currency
                  ) || 'Nincs ár megadva'}
                </p>
                {similarPost.area && similarPost.area !== 0 && similarPost.area !== '0' && similarPost.area !== '00' && (
                  <p className="similar-post-area">Alapterület: {similarPost.area} m²</p>
                )}
                <p className="similar-post-address">
                  {formatAddress(similarPost.address) || 'Nincs cím megadva'}
                </p>
                <p className="similar-post-description">
                  {similarPost.description?.slice(0, 100) || 'Nincs leírás'}...
                </p>
              </div>
            </a>
          ))}
        </div>
      </>
    );
  }, [similarPosts, handleContactClick, postId, getImageUrls, formatPrice, formatAddress]);

  if (error) return <p className="error-text">{error}</p>;
  if (loading) return <p className="loading-text">Betöltés...</p>;
  if (!post) return null;

  const price = post.listing_type === 'eladó' ? post.price : post.rental_price;
  const priceUnit = post.listing_type === 'eladó' ? 'M' : 'E';

  const hasFeatures = renderFeatures({
    furnished: post.furnished === 'Részben bútorozott',
    wheelchair_accessible: post.accessibility === 'Akadálymentesített',
    basement: post.basement,
    attic: post.attic,
  });

  const hasUtilities = renderUtilities(post.comfort);

  return (
    <div className="post-details-page">
      <div className="post-details-container">
        <div className="post-header">
          <div className="header-main">
            <div className="header-info">
              <h1 className="post-title">{post.title || 'Nincs megadva'}</h1>
              <hr className="post-title-divider" />
              <div className="post-meta">
                {formatPrice(post.listing_type, post.price, post.rental_price, post.currency) && (
                  <p className="post-price">
                    {post.listing_type === 'eladó' ? 'Ár: ' : 'Bérleti díj: '}
                    {formatPrice(post.listing_type, post.price, post.rental_price, post.currency)}
                  </p>
                )}
                {formatAddress(post.address) && (
                  <p className="post-address">{formatAddress(post.address)}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => {
                const postIdToToggle = post._id;
                const wasFavorite = isFavoritePost(postIdToToggle);

                if (wasFavorite) {
                  removeFavoritePost(postIdToToggle);
                  setFavoritePosts(prev => new Set([...prev].filter(id => id !== postIdToToggle)));
                } else {
                  addFavoritePost(postIdToToggle);
                  setFavoritePosts(prev => new Set([...prev, postIdToToggle]));
                }

                if (cookiesAccepted && window.gtag) {
                  const eventName = wasFavorite ? 'remove_from_favorites' : 'add_to_favorites';
                  window.gtag('event', eventName, {
                    post_id: postIdToToggle,
                    listing_type: post.listing_type,
                    price: post.price || post.rental_price || null,
                    type: post.type || null,
                    page_type: 'detail_page'
                  });
                }

                window.dispatchEvent(new Event('favoritesUpdated'));
              }}
              className={`favorite-header-button ${isFavoritePost(post._id) ? 'active' : ''}`}
            >
              <img
                src={isFavoritePost(post._id) ? '/heart-filled.png' : '/heart-empty.png'}
                alt="Kedvenc"
                className="favorite-header-icon"
              />
            </button>
          </div>

          {/* AI Analysis Section */}
          <div className="ai-analysis-section">
            <div className="ai-header">
              <div className="ai-title">
                <img src="/ai.png" alt="AI" className="ai-icon" loading="lazy" />
                <span>AI elemzés</span>
              </div>
              <div className="ai-questions-row">
                {aiQuestions.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => handleAIQuestion(q)}
                    className={`ai-pill ${activeAiQuestion === q.key && !aiLoading ? 'active' : ''}`}
                    disabled={aiLoading}
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-response">
              {aiLoading && <div className="ai-loading">Elemzés folyamatban...</div>}
              {aiPreview && !emailSent && lastSentQuestion !== activeAiQuestion && (
                <>
                  <div className="ai-preview-box">
                    <div dangerouslySetInnerHTML={{ __html: aiPreview.replace(/\n/g, '<br />') }} />
                    <p className="preview-teaser">Teljes elemzés emailben • Részletes értékelés + becsült érték</p>
                  </div>
                  {showEmailGate && (
                    <form onSubmit={handleEmailSubmit} className="email-gate">
                      <input
                        type="email"
                        placeholder="Email címed"
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        required
                      />
                      <label>
                        <input type="checkbox" required /> 
                        Elfogadom az <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatót</a> 
                        és hozzájárulok a marketing célú megkeresésekhez.
                      </label>
                      <button type="submit" disabled={aiLoading}>
                        Teljes elemzést kérek emailben
                      </button>
                    </form>
                  )}
                </>
              )}
              {emailSent && (
                <p className="success-message">
                  ✅ Elküldve! Nézd meg a postaládádat (és a spam mappát is).
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="media-section">
          <div className="post-gallery">
            <h2>Képek</h2>
            {post.images && post.images.length > 0 ? (
              <PostDetailsGallery
                images={post.images?.filter(img => img?.url && typeof img.url === 'string')?.map(img => getFullImageUrl(img.url)) || []}
                post={post}
                cookiesAccepted={cookiesAccepted}
                cookiesDecided={cookiesDecided}
              />
            ) : (
              <p>Nincsenek képek.</p>
            )}
          </div>
          <div className="post-map">
            <h2>Térkép</h2>
            {cookiesDecided && post.geolocation && post.geolocation.lat && post.geolocation.lon ? (
              <Suspense fallback={<div>Térkép betöltése...</div>}>
                <LazyMiniMapComponent
                  post={post}
                  listingType={post.listing_type}
                  getFullImageUrl={getFullImageUrl}
                  createCustomIcon={() => createCustomIcon(price, priceUnit)}
                />
              </Suspense>
            ) : (
              <p>Nincs elérhető térkép adat.</p>
            )}
          </div>
        </div>

        <div className="details-section">
          <div className="lower-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="two-column-section">
              <div className="post-description">
                <h2>Leírás</h2>
                <div className="description-content">
                  <div className={`description-text ${!isDescriptionExpanded ? 'collapsed' : 'expanded'}`}>
                    {formatDescription(post.description) || <p>Nincs megadva leírás.</p>}
                  </div>
                  {!isDescriptionExpanded && post.description && post.description.length > 300 && (
                    <button className="read-more-button" onClick={handleReadMore}>
                      Tovább olvasom...
                    </button>
                  )}
                </div>
              </div>

              <div className="post-contact-section">
                <h2>Kapcsolat</h2>
                <div className="contact-content">
                  {post.agent ? (
                    <>
                      {post.agent.photo && post.agent.name ? (
                        <div className="agent-header">
                          <div className="agent-photo">
                            <picture>
                              <source srcSet={`${post.agent.photo}?tr=f-webp`} type="image/webp" />
                              <img src={post.agent.photo} alt={`Értékesítő: ${post.agent.name || 'Ismeretlen'}`} loading="lazy" />
                            </picture>
                          </div>
                          <p className="agent-name">
                            <span className="detail-label">Értékesítő:</span> {post.agent.name}
                          </p>
                        </div>
                      ) : (
                        post.agent.name && (
                          <p className="agent">
                            <span className="detail-label">Értékesítő:</span> {post.agent.name}
                          </p>
                        )
                      )}

                      {post.agent.phone && (
                        <p className="cta-container">
                          <span className="detail-label">Telefon:</span>
                          <span className="masked-phone">{showPhoneNumber ? post.agent.phone : maskPhoneNumber(post.agent.phone)}</span>
                          {showPhoneNumber ? (
                            <a href={`tel:${post.agent.phone}`} className="cta-button" onClick={handlePhoneClick}>Hívás</a>
                          ) : (
                            <button className="cta-button" onClick={handleRevealPhone}>Felfedés</button>
                          )}
                        </p>
                      )}
                      
                      <button className="lead-message-button" onClick={() => setShowLeadForm(true)}>
                        Üzenet küldése a hirdetőnek
                      </button>

                      {post.agent.bio && (
                        <div className="agent">
                          <span className="detail-label">Bemutatkozás:</span>
                          {renderBio(post.agent.bio)}
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Kapcsolati adatok nem elérhetők.</p>
                  )}
                  {post.provider && (
                    <p className="agent">
                      <span className="detail-label">Iroda:</span> {post.provider}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="post-details-section">
              <h2>Ingatlan részletei</h2>
              <div className="details-grid">
                {post.type && post.type !== '0' && post.type !== '00' && post.type !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Típus:</span> {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </div>
                )}
                {post.area && post.area !== 0 && post.area !== '0' && post.area !== '00' && (
                  <div className="detail-item">
                    <span className="detail-label">Alapterület:</span> {`${post.area} m²`}
                  </div>
                )}
                {post.land_area && post.land_area !== 0 && post.land_area !== '0' && post.land_area !== '00' && (
                  <div className="detail-item">
                    <span className="detail-label">Telek terület:</span> {`${post.land_area} m²`}
                  </div>
                )}
                {post.rooms && post.rooms > 0 && post.rooms !== '0' && post.rooms !== '00' && (
                  <div className="detail-item">
                    <span className="detail-label">Szobák száma:</span> {post.rooms}
                  </div>
                )}
                {post.total_floors && post.total_floors !== '0' && post.total_floors !== 0 && post.total_floors !== '00' && post.total_floors !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Emelet:</span> {post.total_floors}
                  </div>
                )}
                {post.floor_count && post.floor_count !== '0' && post.floor_count !== 0 && post.floor_count !== '00' && post.floor_count !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Összes emelet:</span> {post.floor_count}
                  </div>
                )}
                {post.condition && post.condition !== '0' && post.condition !== '00' && post.condition !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Állapot:</span> {post.condition.charAt(0).toUpperCase() + post.condition.slice(1)}
                  </div>
                )}
                {post.heating_type && post.heating_type !== '0' && post.heating_type !== '00' && post.heating_type !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Fűtés típusa:</span> {post.heating_type.charAt(0).toUpperCase() + post.heating_type.slice(1)}
                  </div>
                )}
                {post.energy_class && post.energy_class !== '0' && post.energy_class !== '00' && post.energy_class !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Energiaosztály:</span> {post.energy_class}
                  </div>
                )}
                {post.utility_cost && post.utility_cost !== 0 && post.utility_cost !== '0' && post.utility_cost !== '00' && (
                  <div className="detail-item">
                    <span className="detail-label">Közüzemi díjak:</span> {`${post.utility_cost} ${post.currency}`}
                  </div>
                )}
                {post.year_built && post.year_built !== 0 && post.year_built !== '0' && post.year_built !== '00' && (
                  <div className="detail-item">
                    <span className="detail-label">Építés éve:</span> {post.year_built}
                  </div>
                )}
                {post.year_renovated && post.year_renovated !== 0 && post.year_renovated !== '0' && post.year_renovated !== '00' && (
                  <div className="detail-item">
                    <span className="detail-label">Felújítás éve:</span> {post.year_renovated}
                  </div>
                )}
                {post.ceiling_height && post.ceiling_height !== '0' && post.ceiling_height !== 0 && post.ceiling_height !== '00' && post.ceiling_height !== null && (
                  <div className="detail-item">
                    <span className="detail-label">Belmagasság:</span> {`${post.ceiling_height} m`}
                  </div>
                )}
                {post.comfort_level && post.comfort_level !== '0' && post.comfort_level !== '00' && post.comfort_level !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Komfortszint:</span> {post.comfort_level.charAt(0).toUpperCase() + post.comfort_level.slice(1)}
                  </div>
                )}
                {post.csok_eligible !== undefined && (
                  <div className="detail-item">
                    <span className="detail-label">CSOK igényelhetőség:</span> {post.csok_eligible ? 'Igen' : 'Nem'}
                  </div>
                )}
                {post.parking && post.parking !== '0' && post.parking !== 0 && post.parking !== '00' && post.parking !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Parkolás:</span> {post.parking}
                  </div>
                )}
                {post.view && post.view !== '0' && post.view !== 0 && post.view !== '00' && post.view !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Kilátás:</span> {post.view}
                  </div>
                )}
                {post.orientation && post.orientation !== '0' && post.orientation !== 0 && post.orientation !== '00' && post.orientation !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Tájolás:</span> {post.orientation}
                  </div>
                )}
                {post.attic && post.attic !== '0' && post.attic !== 0 && post.attic !== '00' && post.attic !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Padlás:</span> {post.attic}
                  </div>
                )}
                {post.basement && post.basement !== '0' && post.basement !== 0 && post.basement !== '00' && post.basement !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Pince:</span> {post.basement}
                  </div>
                )}
                {post.created_at && (
                  <div className="detail-item">
                    <span className="detail-label">Hirdetés létrehozva:</span> {formatDate(post.created_at)}
                  </div>
                )}
                {post.updated_at && (
                  <div className="detail-item">
                    <span className="detail-label">Hirdetés frissítve:</span> {formatDate(post.updated_at)}
                  </div>
                )}
                {post.status && post.status !== '0' && post.status !== '00' && post.status !== '' && (
                  <div className="detail-item">
                    <span className="detail-label">Hirdetés státusza:</span> {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </div>
                )}
              </div>
              {hasFeatures && (
                <div className="features-section">
                  <p><span className="detail-label">Jellemzők:</span></p>
                  {hasFeatures}
                </div>
              )}
              {hasUtilities && (
                <div className="features-section">
                  <p><span className="detail-label">Közüzem:</span></p>
                  {hasUtilities}
                </div>
              )}
            </div>

            {/* Linkek és hasonló ingatlanok */}
            {(post.links?.virtual_tour || post.links?.video_link || similarPosts.length > 0) && (
              <div className="post-details-section">
                {(post.links?.virtual_tour || post.links?.video_link) && (
                  <>
                    <h2>Linkek</h2>
                    {post.links?.virtual_tour && post.links.virtual_tour !== '' && (
                      <p><span className="detail-label">Virtuális túra:</span> <a href={post.links.virtual_tour} target="_blank" rel="noopener noreferrer">{post.links.virtual_tour}</a></p>
                    )}
                    {post.links?.video_link && post.links.video_link !== '' && (
                      <p><span className="detail-label">YouTube videó:</span> <a href={post.links.video_link} target="_blank" rel="noopener noreferrer">{post.links.video_link}</a></p>
                    )}
                  </>
                )}
                {renderSimilarPosts()}
              </div>
            )}
          </div>
        </div>

        {/* Lead Form Modal */}
        {showLeadForm && (
          <div className="lead-modal-overlay" onClick={() => setShowLeadForm(false)}>
            <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowLeadForm(false)}>✕</button>
              <h3>Érdeklődöm az ingatlanról</h3>
              <p><strong>{post.title}</strong></p>
              {leadSent ? (
                <div className="lead-success">✅ Köszönjük! Az üzenetedet továbbítottuk az értékesítőnek.</div>
              ) : (
                <form onSubmit={handleSendLead}>
                  <div className="form-group">
                    <label>Neved *</label>
                    <input type="text" value={leadFormData.name} onChange={(e) => setLeadFormData({...leadFormData, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Email címed *</label>
                    <input type="email" value={leadFormData.email} onChange={(e) => setLeadFormData({...leadFormData, email: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Telefonszámod <span style={{ fontWeight: 'normal', fontSize: '0.85rem', color: '#666' }}>(opcionális)</span></label>
                    <input type="tel" value={leadFormData.phone} onChange={(e) => setLeadFormData({...leadFormData, phone: e.target.value})} placeholder="Pl.: +36 20 123 4567" />
                  </div>
                  <div className="form-group">
                    <label>Üzenet *</label>
                    <textarea rows="6" value={leadFormData.message} onChange={(e) => setLeadFormData({...leadFormData, message: e.target.value})} placeholder="Pl.: Milyen állapotban van a kazán? Van beépített bútor?" required />
                  </div>
                  
                  <div className="template-messages">
                    <button type="button" onClick={() => setTemplateMessageWithName('\n\nÉrdekel az ingatlan, szeretnék több információt kapni. Kérem, vegye fel velem a kapcsolatot!')}>Általános érdeklődés</button>
                    <button type="button" onClick={() => setTemplateMessageWithName('\n\nSzeretném az ingatlant személyesen is megtekinteni. Mikor van erre lehetőségem?')}>Meg szeretném nézni</button>
                    <button type="button" onClick={() => setTemplateMessageWithName('\n\nHol található pontosan az ingatlan? Megközelíthetőségről, elhelyezkedésről tudna küldeni pontosabb információt?')}>Pontos helyszín</button>
                    <button type="button" onClick={() => setTemplateMessageWithName('\n\nKérek szépen további fotókat az ingatlanról.')}>Több infó + fotók</button>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} required />
                      <span className="checkbox-text">Elfogadom az <a href="/aszf" target="_blank" rel="noopener noreferrer">Általános szerződési feltételeket</a> és az <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Adatkezelési tájékoztatót</a>.</span>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={acceptedPrivacy} onChange={(e) => setAcceptedPrivacy(e.target.checked)} />
                      <span className="checkbox-text">Szeretnék értesítést kapni hasonló ingatlanokról és aktualitásokról.</span>
                    </label>
                  </div>
                  
                  <div className="captcha-submit-row">
                    <div className="captcha-container">
                      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} onChange={setCaptchaToken} />
                    </div>
                    <button type="submit" disabled={sendingLead || !captchaToken}>{sendingLead ? 'Küldés...' : 'Üzenet küldése'}</button>
                  </div>
                  {leadError && <div className="lead-error">{leadError}</div>}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PostDetailsPage;