// src/forms/ImageUploader.js
import React, { useState, useCallback } from 'react';

const ImageUploader = ({ onFilesSelected, onError }) => {
  const [dragOver, setDragOver] = useState(false);
  const [imageLinks, setImageLinks] = useState('');
  const [error, setError] = useState('');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) {
      onError?.('Csak képfájlokat fogadunk el!');
      return;
    }
    onFilesSelected(files);
  }, [onFilesSelected, onError]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    onFilesSelected(files);
  }, [onFilesSelected]);

  const handleAddLinks = () => {
    if (!imageLinks.trim()) return setError('Add meg legalább egy linket!');

    const links = imageLinks.split(',').map(l => l.trim()).filter(Boolean);
    const invalid = links.filter(l => !/^https?:\/\/.+\.(jpe?g|png|gif|webp)/i.test(l));

    if (invalid.length) {
      setError(`Érvénytelen kép linkek: ${invalid.join(', ')}`);
      return;
    }

    setError('');
    onFilesSelected(links);
    setImageLinks('');
  };

  return (
    <div className="image-uploader">
      {/* DROP ZONE */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
      >
        <p>
          Húzd ide a képeket vagy{' '}
          <label htmlFor="file-upload" className="file-label">
            kattints ide a tallózáshoz
          </label>
        </p>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

      {/* LINK BEÍRÁS */}
      <div style={{ marginTop: '1.5rem' }}>
        <label className="form-group" style={{ display: 'block' }}>
          <span style={{ display: 'inline-block', marginBottom: '8px', fontWeight: '500', color: 'var(--text)' }}>
            Vagy kép URL-ek (vesszővel elválasztva)
          </span>
          <textarea
            value={imageLinks}
            onChange={(e) => setImageLinks(e.target.value)}
            placeholder="https://example.com/kep1.jpg, https://example.com/kep2.jpg"
            className="form-input"
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </label>

        {error && <div className="message error" style={{ marginTop: '8px' }}>{error}</div>}

        <div className="button-group" style={{ marginTop: '12px' }}>
          <button onClick={handleAddLinks} className="profile-button btn-secondary">
            Linkek hozzáadása
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;