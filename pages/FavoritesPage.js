'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPostDetails } from '../services/apiService';
import { 
  getFavoritePosts, 
  removeFavoritePost
} from '../utils/favoritePosts';
import '../styles/FavoritesPage.css';
import MiniMapComponent from '../components/MiniMapComponent';
import PostDetailsGallery from '../components/PostDetailsGallery';

const FAVORITE_POSTS_KEY = 'favorite_realestate_posts';

const FavoritesPage = ({ cookiesAccepted = false }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFullImageUrl = (imagePath) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
    if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const generateSlug = (title) => {
    if (!title) return 'ismeretlen-ingatlan';
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const formatPrice = (post) => {
    if (post.price) {
      const priceInMillions = post.price;
      return `${priceInMillions.toFixed(1).replace(/\.0$/, '')} M Ft`;
    }
    if (post.rental_price) {
      const priceInThousands = post.rental_price / 1000;
      return `${priceInThousands.toFixed(1).replace(/\.0$/, '')} E Ft/hó`;
    }
    return "Ár nincs megadva";
  };

  useEffect(() => {
    if (cookiesAccepted && window.gtag && favorites.length > 0) {
      window.gtag('event', 'view_favorites_page', {
        favorite_count: favorites.length,
        most_expensive: Math.max(...favorites.map(p => p.price || p.rental_price || 0)),
        avg_price: favorites.reduce((sum, p) => sum + (p.price || p.rental_price || 0), 0) / favorites.length
      });
    }
  }, [favorites, cookiesAccepted]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const favoriteIds = getFavoritePosts();

        if (favoriteIds.size === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        const idsArray = Array.from(favoriteIds);
        const promises = idsArray.map(id =>
          getPostDetails(id)
            .then(res => res.data || null)
            .catch(() => null)
        );

        const posts = await Promise.all(promises);
        const validPosts = posts.filter(Boolean);

        validPosts.sort((a, b) => {
          const dateA = new Date(a.created_at || a.updated_at || 0);
          const dateB = new Date(b.created_at || b.updated_at || 0);
          return dateB - dateA;
        });

        setFavorites(validPosts);
      } catch (err) {
        console.error("Kedvencek betöltési hiba:", err);
        setError("Hiba történt a kedvencek betöltésekor.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    const handleStorageChange = (e) => {
      if (e.key === FAVORITE_POSTS_KEY) {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemoveFavorite = (postId) => {
    if (window.confirm("Biztosan eltávolítod a kedvencekből?")) {
      removeFavoritePost(postId);
      setFavorites(prev => prev.filter(p => p._id !== postId));
      if (selectedPost?._id === postId) {
        setSelectedPost(null);
      }
    }
  };

  const handleCardClick = (post) => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      const slug = generateSlug(post.title);
      const url = `/ingatlan/${post._id}/${slug}`;
      window.open(url, '_blank');
    } else {
      setSelectedPost(post);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && selectedPost) {
        setSelectedPost(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedPost]);

  if (loading) {
    return <div className="loading">Betöltés...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="favorites-page">
      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>Még nincs kedvenced</h2>
          <p>Jelöld meg a tetsző ingatlanokat a szív ikonnal!</p>
          <Link href="/" className="btn-primary">Keresés indítása →</Link>
        </div>
      ) : (
        <div className={`favorites-layout ${selectedPost ? 'has-detail' : ''}`}>
          <div className="favorites-list-wrapper">
            <div className="favorites-list-container">
              <h2 className="favorites-list-title">Kedvenc ingatlanjaim ({favorites.length} db)</h2>
              <div className={`favorites-grid ${selectedPost ? 'with-detail' : ''}`}>
                {favorites.map(post => (
                  <div
                    key={post._id}
                    className={`similar-post-card ${selectedPost?._id === post._id ? 'active' : ''}`}
                    onClick={() => handleCardClick(post)}
                  >
                    <div className="similar-post-image">
                      {post.images?.[0] ? (
                        <picture>
                          <img
                            src={getFullImageUrl(post.images[0].url)}
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
                        {formatPrice(post)}
                      </p>

                      {post.area && post.area > 0 && (
                        <p className="similar-post-area">
                          Alapterület: {post.area} m²
                        </p>
                      )}

                      <p className="similar-post-address">
                        {post.address?.city || ''}{post.address?.region ? `, ${post.address.region}` : ''}
                        {post.address?.street ? `, ${post.address.street}` : ''}
                      </p>

                      <p className="similar-post-description">
                        {post.description ? post.description.substring(0, 80) + '...' : 'Nincs leírás'}
                      </p>

                      <button
                        className="favorite-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFavorite(post._id);
                        }}
                        title="Eltávolítás a kedvencekből"
                      >
                        <svg className="heart-icon filled" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div className="detail-panel">
              <button 
                className="detail-close-btn" 
                onClick={() => setSelectedPost(null)}
                title="Bezárás"
              >
                ×
              </button>

              <div className="detail-content">
                {selectedPost.images?.length > 0 ? (
                  <div className="detail-gallery-section">
                    <h3>Képek</h3>
                    <PostDetailsGallery
                      key={`gallery-${selectedPost._id}`}
                      images={selectedPost.images
                        ?.filter(img => img?.url && typeof img.url === 'string')
                        ?.map(img => getFullImageUrl(img.url)) || []}
                      post={selectedPost}
                      cookiesAccepted={true}
                      cookiesDecided={true}
                    />
                  </div>
                ) : (
                  <div className="no-images">Nincsenek képek</div>
                )}

                <h2 className="detail-title">{selectedPost.title || 'Nincs cím'}</h2>
                <div className="detail-price">{formatPrice(selectedPost)}</div>
                <div className="detail-address">
                  {selectedPost.address?.city || ''}{selectedPost.address?.region ? `, ${selectedPost.address.region}` : ''}
                  {selectedPost.address?.street ? `, ${selectedPost.address.street}` : ''}
                </div>

                <div className="detail-info-grid">
                  {selectedPost.area && <div><strong>Alapterület:</strong> {selectedPost.area} m²</div>}
                  {selectedPost.rooms && <div><strong>Szobák:</strong> {selectedPost.rooms}</div>}
                  {selectedPost.type && <div><strong>Típus:</strong> {selectedPost.type}</div>}
                  {selectedPost.condition && <div><strong>Állapot:</strong> {selectedPost.condition}</div>}
                  {selectedPost.heating_type && <div><strong>Fűtés:</strong> {selectedPost.heating_type}</div>}
                </div>

                <div className="detail-description">
                  <h3>Leírás</h3>
                  <div className="description-content-container">
                    <p>{selectedPost.description || 'Nincs leírás megadva.'}</p>
                  </div>
                </div>

                {selectedPost.geolocation && selectedPost.geolocation.lat && selectedPost.geolocation.lon && (
                  <div className="detail-map-section">
                    <h3>Elhelyezkedés</h3>
                    <div className="detail-map-container">
                      <MiniMapComponent
                        key={`map-${selectedPost._id}`}
                        post={selectedPost}
                        listingType={selectedPost.listing_type}
                        getFullImageUrl={getFullImageUrl}
                      />
                    </div>
                  </div>
                )}

                <div className="detail-actions">
                  <Link 
                    href={`/ingatlan/${selectedPost._id}/${generateSlug(selectedPost.title)}`}
                    className="btn-primary"
                    target="_blank"
                  >
                    Teljes hirdetés megtekintése →
                  </Link>

                  <button
                    className="btn-danger"
                    onClick={() => handleRemoveFavorite(selectedPost._id)}
                  >
                    Eltávolítás a kedvencekből
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;