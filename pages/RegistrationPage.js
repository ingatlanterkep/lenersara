'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../forms/RegisterForm';
import VerificationForm from '../forms/VerificationForm';
import { signup, sendVerificationCode, verifyVerificationCode } from '../services/authService';
import '../styles/AuthPage.css';
import '../styles/AuthForm.css';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleRegister = async (data) => {
    try {
      const cleanData = {
        email: String(data.email).trim(),
        password: String(data.password).trim(),
        firstName: String(data.firstName).trim(),
        lastName: String(data.lastName).trim(),
        phone: String(data.phone).trim(),
        referralCode: data.referralCode ? String(data.referralCode).trim() : ''
      };

      const response = await signup(cleanData);
      setEmail(cleanData.email);

      if (response.success) {
        const v = await sendVerificationCode(cleanData.email);
        if (v.success) {
          setShowVerification(true);
          setMessage('Ellenőrizd az emailed a kóddal!');
        }
      } else {
        setMessage(response.message || 'Hiba történt');
      }
      return response;
    } catch (err) {
      setMessage(err.response?.data?.message || 'Hiba történt');
      throw err;
    }
  };

  const handleVerification = async (code) => {
    if (isVerifying) return;
    setIsVerifying(true);
    try {
      const res = await verifyVerificationCode(email, code);
      if (res.success || res.message?.includes('jóvá van hagyva')) {
        setMessage('Sikeres verifikáció!');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setMessage(res.message || 'Hibás kód');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Hiba');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-card">
          <h2>Regisztráció</h2>

          {!showVerification ? (
            <>
              <RegisterForm onRegister={handleRegister} setMessage={setMessage} />
              {message && (
                <p className={`info-text ${message.includes('Ellenőrizd') || message.includes('Sikeres') ? 'success' : 'error'}`}>
                  {message}
                </p>
              )}
            </>
          ) : (
            <>
              <h3>Verifikáció</h3>
              <VerificationForm email={email} onVerify={handleVerification} />
              {message && (
                <p className={`info-text ${message.includes('Sikeres') ? 'success' : 'error'}`}>
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;