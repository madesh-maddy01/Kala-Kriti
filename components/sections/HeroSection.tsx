'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Phone, ChevronDown, Sparkles, Package, Maximize2, Frame } from 'lucide-react'
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/config'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
  opacity: Math.random() * 0.5 + 0.2,
}))

const trustBadges = [
  { icon: Sparkles, label: 'Handmade', sublabel: 'with devotion' },
  { icon: Package, label: 'Pan India', sublabel: 'Delivery' },
  { icon: Maximize2, label: 'Custom Sizes', sublabel: 'any dimension' },
  { icon: Frame, label: 'Premium', sublabel: 'Framing' },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 1.1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <Image
          src="/images/hero_img.jpg"
          alt="Divine Devotional Painting — Kala Kriti"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 hero-gradient-overlay" />

      {/* Deep maroon vignette */}
      <div className="absolute inset-0 z-1" style={{
        background: 'radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(10,5,2,0.4) 100%)'
      }} />

      {/* Sacred Particles */}
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
              background: `radial-gradient(circle, rgba(255,215,0,${p.opacity}), rgba(255,153,51,${p.opacity * 0.5}))`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
              scale: [0.8, 1.2, 0.8],
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

      {/* Light rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] z-1 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'conic-gradient(from 270deg at 50% 0%, transparent 0deg, rgba(255,215,0,0.03) 15deg, transparent 30deg, rgba(255,153,51,0.04) 45deg, transparent 60deg)',
        }} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 lg:px-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-gold-light/60" />
            <span className="text-gold-light text-xs font-body tracking-[0.4em] uppercase">
              Sacred Handmade Art
            </span>
            <span className="h-px w-12 bg-gold-light/60" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="font-heading font-light text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Handmade Divine Paintings
            <br />
            <span className="font-medium italic text-gold-light" style={{ textShadow: '0 0 40px rgba(212,175,55,0.4)' }}>
              Crafted for Your Home
            </span>
            <br />
            <span className="font-light text-white/90">& Heart</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="font-body font-light text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Custom paintings of Hindu Gods & Goddesses created with devotion,
            detail, and timeless artistry. Every painting is a sacred offering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <a href="#gallery" className="btn-gold text-sm">
              View Gallery
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-3.5 bg-green-600/90 hover:bg-green-500 text-white font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              WhatsApp for Custom Order
            </a>
            <a
              href={getPhoneUrl()}
              className="flex items-center gap-2.5 px-8 py-3.5 border border-white/30 hover:border-white/70 text-white font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5"
            >
              <Phone size={16} strokeWidth={1.5} />
              Call Now
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-6"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-sm"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <badge.icon size={14} className="text-gold-light shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-white text-xs font-body font-medium leading-none">{badge.label}</p>
                  <p className="text-white/50 text-[10px] font-body leading-none mt-0.5">{badge.sublabel}</p>
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
          <span className="text-[10px] tracking-[0.3em] uppercase font-body">Scroll</span>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
