/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimización de paquetes
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'recharts',
      '@headlessui/react',
      'date-fns',
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.occident.es',
      },
      {
        protocol: 'https',
        hostname: '**.sorianomediadores.es',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },

  // Headers de caché
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Poweredby header off
  poweredByHeader: false,

  reactStrictMode: false,
}

module.exports = nextConfig
