'use client';

import React, { useRef, useCallback, useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import dynamic from 'next/dynamic';
import Modal from 'react-modal';

// Dinamikus import a PostEditForm-hoz (client only)
const PostEditForm = dynamic(() => import('../forms/PostEditForm'), { ssr: false });

import '../styles/PopupStyles.css';
import '../styles/Markers.css';
import { isFavoritePost } from '../utils/favoritePosts';

// CSS selector a modal-hoz (Next.js-hez igazítva)
if (typeof window !== 'undefined') {
  Modal.setAppElement('body'); // vagy '#__next'
}

const generateSlug = (title) => {
  if (!title) return 'unknown';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const createCustomIcon = (
  price,
  unit,
  isActive = false,
  hasActiveMarker = false,
  isViewed = false,
  isFavorite = false,
  overpriceCategory = 1,
  priorityLevel = 5,
  showDealColors = true,
) => {
  const formattedPrice = parseFloat(price).toFixed(1).replace(/\.0$/, '');
  const priceText = `${formattedPrice} ${unit}`;

  const measureTextWidth = (text, fontStyle) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = fontStyle;
    return ctx.measureText(text).width;
  };

  const fontSize = window.innerWidth <= 480 ? 10 : 12;
  const fontStyle = `bold ${fontSize}px 'Poppins', sans-serif`;
  const padding = window.innerWidth <= 480 ? 8 : 24;
  const border = 4;
  const textWidth = measureTextWidth(priceText, fontStyle);
  const width = Math.ceil(textWidth + padding + border);
  const height = window.innerWidth <= 480 ? 18 : window.innerWidth <= 768 ? 20 : 24;

  const heartHtml = isFavorite ? `<span class="marker-heart active">♥</span>` : ``;
  const outerOpacity = hasActiveMarker && !isActive ? '0.5' : '1';

  let priorityClass = '';
  if (priorityLevel === 3) priorityClass = 'priority-3';
  else if (priorityLevel === 4) priorityClass = 'priority-4';

  // ====================== RÉGI DEAL SZÍN LOGIKA ======================
  let dealClass = '';
  if (showDealColors) {
    if (overpriceCategory === 0) dealClass = 'deal-good';
    else if (overpriceCategory === 2) dealClass = 'deal-bad';
    else dealClass = 'deal-normal';
  }

  let markerClass = `custom-marker-icon ${priorityClass} ${dealClass}`.trim();
  if (isActive) markerClass += ' active-marker';
  if (isViewed) markerClass += ' viewed-marker';

  return L.divIcon({
    className: markerClass,
    html: `
      <div class="marker-wrapper" style="opacity: ${outerOpacity};">
        <div class="marker-price">
          ${priceText}
          ${heartHtml}
        </div>
      </div>
    `,
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    popupAnchor: [0, -height],
    zIndexOffset: priorityLevel === 3 ? 300 : priorityLevel === 4 ? 200 : 100,
  });
};

const MarkerComponent = ({
  post,
  listingType,
  selectedPost,
  fetchPostDetails,
  getFullImageUrl,
  setSelectedPost,
  isAdmin,
  updatePost,
  deletePost,
  setPosts,
  cookiesAccepted,
  viewedPosts,
  showDealColors,
  onMouseOver = () => {},
  onMouseOut = () => {},
}) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);

  // ────────────────────────────────────────────────
  //  ITT KELL DEFINIÁLNI ezeket a változókat!
  // ────────────────────────────────────────────────
  const isActive = post._id === selectedPost?._id;
  const isViewed = viewedPosts?.has(post._id) ?? false;

  const handleMarkerClick = useCallback(async () => {
    if (selectedPost?._id === post._id) {
      setSelectedPost(null);
    } else {
      const postDetailsResponse = await fetchPostDetails(post._id);
      const postDetails = postDetailsResponse?.data || postDetailsResponse;
      if (postDetails && postDetails._id) {
        setSelectedPost(postDetails);
      }
    }
  }, [post, selectedPost, fetchPostDetails, setSelectedPost]);

  const handleEditClick = (e) => {
    e.stopPropagation(); // Megakadályozza, hogy a marker click is triggerelődjön
    setIsEditingModalOpen(true);
  };

  const rawPrice = listingType === 'eladó' 
    ? post.price 
    : (post.rental_price || post.price || 0);

  const priceUnit = listingType === 'eladó' ? 'M' : 'E';

  return (
    <>
      <Marker
        position={[post.geolocation.lat, post.geolocation.lon]}
        icon={createCustomIcon(
          rawPrice,
          priceUnit,
          isActive,
          !!selectedPost,
          isViewed,
          isFavoritePost(post._id),
          post.overprice_category ?? 1,
          post.priorityLevel ?? 5,
          showDealColors ?? true,
        )}
        zIndexOffset={isViewed ? -100 : (post.priorityLevel === 3 ? 300 : post.priorityLevel === 4 ? 200 : 0)}
        eventHandlers={{
          mouseover: () => onMouseOver(post._id),
          mouseout:  () => onMouseOut(post._id),
          click:     handleMarkerClick,
        }}
      />
      {isAdmin && (
        <Modal
          isOpen={isEditingModalOpen}
          onRequestClose={() => setIsEditingModalOpen(false)}
          style={{
            content: { 
              inset: '0', 
              padding: '20px', 
              border: 'none', 
              borderRadius: '0', 
              background: '#fff', 
              overflow: 'auto',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '800px',
              height: 'auto',
              maxHeight: '90vh',
            },
            overlay: { 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              zIndex: 1000,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
        >
          <PostEditForm
            postId={post._id}
            postData={post}
            onSave={async (updatedData) => {
              const updatedPost = await updatePost(post._id, updatedData);
              setPosts(prev => prev.map(p => p._id === post._id ? { ...p, ...updatedPost.data } : p));
              setIsEditingModalOpen(false);
            }}
            onCancel={() => setIsEditingModalOpen(false)}
          />
          <button 
            style={{ 
              position: 'fixed', 
              top: '10px', 
              right: '10px', 
              padding: '10px 20px', 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              zIndex: 1001,
            }}
            onClick={() => setIsEditingModalOpen(false)}
          >
            Bezárás
          </button>
        </Modal>
      )}
    </>
  );
};

export default React.memo(MarkerComponent);