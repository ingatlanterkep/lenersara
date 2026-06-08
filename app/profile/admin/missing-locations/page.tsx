// app/profile/admin/missing-locations/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dinamikus import a MissingLocationsPage-hoz (SSR kikapcsolva)
const MissingLocationsPage = dynamic(
  () => import('@/pages/MissingLocationsPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Hiányzó helyszínek betöltése...</div>
      </div>
    )
  }
);

export default function MissingLocationsIndexPage() {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <MissingLocationsPage />
    </Suspense>
  );
}