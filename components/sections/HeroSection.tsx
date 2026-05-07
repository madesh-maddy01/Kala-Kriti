'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MessageCircle, Phone, ChevronDown, Sparkles, Package, Crown, Gem } from 'lucide-react'
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'

// Deterministic particle data — avoids hydration mismatch
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

// Word-by-word clip reveal — professional text entrance technique
function WordReveal({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const words = text.split(' ')
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.065,
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

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
    { icon: Crown,    labelKey: 'hero_badge_gold',     sublabelKey: 'hero_badge_gold_sub' },
    { icon: Gem,      labelKey: 'hero_badge_sizes',    sublabelKey: 'hero_badge_sizes_sub' },
  ]

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* Background with parallax */}
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, rgba(5,2,1,0.35) 0%, rgba(5,2,1,0.52) 45%, rgba(5,2,1,0.84) 100%)',
      }} />
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,2,1,0.42) 100%)',
      }} />

      {/* Gold shimmer rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[70%] z-[1] pointer-events-none hidden sm:block">
        <div className="absolute inset-0" style={{
          background: 'conic-gradient(from 270deg at 50% 0%, transparent 0deg, rgba(255,215,0,0.05) 15deg, transparent 30deg, rgba(220,60,30,0.04) 50deg, transparent 70deg)',
        }} />
      </div>

      {/* Gold dust particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden hidden sm:block">
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
        <div className="w-full max-w-4xl">

          {/* Headline — word-split clip reveal */}
          <h1
            className="font-heading font-light text-white leading-[1.1] mb-4 sm:mb-5"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            <WordReveal
              text={t('hero_title1')}
              delay={0.3}
              className="block"
            />
            <WordReveal
              text={t('hero_title2')}
              delay={0.52}
              className="block font-medium italic text-gold-light"
              style={{ textShadow: '0 0 40px rgba(212,175,55,0.5)' }}
            />
            <WordReveal
              text={t('hero_title3')}
              delay={0.74}
              className="block font-light text-white/90"
            />
          </h1>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4 sm:mb-5"
          >
            <motion.span
              className="h-px bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
            <span className="text-white/90 text-[10px] sm:text-xs font-body font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">
              {t('hero_label')}
            </span>
            <motion.span
              className="h-px bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body font-light text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.42, duration: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 px-4"
          >
            <motion.a
              href="#gallery"
              className="btn-gold text-xs sm:text-sm w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('hero_cta_gallery')}
            </motion.a>
            <motion.a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-green-600/90 hover:bg-green-500 text-white font-body font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-sm"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              {t('hero_cta_whatsapp')}
            </motion.a>
            <motion.a
              href={getPhoneUrl()}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 border border-white/30 hover:border-white/70 text-white font-body font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-sm"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={16} strokeWidth={1.5} />
              {t('hero_cta_call')}
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.58, duration: 0.4 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 px-2"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.labelKey}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.62 + i * 0.08,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-md cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,215,0,0.25)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                <badge.icon size={16} className="text-gold-shine shrink-0 sm:w-5 sm:h-5" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-white text-xs sm:text-sm font-body font-semibold leading-tight">
                    {t(badge.labelKey)}
                  </p>
                  <p className="text-gold-light/70 text-[10px] sm:text-xs font-body leading-tight mt-0.5 hidden sm:block">
                    {t(badge.sublabelKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-6 sm:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40 cursor-pointer hover:text-white/60 transition-colors duration-300"
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
