import HomePageContent from '@/pages/HomePageContent';

export default function HomePage() {
  // Főoldal - országos keresés eladó lakásokra
  return (
    <HomePageContent 
      listingType="elado" 
      type="lakas" 
      city={null} 
      viewModeDefault="map" 
    />
  );
}