/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Source images are pre-converted to WebP — disable server-side optimization
    // to avoid consuming Vercel's free-tier image optimization quota entirely.
    // WebP is already served directly from the CDN edge cache.
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Tree-shake large icon / animation packages — only the used exports are bundled
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.webp',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/main_logo.webp',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
