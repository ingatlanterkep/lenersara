import HomePageContent from '@/pages/HomePageContent';
import HomePageSEO from '../components/HomePageSEO';
export default function HomePage() {
  return (
    <>
      <HomePageContent 
        listingType="elado" 
        type="lakas" 
        city={null} 
        viewModeDefault="map" 
        serverLocationContent={null}
        serverSeoQuickPosts={[]}
      />
      
      {/* 💡 EZ AZ ÚJ SEO TARTALOM A FŐOLDALON */}
      <HomePageSEO />
    </>
  );
}