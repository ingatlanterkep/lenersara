// components/HomePageContentWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const HomePageContentDynamic = dynamic(
  () => import('@/pages/HomePageContent'),
  { 
    ssr: false,
    loading: () => <div className="flex justify-center items-center min-h-screen">Térkép betöltése...</div>
  }
);

interface HomePageContentWrapperProps {
  listingType: string;
  type: string;
  city: string | null;
  viewModeDefault?: 'map' | 'list';
  serverLocationContent?: any;
  serverSeoQuickPosts?: any[];
}

export default function HomePageContentWrapper(props: HomePageContentWrapperProps) {
  // @ts-ignore - A HomePageContent JS komponens, nem kell típusellenőrzés
  return <HomePageContentDynamic {...props} />;
}