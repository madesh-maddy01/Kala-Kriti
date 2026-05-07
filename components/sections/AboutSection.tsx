'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Crown, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
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

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

export function AboutSection() {
  const { t } = useLanguage()

  const stats = [
    { value: 10,  suffix: '+', labelKey: 'about_stat1_label', descKey: 'about_stat1_desc', accent: '#B8860B' },
    { value: 500, suffix: '+', labelKey: 'about_stat2_label', descKey: 'about_stat2_desc', accent: '#4F46E5' },
    { value: 400, suffix: '+', labelKey: 'about_stat3_label', descKey: 'about_stat3_desc', accent: '#F97316' },
    { value: 200, suffix: '+', labelKey: 'about_stat4_label', descKey: 'about_stat4_desc', accent: '#059669' },
  ]

  const tags = ['about_tag1', 'about_tag2', 'about_tag3', 'about_tag4', 'about_tag5']

  return (
    <section id="about" className="py-16 sm:py-24 bg-ivory-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-4 md:pb-0"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-divine">
              <Image
                src="/images/paintings/venkateshwara-main.webp"
                alt="Venkateshwara — Kala Kriti Sacred Art"
                fill
                priority
                quality={85}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(184,134,11,0.12) 0%, transparent 50%, rgba(10,4,2,0.3) 100%)',
              }} />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(184,134,11,0.9), rgba(255,215,0,0.8))',
                    backdropFilter: 'blur(10px)',
                  }}>
                  <Crown size={12} className="text-charcoal-dark shrink-0" />
                  <p className="text-charcoal-dark text-[10px] font-body font-semibold tracking-[0.2em] uppercase">
                    Pure 24K Gold Plating — Sacred Divine Art
                  </p>
                </div>
              </div>
            </div>

            {/* Floating years badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="md:absolute md:-bottom-6 md:-right-8 mt-3 md:mt-0 p-5 md:p-6 rounded-sm shadow-divine"
              style={{
                background: 'linear-gradient(135deg, #1A0A05, #2D1206)',
                border: '1px solid rgba(184,134,11,0.35)',
                minWidth: '160px',
              }}
            >
              <p className="font-heading text-4xl md:text-5xl text-gold-light font-light mb-1">
                10<span className="text-xl md:text-2xl">+</span>
              </p>
              <p className="font-body text-xs text-white/60 tracking-wider uppercase">{t('about_years')}</p>
              <div className="mt-3 h-px w-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            </motion.div>

            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-16 md:w-24 h-16 md:h-24 border-t-2 border-l-2 border-gold/40 pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-3 -right-3 w-16 md:w-24 h-16 md:h-24 border-b-2 border-r-2 border-gold/40 pointer-events-none hidden sm:block" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs text-saffron font-body tracking-[0.35em] uppercase">{t('about_label')}</span>
            </div>

            <h2 className="font-heading font-light text-charcoal-dark mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              {t('about_title1')}
              <span className="block italic text-maroon"> {t('about_title2')}</span>
            </h2>

            <div className="space-y-4 font-body text-charcoal-light/70 text-[0.9375rem] leading-relaxed mb-8">
              <p>{t('about_p1')}</p>
              <p>{t('about_p2')}</p>
              <p>{t('about_p3')}</p>
              <p className="font-heading italic text-xl text-charcoal-dark/60">{t('about_quote')}</p>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-3">
              {tags.map(tagKey => (
                <motion.span
                  key={tagKey}
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="px-3 py-1.5 text-xs font-body font-medium tracking-wide rounded-sm cursor-default"
                  style={{
                    background: 'rgba(184,134,11,0.08)',
                    border: '1px solid rgba(184,134,11,0.2)',
                    color: '#8B6914',
                  }}
                >
                  {tagKey === 'about_tag3' && <Crown size={10} className="inline mr-1" />}
                  {t(tagKey)}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-sm overflow-hidden"
          style={{ background: 'rgba(184,134,11,0.15)' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              className="bg-ivory-50 p-4 sm:p-8 text-center group relative overflow-hidden"
              whileHover={{ background: 'rgba(250,250,255,1)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Subtle accent glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-400"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${stat.accent}12 0%, transparent 65%)`,
                }}
              />
              <TrendingUp
                size={14}
                className="mx-auto mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: stat.accent }}
              />
              <p className="font-heading font-light mb-2 relative z-10" style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: stat.accent,
                lineHeight: 1,
              }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body font-semibold text-sm text-charcoal-dark mb-1 relative z-10">{t(stat.labelKey)}</p>
              <p className="font-body text-xs text-charcoal-light/50 relative z-10">{t(stat.descKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
