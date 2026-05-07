'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
  dark?: boolean
  className?: string
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  dark = false,
  className,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <div
      ref={ref}
      className={cn('mb-14', centered && 'text-center', className)}
    >
      {/* Label row with animated lines */}
      <div className={cn('flex items-center gap-4 mb-4', centered && 'justify-center')}>
        <motion.span
          className="h-px bg-gradient-to-r from-transparent to-gold"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: '3rem', opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className={cn(
            'text-xs font-body tracking-[0.35em] uppercase font-medium',
            dark ? 'text-saffron-light' : 'text-saffron'
          )}
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {label}
        </motion.span>
        <motion.span
          className="h-px bg-gradient-to-l from-transparent to-gold"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: '3rem', opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Title — clip reveal */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          className={cn(
            'font-heading font-light mb-4',
            dark ? 'text-white' : 'text-charcoal-dark',
            centered ? 'mx-auto' : ''
          )}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08, maxWidth: '800px' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Lotus divider */}
      <motion.div
        className="flex items-center gap-3 mb-4"
        style={{ justifyContent: centered ? 'center' : 'flex-start' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, delay: 0.42 }}
      >
        <span className="h-px w-16" style={{
          background: centered
            ? 'linear-gradient(90deg, transparent, rgba(184,134,11,0.5))'
            : 'linear-gradient(90deg, rgba(184,134,11,0.5), transparent)',
        }} />
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
          <path d="M10 0C10 0 6 4 2 4C4 8 8 10 10 16C12 10 16 8 18 4C14 4 10 0 10 0Z" fill="#B8860B" opacity="0.6"/>
          <path d="M10 3C10 3 7.5 5.5 5 5.5C6.25 7.5 8.5 8.5 10 12C11.5 8.5 13.75 7.5 15 5.5C12.5 5.5 10 3 10 3Z" fill="#FFD700" opacity="0.4"/>
        </svg>
        <span className="h-px w-16" style={{
          background: centered
            ? 'linear-gradient(90deg, rgba(184,134,11,0.5), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(184,134,11,0.5))',
        }} />
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className={cn(
            'font-body font-light leading-relaxed',
            dark ? 'text-white/60' : 'text-charcoal-light/70',
            centered ? 'mx-auto' : ''
          )}
          style={{ maxWidth: '600px', fontSize: '1.0625rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
