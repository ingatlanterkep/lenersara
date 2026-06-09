import { getLocationContent } from '@/services/seoService';
import HomePageContentWrapper from '@/components/HomePageContentWrapper';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export const revalidate = 3600;

const POPULAR_CITIES = [
  'budapest', 'debrecen', 'szeged', 'miskolc', 'pécs', 'győr',
  'nyíregyháza', 'kecskemét', 'székesfehérvár', 'szombathely', 'szolnok',
  'tatabánya', 'kaposvár', 'békéscsaba', 'érd', 'veszprém', 'zalaegerszeg',
  'sopron', 'eger', 'nagykanizsa', 'dunaújváros', 'hódmezővásárhely',
  'dunakeszi', 'szentendre', 'gödöllő', 'vecsés', 'gyömrő', 'monor',
  'cegléd', 'nagykáta'
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

const PROPERTY_TYPES = ['lakas', 'haz'];

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

export async function generateStaticParams() {
  const params = [];
  
  for (const propertyType of PROPERTY_TYPES) {
    params.push({ slug: [propertyType] });
    params.push({ slug: [propertyType, 'lista'] });
  }
  
  for (const propertyType of PROPERTY_TYPES) {
    for (const city of POPULAR_CITIES) {
      params.push({ slug: [propertyType, city] });
      params.push({ slug: [propertyType, city, 'lista'] });
    }
  }
  
  for (const propertyType of PROPERTY_TYPES) {
    for (const district of budapestDistricts) {
      params.push({ slug: [propertyType, district] });
      params.push({ slug: [propertyType, district, 'lista'] });
    }
  }
  
  for (const propertyType of PROPERTY_TYPES) {
    for (const county of COUNTIES) {
      params.push({ slug: [propertyType, county] });
      params.push({ slug: [propertyType, county, 'lista'] });
    }
  }
  
  console.log(`[Kiadó generateStaticParams] ${params.length} oldal generálása build-kor`);
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listingType = 'kiado';
  const type = slug?.[0] || 'lakas';
  const city = slug?.[1] || null;
  
  let title = `Kiadó ${type === 'lakas' ? 'lakások' : 'házak'} - Ingatlan-Térkép`;
  let description = `Keress kiadó ${type === 'lakas' ? 'lakásokat' : 'házakat'} Magyarország térképén.`;
// Javasolt:
let canonicalUrl = `https://ingatlan-terkep.hu/${listingType}/${type}`;
if (city) {
  canonicalUrl = `https://ingatlan-terkep.hu/${listingType}/${type}/${city}`;
}
  
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

// 🔥 JSON-LD generáló függvények - pontosan úgy, mint a régi kódban
function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ingatlan-Térkép",
    "url": "https://ingatlan-terkep.hu",
    "logo": "https://ingatlan-terkep.hu/logo.png",
    "sameAs": [
      "https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/"
    ]
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

  const listName = city
    ? `Friss ${listingType === 'elado' ? 'eladó' : 'kiadó'} ${type === 'lakas' ? 'lakások' : 'házak'} ${formatLocationName(city)}`
    : "Friss ingatlanhirdetések – Ingatlan-Térkép";

  const items = seoQuickPosts.filter(post => {
    const rawPrice = Number(post.price || post.rental_price || 0);
    const area = Number(post.area) || 0;
    const rooms = Number(post.rooms) || 0;
    return rawPrice > 0 && area >= 15 && rooms >= 1;
  });

  const jsonLd = {
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

  return jsonLd;
}

// Fő komponens (Server Component)
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
  
  // JSON-LD-k generálása
  const organizationJsonLd = generateOrganizationJsonLd();
  const itemListJsonLd = generateItemListJsonLd(seoQuickPosts, listingType, type, city);
  
  return (
    <>
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      {/* ItemList JSON-LD (friss hirdetések) - CSAK AKKOR, ha van elég hirdetés */}
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