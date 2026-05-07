'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Palette, Star, Gem, Crown, Shield, Users, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'

const featureMeta = [
  { icon: Heart,         key: 1, accent: '#F97316' },
  { icon: Palette,       key: 2, accent: '#B8860B' },
  { icon: Gem,           key: 3, accent: '#7C3AED' },
  { icon: Crown,         key: 4, accent: '#D97706' },
  { icon: Star,          key: 5, accent: '#F97316' },
  { icon: Shield,        key: 6, accent: '#059669' },
  { icon: Star,          key: 7, accent: '#4F46E5' },
  { icon: Users,         key: 8, accent: '#B8860B' },
  { icon: MessageCircle, key: 9, accent: '#10B981' },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function WhyUsSection() {
  const { t } = useLanguage()
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px 0px' })

  const features = featureMeta.map((f) => ({
    icon: f.icon,
    accent: f.accent,
    title: t(`whyus_f${f.key}_title`),
    desc: t(`whyus_f${f.key}_desc`),
  }))

  return (
    <section className="py-16 sm:py-24 bg-temple-rich relative overflow-hidden">
      {/* Sacred weave pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #B8860B 0, #B8860B 1px, transparent 0, transparent 50%)',
        backgroundSize: '24px 24px',
      }} />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl hidden md:block pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.10, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, #FF9933, transparent)' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl hidden md:block pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.10, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{ background: 'radial-gradient(circle, #B8860B, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          dark
          label={t('whyus_label')}
          title={t('whyus_title')}
          subtitle={t('whyus_subtitle')}
        />

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

type FeatureItem = {
  icon: React.ElementType
  accent: string
  title: string
  desc: string
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <motion.div
      className="group p-6 rounded-sm h-full relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(184,134,11,0.15)',
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.07)',
        borderColor: 'rgba(184,134,11,0.35)',
        y: -5,
        boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Subtle accent glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-sm"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${feature.accent}18 0%, transparent 65%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        className="w-12 h-12 mb-5 rounded-sm flex items-center justify-center relative z-10"
        style={{
          background: `linear-gradient(135deg, ${feature.accent}22, ${feature.accent}10)`,
          border: `1px solid ${feature.accent}30`,
        }}
        whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
        transition={{ duration: 0.4 }}
      >
        <feature.icon size={22} style={{ color: feature.accent }} strokeWidth={1.5} />
      </motion.div>

      <h3 className="font-heading text-xl text-white mb-3 relative z-10">{feature.title}</h3>
      <p className="font-body text-sm text-white/55 leading-relaxed relative z-10">{feature.desc}</p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-sm"
        style={{ background: `linear-gradient(90deg, ${feature.accent}70, transparent)` }}
      />
    </motion.div>
  )
}
