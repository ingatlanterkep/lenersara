// src/components/PostDetails.js
import React from 'react';
import ImageGallery from './ImageGallery';

const PostDetails = ({ selectedPost, listingType, getFullImageUrl }) => {
  if (!selectedPost) return null;

  const fullImageUrls = selectedPost.images.map(image => getFullImageUrl(image));

  return (
    <div>
      <h3>{selectedPost.title}</h3>
      <p>{listingType === 'eladó' ? `Ár: ${selectedPost.price} M` : `Bérleti díj: ${selectedPost.rental_price} E`}</p>
      <p>Helyszín: {selectedPost.location}</p>
      <p>Leírás: {selectedPost.description}</p>
      {fullImageUrls.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <ImageGallery images={fullImageUrls} />
        </div>
      )}
    </div>
  );
};

export default PostDetails;