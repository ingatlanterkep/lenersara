/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000'}/api/:path*`,
      },
      // 🔥 JAVÍTVA: XML fájlok közvetlenül a backend API-ra
      {
        source: '/xml/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000'}/api/xml/:path*`,
      },
    ];
  },
  
  images: {
    domains: ['localhost', 'api.ingatlan-terkep.hu'],
  },
  
  transpilePackages: ['leaflet', 'react-leaflet'],
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;