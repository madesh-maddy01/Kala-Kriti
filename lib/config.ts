// ============================================
// SITE CONFIGURATION
// ✏️ EASY TO EDIT: Update your contact details here
// ============================================

export const siteConfig = {
  // Brand
  name: 'Kala Kriti',
  tagline: 'Divine Handmade Paintings',
  description:
    'Custom handmade devotional paintings of Hindu Gods & Goddesses. Crafted with devotion, detail, and timeless artistry. Pan India delivery.',

  // ✏️ CONTACT - Update these
  phone: '+91 98765 43210',
  phoneRaw: '919876543210',
  whatsapp: '919876543210',
  email: 'kalakriti@gmail.com',

  // ✏️ SOCIAL LINKS - Update these
  social: {
    instagram: 'https://instagram.com/kalakriti',
    facebook: 'https://facebook.com/kalakriti',
    youtube: '',
    twitter: '',
  },

  // ✏️ LOCATION
  location: {
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d77.5945!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },

  // WhatsApp message templates
  whatsappMessages: {
    general: 'Hello! I am interested in a custom painting from Kala Kriti. Can you help me?',
    order: (deity: string, size: string) =>
      `Hello! I would like to order a custom painting of ${deity} in ${size} size. Please share details.`,
    quote: 'Hello! I would like to get a quote for a custom painting. Please help me.',
  },

  // Business
  deliveryTime: '30–40 days',
  experience: '10+',
  paintingsDelivered: '500+',
  happyFamilies: '400+',
  customRequests: '200+',

  // SEO
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
    ],
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@kalakriti',
  },
}

// WhatsApp URL helper
export function getWhatsAppUrl(message?: string): string {
  const msg = message || siteConfig.whatsappMessages.general
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`
}

// Phone URL helper
export function getPhoneUrl(): string {
  return `tel:${siteConfig.phoneRaw}`
}
