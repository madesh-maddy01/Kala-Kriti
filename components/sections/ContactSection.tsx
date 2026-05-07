'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Instagram, Facebook, Mail, Send, ArrowRight, Check, Copy } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig, getWhatsAppUrl, getPhoneUrl } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'

interface FormData {
  name: string
  city: string
  deity: string
  size: string
  message: string
}

const deityOptions = [
  'Lord Ganesha', 'Radha Krishna', 'Lord Krishna', 'Goddess Lakshmi',
  'Lord Shiva', 'Goddess Saraswati', 'Lord Ram / Ram Darbar', 'Lord Venkateshwara',
  'Lord Karthikeya', 'Sai Baba', 'Lakshmi Venkateshwara', 'Shiv Parivar', 'Other',
]

const sizeOptions = [
  '8×10"', '12×16"', '16×20"', '18×24"', '24×30"', '24×36"', '30×40"', 'Custom Size'
]

const inputStyle = {
  border: '1px solid rgba(184,134,11,0.2)',
  background: 'rgba(255,255,255,0.06)',
}

export function ContactSection() {
  const { t } = useLanguage()
  const [form, setForm] = useState<FormData>({ name: '', city: '', deity: '', size: '', message: '' })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000) }
      else { setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000) }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      `Hello! I would like to enquire about a custom painting.`,
      `Name: ${form.name}`,
      `City: ${form.city}`,
      `Deity: ${form.deity || 'Not specified'}`,
      `Size: ${form.size || 'Not specified'}`,
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean).join('\n')
    window.open(getWhatsAppUrl(msg), '_blank')
  }

  const focusStyle = (e: React.FocusEvent<HTMLElement>) => {
    (e.target as HTMLElement).style.borderColor = 'rgba(184,134,11,0.5)'
  }
  const blurStyle = (e: React.FocusEvent<HTMLElement>) => {
    (e.target as HTMLElement).style.borderColor = 'rgba(184,134,11,0.2)'
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-temple-rich relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Glow — hidden on mobile (GPU-intensive) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 blur-3xl hidden md:block"
        style={{ background: 'radial-gradient(circle, #FF9933, #B8860B, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          dark
          label={t('contact_label')}
          title={t('contact_title')}
          subtitle={t('contact_subtitle')}
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left — Contact Options */}
          <div className="lg:col-span-2 space-y-3">

            {/* ── WhatsApp ── */}
            <motion.a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-4 p-5 rounded-xl overflow-hidden group cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #0a1f14 0%, #0d2b1a 100%)', border: '1px solid rgba(37,211,102,0.3)' }}
            >
              {/* Glow sweep on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none"
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.3 }}
                style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, transparent 60%)' }}
              />
              {/* Left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: '#25D366' }} />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ background: '#25D366' }}>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ border: '2px solid #25D366' }}
                />
                <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-white font-body font-semibold text-base">{t('contact_whatsapp')}</p>
                  <span className="flex items-center gap-1 text-[10px] font-body text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                    Online
                  </span>
                </div>
                <p className="text-white/50 text-sm font-body">{siteConfig.phone}</p>
                <p className="text-green-400/60 text-xs font-body mt-1">Usually replies in minutes</p>
              </div>

              {/* Arrow */}
              <motion.div
                variants={{ hover: { x: 4 } }}
                transition={{ duration: 0.2 }}
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(37,211,102,0.15)' }}
              >
                <ArrowRight size={16} className="text-green-400" />
              </motion.div>
            </motion.a>

            {/* ── Call Us ── */}
            <motion.a
              href={getPhoneUrl()}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-4 p-5 rounded-xl overflow-hidden group cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #1f1208 0%, #291608 100%)', border: '1px solid rgba(249,115,22,0.3)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none"
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.3 }}
                style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, transparent 60%)' }}
              />
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: '#F97316' }} />

              <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  style={{ border: '2px solid #F97316' }}
                />
                <Phone size={24} className="text-white" strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-body font-semibold text-base mb-0.5">{t('contact_call')}</p>
                <p className="text-white/50 text-sm font-body">{siteConfig.phone}</p>
                <p className="text-orange-400/60 text-xs font-body mt-1">Available 9 AM – 9 PM IST</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Copy phone */}
                <motion.button
                  type="button"
                  onClick={(e) => { e.preventDefault(); copyToClipboard(siteConfig.phone, 'phone') }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(249,115,22,0.15)' }}
                  title="Copy number"
                >
                  <AnimatePresence mode="wait">
                    {copiedPhone
                      ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={13} className="text-green-400" /></motion.div>
                      : <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={13} className="text-orange-400/70" /></motion.div>
                    }
                  </AnimatePresence>
                </motion.button>
                <motion.div
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.15)' }}
                >
                  <ArrowRight size={16} className="text-orange-400" />
                </motion.div>
              </div>
            </motion.a>

            {/* ── Email ── */}
            <motion.div
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-4 p-5 rounded-xl overflow-hidden group cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #1f0b09 0%, #2a0e0b 100%)', border: '1px solid rgba(234,67,53,0.3)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none"
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.3 }}
                style={{ background: 'linear-gradient(135deg, rgba(234,67,53,0.12) 0%, transparent 60%)' }}
              />
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: '#EA4335' }} />

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #EA4335, #C5221F)' }}>
                <Mail size={24} className="text-white" strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-body font-semibold text-base mb-0.5">{t('contact_email')}</p>
                <p className="text-white/50 text-sm font-body truncate">{siteConfig.email}</p>
                <p className="text-red-400/60 text-xs font-body mt-1">Tap to copy or send email</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  type="button"
                  onClick={() => copyToClipboard(siteConfig.email, 'email')}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(234,67,53,0.15)' }}
                  title="Copy email"
                >
                  <AnimatePresence mode="wait">
                    {copiedEmail
                      ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={13} className="text-green-400" /></motion.div>
                      : <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={13} className="text-red-400/70" /></motion.div>
                    }
                  </AnimatePresence>
                </motion.button>
                <motion.a
                  href={`mailto:${siteConfig.email}`}
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(234,67,53,0.15)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowRight size={16} className="text-red-400" />
                </motion.a>
              </div>
            </motion.div>

            {/* ── Social ── */}
            <div className="flex items-center gap-3 pt-1">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                  <Instagram size={16} className="text-white" />
                  <span className="text-white text-xs font-body font-semibold">Instagram</span>
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{ background: '#1877F2' }}>
                  <Facebook size={16} className="text-white" />
                  <span className="text-white text-xs font-body font-semibold">Facebook</span>
                </a>
              )}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleWhatsAppSubmit}
              className="rounded-sm p-5 sm:p-8"
              style={{
                background: 'rgba(253,251,247,0.06)',
                border: '1px solid rgba(184,134,11,0.2)',
              }}
            >
              <h3 className="font-heading text-2xl text-white mb-1">{t('contact_form_title')}</h3>
              <p className="font-body text-sm text-white/50 mb-7">{t('contact_form_subtitle')}</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-body text-white/50 mb-2 tracking-wider uppercase">{t('contact_name')} *</label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange}
                    placeholder={t('contact_name_placeholder')}
                    className="w-full px-4 py-3.5 font-body text-sm text-white/90 outline-none transition-all duration-300 rounded-sm"
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label className="block text-xs font-body text-white/50 mb-2 tracking-wider uppercase">{t('contact_city')}</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange}
                    placeholder={t('contact_city_placeholder')}
                    className="w-full px-4 py-3.5 font-body text-sm text-white/90 outline-none transition-all duration-300 rounded-sm"
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-body text-white/50 mb-2 tracking-wider uppercase">{t('contact_deity')}</label>
                  <select name="deity" value={form.deity} onChange={handleChange}
                    className="w-full px-4 py-3.5 font-body text-sm text-white/90 outline-none transition-all duration-300 rounded-sm appearance-none"
                    style={{ ...inputStyle, background: 'rgba(26,10,5,0.95)', color: 'rgba(255,255,255,0.8)' }}>
                    <option value="">{t('contact_deity_placeholder')}</option>
                    {deityOptions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-body text-white/50 mb-2 tracking-wider uppercase">{t('contact_size')}</label>
                  <select name="size" value={form.size} onChange={handleChange}
                    className="w-full px-4 py-3.5 font-body text-sm text-white/90 outline-none transition-all duration-300 rounded-sm appearance-none"
                    style={{ ...inputStyle, background: 'rgba(26,10,5,0.95)', color: 'rgba(255,255,255,0.8)' }}>
                    <option value="">{t('contact_size_placeholder')}</option>
                    {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-body text-white/50 mb-2 tracking-wider uppercase">{t('contact_message')}</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder={t('contact_message_placeholder')}
                  className="w-full px-4 py-3.5 font-body text-sm text-white/90 outline-none transition-all duration-300 rounded-sm resize-none"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-saffron w-full justify-center gap-3"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                {t('contact_submit')}
                <Send size={14} strokeWidth={1.5} />
              </motion.button>

              <p className="text-center text-white/30 text-xs font-body mt-4">We typically respond within a few hours.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
