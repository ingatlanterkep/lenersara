import React, { useState } from 'react';
import { changePassword } from '../services/authService';
import '../styles/AuthForm.css';

const ChangePasswordForm = ({ onCancel, onPasswordChanged }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Jelszó módosítás indítása...');
      const response = await changePassword({ oldPassword, newPassword });
      
      console.log('Válasz a backendtől:', response);

      if (response?.success === true) {
        setMessage('A jelszavad sikeresen módosult!');
        // Biztonságos hívás: csak akkor hívjuk, ha függvény
        if (typeof onPasswordChanged === 'function') {
          onPasswordChanged();
        } else {
          console.warn('onPasswordChanged nem függvény, nem hívható');
        }
      } else {
        setMessage(response?.message || 'A jelszó módosítása sikertelen volt. Próbáld újra!');
      }
    } catch (error) {
      console.error('Részletes hiba:', error);
      console.log('Hiba válasz:', error.response?.data);
      
      setMessage(
        error.response?.data?.message || 
        'Hiba történt a jelszó módosításakor. Próbáld újra később!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlePasswordChange} className="auth-form">
        <div className="form-group">
          <label>Régi jelszó</label>
          <input
            type="password"
            placeholder="Régi jelszó"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Új jelszó</label>
          <input
            type="password"
            placeholder="Új jelszó"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="profile-button btn-primary" disabled={loading}>
          {loading ? 'Kérem várjon...' : 'Jelszó módosítása'}
        </button>
      </form>

      {message && (
        <p className={message.includes('sikeresen') ? 'success-text' : 'error-text'}>
          {message}
        </p>
      )}

      <button onClick={onCancel} className="profile-button btn-danger">Mégsem</button>
    </div>
  );
};

export default ChangePasswordForm;