# Kala Kriti — Premium Devotional Paintings Website

A world-class, production-ready Next.js website for **Kala Kriti**, a custom handmade devotional paintings business. Built for Vercel Free Tier with maximum performance and SEO.

---

## ✨ Features

- **Cinematic Hero Section** — Parallax background, floating particles, trust badges
- **Premium Gallery** — Masonry grid with category filter, fullscreen lightbox with deity symbolism
- **Animated Process Timeline** — 7-step customer journey with premium card design
- **About Section** — Artisan story with live animated counters
- **Reviews Slider** — Full-featured testimonial display with mini grid
- **FAQ Accordion** — Animated, smooth expand/collapse
- **Contact Section** — WhatsApp form submission, embedded map, all CTAs
- **Floating WhatsApp Button** — With pulse animation
- **Sticky Premium Navbar** — Transparent over hero, blurred on scroll
- **SEO Complete** — Schema markup, Open Graph, sitemap, robots.txt
- **100% Static Generation** — Ultra fast, Vercel-optimized

---

## 🗂️ File Structure

```
kala-kriti/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, SEO
│   ├── page.tsx            # Homepage (all sections)
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── sections/           # All page sections
│   │   ├── HeroSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── PricingNote.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   ├── shared/             # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloat.tsx
│   └── ui/                 # Reusable UI
│       └── SectionHeader.tsx
├── data/                   # ✏️ EDITABLE content files
│   ├── paintings.ts        # Gallery paintings data
│   ├── reviews.ts          # Customer testimonials
│   └── faqs.ts             # FAQ questions and answers
├── lib/
│   ├── config.ts           # ✏️ MAIN CONFIG — phone, WhatsApp, social
│   └── utils.ts            # Utility functions
├── styles/
│   └── globals.css         # Global CSS, custom properties
├── public/
│   └── images/             # 📁 Place your painting images here
└── tailwind.config.ts      # Design system tokens
```

---

## 🚀 Setup Instructions

### 1. Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### 2. Install dependencies
```bash
cd kala-kriti
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

---

## ✏️ How to Update Content

### Update Contact Information
Edit `lib/config.ts`:
```ts
phone: '+91 98765 43210',        // Your phone number
whatsapp: '919876543210',        // Country code + number, no spaces/+
email: 'kalakriti@gmail.com',
social: {
  instagram: 'https://instagram.com/yourhandle',
  facebook: 'https://facebook.com/yourpage',
}
```

### Add/Edit Paintings
Edit `data/paintings.ts`. Each painting entry:
```ts
{
  id: 'p1',                     // Unique ID
  name: 'Ganesha — The Auspicious',
  deity: 'Lord Ganesha',
  category: 'Ganesha',           // For gallery filter
  image: '/images/paintings/ganesha-1.jpg',  // Local image path
  aspectRatio: 'portrait',       // portrait | landscape | square
  sizes: ['12×16"', '18×24"'],
  frameOptions: ['Unframed', 'Teak Wood Frame'],
  deliveryDays: '30–40 days',
  medium: 'Acrylic on Canvas',
  description: '...',
  deitySymbolism: '...',
  featured: true,                // Show in featured section
  tags: ['ganesha', 'popular'],
}
```

### Add/Edit Customer Reviews
Edit `data/reviews.ts`. Each review entry:
```ts
{
  id: 'r1',
  name: 'Customer Name',
  city: 'Bangalore',
  state: 'Karnataka',
  rating: 5,
  review: 'The review text here...',
  deity: 'Lord Ganesha',
  paintingImage: '/images/reviews/customer-painting.jpg',
  date: 'November 2024',
  verified: true,
}
```

### Add/Edit FAQs
Edit `data/faqs.ts`. Add new FAQ objects to the array.

### Replace Painting Images
1. Add your images to `/public/images/paintings/`
2. Update the `image` field in `data/paintings.ts` to point to `/images/paintings/your-file.jpg`
3. Recommended size: 800×1000px for portraits, 1000×750px for landscapes
4. Use WebP format for best performance

---

## 🌐 Deploy to Vercel (Free Tier)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Kala Kriti website"
git remote add origin https://github.com/yourusername/kala-kriti.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Build Command: `npm run build` (default)
6. Output Directory: `.next` (default)
7. Click **"Deploy"**

### Step 3: Your site is live!
Vercel gives you a free URL: `https://kala-kriti.vercel.app`

---

## 🔗 Add Custom Domain

### Option A: Through Vercel Dashboard
1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `kalakriti.in`)
4. Follow DNS configuration instructions

### For GoDaddy / BigRock / Hostinger
Add these DNS records at your registrar:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

---

## 🔧 Environment Variables (Optional)

For advanced features, create `.env.local`:
```
NEXT_PUBLIC_WHATSAPP=919876543210
NEXT_PUBLIC_PHONE=+919876543210
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
```

---

## 🖼️ Image Optimization Tips

1. **Use WebP format** — 40% smaller than JPEG
2. **Portrait paintings**: 800×1067px (3:4 ratio)
3. **Landscape paintings**: 1067×800px (4:3 ratio)
4. **Gallery images**: Max 500KB per image
5. **Hero background**: 1920×1080px, max 300KB

Compress images free at: [squoosh.app](https://squoosh.app)

---

## 🎨 Customize Colors

Edit `tailwind.config.ts` to change the color palette:
```ts
saffron: { DEFAULT: '#FF9933' },      // Main accent
maroon: { DEFAULT: '#8B0000' },       // Headings accent
gold: { DEFAULT: '#B8860B' },         // Borders, highlights
ivory: { DEFAULT: '#F8F3E8' },        // Background
```

---

## 📊 SEO Setup

1. Update `lib/config.ts` with your real domain
2. Replace `metadataBase` in `app/layout.tsx` with your domain
3. Add Google Search Console verification code
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## 📱 WhatsApp Business Setup

1. Set up WhatsApp Business account with your business number
2. Set a business name, description, and profile photo
3. Add your website URL to business profile
4. Enable Quick Replies for common inquiries

---

## 🛡️ Maintenance

### Monthly tasks:
- Add new paintings to `data/paintings.ts`
- Add new reviews to `data/reviews.ts`
- Check contact information is correct

### No backend needed:
- No database
- No server
- No maintenance overhead
- Auto-scaled by Vercel CDN

---

## 📞 Support

For technical assistance with this website, contact the developer.

---

*Built with ❤️ for Kala Kriti — Sacred Art for Sacred Spaces*
