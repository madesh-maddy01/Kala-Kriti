'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MessageCircle, Phone, ChevronDown, Sparkles, Package, Crown, Gem } from 'lucide-react'
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'

// Deterministic values — avoids server/client Math.random() hydration mismatch
const PARTICLES = [
  { id: 0, x: 8,  y: 15, size: 3,   duration: 8,    delay: 0,   opacity: 0.40 },
  { id: 1, x: 23, y: 45, size: 4,   duration: 10,   delay: 1.5, opacity: 0.50 },
  { id: 2, x: 45, y: 20, size: 2.5, duration: 9,    delay: 3,   opacity: 0.35 },
  { id: 3, x: 67, y: 70, size: 5,   duration: 11,   delay: 0.5, opacity: 0.55 },
  { id: 4, x: 82, y: 35, size: 3.5, duration: 7.5,  delay: 2.5, opacity: 0.45 },
  { id: 5, x: 15, y: 80, size: 4.5, duration: 12,   delay: 4,   opacity: 0.50 },
  { id: 6, x: 55, y: 55, size: 3,   duration: 8.5,  delay: 1,   opacity: 0.40 },
  { id: 7, x: 75, y: 10, size: 4,   duration: 10.5, delay: 3.5, opacity: 0.45 },
  { id: 8, x: 35, y: 65, size: 2.5, duration: 9.5,  delay: 2,   opacity: 0.35 },
  { id: 9, x: 90, y: 40, size: 5,   duration: 11.5, delay: 4.5, opacity: 0.55 },
]

export function HeroSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const { scrollY } = useScroll()
  const parallaxDisabled = prefersReducedMotion || isMobile
  const y = useTransform(scrollY, [0, 600], [0, parallaxDisabled ? 0 : 100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, parallaxDisabled ? 1 : 1.06])

  const trustBadges = [
    { icon: Sparkles, labelKey: 'hero_badge_handmade', sublabelKey: 'hero_badge_handmade_sub' },
    { icon: Package,  labelKey: 'hero_badge_delivery', sublabelKey: 'hero_badge_delivery_sub' },
    { icon: Crown,    labelKey: 'hero_badge_gold',      sublabelKey: 'hero_badge_gold_sub' },
    { icon: Gem,      labelKey: 'hero_badge_sizes',     sublabelKey: 'hero_badge_sizes_sub' },
  ]

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0 hero-parallax" style={{ y, scale }}>
        <Image
          src="/images/hero-image.webp"
          alt="Radha Krishna — Kala Kriti"
          fill
          priority
          quality={85}
          className="object-cover object-top"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(5,2,1,0.38) 0%, rgba(5,2,1,0.55) 45%, rgba(5,2,1,0.82) 100%)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,2,1,0.45) 100%)'
      }} />

      {/* Gold shimmer rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[70%] pointer-events-none hidden sm:block">
        <div className="absolute inset-0" style={{
          background: 'conic-gradient(from 270deg at 50% 0%, transparent 0deg, rgba(255,215,0,0.05) 15deg, transparent 30deg, rgba(220,60,30,0.04) 50deg, transparent 70deg)',
        }} />
      </div>

      {/* Gold dust particles — hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0
                ? `radial-gradient(circle, rgba(255,215,0,${p.opacity}), rgba(255,153,51,${p.opacity * 0.4}))`
                : p.id % 3 === 1
                  ? `radial-gradient(circle, rgba(220,180,80,${p.opacity}), rgba(180,100,20,${p.opacity * 0.3}))`
                  : `radial-gradient(circle, rgba(80,200,180,${p.opacity * 0.6}), rgba(0,150,130,${p.opacity * 0.2}))`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 pb-4"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-4xl"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-heading font-light text-white leading-[1.05] mb-4 sm:mb-5"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            {t('hero_title1')}
            <br />
            <span className="font-medium italic text-gold-light" style={{ textShadow: '0 0 40px rgba(212,175,55,0.5)' }}>
              {t('hero_title2')}
            </span>
            <br />
            <span className="font-light text-white/90">{t('hero_title3')}</span>
          </motion.h1>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-3 mb-4 sm:mb-5"
          >
            <span className="h-px w-8 sm:w-10 bg-white/40" />
            <span className="text-white/90 text-[10px] sm:text-xs font-body font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">
              {t('hero_label')}
            </span>
            <span className="h-px w-8 sm:w-10 bg-white/40" />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="font-body font-light text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 px-4"
          >
            <a href="#gallery" className="btn-gold text-xs sm:text-sm w-full sm:w-auto justify-center">
              {t('hero_cta_gallery')}
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-green-600/90 hover:bg-green-500 text-white font-body font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-sm"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              {t('hero_cta_whatsapp')}
            </a>
            <a
              href={getPhoneUrl()}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 border border-white/30 hover:border-white/70 text-white font-body font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-sm"
            >
              <Phone size={16} strokeWidth={1.5} />
              {t('hero_cta_call')}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 px-2"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.labelKey}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.08 }}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,215,0,0.25)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                <badge.icon size={16} className="text-gold-shine shrink-0 sm:w-5 sm:h-5" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-white text-xs sm:text-sm font-body font-semibold leading-tight">{t(badge.labelKey)}</p>
                  <p className="text-gold-light/70 text-[10px] sm:text-xs font-body leading-tight mt-0.5 hidden sm:block">{t(badge.sublabelKey)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-6 sm:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40 cursor-pointer"
          onClick={() => {
            const gallery = document.querySelector('#gallery')
            if (gallery) gallery.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-body">{t('hero_scroll')}</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
