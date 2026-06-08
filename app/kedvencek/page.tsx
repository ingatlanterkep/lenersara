// app/kedvencek/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dinamikus import a FavoritesPage-hoz (SSR kikapcsolva)
const FavoritesPage = dynamic(
  () => import('@/pages/FavoritesPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Kedvencek betöltése...</div>
      </div>
    )
  }
);

export default function Favorites() {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <FavoritesPage />
    </Suspense>
  );
}