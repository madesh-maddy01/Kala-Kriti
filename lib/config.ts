export const siteConfig = {
  name: 'Kala Kriti',
  tagline: 'Divine Handmade Paintings',
  description:
    'Custom handmade devotional paintings of Hindu Gods & Goddesses, adorned with pure 24K gold plating. Crafted with devotion, detail, and timeless artistry. Pan India delivery.',

  phone: '+91 77609 61602',
  phoneRaw: '917760961602',
  whatsapp: '917760961602',
  email: 'kalakriti@gmail.com',

  social: {
    instagram: 'https://instagram.com/kalakriti',
    facebook: 'https://facebook.com/kalakriti',
    youtube: '',
    twitter: '',
  },

  whatsappMessages: {
    general: 'Hello! I am interested in a custom painting from Kala Kriti. Can you help me?',
    order: (deity: string, size: string) =>
      `Hello! I would like to order a custom painting of ${deity} in ${size} size. Please share details.`,
    quote: 'Hello! I would like to get a quote for a custom painting. Please help me.',
  },

  deliveryTime: '30–40 days',
  experience: '10+',
  paintingsDelivered: '500+',
  happyFamilies: '400+',
  customRequests: '200+',

  seo: {
    keywords: [
      'custom god paintings india',
      'hindu god paintings custom made',
      'devotional paintings india',
      'handmade krishna painting',
      'ganesha custom painting',
      'home temple paintings india',
      'custom deity paintings',
      'handmade devotional art',
      'gold plated devotional paintings',
      '24k gold painting india',
    ],
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@kalakriti',
  },
}

export function getWhatsAppUrl(message?: string): string {
  const msg = message || siteConfig.whatsappMessages.general
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`
}

export function getPhoneUrl(): string {
  return `tel:${siteConfig.phoneRaw}`
}
