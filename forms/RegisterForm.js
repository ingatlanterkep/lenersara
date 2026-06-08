// forms/RegisterForm.jsx
import React, { useState } from 'react';
import Link from 'next/link'; // ← EZ A FONTOS VÁLTOZTATÁS!

const EyeIcon = ({ isVisible }) => (
  isVisible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
);

const RegisterForm = ({ onRegister, setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const e = {};
    if (!email) e.email = 'Email kötelező';
    if (!password) e.password = 'Jelszó kötelező';
    if (!firstName) e.firstName = 'Keresztnév kötelező';
    if (!lastName) e.lastName = 'Vezetéknév kötelező';
    if (!phone) e.phone = 'Telefonszám kötelező';
    else if (!/^\+36(1\d{7}|\d{2}\d{7}|\d{2}\d{8})$/.test(phone))
      e.phone = 'pl. +36301234567';
    if (!privacyAccepted) e.privacy = 'El kell fogadni';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return setMessage('Javítsd ki a hibákat!');

    try {
      await onRegister({ email, password, firstName, lastName, phone, referralCode });
    } catch (err) {
      // hiba már a parentben
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="pelda@pelda.hu" />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className={`form-group password-container ${errors.password ? 'has-error' : ''}`}>
        <label>Jelszó</label>
        <div className="password-wrapper">
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            <EyeIcon isVisible={showPassword} />
          </button>
        </div>
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
        <label>Keresztnév</label>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Béla" />
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>

      <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
        <label>Vezetéknév</label>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Kovács" />
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>

      <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
        <label>Telefonszám</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+36301234567" />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Ajánlói kód (opcionális)</label>
        <input type="text" value={referralCode} onChange={e => setReferralCode(e.target.value)} placeholder="ABC123" />
      </div>

      <div style={{ textAlign: 'center', margin: '24px 0 16px 0', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14.5px', cursor: 'pointer' }}>
          <input type="checkbox" checked={privacyAccepted} onChange={e => setPrivacyAccepted(e.target.checked)} />
          <span>
            Elfogadom az <Link href="/aszf" target="_blank">ÁSZF-et</Link> és az{' '}
            <Link href="/privacy-policy" target="_blank">Adatvédelmi tájékoztatót</Link>{' '}
            <span style={{ color: 'red' }}>*</span>
          </span>
        </label>
        {errors.privacy && <span className="error-message">{errors.privacy}</span>}
      </div>

      <button type="submit" className="auth-button" disabled={!privacyAccepted}>
        Regisztráció
      </button>
    </form>
  );
};

export default RegisterForm;