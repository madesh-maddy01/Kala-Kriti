'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Review } from '@/data/reviews'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'

interface ReviewsSectionProps {
  reviews: Review[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length)
  const next = () => setActive((a) => (a + 1) % reviews.length)

  return (
    <section id="reviews" className="py-16 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F8FB 0%, #F0F0F8 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-10">
        <SectionHeader
          label={t('reviews_label')}
          title={t('reviews_title')}
          subtitle={t('reviews_subtitle')}
        />

        {/* Featured Review — Large */}
        <div className="mb-12">
          {/* initial={false} prevents the entrance animation from firing on page load */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid md:grid-cols-5 gap-0 rounded-sm overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(79,70,229,0.08)',
                border: '1px solid rgba(199,210,254,0.25)',
              }}
            >
              {/* Painting image */}
              <div className="md:col-span-2 relative min-h-[200px] sm:min-h-[260px] md:min-h-0">
                {reviews[active].paintingImage ? (
                  <Image
                    src={reviews[active].paintingImage!}
                    alt={`${reviews[active].deity} painting`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={80}
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)',
                  }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <span className="font-heading italic text-white text-6xl">ॐ</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(10,5,2,0.2), transparent)' }} />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-body font-medium tracking-wider uppercase rounded-sm"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#D4AF37', border: '1px solid rgba(184,134,11,0.3)' }}>
                    {reviews[active].deity}
                  </span>
                </div>
              </div>

              {/* Review content */}
              <div className="md:col-span-3 bg-white p-5 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`featured-star-${i}`}
                        size={16}
                        className={i < reviews[active].rating ? 'text-saffron fill-saffron' : 'text-sandstone'}
                        strokeWidth={1}
                      />
                    ))}
                    {reviews[active].verified && (
                      <span className="ml-3 text-[10px] font-body text-green-600 tracking-wider">✓ {t('reviews_verified')}</span>
                    )}
                  </div>

                  {/* Quote icon */}
                  <Quote size={36} className="text-gold/20 mb-4" strokeWidth={1} />

                  <blockquote className="font-heading italic text-lg sm:text-xl md:text-2xl text-charcoal-dark/80 leading-relaxed mb-6"
                    style={{ lineHeight: 1.45 }}>
                    "{reviews[active].review}"
                  </blockquote>
                </div>

                <div>
                  <div className="h-px w-full mb-5"
                    style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.3), transparent)' }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body font-medium text-charcoal-dark">{reviews[active].name}</p>
                      <p className="font-body text-sm text-charcoal-light/60">
                        {reviews[active].city}, {reviews[active].state} · {reviews[active].date}
                      </p>
                    </div>
                    <p className="font-body text-xs text-saffron tracking-wider uppercase hidden sm:block">
                      {reviews[active].deity}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev}
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-sandstone hover:border-gold transition-colors text-charcoal-light hover:text-gold">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((review, i) => (
                <button
                  key={review.id}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    background: i === active ? 'var(--color-gold)' : 'var(--color-sandstone)',
                  }}
                />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-sandstone hover:border-gold transition-colors text-charcoal-light hover:text-gold">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Grid of mini reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-premium p-6 cursor-pointer"
              onClick={() => setActive(reviews.indexOf(review))}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={`${review.id}-star-${i}`} size={13} className="text-saffron fill-saffron" strokeWidth={1} />
                ))}
              </div>
              <p className="font-body text-sm text-charcoal-light/70 leading-relaxed line-clamp-3 mb-4">
                "{review.review}"
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-sandstone/30">
                <div>
                  <p className="font-body font-medium text-sm text-charcoal-dark">{review.name}</p>
                  <p className="font-body text-xs text-charcoal-light/50">{review.city}</p>
                </div>
                <span className="text-[10px] font-body text-saffron/70 tracking-wide">{review.deity}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
