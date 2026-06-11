// app/page.tsx
import dynamic from 'next/dynamic';

const HomePageContent = dynamic(
  () => import('@/pages/HomePageContent'),
  { ssr: false }  // ← Kikapcsolja az SSR-t erre a komponensre
);

export default function HomePage() {
  return (
    <HomePageContent 
      listingType="elado" 
      type="lakas" 
      city={null} 
      viewModeDefault="map" 
      serverLocationContent={null}
      serverSeoQuickPosts={[]}
    />
  );
}