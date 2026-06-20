// app/page.tsx
import HomePageContent from '@/pages/HomePageContent';
import HomePageSEO from '../components/HomePageSEO';
import RelatedLinks from '@/components/HomePageRelatedLinks';
import { Post } from '@/types/post';

// Revalidate beállítása
export const revalidate = 3600;

interface HomepageData {
  seoQuickPosts: Post[];
}

// SEO adatok lekérése a friss hirdetésekkel együtt
async function getHomepageData(): Promise<HomepageData> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
  
  try {
    // Friss hirdetések lekérése (országos szinten, bármilyen típus)
    const seoResponse = await fetch(
      `${baseUrl}/api/posts/seo-quick-list/homepage`,
      { 
        next: { revalidate: 3600 },
        headers: { 'Cache-Control': 'no-cache' }
      }
    );
    
    let seoData: Post[] = [];
    try {
      const seoJson = await seoResponse.json();
      if (seoJson.success) {
        seoData = seoJson.data || [];
      }
    } catch (e) {
      // Fallback: használjuk a sima listát
      const fallbackResponse = await fetch(
        `${baseUrl}/api/posts/seo-quick-list/elado/lakas/budapest`,
        { next: { revalidate: 3600 } }
      );
      const fallbackJson = await fallbackResponse.json();
      seoData = fallbackJson.success ? fallbackJson.data : [];
    }
    
    return { seoQuickPosts: seoData.slice(0, 12) };
  } catch (error) {
    console.error('[Homepage] Hiba a SEO adatok betöltésekor:', error);
    return { seoQuickPosts: [] };
  }
}

// JSON-LD generálás a főoldalra
function generateHomepageJsonLd(seoQuickPosts: Post[]) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ingatlan-Térkép",
    "url": "https://ingatlan-terkep.hu",
    "logo": "https://ingatlan-terkep.hu/logo.png",
    "sameAs": ["https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/"]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ingatlan-Térkép",
    "url": "https://ingatlan-terkep.hu",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ingatlan-terkep.hu/kereses?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Hirdetések ItemList
  let itemListJsonLd = null;
  if (seoQuickPosts && seoQuickPosts.length >= 3) {
    const filteredPosts = seoQuickPosts.filter((post: Post) => {
      const rawPrice = Number(post.price || post.rental_price || 0);
      const area = Number(post.area) || 0;
      return rawPrice > 0 && area >= 15;
    });

    if (filteredPosts.length > 0) {
      itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": "https://ingatlan-terkep.hu/#property-list",
        "name": "Friss ingatlanhirdetések Magyarországon",
        "numberOfItems": filteredPosts.length,
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "itemListElement": filteredPosts.map((post: Post, index: number) => {
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
  }

  return { organizationJsonLd, websiteJsonLd, itemListJsonLd };
}

// Segédfüggvények
function generateSlug(title: string): string {
  if (!title) return 'unknown';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getFullImageUrl(imagePath: string): string {
  if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
  return `${baseUrl}${imagePath}`;
}

export default async function HomePage() {
  const { seoQuickPosts } = await getHomepageData();
  const { organizationJsonLd, websiteJsonLd, itemListJsonLd } = generateHomepageJsonLd(seoQuickPosts);

  return (
    <>
      {/* JSON-LD - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      {/* JSON-LD - WebSite + SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      
      {/* JSON-LD - ItemList (hirdetések) */}
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      {/* Térkép + oldalsáv + smart tools */}
      <HomePageContent 
        listingType="elado" 
        type="lakas" 
        city={null} 
        viewModeDefault="map" 
        serverLocationContent={null}
        serverSeoQuickPosts={seoQuickPosts}
        hideFooter={true}
      />
      
      {/* SEO tartalom - a térkép UTÁN, a footer ELŐTT */}
      <div className="seo-below-map-section">
        <div className="container relative z-10 mx-auto px-4 py-12 max-w-7xl">
          <div className="article-wrapper bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
            
            {/* H1 és bevezető */}
            <h1 className="seo-h1">Ingatlan-Térkép – Keressen otthonokat Magyarország térképén</h1>
            <p className="seo-intro">
              Az <strong>Ingatlan-Térkép</strong> segítségével egyszerűen és gyorsan 
              találhat eladó vagy kiadó ingatlanokat Magyarország bármely pontján.
            </p>

            {/* FRISS HIRDETÉSEK - SSR-ben prerenderelve */}
            {seoQuickPosts && seoQuickPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0078A8] mb-6 text-center">
                  🏠 Frissen felkerült ingatlanok
                </h2>
                <div className="similar-posts-grid">
                  {seoQuickPosts.slice(0, 12).map((post: Post) => (
                    <a
                      key={post._id}
                      href={`/ingatlan/${post._id}/${generateSlug(post.title || '')}`}
                      className="similar-post-card"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="similar-post-image">
                        {post.images && post.images.length > 0 ? (
                          <img
                            src={getFullImageUrl(post.images[0].url)}
                            alt={post.title || ''}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="no-image">Nincs kép</div>
                        )}
                      </div>
                      <div className="similar-post-content">
                        <h3 className="text-sm font-semibold line-clamp-2">{post.title || 'Nincs cím'}</h3>
                        <p className="similar-post-price font-bold text-[#0078A8]">
                          {post.listing_type === 'elado' || post.listing_type === 'eladó'
                            ? `${Math.round((post.price || 0))} M Ft`
                            : `${Math.round((post.rental_price || 0))} E Ft/hó`}
                        </p>
                        {post.area && post.area > 0 && (
                          <p className="similar-post-area text-xs text-gray-600">Terület: {post.area} m²</p>
                        )}
                        <p className="similar-post-address text-xs text-gray-500">
                          {post.address?.city || ''}{post.address?.region ? `, ${post.address.region}` : ''}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* A meglévő SEO blokk (HomePageSEO) tartalma */}
            <HomePageSEO seoQuickPosts={seoQuickPosts} />

            {/* Belső linkek blokk */}
            <RelatedLinks 
              listingType="elado"
              type="lakas"
              city={null}
            />

          </div>
        </div>
      </div>
      
      {/* Footer */}
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