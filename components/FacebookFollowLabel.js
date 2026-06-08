import React, { useState, useEffect } from 'react';
import './FacebookFollowLabel.css';

const FACEBOOK_PAGE_URL = "https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/";
const STORAGE_KEY = 'ingatlan-terkep-fb-label-hidden';

export default function FacebookFollowLabel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem(STORAGE_KEY);
    if (hidden !== 'true') {
      setTimeout(() => setIsVisible(true), 1200);
    }
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="facebook-follow-label-wrapper">
      <a
        href={FACEBOOK_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="facebook-follow-label"
        title="Kövess minket Facebookon – ne maradj le semmiről!"
      >
        <div className="label-content">
          <div className="fb-logo-wrapper">
            <img
              // Modern, tiszta Facebook ikon: kék kör + fehér f (2024/2025 verzió)
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
  alt="Facebook logó – kövess minket a Facebookon" 
              className="fb-icon"
              width={20}
              height={20}
            />
          </div>

          <div className="text-stack">
            <span className="main-text">Ne maradj le semmiről!</span>
            <span className="sub-text">
              <strong>Kövess minket Facebookon</strong>
            </span>
          </div>
        </div>

        <button
          className="close-btn"
          onClick={handleClose}
          aria-label="Bezárás"
          title="Ne mutasd többet"
        >
          ×
        </button>
      </a>
    </div>
  );
}