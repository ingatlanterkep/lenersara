// components/forms/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { sendForgotPasswordCode, verifyForgotPasswordCode } from '../services/authService';
import '../styles/AuthForm.css';

const ForgotPasswordForm = ({ toggleForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await sendForgotPasswordCode(email);
      setMessage('Kód elküldve! Ellenőrizd az emailed.');
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Hiba történt.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await verifyForgotPasswordCode({ email, providedCode: code, newPassword });
      setMessage('Jelszó sikeresen módosítva!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Hibás kód vagy hiba.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      {step === 1 ? (
        <>
          <div className="form-group">
            <label>Email cím</label>
            <input
              type="email"
              placeholder="pelda@domain.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className={`info-text ${message.includes('elküldve') ? 'success' : 'error'}`}>{message}</p>}

          <button type="button" className="auth-button" onClick={handleEmailSubmit} disabled={loading}>
            {loading ? 'Küldés...' : 'Kód kérése'}
          </button>
        </>
      ) : (
        <>
          <div className="form-group">
            <label>Jelszó-visszaállító kód</label>
            <input
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-container">
            <label>Új jelszó</label>
            <div className="password-wrapper">
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {message && <p className={`info-text ${message.includes('módosítva') ? 'success' : 'error'}`}>{message}</p>}

          <button type="button" className="auth-button" onClick={handleCodeSubmit} disabled={loading}>
            {loading ? 'Módosítás...' : 'Jelszó módosítása'}
          </button>
        </>
      )}

      <button
        type="button"
        className="auth-button cancel"
        onClick={toggleForgotPassword}
        style={{ marginTop: '15px' }}
      >
        Vissza a bejelentkezéshez
      </button>
    </div>
  );
};

export default ForgotPasswordForm;