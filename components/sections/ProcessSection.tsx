'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, MessageSquare, Settings, CheckCircle, Brush, Clock, Truck } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'

const stepMeta = [
  { icon: Search, number: '01', key: 1, color: 'from-saffron/20 to-transparent', accent: '#FF9933' },
  { icon: MessageSquare, number: '02', key: 2, color: 'from-gold/20 to-transparent', accent: '#B8860B' },
  { icon: Settings, number: '03', key: 3, color: 'from-maroon/20 to-transparent', accent: '#8B0000' },
  { icon: CheckCircle, number: '04', key: 4, color: 'from-saffron/20 to-transparent', accent: '#FF9933' },
  { icon: Brush, number: '05', key: 5, color: 'from-gold/20 to-transparent', accent: '#B8860B' },
  { icon: Clock, number: '06', key: 6, color: 'from-maroon/20 to-transparent', accent: '#8B0000' },
  { icon: Truck, number: '07', key: 7, color: 'from-saffron/20 to-transparent', accent: '#FF9933' },
]

export function ProcessSection() {
  const { t } = useLanguage()

  const steps = stepMeta.map((s) => ({
    ...s,
    title: t(`process_step${s.key}_title`),
    desc: t(`process_step${s.key}_desc`),
  }))

  return (
    <section id="process" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F3E8 0%, #FAF6EE 50%, #F8F3E8 100%)' }}
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          label={t('process_label')}
          title={t('process_title')}
          subtitle={t('process_subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <ProcessCard step={step} index={i} total={steps.length} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-14 p-8 rounded-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(139,0,0,0.04) 0%, rgba(184,134,11,0.06) 100%)',
            border: '1px solid rgba(184,134,11,0.15)',
          }}
        >
          <p className="font-heading italic text-2xl text-charcoal-dark/70 mb-2">
            {t('process_note_quote')}
          </p>
          <p className="font-body text-sm text-charcoal-light/60">
            {t('process_note_sub')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

type StepItem = { icon: React.ElementType; number: string; key: number; color: string; accent: string; title: string; desc: string }

function ProcessCard({ step, index, total }: { step: StepItem; index: number; total: number }) {
  const isLast = index === total - 1

  return (
    <div className="relative group">
      {/* Connector line — hidden on last */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-full w-5 h-px z-10"
          style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.4), transparent)' }} />
      )}

      <motion.div
        className="card-premium p-6 h-full"
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Number */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-300"
            style={{ background: `linear-gradient(135deg, ${step.accent}18, ${step.accent}08)`, border: `1px solid ${step.accent}30` }}>
            <step.icon size={22} style={{ color: step.accent }} strokeWidth={1.5} />
          </div>
          <span className="font-heading text-5xl font-light text-charcoal-dark/8 leading-none">
            {step.number}
          </span>
        </div>

        <h3 className="font-heading text-xl text-charcoal-dark mb-3">{step.title}</h3>
        <p className="font-body text-sm text-charcoal-light/65 leading-relaxed">{step.desc}</p>

        {/* Bottom accent line */}
        <div className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }} />
      </motion.div>
    </div>
  )
}
