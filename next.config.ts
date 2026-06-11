/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000'}/api/:path*`,
      },
      // 🔥 XML útvonalak átirányítása a backendre vagy az API route-okra
      {
        source: '/xml/:path*',
        destination: '/api/xml/:path*', // Ezt fogjuk létrehozni
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