import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import { siteConfig, getWhatsAppUrl, getPhoneUrl } from '@/lib/config'

const quickLinks = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Our Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About Us', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const deities = [
  'Lord Ganesha', 'Radha Krishna', 'Goddess Lakshmi', 'Lord Shiva',
  'Goddess Durga', 'Lord Ram Darbar', 'Goddess Saraswati', 'Lord Hanuman',
]

export function Footer() {
  return (
    <footer className="bg-temple-rich text-white/80 relative overflow-hidden">
      {/* Sacred pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Top gold line */}
      <div className="relative h-px" style={{
        background: 'linear-gradient(90deg, transparent, #B8860B, #FFD700, #B8860B, transparent)'
      }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="font-heading text-3xl font-medium text-white">
                Kala <span className="text-gold-light italic">Kriti</span>
              </h2>
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-1 font-body">
                Divine Handmade Art
              </p>
            </div>
            <p className="font-body text-sm leading-relaxed text-white/60 mb-6">
              Handcrafted devotional paintings of Hindu Gods & Goddesses, created with devotion, skill, and timeless artistry. Each painting is a sacred offering.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm flex items-center justify-center border border-white/20 text-white/60 hover:text-saffron hover:border-saffron transition-all duration-300">
                  <Instagram size={16} />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm flex items-center justify-center border border-white/20 text-white/60 hover:text-saffron hover:border-saffron transition-all duration-300">
                  <Facebook size={16} />
                </a>
              )}
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm flex items-center justify-center border border-white/20 text-white/60 hover:text-green-400 hover:border-green-400 transition-all duration-300">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg text-white/90 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold block" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="font-body text-sm text-white/60 hover:text-saffron transition-colors duration-300 flex items-center gap-2 group">
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Deities */}
          <div>
            <h3 className="font-heading text-lg text-white/90 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold block" />
              Popular Deities
            </h3>
            <ul className="space-y-3">
              {deities.map((deity) => (
                <li key={deity}>
                  <a href="#gallery"
                    className="font-body text-sm text-white/60 hover:text-saffron transition-colors duration-300 flex items-center gap-2 group">
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {deity}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg text-white/90 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold block" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <a href={getPhoneUrl()}
                className="flex items-start gap-3 group">
                <Phone size={15} className="mt-0.5 text-gold-light shrink-0" />
                <div>
                  <p className="text-xs text-white/40 font-body mb-0.5">Phone</p>
                  <p className="text-sm text-white/70 group-hover:text-saffron transition-colors font-body">
                    {siteConfig.phone}
                  </p>
                </div>
              </a>

              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <MessageCircle size={15} className="mt-0.5 text-gold-light shrink-0" />
                <div>
                  <p className="text-xs text-white/40 font-body mb-0.5">WhatsApp</p>
                  <p className="text-sm text-white/70 group-hover:text-green-400 transition-colors font-body">
                    {siteConfig.phone}
                  </p>
                </div>
              </a>

              <a href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 group">
                <Mail size={15} className="mt-0.5 text-gold-light shrink-0" />
                <div>
                  <p className="text-xs text-white/40 font-body mb-0.5">Email</p>
                  <p className="text-sm text-white/70 group-hover:text-saffron transition-colors font-body break-all">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-gold-light shrink-0" />
                <div>
                  <p className="text-xs text-white/40 font-body mb-0.5">Location</p>
                  <p className="text-sm text-white/70 font-body">
                    {siteConfig.location.city}, {siteConfig.location.state}
                    <br />Pan India Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Spiritual quote */}
          <p className="font-heading italic text-lg text-gold-light/70 text-center md:text-left">
            "कलां परमां शृण्वन्तो देव-गन्धर्व-मानवाः"
          </p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="font-body text-xs text-white/40">
              © {new Date().getFullYear()} Kala Kriti. All rights reserved.
            </p>
            <p className="font-body text-xs text-white/30">
              Handmade with devotion in India 🇮🇳
            </p>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="font-body text-xs text-white/30 tracking-widest uppercase">
            Handmade • Pan India Delivery • 100% Custom • Premium Quality • Trusted by 400+ Families
          </p>
        </div>
      </div>
    </footer>
  )
}
