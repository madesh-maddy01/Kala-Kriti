'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Review } from '@/data/reviews'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface ReviewsSectionProps {
  reviews: Review[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length)
  const next = () => setActive((a) => (a + 1) % reviews.length)

  return (
    <section id="reviews" className="py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF6EE 0%, #F8F3E8 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          label="Client Stories"
          title="What Our Families Say"
          subtitle="Hundreds of homes across India have been blessed with Kala Kriti paintings. Here are a few stories."
        />

        {/* Featured Review — Large */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-5 gap-0 rounded-sm overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(45,45,45,0.1)',
                border: '1px solid rgba(212,196,160,0.3)',
              }}
            >
              {/* Painting image */}
              {reviews[active].paintingImage && (
                <div className="md:col-span-2 relative min-h-[280px] md:min-h-0">
                  <Image
                    src={reviews[active].paintingImage!}
                    alt={`${reviews[active].deity} painting`}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(10,5,2,0.2), transparent)' }} />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-1 text-[10px] font-body font-medium tracking-wider uppercase rounded-sm"
                      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#D4AF37', border: '1px solid rgba(184,134,11,0.3)' }}>
                      {reviews[active].deity}
                    </span>
                  </div>
                </div>
              )}

              {/* Review content */}
              <div className="md:col-span-3 bg-white p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < reviews[active].rating ? 'text-saffron fill-saffron' : 'text-sandstone'}
                        strokeWidth={1}
                      />
                    ))}
                    {reviews[active].verified && (
                      <span className="ml-3 text-[10px] font-body text-green-600 tracking-wider">✓ Verified</span>
                    )}
                  </div>

                  {/* Quote icon */}
                  <Quote size={36} className="text-gold/20 mb-4" strokeWidth={1} />

                  <blockquote className="font-heading italic text-xl md:text-2xl text-charcoal-dark/80 leading-relaxed mb-6"
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
              {reviews.map((_, i) => (
                <button
                  key={i}
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
                  <Star key={i} size={13} className="text-saffron fill-saffron" strokeWidth={1} />
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
