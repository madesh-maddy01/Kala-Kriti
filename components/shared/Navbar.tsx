'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import { siteConfig, getWhatsAppUrl, getPhoneUrl } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'
import { LanguageSelector } from './LanguageSelector'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const navLinks = [
    { labelKey: 'nav_home', href: '/' },
    { labelKey: 'nav_gallery', href: '#gallery' },
    { labelKey: 'nav_process', href: '#process' },
    { labelKey: 'nav_reviews', href: '#reviews' },
    { labelKey: 'nav_about', href: '#about' },
    { labelKey: 'nav_faq', href: '#faq' },
    { labelKey: 'nav_contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        const navHeight = navRef.current?.offsetHeight || 80
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'navbar-scrolled py-3' : 'navbar-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src="/main_logo.png"
                alt="Kala Kriti"
                width={160}
                height={52}
                priority
                className={cn(
                  'h-11 w-auto object-contain transition-all duration-500',
                  scrolled ? 'brightness-0' : 'brightness-0 invert'
                )}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'px-4 py-2 text-sm font-body font-medium tracking-wide transition-all duration-300 rounded-sm hover:bg-white/10 relative group',
                    scrolled ? 'text-charcoal hover:text-gold' : 'text-white/85 hover:text-white'
                  )}
                >
                  {t(link.labelKey)}
                  <span className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-300',
                    scrolled ? 'bg-gold' : 'bg-saffron'
                  )} />
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <LanguageSelector scrolled={scrolled} />
              <a
                href={getPhoneUrl()}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-sm font-body font-medium transition-all duration-300 rounded-sm border',
                  scrolled
                    ? 'text-charcoal border-sandstone hover:border-gold hover:text-gold'
                    : 'text-white border-white/30 hover:border-white/60'
                )}
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="tracking-wide">{t('nav_call')}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-body font-medium tracking-wide transition-all duration-300 rounded-sm shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{t('nav_whatsapp')}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSelector scrolled={scrolled} />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  'p-2 rounded-sm transition-colors',
                  scrolled ? 'text-charcoal-dark' : 'text-white'
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-ivory-50 flex flex-col lg:hidden"
            style={{ paddingTop: '80px' }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            <div className="relative flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-4 font-heading text-2xl text-charcoal-dark hover:text-maroon transition-colors border-b border-sandstone/30 flex items-center justify-between group"
                  >
                    {t(link.labelKey)}
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity text-base font-body">→</span>
                  </motion.button>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-3"
              >
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 text-white font-body font-medium rounded-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle size={18} />
                  {t('nav_whatsapp_order')}
                </a>
                <a
                  href={getPhoneUrl()}
                  className="flex items-center justify-center gap-3 w-full py-4 border border-sandstone text-charcoal-dark font-body font-medium rounded-sm hover:border-gold hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone size={18} />
                  {siteConfig.phone}
                </a>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-10 text-center font-heading italic text-2xl text-sandstone-dark"
              >
                "Art born of devotion"
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
