// app/page.tsx
import HomePageContent from '@/pages/HomePageContent';
import { Post } from '@/types/post';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

export const revalidate = 3600;

async function getHomepageData() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL?.replace(/\/$/, '') || 'http://localhost:5000';
  
  console.log('[Homepage] BaseURL:', baseUrl);
  
  try {
    // HASZNÁLD UGYANAZT A VÉGPONTOT, MINT A GYŰJTŐOLDALAKON!
    // A gyűjtőoldalakon ez működik: /api/posts/seo-quick-list/elado/lakas/budapest
    const res = await fetch(
      `${baseUrl}/api/posts/seo-quick-list/elado/lakas/budapest`,
      {
        next: { revalidate: 3600 },
        cache: 'force-cache',
      }
    );

    console.log('[Homepage] Status:', res.status);

    const json = await res.json();
    console.log('[Homepage] Success:', json.success, 'Items:', json.data?.length);

    // Ha sikerült, visszaadjuk az adatokat, különben üres tömb
    return { 
      seoQuickPosts: json.success && json.data ? json.data.slice(0, 20) : [] 
    };
  } catch (err: any) {
    console.error('[Homepage] Hiba:', err.message);
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
      
      {/* JSON-LD - Breadcrumb */}
      <BreadcrumbSchema items={[
        { name: 'Főoldal', item: 'https://ingatlan-terkep.hu/' }
      ]} />
      
      {/* JSON-LD - ItemList (hirdetések) */}
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <HomePageContent 
        listingType="elado" 
        type="lakas" 
        city={null} 
        viewModeDefault="map" 
        serverLocationContent={null}
        serverSeoQuickPosts={seoQuickPosts}
        hideFooter={false}
      />
    </>
  );
}