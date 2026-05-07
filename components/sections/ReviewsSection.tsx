'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, BadgeCheck } from 'lucide-react'
import type { Review } from '@/data/reviews'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'

interface ReviewsSectionProps {
  reviews: Review[]
}

const AVATAR_GRADIENTS = [
  { from: '#1E1B4B', to: '#4F46E5' },
  { from: '#78350F', to: '#D97706' },
  { from: '#1E3A5F', to: '#2563EB' },
  { from: '#14532D', to: '#16A34A' },
  { from: '#4C0519', to: '#BE123C' },
  { from: '#3B1E6B', to: '#7C3AED' },
]

function ReviewerAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
  const { from, to } = AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length]
  const dim = size === 'sm' ? 32 : size === 'lg' ? 48 : 40
  const fontSize = size === 'sm' ? '11px' : size === 'lg' ? '15px' : '13px'
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-body font-bold text-white"
      style={{
        width: dim,
        height: dim,
        fontSize,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: `0 2px 10px ${to}50`,
      }}
    >
      {initials}
    </div>
  )
}

// Proper stagger pattern — no per-element whileInView (eliminates blink)
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const isGridInView = useInView(gridRef, { once: true, margin: '-60px 0px' })

  const prev = () => setActive(a => (a - 1 + reviews.length) % reviews.length)
  const next = () => setActive(a => (a + 1) % reviews.length)

  return (
    <section id="reviews" className="py-16 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F8FB 0%, #F0F0F8 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-10">
        <SectionHeader
          label={t('reviews_label')}
          title={t('reviews_title')}
          subtitle={t('reviews_subtitle')}
        />

        {/* ── Featured Carousel ── */}
        <div className="mb-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 48, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -48, scale: 0.99 }}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid md:grid-cols-5 gap-0 rounded-sm overflow-hidden"
              style={{
                boxShadow: '0 24px 64px rgba(79,70,229,0.09), 0 4px 16px rgba(0,0,0,0.05)',
                border: '1px solid rgba(199,210,254,0.3)',
              }}
            >
              {/* Left: Image / Decorative Panel */}
              <div className="md:col-span-2 relative min-h-[220px] sm:min-h-[280px] md:min-h-0">
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
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-28 h-28">
                        <div className="absolute inset-0 rounded-full"
                          style={{ border: '1px solid rgba(212,175,55,0.2)' }} />
                        <div className="absolute inset-5 rounded-full"
                          style={{ border: '1px solid rgba(212,175,55,0.12)' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-heading italic text-white/18 text-5xl select-none">ॐ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(10,5,2,0.1) 0%, rgba(10,5,2,0.48) 100%)' }} />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-body font-semibold tracking-[0.2em] uppercase rounded-sm"
                    style={{
                      background: 'rgba(0,0,0,0.65)',
                      backdropFilter: 'blur(8px)',
                      color: '#D4AF37',
                      border: '1px solid rgba(184,134,11,0.35)',
                    }}>
                    {reviews[active].deity}
                  </span>
                </div>
              </div>

              {/* Right: Review Content */}
              <div className="md:col-span-3 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={`star-${active}-${i}`}
                        initial={{ opacity: 0, scale: 0, rotate: -15 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.04 + i * 0.07, duration: 0.32, ease: 'backOut' }}
                      >
                        <Star
                          size={15}
                          className={i < reviews[active].rating ? 'text-saffron fill-saffron' : 'text-sandstone'}
                          strokeWidth={1}
                        />
                      </motion.div>
                    ))}
                    {reviews[active].verified && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45, duration: 0.3 }}
                        className="ml-2 flex items-center gap-1.5 text-[10px] font-body text-emerald-600 tracking-wider font-medium"
                      >
                        <BadgeCheck size={13} strokeWidth={2} />
                        {t('reviews_verified')}
                      </motion.span>
                    )}
                  </div>

                  <Quote
                    size={44}
                    className="mb-3"
                    style={{ color: 'rgba(184,134,11,0.1)' }}
                    strokeWidth={0.8}
                  />

                  <blockquote
                    className="font-heading italic text-lg sm:text-xl md:text-[1.32rem] text-charcoal-dark/80 mb-6"
                    style={{ lineHeight: 1.58 }}
                  >
                    "{reviews[active].review}"
                  </blockquote>
                </div>

                <div>
                  <div className="h-px w-full mb-5"
                    style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.3), rgba(199,210,254,0.3), transparent)' }} />
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ReviewerAvatar name={reviews[active].name} size="lg" />
                      <div>
                        <p className="font-body font-semibold text-charcoal-dark">{reviews[active].name}</p>
                        <p className="font-body text-xs text-charcoal-light/55 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} strokeWidth={1.5} className="shrink-0" />
                          {reviews[active].city}, {reviews[active].state} · {reviews[active].date}
                        </p>
                      </div>
                    </div>
                    <p className="font-body text-[11px] text-saffron tracking-wider uppercase hidden sm:block shrink-0">
                      {reviews[active].deity}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-sandstone hover:border-gold hover:bg-gold/5 transition-all duration-300 text-charcoal-light hover:text-gold"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="rounded-full"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    background: i === active ? 'var(--color-gold)' : 'var(--color-sandstone)',
                    transition: 'width 0.35s ease, background 0.2s ease',
                  }}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-sm flex items-center justify-center border border-sandstone hover:border-gold hover:bg-gold/5 transition-all duration-300 text-charcoal-light hover:text-gold"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* ── Mini Review Grid — stagger via container variants, no blink ── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviews.slice(0, 6).map((review) => {
            const idx = reviews.indexOf(review)
            return (
              <motion.div
                key={review.id}
                variants={cardVariants}
                className="cursor-pointer h-full"
                onClick={() => setActive(idx)}
              >
                <MiniCard review={review} isActive={idx === active} t={t} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function MiniCard({
  review,
  isActive,
  t,
}: {
  review: Review
  isActive: boolean
  t: (k: string) => string
}) {
  return (
    <motion.div
      className="relative h-full p-6 rounded-sm overflow-hidden"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(79,70,229,0.05) 0%, rgba(184,134,11,0.04) 100%)'
          : 'white',
        border: `1px solid ${isActive ? 'rgba(184,134,11,0.32)' : 'rgba(199,210,254,0.5)'}`,
        boxShadow: isActive
          ? '0 8px 32px rgba(79,70,229,0.1), 0 0 0 1px rgba(184,134,11,0.12)'
          : '0 4px 24px rgba(79,70,229,0.06), 0 1px 4px rgba(0,0,0,0.03)',
      }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 48px rgba(79,70,229,0.11)',
        borderColor: 'rgba(184,134,11,0.28)',
      }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Decorative background quote */}
      <div className="absolute -top-3 -right-3 opacity-[0.05] pointer-events-none select-none">
        <Quote size={76} className="text-maroon" strokeWidth={0.7} />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={12} className="text-saffron fill-saffron" strokeWidth={1} />
        ))}
      </div>

      {/* Review text */}
      <p className="font-body text-sm text-charcoal-light/72 leading-relaxed line-clamp-3 mb-5 relative z-10">
        "{review.review}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5"
        style={{ borderTop: '1px solid rgba(199,210,254,0.35)' }}>
        <div className="flex items-center gap-2.5">
          <ReviewerAvatar name={review.name} size="sm" />
          <div>
            <p className="font-body font-semibold text-sm text-charcoal-dark leading-tight">
              {review.name}
            </p>
            <p className="font-body text-[11px] text-charcoal-light/50 mt-0.5">{review.city}</p>
          </div>
        </div>
        <span className="text-[10px] font-body text-saffron/70 tracking-wide hidden sm:block shrink-0 ml-2">
          {review.deity}
        </span>
      </div>
    </motion.div>
  )
}
