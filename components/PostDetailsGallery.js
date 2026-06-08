import React, { useState, useEffect, useCallback } from 'react';
import FullScreenGallery from './FullScreenGallery';
import '../styles/PostDetailsGallery.css';

const PostDetailsGallery = React.memo(({ images, post, cookiesDecided, cookiesAccepted }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchMove, setTouchMove] = useState(null);

  // Kép URL-ek WebP formátummal, LQIP-vel és méretváltozatokkal
  const getImageUrls = useCallback((image) => {
    const baseUrl = image.startsWith('http://') || image.startsWith('https://')
      ? image
      : `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${image}`;
    const lqipUrl = `${baseUrl}?tr=w-20,bl-10`;
    const webpUrl = `${baseUrl}?tr=f-webp`;
    const srcSet = [
      `${baseUrl}?tr=w-480 480w`,
      `${baseUrl}?tr=w-800 800w`,
      `${baseUrl}?tr=w-1200 1200w`,
    ].join(', ');
    return { lqipUrl, webpUrl, srcSet, baseUrl };
  }, []);

  const updateThumbnailGalleryPosition = useCallback(() => {
    const thumbnailGallery = document.getElementById('post-details-thumbnail-gallery');
    const activeThumbnail = document.querySelector('.post-details-thumbnail.active');
    if (activeThumbnail && thumbnailGallery) {
      const position = activeThumbnail.offsetLeft - thumbnailGallery.offsetWidth / 2 + activeThumbnail.offsetWidth / 2;
      thumbnailGallery.scrollTo({
        left: position,
        behavior: 'smooth',
      });
    }
  }, []);

  const changeImage = useCallback((index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  }, [images]);

  const handleMainImageClick = useCallback(() => {
    setIsGalleryOpen(true);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  useEffect(() => {
    if (!cookiesDecided) return;
    const images = document.querySelectorAll('.post-details-thumbnail');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(img => observer.observe(img));
    return () => observer.disconnect();
  }, [cookiesDecided, images]);

  useEffect(() => {
    if (cookiesDecided) {
      updateThumbnailGalleryPosition();
    }
  }, [currentIndex, cookiesDecided, updateThumbnailGalleryPosition]);

  const handlePrevClick = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    changeImage(newIndex);
  }, [currentIndex, images.length, changeImage]);

  const handleNextClick = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    changeImage(newIndex);
  }, [currentIndex, images.length, changeImage]);

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchMove(null);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchMove(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart === null || touchMove === null) return;
    const deltaX = touchStart - touchMove;
    const minSwipeDistance = 50;
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }
    setTouchStart(null);
    setTouchMove(null);
  }, [touchStart, touchMove, handleNextClick, handlePrevClick]);

  const formatAddress = useCallback((address) => {
    if (!address) return 'Ingatlan';
    const { street, city, region, county } = address;
    const parts = [
      city || '',
      region || '',
      street || '',
      county ? `${county} vármegye` : '',
    ].filter(part => part.trim() !== '');
    return parts.length > 0 ? parts.join(', ') : 'Ingatlan';
  }, []);

  return (
    <div className="post-details-gallery-wrapper">
      <div className="post-details-main-image-container">
        <div
          className="post-details-main-image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <picture>
            <source srcSet={getImageUrls(selectedImage).webpUrl} type="image/webp" />
            <img
              src={getImageUrls(selectedImage).lqipUrl}
              srcSet={getImageUrls(selectedImage).srcSet}
              sizes="(max-width: 768px) 480px, (max-width: 1024px) 800px, 1200px"
              alt={`${post?.title || 'Ingatlan'} - ${formatAddress(post?.address)} fő kép`}
              className="post-details-main-image"
              onClick={handleMainImageClick}
              loading="eager"
              fetchpriority="high"
              width="800"
              height="600"
            />
          </picture>
          {images.length > 1 && (
            <>
              <button className="nav-arrow left" onClick={handlePrevClick}>
                ‹
              </button>
              <button className="nav-arrow right" onClick={handleNextClick}>
                ›
              </button>
            </>
          )}
        </div>
      </div>
      {images.length > 1 && cookiesDecided && (
        <div className="post-details-thumbnail-gallery-container">
          <div id="post-details-thumbnail-gallery" className="post-details-thumbnail-container">
            {images.map((img, index) => (
              <picture key={index}>
                <source srcSet={getImageUrls(img).webpUrl} type="image/webp" />
                <img
                  src={getImageUrls(img).lqipUrl}
                  data-src={getImageUrls(img).baseUrl}
                  srcSet={getImageUrls(img).srcSet}
                  sizes="(max-width: 768px) 100px, 120px"
                  alt={`${post?.title || 'Ingatlan'} - ${formatAddress(post?.address)} ${index + 1}. kép`}
                  className={`post-details-thumbnail ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => changeImage(index)}
                  loading="lazy"
                  width="120"
                  height="90"
                />
              </picture>
            ))}
          </div>
        </div>
      )}
      {isGalleryOpen && (
        <FullScreenGallery
          images={images}
          initialIndex={currentIndex}
          onClose={handleCloseGallery}
          post={post}
        />
      )}
    </div>
  );
});

export default PostDetailsGallery;