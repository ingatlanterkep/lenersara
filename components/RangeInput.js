import React, { useState } from 'react';
import '../styles/RangeInput.css';

const RangeInput = ({
  label,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  unit,
  step,
  className, // Hozzáadott prop a mobil-only osztályhoz
}) => {
  const [isActive, setIsActive] = useState(false);

  // Fókusz esemény kezelése
  const handleFocus = () => {
    setIsActive(true);
  };

  // Fókusz elvesztés kezelése
  const handleBlur = (e) => {
    if (!minValue && !maxValue && !e.currentTarget.contains(e.relatedTarget)) {
      setIsActive(false);
    }
  };

  // Minimum érték változásának kezelése
  const handleMinChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setMinValue(value);
    }
  };

  // Maximum érték változásának kezelése
  const handleMaxChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setMaxValue(value);
    }
  };

  return (
    <div className={`range-input-container ${className || ''}`}>
      <div
        className={`range-input-wrapper ${isActive ? 'active' : ''}`}
        onClick={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {!isActive && (
          <span className="default-range-label">{label}</span>
        )}
        {isActive && (
          <>
            <input
              type="text"
              className="range-min-input"
              placeholder="min"
              value={minValue}
              onChange={handleMinChange}
              autoFocus
            />
            <span className="range-divider">-</span>
            <input
              type="text"
              className="range-max-input"
              placeholder="max"
              value={maxValue}
              onChange={handleMaxChange}
            />
          </>
        )}
      </div>
      <span className="range-unit">{unit}</span>
    </div>
  );
};

export default RangeInput;