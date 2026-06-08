// components/ImageGallery.js
import React, { useState } from 'react';
import FullScreenGallery from './FullScreenGallery';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleImageClick = () => {
    setIsGalleryOpen(true);
  };

  return (
    <>
      {/* Pontosan ugyanaz a struktúra és class-ek, mint a popup-gallery-ben volt */}
      <div className="popup-gallery">
        <img
          src={images[currentIndex]}
          alt="Hirdetés képe"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />

        {images.length > 1 && (
          <>
            <button className="nav-arrow left" onClick={handlePrev}>
              ‹
            </button>
            <button className="nav-arrow right" onClick={handleNext}>
              ›
            </button>
          </>
        )}
      </div>

      {isGalleryOpen && (
        <FullScreenGallery
          images={images}
          initialIndex={currentIndex}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </>
  );
};

export default ImageGallery;