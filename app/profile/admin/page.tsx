// app/profile/admin/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Teljes AdminPage dinamikus importálása SSR nélkül
const AdminPage = dynamic(
  () => import('@/pages/AdminPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Admin felület betöltése...</div>
      </div>
    )
  }
);

export default function Admin() {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <AdminPage />
    </Suspense>
  );
}