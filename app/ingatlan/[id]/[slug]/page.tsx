// app/ingatlan/[id]/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getPostDetails } from '@/services/apiService';
import JsonLd from '@/components/JsonLd'; // ← ÚJ KOMPONENS

const PostDetailsPage = dynamic(
  () => import('@/pages/PostDetailsPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Hirdetés betöltése...</div>
      </div>
    )
  }
);

export default function PropertyDetails({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiesDecided, setCookiesDecided] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [postData, setPostData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const hasConsent = document.cookie.includes('ingatlanTerkepCookieConsent=true');
    setCookiesAccepted(hasConsent);
    setCookiesDecided(!!document.cookie.includes('ingatlanTerkepCookieConsent'));
    
    params.then((p) => {
      setPostId(p.id);
      // Betöltjük az adatokat a JSON-LD-hez
      fetchPostData(p.id);
    });
  }, [params]);

  const fetchPostData = async (id: string) => {
    try {
      const response = await getPostDetails(id);
      setPostData(response.data);
    } catch (error) {
      console.error('[PropertyDetails] Hiba az adatok betöltésekor:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLeadEvent = (type: string, postId: string) => {
    if (cookiesAccepted && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        lead_type: type,
        post_id: postId,
        value: 100,
        currency: 'HUF'
      });
    }
  };

  // 🔥 JSON-LD generálása
  const generatePropertyJsonLd = (post: any) => {
    if (!post) return null;

    const baseUrl = 'https://ingatlan-terkep.hu';
    const listingType = post.listing_type || 'eladó';
    const price = listingType === 'eladó' ? post.price : post.rental_price;
    const priceUnit = listingType === 'eladó' ? 'HUF' : 'HUF'; // vagy EUR ha van
    const priceValue = price ? (listingType === 'eladó' ? price * 1000000 : price * 1000) : 0;

    // Cím összeállítása
    const address: any = {
      '@type': 'PostalAddress',
      addressCountry: 'HU',
    };
    if (post.address?.city) address.addressLocality = post.address.city;
    if (post.address?.region) address.addressRegion = post.address.region;
    if (post.address?.street) address.streetAddress = post.address.street;
    if (post.address?.zip) address.postalCode = post.address.zip;

    // Képek
    const images = post.images?.filter((img: any) => img?.url)
      .map((img: any) => {
        const url = img.url.startsWith('http') ? img.url : `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${img.url}`;
        return url;
      }) || [];

    // Alap Product schema
    const productSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${baseUrl}/ingatlan/${post._id}#product`,
      name: post.title || 'Ingatlan hirdetés',
      description: post.description?.substring(0, 500) || 'Ingatlan eladásra vagy kiadásra',
      image: images.length > 0 ? images[0] : undefined,
      offers: {
        '@type': 'Offer',
        price: priceValue,
        priceCurrency: 'HUF',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/ingatlan/${post._id}/${generateSlug(post.title)}`,
        validFrom: post.created_at || new Date().toISOString(),
      },
      address: address,
    };

    // Geolokáció
    if (post.geolocation?.lat && post.geolocation?.lon) {
      productSchema.geo = {
        '@type': 'GeoCoordinates',
        latitude: post.geolocation.lat,
        longitude: post.geolocation.lon,
      };
    }

    // Alapterület
    if (post.area && post.area > 0) {
      productSchema.floorSize = {
        '@type': 'QuantitativeValue',
        value: post.area,
        unitCode: 'MTK', // négyzetméter
      };
    }

    // Szobák száma
    if (post.rooms && post.rooms > 0) {
      productSchema.numberOfRooms = post.rooms;
    }

    // Építés éve
    if (post.year_built && post.year_built > 0) {
      productSchema.yearBuilt = post.year_built;
    }

    // Emelet
    if (post.total_floors && post.total_floors !== '0') {
      productSchema.floorLevel = parseInt(post.total_floors);
    }

    // Épület emeletek száma
    if (post.floor_count && post.floor_count > 0) {
      productSchema.numberOfFloors = post.floor_count;
    }

    // Tulajdonságok (PropertyValue)
    const properties: any[] = [];
    if (post.type) properties.push({ '@type': 'PropertyValue', name: 'Ingatlan típus', value: post.type });
    if (post.condition) properties.push({ '@type': 'PropertyValue', name: 'Állapot', value: post.condition });
    if (post.heating_type) properties.push({ '@type': 'PropertyValue', name: 'Fűtés típusa', value: post.heating_type });
    if (post.energy_class) properties.push({ '@type': 'PropertyValue', name: 'Energiaosztály', value: post.energy_class });
    if (post.parking) properties.push({ '@type': 'PropertyValue', name: 'Parkolás', value: post.parking });
    if (post.view) properties.push({ '@type': 'PropertyValue', name: 'Kilátás', value: post.view });
    if (post.orientation) properties.push({ '@type': 'PropertyValue', name: 'Tájolás', value: post.orientation });

    if (properties.length > 0) {
      productSchema.additionalProperty = properties;
    }

    // Készítsünk egy Product-ot és egy Place-t is (ha van geolokáció)
    const schemas = [productSchema];

    // Place schema (ingatlan helyszíne)
    if (post.geolocation?.lat && post.geolocation?.lon) {
      const placeSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        '@id': `${baseUrl}/ingatlan/${post._id}#place`,
        name: post.title || 'Ingatlan helyszíne',
        address: address,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: post.geolocation.lat,
          longitude: post.geolocation.lon,
        },
      };
      schemas.push(placeSchema);
    }

    // WebPage schema (az oldal maga)
    const webPageSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${baseUrl}/ingatlan/${post._id}/${generateSlug(post.title)}#webpage`,
      name: post.title || 'Ingatlan részletek',
      description: post.description?.substring(0, 300) || 'Ingatlan hirdetés részletei',
      url: `${baseUrl}/ingatlan/${post._id}/${generateSlug(post.title)}`,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
      },
      about: productSchema,
      mainEntity: productSchema,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Főoldal',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.listing_type === 'eladó' ? 'Eladó ingatlanok' : 'Kiadó ingatlanok',
            item: `${baseUrl}/${post.listing_type}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.type || 'Ingatlan',
            item: `${baseUrl}/${post.listing_type}/${post.type}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: post.title || 'Részletek',
          },
        ],
      },
    };
    schemas.push(webPageSchema);

    return schemas;
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

  // 🔥 JSON-LD betöltése, amint megvannak az adatok
  const jsonLdData = postData ? generatePropertyJsonLd(postData) : null;

  if (!postId || isLoading) return <div>Betöltés...</div>;

  return (
    <>
      {/* JSON-LD struktúrált adatok */}
      {jsonLdData && jsonLdData.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}

      <PostDetailsPage 
        cookiesAccepted={cookiesAccepted} 
        cookiesDecided={cookiesDecided} 
        onLeadEvent={handleLeadEvent} 
      />
    </>
  );
}