import HomePageContent from '@/pages/HomePageContent';

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