/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
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
  
  // 🔥 ISR és SSG beállítások
  staticPageGenerationTimeout: 120, // 2 perc timeout nagyobb build-eknél
  
  // Opcionális: készíts statikus exportot (ha teljesen statikus akarsz)
  // output: 'export', // Csak akkor, ha tényleg teljesen statikus kell
  
  // Traffic cop kikapcsolása (ha szükséges)
  // trailingSlash: false,
};

module.exports = nextConfig;