import { getLocationContent } from '@/services/seoService';
import HomePageContentWrapper from '@/components/HomePageContentWrapper';
import RelatedLinks from '@/components/HomePageRelatedLinks';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ 
    listingtype: string;
    slug: string[];
  }>;
}

export const revalidate = 3600;

const VALID_LISTING_TYPES = ['elado', 'kiado'];
const VALID_PROPERTY_TYPES = ['lakas', 'haz', 'iroda', 'telek'];

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

function getAllLocations() {
  return [...POPULAR_CITIES, ...budapestDistricts, ...COUNTIES];
}

export async function generateStaticParams() {
  const params = [];
  
  for (const listingType of VALID_LISTING_TYPES) {
    for (const propertyType of VALID_PROPERTY_TYPES) {
      params.push({ listingtype: listingType, slug: [propertyType] });
      params.push({ listingtype: listingType, slug: [propertyType, 'lista'] });
      
      for (const location of getAllLocations()) {
        params.push({ listingtype: listingType, slug: [propertyType, location] });
        params.push({ listingtype: listingType, slug: [propertyType, location, 'lista'] });
      }
    }
  }
  
  console.log(`[generateStaticParams] ${params.length} oldal generálása build-kor`);
  return params;
}

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
    viewMode = 'list';
  }
  
  return { type, city, viewMode };
}

function formatCityName(city: string): string {
  return city
    .replace(/^budapest-/i, '')
    .replace(/-kerulet$/, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { listingtype, slug } = await params;
  
  if (!VALID_LISTING_TYPES.includes(listingtype)) {
    return { title: 'Oldal nem található' };
  }
  
  const { type, city } = extractTypeAndLocation(slug);
  
  if (!type || !VALID_PROPERTY_TYPES.includes(type)) {
    return { title: 'Oldal nem található' };
  }
  
  const typeDisplayName = getTypeDisplayName(type);
  const listingText = getListingTypeText(listingtype);
  
  let title = `${listingText} ${typeDisplayName} - Ingatlan-Térkép`;
  let description = `Keress ${listingText} ${typeDisplayName} Magyarország térképén.`;
  let canonicalUrl = `https://ingatlan-terkep.hu/${listingtype}/${type}`;
  
  if (city) {
    canonicalUrl = `https://ingatlan-terkep.hu/${listingtype}/${type}/${city}`;
    
    try {
      const locationContent = await getLocationContent(listingtype, type, city);
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

function getFullImageUrl(imagePath: string): string {
  if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
  return `${baseUrl}${imagePath}`;
}

function generateSlug(title: string): string {
  if (!title) return 'unknown';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateItemListJsonLd(seoQuickPosts: any[], listingType: string, type: string, city: string | null) {
  if (!seoQuickPosts || seoQuickPosts.length < 3) return null;

  const listingText = getListingTypeText(listingType);
  const typeDisplayName = getTypeDisplayName(type);
  
  const listName = city
    ? `Friss ${listingText} ${typeDisplayName} ${formatCityName(city)}`
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
  const { listingtype, slug } = await params;
  
  if (!VALID_LISTING_TYPES.includes(listingtype)) {
    notFound();
  }
  
  const { type, city, viewMode } = extractTypeAndLocation(slug || []);
  
  if (!type || !VALID_PROPERTY_TYPES.includes(type)) {
    notFound();
  }
  
  let locationContent = null;
  let seoQuickPosts: any[] = [];
  
  if (city) {
    try {
      locationContent = await getLocationContent(listingtype, type, city);
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
      const seoResponse = await fetch(
        `${baseUrl}/api/posts/seo-quick-list/${listingtype}/${type}/${city}`,
        { next: { revalidate: 3600 } }
      );
      const seoJson = await seoResponse.json();
      if (seoJson.success) seoQuickPosts = seoJson.data || [];
    } catch (error) {
      console.error('[SSR] Adatbetöltési hiba:', error);
    }
  }
  
  const organizationJsonLd = generateOrganizationJsonLd();
  const itemListJsonLd = generateItemListJsonLd(seoQuickPosts, listingtype, type, city);
  
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
        listingType={listingtype}
        type={type}
        city={city}
        viewModeDefault={viewMode}
        serverLocationContent={locationContent}
        serverSeoQuickPosts={seoQuickPosts}
        hideFooter={true}
      />
      
      {/* SEO szekció a belső linkekkel - a térkép UTÁN, a footer ELŐTT */}
      <div className="seo-below-map-section">
        <div className="container relative z-10 mx-auto px-4 py-12 max-w-7xl">
          <div className="article-wrapper bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
            
            {/* Meglévő SEO tartalom */}
            {city && locationContent ? (
              <>
                <h1 className="seo-h1">
                  {locationContent.seo?.h1 || `${getListingTypeText(listingtype)} ${getTypeDisplayName(type)} ${formatCityName(city)}`}
                </h1>
                {locationContent.stats && (
                  <div className="stats-cards">
                    {locationContent.stats.listingCount && (
                      <div className="stat-card">
                        <div className="stat-number">{locationContent.stats.listingCount}</div>
                        <div className="stat-label">hirdetés</div>
                      </div>
                    )}
                    {locationContent.stats.medianPricePerSqm && (
                      <div className="stat-card">
                        <div className="stat-number">{Math.round(locationContent.stats.medianPricePerSqm).toLocaleString()} Ft</div>
                        <div className="stat-label">medián nm ár</div>
                      </div>
                    )}
                    {locationContent.stats.medianPrice && (
                      <div className="stat-card">
                        <div className="stat-number">{Math.round(locationContent.stats.medianPrice / 1000000)}M Ft</div>
                        <div className="stat-label">medián ár</div>
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
                <h1 className="seo-h1">Keress ingatlant valós idejű térképen</h1>
                <p className="seo-intro">Több tízezer friss eladó és kiadó ingatlan Magyarországon – pontos szűrőkkel és interaktív térképpel.</p>
                <div className="seo-cta-buttons">
                  <a href="/elado/lakas" className="btn-primary">Eladó lakások →</a>
                  <a href="/kiado/lakas" className="btn-secondary">Kiadó lakások →</a>
                  <a href="/elado/haz" className="btn-tertiary">Eladó házak →</a>
                </div>
              </>
            ) : null}
            
            {/* === FRISS HIRDETÉSEK KÁRTYÁK - PRERENDERELVE === */}
            {seoQuickPosts && seoQuickPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0078A8] mb-6 text-center">
                  Friss hirdetések
                </h2>
                <div className="similar-posts-grid">
                  {seoQuickPosts.slice(0, 10).map((post) => (
                    <a
                      key={post._id}
                      href={`/ingatlan/${post._id}/${generateSlug(post.title || '')}`}
                      className="similar-post-card"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="similar-post-image">
                        {post.images?.length > 0 ? (
                          <img
                            src={getFullImageUrl(post.images[0].url)}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="no-image">Nincs kép</div>
                        )}
                      </div>
                      <div className="similar-post-content">
                        <h3>{post.title || 'Nincs cím'}</h3>
                        <p className="similar-post-price">
                          {listingtype === 'elado'
                            ? `${Math.round((post.price || 0))} M Ft`
                            : `${Math.round((post.rental_price || 0))} E Ft/hó`}
                        </p>
                        {post.area > 0 && (
                          <p className="similar-post-area">Alapterület: {post.area} m²</p>
                        )}
                        <p className="similar-post-address">
                          {post.address?.city || ''}{post.address?.region ? `, ${post.address.region}` : ''}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Belső linkek - a SEO tartalom és a hirdetések után */}
            <RelatedLinks 
              listingType={listingtype}
              type={type}
              city={city}
            />
            
          </div>
        </div>
      </div>
      
      {/* Footer - külön a SEO szekció UTÁN */}
      <footer className="app-footer">
        <div className="footer-main">
          <div className="footer-column logo-column">
            <img src="/barion-logo.png" alt="Barion biztonságos online fizetési logó" className="barion-logo" />
            <img src="/Large-nobg-light.png" alt="Barion elfogadott fizetési kártyák és módszerek logója" className="barion-logo" />
            <p className="footer-tagline">Biztonságos fizetés a Barionnal<br />A bankkártya adatok hozzánk nem jutnak el.</p>
          </div>
          <div className="footer-column">
            <h4>Oldalak</h4>
            <ul><li><a href="/">Kezdőlap</a></li><li><a href="/about">Rólunk</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Kapcsolat</a></li></ul>
          </div>
          <div className="footer-column">
            <h4>Jogi információk</h4>
            <ul><li><a href="/privacy-policy">Adatvédelmi nyilatkozat</a></li><li><a href="/aszf">Általános Szerződési Feltételek</a></li></ul>
          </div>
          <div className="footer-column">
            <h4>Közösség</h4>
            <ul><li><a href="https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/" target="_blank" rel="noopener">Facebook</a></li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 Ingatlan-Térkép.hu – Minden jog fenntartva</p>
        </div>
      </footer>
    </>
  );
}