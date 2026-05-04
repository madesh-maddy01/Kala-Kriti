'use client'

import { motion } from 'framer-motion'
import { Heart, Palette, Star, Gem, MapPin, Shield, Users, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const features = [
  {
    icon: Heart,
    title: 'Handmade with Devotion',
    desc: 'Every painting is created by a dedicated artist who approaches each brushstroke as an act of worship.',
  },
  {
    icon: Palette,
    title: '100% Custom Artwork',
    desc: 'No prints, no reproductions. Every piece is an original, made exclusively for you.',
  },
  {
    icon: Gem,
    title: 'Premium Materials',
    desc: 'We use archival-quality canvas, professional-grade paints, and fine brushes that ensure lasting vibrancy.',
  },
  {
    icon: Star,
    title: 'Sacred Artistic Detailing',
    desc: 'Intricate details — gold leaf, delicate ornaments, divine expressions — are our hallmark of quality.',
  },
  {
    icon: MapPin,
    title: 'Pan India Delivery',
    desc: 'We safely deliver to every corner of India, securely packed to protect your precious painting.',
  },
  {
    icon: Shield,
    title: 'Secure Advance Booking',
    desc: 'Transparent process — 50% advance, progress updates, and complete satisfaction before dispatch.',
  },
  {
    icon: Users,
    title: 'Trusted by 400+ Families',
    desc: 'Hundreds of homes across India have been blessed with Kala Kriti paintings. Read their stories.',
  },
  {
    icon: MessageCircle,
    title: 'Personal Consultation',
    desc: 'We speak with you directly on WhatsApp to understand your vision and bring it to perfect life.',
  },
]

export function WhyUsSection() {
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
          label="Why Kala Kriti"
          title="Art That Holds the Divine"
          subtitle="What makes a Kala Kriti painting different from anything you can find elsewhere."
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

function FeatureCard({ feature }: { feature: typeof features[0] }) {
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
