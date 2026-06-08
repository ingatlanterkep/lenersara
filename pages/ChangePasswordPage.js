'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import '../styles/ChangePasswordForm.css';
import '../styles/AuthForm.css';

const ChangePasswordPage = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(true);
  const router = useRouter();

  const handlePasswordChanged = () => {
    setIsChangingPassword(false);
    router.push('/profile');
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <div className="change-password-card">
          <h2>Jelszó módosítása</h2>
          {isChangingPassword && (
            <ChangePasswordForm
              onCancel={() => setIsChangingPassword(false)}
              onPasswordChanged={handlePasswordChanged}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;