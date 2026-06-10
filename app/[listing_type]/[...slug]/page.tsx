import { getLocationContent } from '@/services/seoService';
import HomePageContentWrapper from '@/components/HomePageContentWrapper';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ 
    listingType: string;
    slug: string[];
  }>;
}

export const revalidate = 3600;

// Valid listing type-ok
const VALID_LISTING_TYPES = ['elado', 'kiado'];
const VALID_PROPERTY_TYPES = ['lakas', 'haz', 'iroda', 'telek'];

// Konstansok (egy helyen)
const POPULAR_CITIES = [
  'budapest', 'debrecen', 'szeged', 'miskolc', 'pécs', 'győr', 'nyíregyháza', 'kecskemét', 'székesfehérvár',
  'szombathely', 'veszprém', 'zalaegerszeg', 'kaposvár', 'tatabánya', 'sopron', 'békéscsaba',
  'eger', 'szolnok', 'dunaújváros', 'hódmezővásárhely', 'gyula', 'salgótarján', 'szekszárd',
  'siófok', 'keszthely', 'nagykanizsa', 'hajdúböszörmény', 'szentes', 'oroszlány', 'gyöngyös',
  'komló', 'mosonmagyaróvár', 'pápa', 'ajka', 'balatonfüred', 'baja', 'kiskunfélegyháza',
  'szigetszentmiklós', 'érd', 'vecsés', 'gödöllő', 'szentendre', 'vác', 'dunakeszi', 'budaörs',
  'gyál', 'monor', 'nagykőrös', 'cegléd', 'szarvas', 'makó', 'csongrád', 'orosháza', 'mezőtúr',
  'törökszentmiklós', 'karcag', 'tapolca', 'hévíz', 'balassagyarmat', 'esztergom', 'komárom',
  'dorog', 'ócsa', 'piliscsaba', 'pilisvörösvár', 'pomáz', 'biatorbágy', 'nagykovácsi', 'maglód', 'ózd',
  'kazincbarcika', 'szerencs', 'sátoraljaújhely', 'tiszaújváros', 'berettyújfalu',
  'püspökladány', 'marcali', 'nagyatád', 'barcs', 'sarkad', 'gyomaendrőd', 'kondoros',
  'csorna', 'gönyű', 'letenye', 'kisvárda', 'mándok', 'vásárosnamény',
  'balatonalmádi', 'fonyód', 'balatonlelle', 'balatonboglár', 'zamárdi', 'tihany', 'badacsonytomaj',
  'balatonföldvár', 'balatonkenese', 'balatonfűzfő', 'alsóörs', 'csopak'
];

const COUNTIES = [
  'budapest',
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

// Helper: location-ök generálása (városok + kerületek + megyék)
function getAllLocations() {
  return [...POPULAR_CITIES, ...budapestDistricts, ...COUNTIES];
}

export async function generateStaticParams() {
  const params = [];
  
  for (const listingType of VALID_LISTING_TYPES) {
    for (const propertyType of VALID_PROPERTY_TYPES) {
      // /elado/lakas
      params.push({ listingType, slug: [propertyType] });
      // /elado/lakas/lista
      params.push({ listingType, slug: [propertyType, 'lista'] });
      
      // Városok, kerületek, megyék
      for (const location of getAllLocations()) {
        // /elado/lakas/budapest
        params.push({ listingType, slug: [propertyType, location] });
        // /elado/lakas/budapest/lista
        params.push({ listingType, slug: [propertyType, location, 'lista'] });
      }
    }
  }
  
  console.log(`[generateStaticParams] ${params.length} oldal generálása build-kor`);
  return params;
}

// Helper a szöveges tartalmakhoz
function getTypeDisplayName(type: string): string {
  const names: Record<string, string> = {
    lakas: 'lakások',
    haz: 'házak',
    iroda: 'irodák',
    telek: 'telkek'
  };
  return names[type] || 'ingatlanok';
}

function getListingTypeText(listingType: string): string {
  return listingType === 'elado' ? 'eladó' : 'kiadó';
}

// Helper: kinyeri a type-ot a slug-ból
function extractTypeAndLocation(slug: string[]): { type: string | null; city: string | null; viewMode: 'map' | 'list' } {
  if (!slug || slug.length === 0) {
    return { type: null, city: null, viewMode: 'map' };
  }
  
  const type = slug[0];
  let city: string | null = null;
  let viewMode: 'map' | 'list' = 'map';
  
  if (slug.length > 1) {
    if (slug[1] === 'lista') {
      viewMode = 'list';
    } else {
      city = slug[1];
      if (slug.length > 2 && slug[2] === 'lista') {
        viewMode = 'list';
      }
    }
  } else if (slug.length === 1 && slug[0] === 'lista') {
    // Ez a /elado/lista eset (ha van ilyen)
    viewMode = 'list';
  }
  
  return { type, city, viewMode };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { listingType, slug } = await params;
  
  // Validáció: listingType ellenőrzése
  if (!VALID_LISTING_TYPES.includes(listingType)) {
    return { title: 'Oldal nem található' };
  }
  
  const { type, city } = extractTypeAndLocation(slug);
  
  // Validáció: type ellenőrzése
  if (!type || !VALID_PROPERTY_TYPES.includes(type)) {
    return { title: 'Oldal nem található' };
  }
  
  const typeDisplayName = getTypeDisplayName(type);
  const listingText = getListingTypeText(listingType);
  
  let title = `${listingText} ${typeDisplayName} - Ingatlan-Térkép`;
  let description = `Keress ${listingText} ${typeDisplayName} Magyarország térképén.`;
  let canonicalUrl = `https://ingatlan-terkep.hu/${listingType}/${type}`;
  
  if (city) {
    canonicalUrl = `https://ingatlan-terkep.hu/${listingType}/${type}/${city}`;
    
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

// JSON-LD generátorok
function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ingatlan-Térkép",
    "url": "https://ingatlan-terkep.hu",
    "logo": "https://ingatlan-terkep.hu/logo.png",
    "sameAs": ["https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/"]
  };
}

function generateItemListJsonLd(seoQuickPosts: any[], listingType: string, type: string, city: string | null) {
  if (!seoQuickPosts || seoQuickPosts.length < 3) return null;

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
  };

  const generateSlug = (title: string) => {
    if (!title) return 'unknown';
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const formatLocationName = (loc: string) => {
    return loc.charAt(0).toUpperCase() + loc.slice(1).replace(/-/g, ' ');
  };

  const listingText = getListingTypeText(listingType);
  const typeDisplayName = getTypeDisplayName(type);
  
  const listName = city
    ? `Friss ${listingText} ${typeDisplayName} ${formatLocationName(city)}`
    : "Friss ingatlanhirdetések – Ingatlan-Térkép";

  const items = seoQuickPosts.filter(post => {
    const rawPrice = Number(post.price || post.rental_price || 0);
    const area = Number(post.area) || 0;
    const rooms = Number(post.rooms) || 0;
    return rawPrice > 0 && area >= 15 && rooms >= 1;
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://ingatlan-terkep.hu/#property-list",
    "name": listName,
    "numberOfItems": items.length,
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": items.map((post, index) => {
      const rawPrice = Number(post.price || post.rental_price || 0);
      const price = rawPrice < 1000000 ? Math.round(rawPrice * 1000000) : rawPrice;
      const rooms = Number(post.rooms) || 0;
      const area = Number(post.area) || 0;
      const url = `https://ingatlan-terkep.hu/ingatlan/${post._id}/${generateSlug(post.title || '')}`;

      const address: any = {
        "@type": "PostalAddress",
        "addressCountry": "HU"
      };
      if (post.address?.street) address.streetAddress = post.address.street;
      if (post.address?.city) address.addressLocality = post.address.city;
      if (post.address?.region) address.addressRegion = post.address.region;
      if (post.address?.zip) address.postalCode = post.address.zip;

      const item: any = {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `${url}#product`,
          "name": post.title?.trim() || `Ingatlan ${post.address?.city || "Magyarország"}`,
          "url": url,
          "description": (post.description || "Ingatlan eladásra vagy kiadásra Magyarországon").substring(0, 300),
          "address": address,
          "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": "HUF",
            "availability": "https://schema.org/InStock",
            "url": url,
            "validFrom": post.created_at || new Date().toISOString()
          }
        }
      };

      if (post.images?.length) {
        item.item.image = [getFullImageUrl(post.images[0].url)];
      }

      if (post.geolocation?.lat && post.geolocation?.lon) {
        item.item.geo = {
          "@type": "GeoCoordinates",
          "latitude": post.geolocation.lat,
          "longitude": post.geolocation.lon
        };
      }

      if (area > 0) {
        item.item.floorSize = {
          "@type": "QuantitativeValue",
          "value": area,
          "unitCode": "MTK"
        };
      }

      if (rooms > 0) {
        item.item.numberOfRooms = rooms;
      }

      return item;
    })
  };
}

// Fő komponens
export default async function Page({ params }: PageProps) {
  const { listingType, slug } = await params;
  
  // Validáció: listingType
  if (!VALID_LISTING_TYPES.includes(listingType)) {
    notFound();
  }
  
  const { type, city, viewMode } = extractTypeAndLocation(slug || []);
  
  // Validáció: type
  if (!type || !VALID_PROPERTY_TYPES.includes(type)) {
    notFound();
  }
  
  let locationContent = null;
  let seoQuickPosts: any[] = [];
  
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
  
  const organizationJsonLd = generateOrganizationJsonLd();
  const itemListJsonLd = generateItemListJsonLd(seoQuickPosts, listingType, type, city);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      
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