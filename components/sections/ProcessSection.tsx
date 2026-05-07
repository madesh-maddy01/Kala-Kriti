'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, MessageSquare, Settings, CheckCircle, Brush, Clock, Truck } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'

const stepMeta = [
  { icon: Search,       number: '01', key: 1, accent: '#F97316' },
  { icon: MessageSquare,number: '02', key: 2, accent: '#B8860B' },
  { icon: Settings,     number: '03', key: 3, accent: '#4F46E5' },
  { icon: CheckCircle,  number: '04', key: 4, accent: '#059669' },
  { icon: Brush,        number: '05', key: 5, accent: '#B8860B' },
  { icon: Clock,        number: '06', key: 6, accent: '#7C3AED' },
  { icon: Truck,        number: '07', key: 7, accent: '#F97316' },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
}

export function ProcessSection() {
  const { t } = useLanguage()
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px 0px' })

  const steps = stepMeta.map((s) => ({
    ...s,
    title: t(`process_step${s.key}_title`),
    desc: t(`process_step${s.key}_desc`),
  }))

  return (
    <section id="process" className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F3E8 0%, #FAF6EE 50%, #F8F3E8 100%)' }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-10">
        <SectionHeader
          label={t('process_label')}
          title={t('process_title')}
          subtitle={t('process_subtitle')}
        />

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
            >
              <ProcessCard step={step} index={i} total={steps.length} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
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

type StepItem = {
  icon: React.ElementType
  number: string
  key: number
  accent: string
  title: string
  desc: string
}

function ProcessCard({ step, index, total }: { step: StepItem; index: number; total: number }) {
  const isLast = index === total - 1

  return (
    <div className="relative group h-full">
      {/* Desktop connector arrow */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-10 left-full w-5 items-center z-10">
          <motion.div
            className="h-px flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
            style={{
              background: 'linear-gradient(90deg, rgba(184,134,11,0.45), rgba(199,210,254,0.25))',
              transformOrigin: 'left',
            }}
          />
        </div>
      )}

      <motion.div
        className="card-premium p-6 h-full flex flex-col"
        whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(79,70,229,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className="w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            style={{
              background: `linear-gradient(135deg, ${step.accent}20, ${step.accent}0a)`,
              border: `1px solid ${step.accent}30`,
            }}
          >
            <step.icon size={22} style={{ color: step.accent }} strokeWidth={1.5} />
          </motion.div>
          <span
            className="font-heading font-light leading-none select-none"
            style={{ fontSize: '3.5rem', color: `${step.accent}0f`, lineHeight: 1 }}
          >
            {step.number}
          </span>
        </div>

        <h3 className="font-heading text-xl text-charcoal-dark mb-2.5">{step.title}</h3>
        <p className="font-body text-sm text-charcoal-light/65 leading-relaxed flex-1">{step.desc}</p>

        {/* Animated bottom accent line */}
        <div
          className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }}
        />
      </motion.div>
    </div>
  )
}
