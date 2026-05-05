import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { siteConfig } from '@/lib/config'
import { LanguageProvider } from '@/lib/language-context'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kalakriti.in'),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: 'Kala Kriti Studio' }],
  creator: 'Kala Kriti',
  publisher: 'Kala Kriti',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kalakriti.in',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'Kala Kriti — Handmade Divine Paintings',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.seo.ogImage],
    creator: siteConfig.seo.twitterHandle,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'your-google-verification-code',
  },

  alternates: {
    canonical: 'https://kalakriti.in',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#B8860B',
}

// JSON-LD Schema Markup
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  name: 'Kala Kriti',
  description: siteConfig.description,
  url: 'https://kalakriti.in',
  telephone: siteConfig.phone,
  email: siteConfig.email,
  areaServed: 'India',
  priceRange: '₹₹₹',
  servesCuisine: 'Hindu Devotional Art',
  openingHours: 'Mo-Su 09:00-21:00',
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased bg-ivory-50 overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  )
}
