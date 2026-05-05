'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Info } from 'lucide-react'
import { getWhatsAppUrl, getPhoneUrl, siteConfig } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'

const factorKeys = [
  'pricing_factor1', 'pricing_factor2', 'pricing_factor3', 'pricing_factor4',
  'pricing_factor5', 'pricing_factor6', 'pricing_factor7',
]

export function PricingNote() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-ivory-50">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-sm overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FAF6EE, #F5EDD8)',
            border: '1px solid rgba(184,134,11,0.2)',
          }}
        >
          <div className="px-8 py-4 flex items-center gap-3"
            style={{ background: 'linear-gradient(90deg, rgba(139,0,0,0.06), rgba(184,134,11,0.06))' }}>
            <Info size={16} className="text-maroon shrink-0" strokeWidth={1.5} />
            <p className="font-body text-sm font-medium text-maroon tracking-wider uppercase">
              {t('pricing_about')}
            </p>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal-dark mb-4">
                  {t('pricing_card_title')}
                  <span className="block italic text-maroon">{t('pricing_card_italic')}</span>
                </h2>
                <p className="font-body text-charcoal-light/70 leading-relaxed mb-6">
                  {t('pricing_card_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppUrl(siteConfig.whatsappMessages.quote)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-saffron text-xs"
                  >
                    <MessageCircle size={15} strokeWidth={1.5} />
                    {t('pricing_get_quote')}
                  </a>
                  <a href={getPhoneUrl()} className="btn-outline text-xs">
                    <Phone size={15} strokeWidth={1.5} />
                    {t('pricing_call_discuss_btn')}
                  </a>
                </div>
              </div>

              <div>
                <p className="font-body text-xs text-charcoal-light/50 tracking-[0.25em] uppercase mb-4">
                  {t('pricing_depends_on')}
                </p>
                <ul className="space-y-2.5">
                  {factorKeys.map((key) => (
                    <li key={key} className="flex items-center gap-3 font-body text-sm text-charcoal-light/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
