'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Instagram, Facebook, Mail, Send } from 'lucide-react'
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
    <section id="contact" className="py-24 bg-temple-rich relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF9933, #B8860B, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          dark
          label={t('contact_label')}
          title={t('contact_title')}
          subtitle={t('contact_subtitle')}
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Contact Options */}
          <div className="lg:col-span-2 space-y-4">
            {/* WhatsApp */}
            <motion.a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-4 p-5 rounded-sm transition-all duration-300 group"
              style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}
            >
              <div className="w-12 h-12 rounded-sm bg-green-600/20 flex items-center justify-center shrink-0">
                <MessageCircle size={22} className="text-green-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white font-body font-medium">{t('contact_whatsapp')}</p>
                <p className="text-green-400/70 text-xs font-body mt-0.5">{t('contact_submit_note').split('.')[0]}</p>
                <p className="text-white/50 text-sm font-body mt-1">{siteConfig.phone}</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={getPhoneUrl()}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-4 p-5 rounded-sm transition-all duration-300"
              style={{ background: 'rgba(255,153,51,0.1)', border: '1px solid rgba(255,153,51,0.2)' }}
            >
              <div className="w-12 h-12 rounded-sm bg-saffron/20 flex items-center justify-center shrink-0">
                <Phone size={22} className="text-saffron" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white font-body font-medium">{t('contact_call')}</p>
                <p className="text-white/50 text-sm font-body mt-1">{siteConfig.phone}</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-4 p-5 rounded-sm transition-all duration-300"
              style={{ background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.2)' }}
            >
              <div className="w-12 h-12 rounded-sm bg-gold/20 flex items-center justify-center shrink-0">
                <Mail size={22} className="text-gold-light" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white font-body font-medium">{t('contact_email')}</p>
                <p className="text-white/50 text-sm font-body mt-1 break-all">{siteConfig.email}</p>
              </div>
            </motion.a>

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-sm transition-all duration-300 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Instagram size={16} className="text-white/60" />
                  <span className="text-white/60 text-xs font-body">Instagram</span>
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-sm transition-all duration-300 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Facebook size={16} className="text-white/60" />
                  <span className="text-white/60 text-xs font-body">Facebook</span>
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
              className="rounded-sm p-8"
              style={{
                background: 'rgba(253,251,247,0.06)',
                backdropFilter: 'blur(20px)',
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

              <p className="text-center text-white/30 text-xs font-body mt-4">{t('contact_submit_note')}</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
