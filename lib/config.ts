export const siteConfig = {
  name: 'Kala Kriti',
  tagline: 'Divine Handmade Paintings',
  description:
    'Custom handmade devotional paintings of Hindu Gods & Goddesses, adorned with pure 24K gold plating. Crafted with devotion, detail, and timeless artistry. Pan India delivery.',

  phone: '+91 77609 61602',
  phoneRaw: '917760961602',
  whatsapp: '917760961602',
  email: 'kalakriti.official.in@gmail.com',

  social: {
    instagram: 'https://www.instagram.com/kalakriti_in?igsh=dHRqMzF3MzlxbHd1&utm_source=qr',
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
      // Brand — most critical for "kalakriti" searches
      'kalakriti',
      'kala kriti',
      'kala kriti paintings',
      'kalakriti paintings',
      'mykalakriti',
      'kalakriti devotional art',
      'kalakriti india',
      // Product
      'custom god paintings india',
      'hindu god paintings custom made',
      'devotional paintings india',
      'handmade krishna painting',
      'radha krishna custom painting',
      'ganesha custom painting',
      'lord ganesha painting',
      'goddess lakshmi painting custom',
      'lord venkateshwara painting',
      'lord shiva painting handmade',
      'goddess saraswati painting',
      'ram darbar painting custom',
      'home temple paintings india',
      'custom deity paintings',
      'handmade devotional art',
      'gold plated devotional paintings',
      '24k gold painting india',
      'pure gold leaf painting india',
      'custom religious paintings india',
      'handmade puja room paintings',
      'pooja room wall art india',
      'buy devotional paintings online india',
      'handmade paintings of hindu gods',
      'traditional devotional art india',
      'personalized deity paintings india',
      'custom made god paintings',
      'divine art india',
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
