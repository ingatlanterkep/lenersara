'use client';

import React from 'react';
import '../styles/PropertyCard.css'; // ← EZ FONTOS!
import { 
  isFavoritePost, 
  addFavoritePost, 
  removeFavoritePost 
} from '../utils/favoritePosts';

const PropertyCard = ({ post, listingType, onPostClick, onFavoriteToggle, cookiesAccepted }) => {

  const [isFavorite, setIsFavorite] = React.useState(() => isFavoritePost(post._id));

  const getPriceDisplay = () => {
    if (listingType === 'eladó') {
      const price = post.price || 0;
      return `${price.toFixed(1).replace(/\.0$/, '')} M Ft`;
    }
    const price = post.rental_price || 0;
    return `${(price / 1000).toFixed(1).replace(/\.0$/, '')} E Ft/hó`;
  };

  const getFirstImage = () => {
    if (post.images && post.images.length > 0 && post.images[0]?.url) {
      const imgUrl = post.images[0].url;
      if (imgUrl.startsWith('http')) return imgUrl;
      return `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${imgUrl}`;
    }
    return '/placeholder.jpg';
  };

const handleFavoriteClick = (e) => {
  e.stopPropagation();

  const wasFavorite = isFavorite;   // előző állapot

  if (isFavorite) {
    removeFavoritePost(post._id);
    setIsFavorite(false);
  } else {
    addFavoritePost(post._id);
    setIsFavorite(true);
  }

  // GA4 esemény
  if (cookiesAccepted && window.gtag) {     // ← cookiesAccepted-et át kell adni prop-ként!
    const eventName = wasFavorite ? 'remove_from_favorites' : 'add_to_favorites';

    window.gtag('event', eventName, {
      post_id: post._id,
      listing_type: post.listing_type || listingType,
      price: post.price || post.rental_price || null,
      type: post.type || null,
      page_type: 'list_card'
    });
  }

  // Esemény a navbar frissítéséhez
  window.dispatchEvent(new Event('favoritesUpdated'));
  if (onFavoriteToggle) onFavoriteToggle(post._id);
};

  return (
    <div className="similar-post-card" onClick={onPostClick}>
      <div className="similar-post-image">
        {post.images?.[0] ? (
          <picture>
            <img
              src={getFirstImage()}
              alt={post.title || "Ingatlan"}
              loading="lazy"
            />
          </picture>
        ) : (
          <div className="no-image">Nincs kép</div>
        )}
      </div>

      <div className="similar-post-content">
        <h3>{post.title || "Névtelen hirdetés"}</h3>
        
        <p className="similar-post-price">
          {getPriceDisplay()}
        </p>

        {post.area && post.area > 0 && (
          <p className="similar-post-area">
            Alapterület: {post.area} m²
          </p>
        )}

        <p className="similar-post-address">
          {post.address?.city || ''}
          {post.address?.region ? `, ${post.address.region}` : ''}
          {post.address?.street ? `, ${post.address.street}` : ''}
        </p>

        <p className="similar-post-description">
          {post.description ? post.description.substring(0, 80) + '...' : 'Nincs leírás'}
        </p>

        <button
          className="favorite-remove-btn"
          onClick={handleFavoriteClick}
          title={isFavorite ? "Eltávolítás a kedvencekből" : "Hozzáadás a kedvencekhez"}
        >
          <svg 
            className={`heart-icon ${isFavorite ? 'filled' : 'empty'}`} 
            viewBox="0 0 24 24"
            fill={isFavorite ? "#e74c3c" : "none"}
            stroke={isFavorite ? "#e74c3c" : "#999"}
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;