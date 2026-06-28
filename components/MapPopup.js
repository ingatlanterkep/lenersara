'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  addFavoritePost, 
  removeFavoritePost, 
  isFavoritePost 
} from '@/utils/favoritePosts';
import FullScreenGallery from './FullScreenGallery'; // ← IMPORTÁLD A FULLSCREEN GALLERY-T
import '../styles/MapPopup.css';

const MapPopup = ({ 
  post, 
  position,
  onClose, 
  getFullImageUrl,
  generateSlug,
  listingType,
  cookiesAccepted,
  sendEvent,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [images, setImages] = useState([]);
  const [displayPosition, setDisplayPosition] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // 🔥 ÚJ STATE
  const popupRef = useRef(null);
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const isMounted = useRef(true);

  // 🔥 POST INICIALIZÁLÁS
  useEffect(() => {
    if (!post?._id) {
      setIsReady(false);
      setDisplayPosition(null);
      setImages([]);
      setCurrentImageIndex(0);
      return;
    }

    setIsReady(false);
    setDisplayPosition(null);
    setIsFavorite(isFavoritePost(post._id));
    
    // Képek betöltése
    let imageUrls = [];
    if (post.images && Array.isArray(post.images)) {
      imageUrls = post.images
        .filter(img => img)
        .map(img => {
          if (typeof img === 'string') return img;
          if (img.url) return img.url;
          if (img.path) return img.path;
          return null;
        })
        .filter(Boolean)
        .map(url => getFullImageUrl(url))
        .filter(Boolean);
    }
    setImages(imageUrls);
    setCurrentImageIndex(0);

    // Méret mérése a következő frame-ben
    requestAnimationFrame(() => {
      if (measureRef.current && isMounted.current) {
        const rect = measureRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const newPos = calculatePosition(rect.width, rect.height);
          if (newPos) {
            setDisplayPosition(newPos);
            setIsReady(true);
          }
        }
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [post?._id, getFullImageUrl]);

  // 🔥 POZÍCIÓ SZÁMÍTÁS
  const calculatePosition = useCallback((popupWidth, popupHeight) => {
    if (!position || !popupWidth || !popupHeight) return null;

    const margin = 12;
    const gap = 20;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const markerX = position.x;
    const markerY = position.y;

    const canPlaceAbove = (markerY - popupHeight - gap) > margin;
    const canPlaceBelow = (markerY + popupHeight + gap) < windowHeight - margin;
    const canPlaceLeft = (markerX - popupWidth / 2 - gap) > margin;
    const canPlaceRight = (markerX + popupWidth / 2 + gap) < windowWidth - margin;
    const canPlaceCenterX = (markerX - popupWidth / 2 > margin) && (markerX + popupWidth / 2 < windowWidth - margin);

    let x, y;

    if (canPlaceAbove && canPlaceCenterX) {
      x = markerX - popupWidth / 2;
      y = markerY - popupHeight - gap;
    } else if (canPlaceBelow && canPlaceCenterX) {
      x = markerX - popupWidth / 2;
      y = markerY + gap;
    } else if (canPlaceRight && !canPlaceCenterX) {
      x = markerX + gap;
      y = markerY - popupHeight / 2;
    } else if (canPlaceLeft && !canPlaceCenterX) {
      x = markerX - popupWidth - gap;
      y = markerY - popupHeight / 2;
    } else if (canPlaceRight && canPlaceAbove) {
      x = markerX + gap;
      y = markerY - popupHeight - gap;
    } else if (canPlaceRight && canPlaceBelow) {
      x = markerX + gap;
      y = markerY + gap;
    } else if (canPlaceLeft && canPlaceAbove) {
      x = markerX - popupWidth - gap;
      y = markerY - popupHeight - gap;
    } else if (canPlaceLeft && canPlaceBelow) {
      x = markerX - popupWidth - gap;
      y = markerY + gap;
    } else {
      x = (windowWidth - popupWidth) / 2;
      y = (windowHeight - popupHeight) / 2;
    }

    return {
      x: Math.max(margin, Math.min(windowWidth - popupWidth - margin, x)),
      y: Math.max(margin, Math.min(windowHeight - popupHeight - margin, y)),
    };
  }, [position]);

  // Kedvenc váltás
  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (!post?._id) return;

    const postId = post._id;
    const wasFavorite = isFavoritePost(postId);
    
    if (wasFavorite) {
      removeFavoritePost(postId);
      setIsFavorite(false);
    } else {
      addFavoritePost(postId);
      setIsFavorite(true);
    }
    
    window.dispatchEvent(new Event('favoritesUpdated'));
    
    if (cookiesAccepted && sendEvent) {
      sendEvent(wasFavorite ? 'remove_from_favorites' : 'add_to_favorites', {
        post_id: postId,
        listing_type: post.listing_type || listingType,
        price: post.price || post.rental_price || null,
        type: post.type || null,
      });
    }
  };

  // Kép navigáció
  const prevImage = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // 🔥 KÉPRE KATTINTÁS - GALÉRIA MEGNYITÁSA
  const handleImageClick = (e) => {
    e?.stopPropagation();
    setIsGalleryOpen(true);
  };

  // 🔥 GALÉRIA BEZÁRÁSA
  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
  };

  // Billentyűzet kezelés
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    if (post && images.length > 0) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [post, images.length, onClose]);

  // Teljes hirdetés megnyitása
  const handleOpenDetail = (e) => {
    e?.stopPropagation();
    if (post?._id) {
      const slug = generateSlug(post.title);
      window.open(`/ingatlan/${post._id}/${slug}`, '_blank');
    }
  };

  // Ár formázás
  const formatPrice = () => {
    if (!post) return '';
    const price = post.price || post.rental_price || 0;
    if (listingType === 'eladó' && price) {
      return `${parseFloat(price).toFixed(1).replace(/\.0$/, '')} M Ft`;
    }
    if (listingType === 'kiadó' && price) {
      return `${parseFloat(price).toFixed(1).replace(/\.0$/, '')} E Ft/hó`;
    }
    return `${price} Ft`;
  };

  // Terület és szobák
  const getArea = () => {
    if (!post) return 0;
    return post.area || post.alapterulet || post.size || post.floor_area || 0;
  };

  const getRooms = () => {
    if (!post) return 0;
    return post.rooms || post.szobak || post.room_count || post.number_of_rooms || 0;
  };

  if (!post || !position) return null;

  // Mérési fázis - még nem vagyunk készen
  if (!isReady || !displayPosition) {
    return createPortal(
      <div 
        ref={measureRef}
        className="map-popup map-popup-hidden"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          visibility: 'hidden',
          pointerEvents: 'none',
          width: '260px',
          maxWidth: '85vw',
        }}
      >
        <div className="map-popup-gallery">
          {images.length > 0 ? (
            <>
              <img 
                src={images[0] || '/placeholder.jpg'} 
                alt={post.title || 'Ingatlan'} 
                className="map-popup-image"
              />
              {images.length > 1 && (
                <>
                  <button className="map-popup-nav left">‹</button>
                  <button className="map-popup-nav right">›</button>
                  <div className="map-popup-counter">1/{images.length}</div>
                </>
              )}
            </>
          ) : (
            <div className="map-popup-no-image">📷 Nincs kép</div>
          )}
        </div>
        <div className="map-popup-info">
          <div className="map-popup-price-area">
            <span className="map-popup-price">{formatPrice()}</span>
            <span className="map-popup-details">
              {getArea() > 0 && (
                <span className="map-popup-detail-item">{getArea()} m²</span>
              )}
              {getRooms() > 0 && (
                <span className="map-popup-detail-item">{getRooms()} szoba</span>
              )}
            </span>
          </div>
          {post.address && (
            <div className="map-popup-address">
              {post.address.city && <span>{post.address.city}</span>}
              {post.address.street && <span>, {post.address.street}</span>}
            </div>
          )}
          <div className="map-popup-actions">
            <button className="map-popup-view-btn">Megnézem →</button>
            <button className="map-popup-fav-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Megjelenítés
  return createPortal(
    <>
      <div 
        ref={popupRef}
        className="map-popup-container"
        style={{
          position: 'fixed',
          left: `${displayPosition.x}px`,
          top: `${displayPosition.y}px`,
          zIndex: 2000,
          pointerEvents: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="map-popup"
          ref={containerRef}
          style={{ pointerEvents: 'auto' }}
        >
          <button className="map-popup-close" onClick={onClose}>×</button>

          <div className="map-popup-gallery">
            {images.length > 0 ? (
              <>
                <img 
                  src={images[currentImageIndex] || '/placeholder.jpg'} 
                  alt={post.title || 'Ingatlan'} 
                  className="map-popup-image"
                  onClick={handleImageClick} // 🔥 KÉPRE KATTINTÁS → GALÉRIA
                  style={{ cursor: 'pointer' }}
                  onError={(e) => {
                    console.error('[MapPopup] Kép betöltési hiba:', images[currentImageIndex]);
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                
                {images.length > 1 && (
                  <>
                    <button className="map-popup-nav left" onClick={prevImage}>‹</button>
                    <button className="map-popup-nav right" onClick={nextImage}>›</button>
                    <div className="map-popup-counter">
                      {currentImageIndex + 1}/{images.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="map-popup-no-image">📷 Nincs kép</div>
            )}
          </div>

          <div className="map-popup-info">
            <div className="map-popup-price-area">
              <span className="map-popup-price">{formatPrice()}</span>
              <span className="map-popup-details">
                {getArea() > 0 && (
                  <span className="map-popup-detail-item">{getArea()} m²</span>
                )}
                {getRooms() > 0 && (
                  <span className="map-popup-detail-item">{getRooms()} szoba</span>
                )}
              </span>
            </div>

            {post.address && (
              <div className="map-popup-address">
                {post.address.city && <span>{post.address.city}</span>}
                {post.address.street && <span>, {post.address.street}</span>}
              </div>
            )}

            <div className="map-popup-actions">
              <button className="map-popup-view-btn" onClick={handleOpenDetail}>
                Megnézem →
              </button>
              <button 
                className={`map-popup-fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteToggle}
              >
                <svg viewBox="0 0 24 24" 
                  fill={isFavorite ? '#ff4757' : 'none'} 
                  stroke={isFavorite ? '#ff4757' : '#666'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  width="16" height="16"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 FULLSCREEN GALÉRIA - HA MEG NYITVA */}
      {isGalleryOpen && (
        <FullScreenGallery
          images={images}
          initialIndex={currentImageIndex}
          onClose={handleGalleryClose}
          post={post}
        />
      )}
    </>,
    document.body
  );
};

export default MapPopup;