/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode - segít hibákat találni
  reactStrictMode: true,
  
  // SEO barát URL-ek (trailing slash nélkül)
  trailingSlash: false,
  
  // Képek optimalizálása
  images: {
    domains: [], // Ha külső képeket használsz, ide add hozzá a domaineket
    formats: ['image/avif', 'image/webp'],
  },
  
  // CORS beállítások - ha API-t használnál később
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //       ],
  //     },
  //   ];
  // },
}

module.exports = nextConfig