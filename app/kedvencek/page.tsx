// app/kedvencek/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 🔥 HASZNÁLD A next/dynamic-ot RÖGTÖN az import után
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

// 🔥 EZUTÁN jöhet az export - MÁS NÉVEN!
export const dynamicConfig = 'force-dynamic';
export const revalidate = 0;

// 🔥 VAGY használd a default export-ot a config-hoz
// export default {
//   dynamic: 'force-dynamic',
//   revalidate: 0,
// };

export default function Favorites() {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <FavoritesPage />
    </Suspense>
  );
}