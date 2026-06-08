// src/components/FacebookBadge.js
import React from 'react';
import './FacebookBadge.css'; // ha külön CSS-t akarsz, vagy használd a meglévő PostDetailsPage.css-t

const FacebookBadge = () => {
  return (
    <a
      href="https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/"
      target="_blank"
      rel="noopener noreferrer"
      className="fb-page-badge"
      title="Kövess minket a legfrissebb ingatlanokért és tippekért!"
      aria-label="Kövesd az Ingatlan-Térképet Facebookon"
    >
      <div className="fb-logo-wrapper">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook logo"
          className="fb-icon"
          loading="lazy"
        />
      </div>
      <div className="text-stack">
        <span className="main-text">Ne maradj le semmiről!</span>
        <span className="sub-text">
          <strong>Kövess minket Facebookon</strong>
        </span>
      </div>
    </a>
  );
};

export default FacebookBadge;