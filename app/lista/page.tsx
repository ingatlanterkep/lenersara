// app/lista/page.tsx
import HomePageContent from '@/pages/HomePageContent';
import { Post } from '@/types/post';

export const revalidate = 3600;

async function getListPageData() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
  
  try {
    const seoResponse = await fetch(
      `${baseUrl}/api/posts/seo-quick-list`,
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
      const fallbackResponse = await fetch(
        `${baseUrl}/api/posts/seo-quick-list/elado/lakas/budapest`,
        { next: { revalidate: 3600 } }
      );
      const fallbackJson = await fallbackResponse.json();
      seoData = fallbackJson.success ? fallbackJson.data : [];
    }
    
    return { seoQuickPosts: seoData.slice(0, 12) };
  } catch (error) {
    console.error('[ListPage] Hiba:', error);
    return { seoQuickPosts: [] };
  }
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

function getFullImageUrl(imagePath: string): string {
  if (!imagePath || typeof imagePath !== 'string') return '/placeholder.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
  return `${baseUrl}${imagePath}`;
}

function generateListPageJsonLd(seoQuickPosts: Post[]) {
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
        "@id": "https://ingatlan-terkep.hu/lista#property-list",
        "name": "Friss ingatlanhirdetések - Listanézet",
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

export default async function ListPage() {
  const { seoQuickPosts } = await getListPageData();
  const { organizationJsonLd, websiteJsonLd, itemListJsonLd } = generateListPageJsonLd(seoQuickPosts);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      {/* HomePageContent - CSAK EZ, NINCS DUPLA SEO! */}
      <HomePageContent 
        listingType="elado"
        type="lakas"
        city={null}
        viewModeDefault="list"
        serverLocationContent={null}
        serverSeoQuickPosts={seoQuickPosts}
        hideFooter={false}  // ← A footer-t a HomePageContent kezeli
      />
    </>
  );
}