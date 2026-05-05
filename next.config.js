/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    // Tighter breakpoints matched to the actual gallery grid widths
    deviceSizes: [640, 828, 1080, 1280, 1600],
    imageSizes: [96, 256, 384, 512],
    // Allow concurrent image optimization jobs
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
