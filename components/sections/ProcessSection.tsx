'use client'

import { motion } from 'framer-motion'
import { Search, MessageSquare, Settings, CheckCircle, Brush, Clock, Truck } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Choose Deity',
    desc: 'Select the deity, pose, and concept that speaks to your heart.',
    color: 'from-saffron/20 to-transparent',
    accent: '#FF9933',
  },
  {
    icon: MessageSquare,
    number: '02',
    title: 'Share Requirements',
    desc: 'Tell us your preferred size, color theme, and any special requests.',
    color: 'from-gold/20 to-transparent',
    accent: '#B8860B',
  },
  {
    icon: Settings,
    number: '03',
    title: 'Discuss & Customize',
    desc: 'We consult personally via WhatsApp to perfect every detail.',
    color: 'from-maroon/20 to-transparent',
    accent: '#8B0000',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Confirm Order',
    desc: 'Approve the plan and complete 50% advance to begin creation.',
    color: 'from-saffron/20 to-transparent',
    accent: '#FF9933',
  },
  {
    icon: Brush,
    number: '05',
    title: 'Painting Begins',
    desc: 'Our artist begins your sacred painting with full devotion.',
    color: 'from-gold/20 to-transparent',
    accent: '#B8860B',
  },
  {
    icon: Clock,
    number: '06',
    title: '30–40 Days',
    desc: 'Your painting is lovingly crafted with progress photos shared.',
    color: 'from-maroon/20 to-transparent',
    accent: '#8B0000',
  },
  {
    icon: Truck,
    number: '07',
    title: 'Safe Delivery',
    desc: 'Carefully packed and delivered to your doorstep across India.',
    color: 'from-saffron/20 to-transparent',
    accent: '#FF9933',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F3E8 0%, #FAF6EE 50%, #F8F3E8 100%)' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          label="How It Works"
          title="Your Sacred Painting Journey"
          subtitle="From your first thought to the moment it graces your wall — a personal, devotional process."
        />

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <ProcessCard step={step} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
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
            Every painting takes 30–40 days because every brushstroke is intentional.
          </p>
          <p className="font-body text-sm text-charcoal-light/60">
            We believe sacred art cannot be rushed. Your painting deserves the time it needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const isLast = index === steps.length - 1

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
