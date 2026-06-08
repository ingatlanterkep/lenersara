'use client';

import RegistrationPage from '@/pages/RegistrationPage';
import { signup } from '@/services/authService';

export default function Signup() {
  return <RegistrationPage onRegister={signup} />;
}