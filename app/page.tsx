import { HeroSection } from '@/components/sections/HeroSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { PricingNote } from '@/components/sections/PricingNote'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { paintings } from '@/data/paintings'
import { reviews } from '@/data/reviews'
import { faqs } from '@/data/faqs'

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
