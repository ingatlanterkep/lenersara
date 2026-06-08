'use client';

import LoginPage from '@/pages/LoginPage';
import { login } from '@/services/authService';

export default function Login() {
  return <LoginPage onLogin={login} isLoggedIn={false} />;
}