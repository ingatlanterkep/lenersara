// app/profile/upload/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dinamikus import a ManualUploadPage-hoz (SSR kikapcsolva)
const ManualUploadPage = dynamic(
  () => import('@/pages/ManualUploadPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Hirdetés feltöltő felület betöltése...</div>
      </div>
    )
  }
);

export default function UploadIndexPage() {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <ManualUploadPage />
    </Suspense>
  );
}