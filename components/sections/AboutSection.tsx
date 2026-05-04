'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { siteConfig } from '@/lib/config'

const stats = [
  { value: 10, suffix: '+', label: 'Years of Experience', desc: 'Dedicated artistry' },
  { value: 500, suffix: '+', label: 'Paintings Delivered', desc: 'Across India' },
  { value: 400, suffix: '+', label: 'Happy Families', desc: 'Divine homes blessed' },
  { value: 200, suffix: '+', label: 'Custom Requests', desc: 'Unique visions realized' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-ivory-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=85"
                alt="Kala Kriti artisan at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold overlay */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(184,134,11,0.08) 0%, transparent 60%)'
              }} />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 md:-right-8 p-6 rounded-sm shadow-divine"
              style={{
                background: 'linear-gradient(135deg, #1A0A05, #2D1206)',
                border: '1px solid rgba(184,134,11,0.3)',
                minWidth: '180px'
              }}
            >
              <p className="font-heading text-5xl text-gold-light font-light mb-1">10<span className="text-2xl">+</span></p>
              <p className="font-body text-xs text-white/60 tracking-wider uppercase">Years of Sacred Artistry</p>
              <div className="mt-3 h-px w-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            </motion.div>

            {/* Gold border accent */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-gold/40 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs text-saffron font-body tracking-[0.35em] uppercase">Our Story</span>
            </div>

            <h2 className="font-heading font-light text-charcoal-dark mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              Art Born from
              <span className="block italic text-maroon"> Devotion & Discipline</span>
            </h2>

            <div className="space-y-4 font-body text-charcoal-light/70 text-[0.9375rem] leading-relaxed mb-8">
              <p>
                Kala Kriti was born from a simple belief: that the divine deserves to be portrayed with the same reverence and skill with which it is worshipped.
              </p>
              <p>
                Each painting that leaves our studio is more than art — it is a sacred object, created with meditative focus, premium materials, and a deep understanding of the iconography and symbolism of Hindu deities.
              </p>
              <p>
                We work with one client at a time on each painting, giving every commissioned piece the full attention it deserves. This is not mass production. This is intimate, devotional artistry.
              </p>
              <p className="font-heading italic text-xl text-charcoal-dark/60">
                "A Kala Kriti painting doesn't just decorate your home — it transforms it."
              </p>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap gap-3">
              {['Archival Canvas', 'Oil & Acrylic', 'Gold Leaf', 'Premium Framing', 'Progress Shared'].map(tag => (
                <span key={tag} className="px-3 py-1.5 text-xs font-body font-medium tracking-wide rounded-sm"
                  style={{ background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.2)', color: '#8B6914' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-sm overflow-hidden"
          style={{ background: 'rgba(184,134,11,0.15)' }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label}
              className="bg-ivory-50 p-8 text-center"
            >
              <p className="font-heading text-5xl md:text-6xl font-light text-maroon mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body font-medium text-sm text-charcoal-dark mb-1">{stat.label}</p>
              <p className="font-body text-xs text-charcoal-light/50">{stat.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
