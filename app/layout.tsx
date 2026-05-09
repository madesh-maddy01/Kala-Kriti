import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { siteConfig } from '@/lib/config'
import { LanguageProvider } from '@/lib/language-context'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { FloatButtons } from '@/components/shared/FloatButtons'

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
  preload: false,
})

const SITE_URL = 'https://www.mykalakriti.com'

const seoTitle = 'Kala Kriti — Custom Handmade Devotional Paintings | 24K Gold | India'
const seoDescription =
  'Kala Kriti (Kalakriti) — India\'s finest custom handmade devotional paintings of Hindu Gods & Goddesses, adorned with pure 24K gold plating. Lord Ganesha, Radha Krishna, Goddess Lakshmi, Lord Shiva & more. Order a personalised divine painting. Pan India delivery.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seoTitle,
    template: `%s | Kala Kriti`,
  },
  description: seoDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: 'Kala Kriti Studio', url: SITE_URL }],
  creator: 'Kala Kriti',
  publisher: 'Kala Kriti',
  category: 'art',
  classification: 'Devotional Art, Hindu Religious Paintings, Handmade Art India',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Kala Kriti',
    title: seoTitle,
    description: seoDescription,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'Kala Kriti — Handmade Divine Paintings with 24K Gold Plating',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
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
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#B8860B',
}

// JSON-LD Schema Markup — multiple schemas via @graph for richer SERP features
const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebSite schema — enables sitelinks searchbox in Google
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Kala Kriti',
      alternateName: ['Kalakriti', 'Kala Kriti Paintings', 'MyKalakriti', 'mykalakriti.com'],
      description: seoDescription,
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?s={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    // ArtGallery + LocalBusiness — shows business info in Google Knowledge Panel
    {
      '@type': ['ArtGallery', 'LocalBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: 'Kala Kriti',
      alternateName: ['Kalakriti', 'Kala Kriti Paintings', 'MyKalakriti'],
      description: seoDescription,
      url: SITE_URL,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      priceRange: '₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Bank Transfer',
      openingHours: 'Mo-Su 09:00-21:00',
      areaServed: { '@type': 'Country', name: 'India' },
      knowsAbout: [
        'Hindu Devotional Art',
        'Custom Handmade Paintings',
        '24K Gold Plating',
        'Lord Ganesha Paintings',
        'Radha Krishna Paintings',
        'Goddess Lakshmi Paintings',
        'Lord Shiva Paintings',
        'Devotional Wall Art',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Custom Devotional Paintings',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Lord Ganesha Painting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Radha Krishna Painting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Goddess Lakshmi Painting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Lord Shiva Painting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Lord Venkateshwara Painting' } },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: siteConfig.happyFamilies.replace('+', ''),
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
      ].filter(Boolean),
    },
    // Organization — helps Google associate brand identity
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Kala Kriti',
      alternateName: 'Kalakriti',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/main_logo.webp`,
        width: 160,
        height: 52,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
      ].filter(Boolean),
    },
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
        {/* Preload LCP image — hero visible immediately above fold */}
        <link rel="preload" as="image" href="/images/hero-image.webp" fetchPriority="high" />
        {/* Preload logo for instant navbar render */}
        <link rel="preload" as="image" href="/main_logo.webp" />
      </head>
      <body className="font-body antialiased bg-ivory-50 overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatButtons />
        </LanguageProvider>
      </body>
    </html>
  )
}
