'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../forms/LoginForm';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import '../styles/AuthPage.css';
import '../styles/AuthForm.css';

const LoginPage = ({ onLogin, isLoggedIn }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push('/profile');
  }, [isLoggedIn, router]);

// pages/LoginPage.tsx - a handleLoginSubmit-ban
const handleLoginSubmit = async (email, password) => {
  try {
    const result = await onLogin(email, password);
    setLoginMessage(result.message);

    if (result.success) {
      localStorage.setItem('token', result.token);
      
      // ÉRTESÍTJÜK A NAVBAR-T A VÁLTOZÁSRÓL
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      router.push('/profile');
    }
  } catch (error) {
    setLoginMessage(error.response?.data?.message || 'Hiba történt a bejelentkezés során');
  }
};
  const toggleForgotPassword = () => setIsForgotPassword(!isForgotPassword);

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-card">
          <h2>{isForgotPassword ? 'Jelszó visszaállítása' : 'Bejelentkezés'}</h2>

          {!isForgotPassword ? (
            <>
              <LoginForm onLogin={handleLoginSubmit} />
              {loginMessage && (
                <p className={`info-text ${loginMessage.includes('Sikeres') ? 'success' : 'error'}`}>
                  {loginMessage}
                </p>
              )}
              <p className="link-text">
                Elfelejtette a jelszavát?{' '}
                <button className="link-button" onClick={toggleForgotPassword}>
                  Kattintson ide
                </button>
              </p>
            </>
          ) : (
            <ForgotPasswordForm toggleForgotPassword={toggleForgotPassword} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;