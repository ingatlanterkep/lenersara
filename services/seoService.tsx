// services/seoService.ts
export interface LocationContent {
  seo: {
    title?: string;
    metaDescription?: string;
    h1?: string;
    canonicalUrl?: string;
  };
  stats?: {
    medianPricePerSqm?: number;
    medianPrice?: number;
    listingCount?: number;
  };
  content?: {
    mainContent?: string;
    introText?: string;
  };
  displayName?: string;
  propertyType?: string;
}

export async function getLocationContent(
  listingType: string, 
  propertyType: string, 
  locationSlug: string
): Promise<LocationContent | null> {
  try {
    // Next.js SSR-ben is működik, mert a backend elérhető
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
    const response = await fetch(
      `${baseUrl}/api/location-content/${listingType}/${propertyType}/${locationSlug}`,
      { 
        next: { revalidate: 3600 }, // ISR - 1 óránként újravalidál
        headers: { 'Cache-Control': 'no-cache' }
      }
    );
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error('[getLocationContent] Hiba:', error);
    return null;
  }
}