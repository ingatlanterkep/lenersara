// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

    // Teljes statikus generálás kikapcsolása build közben
  experimental: {
    forceSwcTransforms: true,
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
  
  images: {
    domains: ['localhost', 'api.ingatlan-terkep.hu'],
  },
  
  transpilePackages: ['leaflet', 'react-leaflet'],
  
  // 🔴 ISR beállítások
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;