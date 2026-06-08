import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/FullScreenGallery.css';

const FullScreenGallery = ({ images, initialIndex, onClose, post }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchMove, setTouchMove] = useState(null);

  // Billentyűzet vezérlés (nyilak és Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  // Thumbnail sáv középre igazítása
  useEffect(() => {
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const activeThumbnail = document.querySelector('.thumbnail.active');
    if (activeThumbnail && thumbnailContainer) {
      const position =
        activeThumbnail.offsetLeft - thumbnailContainer.offsetWidth / 2 + activeThumbnail.offsetWidth / 2;
      thumbnailContainer.scrollTo({
        left: position,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleClose = () => {
    console.log('Closing gallery');
    onClose();
  };

  // Érintésvezérlés kezelése
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchMove(null);
  };

  const handleTouchMove = (e) => {
    setTouchMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchMove === null) return;

    const deltaX = touchStart - touchMove;
    const minSwipeDistance = 50; // Minimum elmozdulás a váltáshoz (pixelben)

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Balra húzás -> következő kép
        handleNextClick();
      } else {
        // Jobbra húzás -> előző kép
        handlePrevClick();
      }
    }

    setTouchStart(null);
    setTouchMove(null);
  };

  // Segédfüggvény a cím formázásához az alt szövegekhez
  const formatAddress = (address) => {
    if (!address) return 'Ingatlan';
    const { street, city, region, county } = address;
    const parts = [
      city || '',
      region || '',
      street || '',
      county ? `${county} vármegye` : '',
    ].filter(part => part.trim() !== '');
    return parts.length > 0 ? parts.join(', ') : 'Ingatlan';
  };

  const galleryContent = (
    <div className="fullscreen-gallery-overlay">
      <div className="fullscreen-gallery">
        {/* Bezáró gomb */}
        <button className="close-button" onClick={handleClose}>
          ×
        </button>

        {/* Fő kép */}
        <div
          className="main-image-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex]}
            alt={`${post?.title || 'Ingatlan'} - ${formatAddress(post?.address)} ${currentIndex + 1}. kép`}
            className="fullscreen-main-image"
            loading="lazy"
          />
          <button className="nav-arrow left" onClick={handlePrevClick}>
            ‹
          </button>
          <button className="nav-arrow right" onClick={handleNextClick}>
            ›
          </button>
        </div>

        {/* Thumbnail sáv */}
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${post?.title || 'Ingatlan'} - ${formatAddress(post?.address)} thumbnail ${index + 1}`}
              className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(galleryContent, document.getElementById('fullscreen-gallery-root'));
};

export default FullScreenGallery;