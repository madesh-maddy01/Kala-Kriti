'use client'

import Image from 'next/image'
import { Phone, Mail, Instagram, Facebook, MessageCircle, Crown } from 'lucide-react'
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
  'Lord Ganesha', 'Radha Krishna', 'Goddess Lakshmi', 'Lord Venkateshwara',
  'Lord Shiva', 'Goddess Saraswati', 'Lord Ram Darbar', 'Lord Karthikeya',
]

export function Footer() {
  return (
    <footer className="bg-temple-rich text-white/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />
      <div className="relative h-px" style={{
        background: 'linear-gradient(90deg, transparent, #B8860B, #FFD700, #B8860B, transparent)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-10 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/main_logo.webp"
                alt="Kala Kriti"
                width={160}
                height={52}
                className="h-[74px] w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body text-sm leading-relaxed text-white/60 mb-4">
              Handcrafted devotional paintings of Hindu Gods & Goddesses, adorned with pure 24K gold plating on sacred elements. Created with devotion, skill, and timeless artistry.
            </p>
            {/* Gold plating note */}
            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-sm"
              style={{ background: 'rgba(184,134,11,0.12)', border: '1px solid rgba(184,134,11,0.2)' }}>
              <Crown size={11} className="text-gold-light shrink-0" />
              <span className="text-gold-light/80 text-[10px] font-body tracking-wide uppercase">Pure 24K Gold Plating</span>
            </div>
            <div className="flex items-center gap-3">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:brightness-110"
                  style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                  <Instagram size={16} />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:brightness-110"
                  style={{ background: '#1877F2' }}>
                  <Facebook size={16} />
                </a>
              )}
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:brightness-110"
                style={{ background: '#25D366' }}>
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

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg text-white/90 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold block" />
              Contact Us
            </h3>
            <div className="space-y-2">
              <a href={getPhoneUrl()}
                className="flex items-center gap-3 px-3 py-3.5 rounded-lg group transition-all duration-300 hover:translate-x-1"
                style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.25)' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#F97316' }}>
                  <Phone size={15} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-0.5">Call Us</p>
                  <p className="text-sm text-white/85 font-body font-semibold">{siteConfig.phone}</p>
                </div>
                <Phone size={13} className="text-saffron/60 group-hover:text-saffron transition-colors shrink-0" />
              </a>

              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3.5 rounded-lg group transition-all duration-300 hover:translate-x-1"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.25)' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#25D366' }}>
                  <MessageCircle size={15} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="text-sm text-white/85 font-body font-semibold">{siteConfig.phone}</p>
                </div>
                <MessageCircle size={13} className="text-[#25D366]/60 group-hover:text-[#25D366] transition-colors shrink-0" />
              </a>

              <a href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 px-3 py-3.5 rounded-lg group transition-all duration-300 hover:translate-x-1"
                style={{ background: 'rgba(234,67,53,0.1)', border: '1px solid rgba(234,67,53,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(234,67,53,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(234,67,53,0.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(234,67,53,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(234,67,53,0.25)' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#EA4335' }}>
                  <Mail size={15} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm text-white/85 font-body font-semibold truncate">{siteConfig.email}</p>
                </div>
                <Mail size={13} className="text-[#EA4335]/60 group-hover:text-[#EA4335] transition-colors shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
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

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="font-body text-xs text-white/30 tracking-widest uppercase">
            Handmade • Pan India Delivery • 100% Custom • Pure 24K Gold Plating • Trusted by 400+ Families
          </p>
        </div>
      </div>
    </footer>
  )
}
