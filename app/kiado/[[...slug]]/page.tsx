import { getLocationContent } from '@/services/seoService';
import HomePageContentWrapper from '@/components/HomePageContentWrapper';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// 🔥 ISR konfiguráció - 1 óránként újragenerálódik a háttérben
export const revalidate = 3600;

// 🔥 Prerenderelendő népszerű városok listája (ékezetes formában)
const POPULAR_CITIES = [
  'budapest', 'debrecen', 'szeged', 'miskolc', 'pécs', 'győr',
  'nyíregyháza', 'kecskemét', 'székesfehérvár', 'szombathely', 'szolnok',
  'tatabánya', 'kaposvár', 'békéscsaba', 'érd', 'veszprém', 'zalaegerszeg',
  'sopron', 'eger', 'nagykanizsa', 'dunaújváros', 'hódmezővásárhely',
  'dunakeszi', 'szentendre', 'gödöllő', 'vecsés', 'gyömrő', 'monor',
  'cegléd', 'nagykáta'
];

// 🔥 Vármegyék listája
const COUNTIES = [
  'budapest', // Budapest főváros
  'pest-varmegye',
  'hajdu-bihar-varmegye',
  'gyor-moson-sopron-varmegye',
  'baranya-varmegye',
  'borsod-abauj-zemplen-varmegye',
  'szabolcs-szatmar-bereg-varmegye',
  'bacs-kiskun-varmegye',
  'bekes-varmegye',
  'csongrad-csanad-varmegye',
  'fejer-varmegye',
  'heves-varmegye',
  'komarom-esztergom-varmegye',
  'nograd-varmegye',
  'somogy-varmegye',
  'tolna-varmegye',
  'vas-varmegye',
  'veszprem-varmegye',
  'zala-varmegye',
  'jasz-nagykun-szolnok-varmegye'
];

const PROPERTY_TYPES = ['lakas', 'haz'];

// 🔥 generateStaticParams - Build-time prerenderelés KIADÓ oldalakra
export async function generateStaticParams() {
  const params = [];
  
  // 1. Alap route-ok (város nélkül)
  for (const propertyType of PROPERTY_TYPES) {
    // /kiado/lakas
    params.push({ slug: [propertyType] });
    // /kiado/lakas/lista
    params.push({ slug: [propertyType, 'lista'] });
  }
  
  // 2. Városos route-ok
  for (const propertyType of PROPERTY_TYPES) {
    for (const city of POPULAR_CITIES) {
      // /kiado/lakas/budapest
      params.push({ slug: [propertyType, city] });
      // /kiado/lakas/budapest/lista
      params.push({ slug: [propertyType, city, 'lista'] });
    }
  }
  
  // 3. Budapest kerületek (extra népszerű)
  const budapestDistricts = [
    'budapest-i-kerulet', 'budapest-ii-kerulet', 'budapest-iii-kerulet',
    'budapest-iv-kerulet', 'budapest-v-kerulet', 'budapest-vi-kerulet',
    'budapest-vii-kerulet', 'budapest-viii-kerulet', 'budapest-ix-kerulet',
    'budapest-x-kerulet', 'budapest-xi-kerulet', 'budapest-xii-kerulet',
    'budapest-xiii-kerulet', 'budapest-xiv-kerulet', 'budapest-xv-kerulet',
    'budapest-xvi-kerulet', 'budapest-xvii-kerulet', 'budapest-xviii-kerulet',
    'budapest-xix-kerulet', 'budapest-xx-kerulet', 'budapest-xxi-kerulet',
    'budapest-xxii-kerulet', 'budapest-xxiii-kerulet'
  ];
  
  for (const propertyType of PROPERTY_TYPES) {
    for (const district of budapestDistricts) {
      params.push({ slug: [propertyType, district] });
      params.push({ slug: [propertyType, district, 'lista'] });
    }
  }
  
  // 4. Vármegye route-ok
  for (const propertyType of PROPERTY_TYPES) {
    for (const county of COUNTIES) {
      params.push({ slug: [propertyType, county] });
      params.push({ slug: [propertyType, county, 'lista'] });
    }
  }
  
  console.log(`[Kiadó generateStaticParams] ${params.length} oldal generálása build-kor`);
  return params;
}

// METADATA generálása
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listingType = 'kiado';
  const type = slug?.[0] || 'lakas';
  const city = slug?.[1] || null;
  
  let title = `Kiadó ${type === 'lakas' ? 'lakások' : 'házak'} - Ingatlan-Térkép`;
  let description = `Keress kiadó ${type === 'lakas' ? 'lakásokat' : 'házakat'} Magyarország térképén.`;
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
  
  return { 
    title, 
    description, 
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Ingatlan-Térkép',
      locale: 'hu_HU',
      type: 'website',
    },
  };
}

// JSON-LD generáló függvény
function generateJsonLd(listingType: string, type: string, city: string | null, locationContent: any, seoQuickPosts: any[]) {
  const baseUrl = 'https://ingatlan-terkep.hu';
  if (city && locationContent) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/${listingType}/${type}/${city}`,
          "name": locationContent.seo?.title || `Kiadó ${type === 'lakas' ? 'lakások' : 'házak'} ${city}`,
          "url": `${baseUrl}/${listingType}/${type}/${city}`,
        },
        {
          "@type": "Product",
          "name": `Kiadó ${type === 'lakas' ? 'lakások' : 'házak'} ${city}`,
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

// Fő komponens (Server Component)
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const listingType = 'kiado';
  const type = slug?.[0] || 'lakas';
  const city = slug?.[1] || null;
  let viewMode: 'map' | 'list' = 'map';
  
  // ViewMode felismerés
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Client wrapper komponens - a térkép és a SEO tartalom is itt jelenik meg lent */}
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