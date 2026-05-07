import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { paintings } from '@/data/paintings'
import { reviews } from '@/data/reviews'
import { faqs } from '@/data/faqs'

function SectionSkeleton() {
  return <div className="py-24 bg-ivory-50" aria-hidden="true" />
}

// Code-split all below-fold sections — each becomes its own JS chunk
const GallerySection  = dynamic(() => import('@/components/sections/GallerySection').then(m => ({ default: m.GallerySection })), { loading: SectionSkeleton })
const ProcessSection  = dynamic(() => import('@/components/sections/ProcessSection').then(m => ({ default: m.ProcessSection })), { loading: SectionSkeleton })
const WhyUsSection    = dynamic(() => import('@/components/sections/WhyUsSection').then(m => ({ default: m.WhyUsSection })), { loading: SectionSkeleton })
const AboutSection    = dynamic(() => import('@/components/sections/AboutSection').then(m => ({ default: m.AboutSection })), { loading: SectionSkeleton })
const ReviewsSection  = dynamic(() => import('@/components/sections/ReviewsSection').then(m => ({ default: m.ReviewsSection })), { loading: SectionSkeleton })
const PricingNote     = dynamic(() => import('@/components/sections/PricingNote').then(m => ({ default: m.PricingNote })), { loading: SectionSkeleton })
const FAQSection      = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })), { loading: SectionSkeleton })
const ContactSection  = dynamic(() => import('@/components/sections/ContactSection').then(m => ({ default: m.ContactSection })), { loading: SectionSkeleton })

export default function Home() {
  return (
    <>
      <HeroSection />
      <GallerySection paintings={paintings} />
      <ProcessSection />
      <WhyUsSection />
      <AboutSection />
      <ReviewsSection reviews={reviews} />
      <PricingNote />
      <FAQSection faqs={faqs} />
      <ContactSection />
    </>
  )
}
