'use client'

import { motion } from 'framer-motion'
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'mb-14',
        centered && 'text-center',
        className
      )}
    >
      {/* Label */}
      <div className={cn('flex items-center gap-4 mb-4', centered && 'justify-center')}>
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
        <span className={cn(
          'text-xs font-body tracking-[0.35em] uppercase font-medium',
          dark ? 'text-saffron-light' : 'text-saffron'
        )}>
          {label}
        </span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
      </div>

      {/* Title */}
      <h2 className={cn(
        'font-heading font-light mb-4',
        dark ? 'text-white' : 'text-charcoal-dark',
        centered ? 'mx-auto' : ''
      )}
      style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, maxWidth: '800px' }}
      >
        {title}
      </h2>

      {/* Lotus divider */}
      <div className="flex items-center gap-3 mb-4" style={{ justifyContent: centered ? 'center' : 'flex-start' }}>
        <span className="h-px w-16" style={{
          background: centered
            ? 'linear-gradient(90deg, transparent, rgba(184,134,11,0.5))'
            : 'linear-gradient(90deg, rgba(184,134,11,0.5), transparent)'
        }} />
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
          <path d="M10 0C10 0 6 4 2 4C4 8 8 10 10 16C12 10 16 8 18 4C14 4 10 0 10 0Z" fill="#B8860B" opacity="0.6"/>
          <path d="M10 3C10 3 7.5 5.5 5 5.5C6.25 7.5 8.5 8.5 10 12C11.5 8.5 13.75 7.5 15 5.5C12.5 5.5 10 3 10 3Z" fill="#FFD700" opacity="0.4"/>
        </svg>
        <span className="h-px w-16" style={{
          background: centered
            ? 'linear-gradient(90deg, rgba(184,134,11,0.5), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(184,134,11,0.5))'
        }} />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          'font-body font-light leading-relaxed',
          dark ? 'text-white/60' : 'text-charcoal-light/70',
          centered ? 'mx-auto' : ''
        )}
        style={{ maxWidth: '600px', fontSize: '1.0625rem' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
