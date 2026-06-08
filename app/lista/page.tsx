import HomePageContent from '@/pages/HomePageContent';

export default function RootListPage() {
  return (
    <HomePageContent 
      listingType="elado"      // alapértelmezett
      type="lakas"             // alapértelmezett
      city={null}
      viewModeDefault="list" 
    />
  );
}