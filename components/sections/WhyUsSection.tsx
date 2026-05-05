'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Palette, Star, Gem, Crown, Shield, Users, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'

const featureMeta = [
  { icon: Heart, key: 1 },
  { icon: Palette, key: 2 },
  { icon: Gem, key: 3 },
  { icon: Crown, key: 4 },
  { icon: Star, key: 5 },
  { icon: Shield, key: 6 },
  { icon: Star, key: 7 },
  { icon: Users, key: 8 },
  { icon: MessageCircle, key: 9 },
]

export function WhyUsSection() {
  const { t } = useLanguage()

  const features = featureMeta.map((f) => ({
    icon: f.icon,
    title: t(`whyus_f${f.key}_title`),
    desc: t(`whyus_f${f.key}_desc`),
  }))

  return (
    <section className="py-24 bg-temple-rich relative overflow-hidden">
      {/* Sacred pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #B8860B 0, #B8860B 1px, transparent 0, transparent 50%)',
        backgroundSize: '24px 24px'
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF9933, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #B8860B, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          dark
          label={t('whyus_label')}
          title={t('whyus_title')}
          subtitle={t('whyus_subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

type FeatureItem = { icon: React.ElementType; title: string; desc: string }

function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <motion.div
      className="group p-6 rounded-sm h-full transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(184,134,11,0.15)',
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.07)',
        borderColor: 'rgba(184,134,11,0.35)',
        y: -4,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon */}
      <div className="w-12 h-12 mb-5 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(255,153,51,0.15), rgba(184,134,11,0.1))',
          border: '1px solid rgba(184,134,11,0.25)',
        }}>
        <feature.icon size={22} className="text-saffron" strokeWidth={1.5} />
      </div>

      <h3 className="font-heading text-xl text-white mb-3">{feature.title}</h3>
      <p className="font-body text-sm text-white/55 leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}
