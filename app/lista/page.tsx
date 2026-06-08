// app/lista/page.tsx
import HomePageContent from '@/pages/HomePageContent';

export default function RootListPage() {
  return (
    <HomePageContent 
      listingType="elado"
      type="lakas"
      city={null}
      viewModeDefault="list"
      serverLocationContent={null}      // ← EZT ADD HOZZÁ!
      serverSeoQuickPosts={[]}          // ← EZT ADD HOZZÁ!
    />
  );
}