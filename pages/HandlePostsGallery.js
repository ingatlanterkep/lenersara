import React, { useState } from 'react';
import '../styles/HandlePostsGallery.css';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="image-gallery">
      <button className="gallery-button prev" onClick={handlePrev}>
        &#9664;
      </button>
      <img src={images[currentIndex]} alt={`Kép ${currentIndex + 1}`} />
      <button className="gallery-button next" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
};

export default ImageGallery;