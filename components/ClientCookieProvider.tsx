// components/ClientCookieProvider.tsx
'use client';

import { ReactNode } from 'react';
import { CookieProvider } from '@/contexts/CookieContext';

interface ClientCookieProviderProps {
  children: ReactNode;
}

export default function ClientCookieProvider({ children }: ClientCookieProviderProps) {
  return <CookieProvider>{children}</CookieProvider>;
}