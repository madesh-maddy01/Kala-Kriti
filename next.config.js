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
}

module.exports = nextConfig
