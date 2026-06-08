// components/forms/LoginForm.jsx
import React, { useState } from 'react';
import '../styles/AuthForm.css';

const EyeIcon = ({ isVisible, ...props }) => (
  isVisible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" />
      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
);

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pelda@domain.hu"
          required
        />
      </div>

      <div className="form-group password-container">
        <label>Jelszó</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            <EyeIcon isVisible={showPassword} />
          </button>
        </div>
      </div>

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
      </button>
    </form>
  );
};

export default LoginForm;