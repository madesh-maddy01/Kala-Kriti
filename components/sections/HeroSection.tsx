'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Phone, ChevronDown, Sparkles, Package, Crown, Gem } from 'lucide-react'
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 5 + 2,
  duration: Math.random() * 7 + 6,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.6 + 0.2,
}))

export function HeroSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 1.1])

  const trustBadges = [
    { icon: Sparkles, labelKey: 'hero_badge_handmade', sublabelKey: 'hero_badge_handmade_sub' },
    { icon: Package, labelKey: 'hero_badge_delivery', sublabelKey: 'hero_badge_delivery_sub' },
    { icon: Crown, labelKey: 'hero_badge_gold', sublabelKey: 'hero_badge_gold_sub' },
    { icon: Gem, labelKey: 'hero_badge_sizes', sublabelKey: 'hero_badge_sizes_sub' },
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <Image
          src="/images/hero-image.webp"
          alt="Radha Krishna — Kala Kriti"
          fill
          priority
          quality={90}
          className="object-cover object-top"
          sizes="100vw"
        />
      </motion.div>

      {/* Rich dark gradient overlay — lighter at top (naturally dark), deeper at center for text readability */}
      <div className="absolute inset-0 z-1" style={{
        background: 'linear-gradient(180deg, rgba(5,2,1,0.38) 0%, rgba(5,2,1,0.55) 45%, rgba(5,2,1,0.78) 100%)'
      }} />

      {/* Radial vignette — edges dark, center open to let the image breathe */}
      <div className="absolute inset-0 z-1" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,2,1,0.45) 100%)'
      }} />

      {/* Warm shimmer rays — gold & crimson to echo costume tones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[70%] z-1 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'conic-gradient(from 270deg at 50% 0%, transparent 0deg, rgba(255,215,0,0.05) 15deg, transparent 30deg, rgba(220,60,30,0.04) 50deg, transparent 70deg)',
        }} />
      </div>

      {/* Gold dust particles */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {particles.map((p) => (
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
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content — pt-24 reserves navbar height so justify-center never overlaps it */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 lg:px-10 pt-24 pb-4"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-heading font-light text-white leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {t('hero_title1')}
            <br />
            <span className="font-medium italic text-gold-light" style={{ textShadow: '0 0 40px rgba(212,175,55,0.5)' }}>
              {t('hero_title2')}
            </span>
            <br />
            <span className="font-light text-white/90">{t('hero_title3')}</span>
          </motion.h1>

          {/* Label — placed under headline so it never clashes with navbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-white/40" />
            <span className="text-white/90 text-xs font-body font-bold tracking-[0.4em] uppercase">
              {t('hero_label')}
            </span>
            <span className="h-px w-10 bg-white/40" />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="font-body font-light text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <a href="#gallery" className="btn-gold text-sm">
              {t('hero_cta_gallery')}
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-3.5 bg-green-600/90 hover:bg-green-500 text-white font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              {t('hero_cta_whatsapp')}
            </a>
            <a
              href={getPhoneUrl()}
              className="flex items-center gap-2.5 px-8 py-3.5 border border-white/30 hover:border-white/70 text-white font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5"
            >
              <Phone size={16} strokeWidth={1.5} />
              {t('hero_cta_call')}
            </a>
          </motion.div>

          {/* Trust Badges — larger, bolder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.labelKey}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.08 }}
                className="flex items-center gap-3 px-5 py-3.5 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.13)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                <badge.icon size={20} className="text-gold-shine shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-white text-sm font-body font-semibold leading-tight">{t(badge.labelKey)}</p>
                  <p className="text-gold-light/75 text-xs font-body leading-tight mt-0.5">{t(badge.sublabelKey)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-8"
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
          <span className="text-[10px] tracking-[0.3em] uppercase font-body">{t('hero_scroll')}</span>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
