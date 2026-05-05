'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { languageNames, type Language } from '@/lib/translations'
import { cn } from '@/lib/utils'

const languages = Object.entries(languageNames) as [Language, string][]

interface LanguageSelectorProps {
  scrolled?: boolean
}

export function LanguageSelector({ scrolled }: LanguageSelectorProps) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-body font-medium tracking-wide transition-all duration-300 border',
          scrolled
            ? 'text-charcoal border-sandstone hover:border-gold hover:text-gold'
            : 'text-white/80 border-white/25 hover:border-white/50 hover:text-white'
        )}
        aria-label="Select language"
      >
        <Globe size={13} strokeWidth={1.5} />
        <span className="hidden sm:inline">{languageNames[lang]}</span>
        <ChevronDown
          size={11}
          strokeWidth={2}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 z-50 rounded-sm overflow-hidden shadow-xl"
            style={{
              background: 'rgba(15,7,3,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(184,134,11,0.25)',
              minWidth: '160px',
            }}
          >
            {languages.map(([code, name]) => (
              <button
                key={code}
                onClick={() => { setLang(code); setOpen(false) }}
                className={cn(
                  'w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-body transition-all duration-200',
                  lang === code
                    ? 'text-gold-light bg-gold/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
              >
                <span>{name}</span>
                {lang === code && <Check size={13} className="text-gold-light" strokeWidth={2.5} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
