// types/post.ts
export interface Post {
  _id: string;
  title?: string;
  description?: string;
  price?: number;
  rental_price?: number;
  area?: number;
  rooms?: number;
  listing_type?: string;
  type?: string;
  created_at?: string;
  images?: Array<{ url: string }>;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    zip?: string;
  };
  geolocation?: {
    lat: number;
    lon: number;
  };
}