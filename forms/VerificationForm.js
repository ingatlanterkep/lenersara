import React, { useState } from 'react';
import '../styles/AuthForm.css';

const VerificationForm = ({ email, onVerify }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Hozzáadunk egy állapotot a dupla submit megakadályozására

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Ha már folyamatban van a submit, ne fusson újra
    setIsSubmitting(true);
    setError('');
    try {
      if (onVerify) {
        await onVerify(code); // A verifyVerificationCode hívást a RegistrationPage kezeli
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setError(error.response?.data?.message || 'Hiba történt a verifikálás során.');
    } finally {
      setIsSubmitting(false); // Visszaállítjuk az állapotot
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="verification-code">Verifikáló kód</label>
        <input
          type="text"
          id="verification-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Add meg a verifikáló kódot"
          required
          className={error ? 'has-error' : ''}
          disabled={isSubmitting} // Letiltjuk az inputot submit közben
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      <button type="submit" className="auth-button" disabled={isSubmitting}>
        {isSubmitting ? 'Feldolgozás...' : 'Verifikálás'}
      </button>
    </form>
  );
};

export default VerificationForm;