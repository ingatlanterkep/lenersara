// app/kiado/[[...slug]]/page.tsx
import { getLocationContent } from '@/services/seoService';
import HomePageContentWrapper from '@/components/HomePageContentWrapper';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listingType = 'elado';
  const type = slug?.[0] || 'lakas';
  const city = slug?.[1] || null;
  
  let title = `${listingType === 'elado' ? 'Eladó' : 'Kiadó'} ${type === 'lakas' ? 'lakások' : 'házak'} - Ingatlan-Térkép`;
  let description = `Keress ${listingType === 'elado' ? 'eladó' : 'kiadó'} ${type === 'lakas' ? 'lakásokat' : 'házakat'} Magyarország térképén.`;
  let canonicalUrl = `https://ingatlan-terkep.hu/${listingType}/${type}`;
  
  if (city) {
    try {
      const locationContent = await getLocationContent(listingType, type, city);
      if (locationContent?.seo) {
        if (locationContent.seo.title) title = locationContent.seo.title;
        if (locationContent.seo.metaDescription) description = locationContent.seo.metaDescription;
        if (locationContent.seo.canonicalUrl) canonicalUrl = locationContent.seo.canonicalUrl;
      }
    } catch (error) {
      console.error('[generateMetadata] Hiba:', error);
    }
  }
  
  return { title, description, alternates: { canonical: canonicalUrl } };
}

function generateJsonLd(listingType: string, type: string, city: string | null, locationContent: any, seoQuickPosts: any[]) {
  const baseUrl = 'https://ingatlan-terkep.hu';
  if (city && locationContent) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/${listingType}/${type}/${city}`,
          "name": locationContent.seo?.title || `${listingType === 'elado' ? 'Eladó' : 'Kiadó'} ${type === 'lakas' ? 'lakások' : 'házak'} ${city}`,
          "url": `${baseUrl}/${listingType}/${type}/${city}`,
        },
        {
          "@type": "Product",
          "name": `${listingType === 'elado' ? 'Eladó' : 'Kiadó'} ${type === 'lakas' ? 'lakások' : 'házak'} ${city}`,
          "offers": {
            "@type": "AggregateOffer",
            "offerCount": locationContent.stats?.listingCount || 0,
            "priceCurrency": "HUF",
          }
        }
      ]
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ingatlan-Térkép",
    "url": baseUrl,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const listingType = 'kiado';
  const type = slug?.[0] || 'lakas';
  const city = slug?.[1] || null;
  let viewMode: 'map' | 'list' = 'map';
  
  if (slug && slug.length > 1) {
    if (slug[1] === 'lista') viewMode = 'list';
    else if (slug.length > 2 && slug[2] === 'lista') viewMode = 'list';
  }
  
  let locationContent = null;
  let seoQuickPosts = [];
  
  if (city) {
    try {
      locationContent = await getLocationContent(listingType, type, city);
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
      const seoResponse = await fetch(
        `${baseUrl}/api/posts/seo-quick-list/${listingType}/${type}/${city}`,
        { next: { revalidate: 3600 } }
      );
      const seoJson = await seoResponse.json();
      if (seoJson.success) seoQuickPosts = seoJson.data || [];
    } catch (error) {
      console.error('[SSR] Adatbetöltési hiba:', error);
    }
  }
  
  const jsonLd = generateJsonLd(listingType, type, city, locationContent, seoQuickPosts);
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="seo-below-map-section" style={{ position: 'relative', zIndex: 10, background: 'white' }}>
        <div className="container relative z-10 mx-auto px-4 py-12 max-w-7xl">
          <div className="article-wrapper bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
            {city && locationContent ? (
              <>
                <h1 className="seo-h1">
                  {locationContent.seo?.h1 || `Kiadó ${type === 'lakas' ? 'lakások' : 'házak'} ${city}`}
                </h1>
                {locationContent.stats && (
                  <div className="stats-cards">
                    {locationContent.stats.listingCount && (
                      <div className="stat-card">
                        <div className="stat-number">{locationContent.stats.listingCount}</div>
                        <div className="stat-label">hirdetés</div>
                      </div>
                    )}
                  </div>
                )}
                {locationContent.content?.mainContent && (
                  <div className="seo-generated-content" dangerouslySetInnerHTML={{ __html: locationContent.content.mainContent }} />
                )}
              </>
            ) : !city ? (
              <>
                <h1 className="seo-h1">Keress kiadó ingatlant valós idejű térképen</h1>
                <p className="seo-intro">Több tízezer friss kiadó ingatlan Magyarországon – pontos szűrőkkel és interaktív térképpel.</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
      
      <HomePageContentWrapper 
        listingType={listingType}
        type={type}
        city={city}
        viewModeDefault={viewMode}
        serverLocationContent={locationContent}
        serverSeoQuickPosts={seoQuickPosts}
      />
    </>
  );
}