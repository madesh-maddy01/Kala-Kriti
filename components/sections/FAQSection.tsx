'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import type { FAQ } from '@/data/faqs'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useLanguage } from '@/lib/language-context'
import { siteConfig } from '@/lib/config'

interface FAQSectionProps {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const { t } = useLanguage()
  const [openId, setOpenId] = useState<string | null>('f1')

  return (
    <section id="faq" className="py-16 sm:py-24 bg-ivory-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-10">
        <SectionHeader
          label={t('faq_label')}
          title={t('faq_title')}
          subtitle={t('faq_subtitle')}
        />

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <FAQItem
                faq={faq}
                question={t(`faq_q${faq.id.replace('f', '')}`)}
                answer={t(`faq_a${faq.id.replace('f', '')}`)}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center p-8 rounded-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(139,0,0,0.04), rgba(184,134,11,0.06))',
            border: '1px solid rgba(184,134,11,0.15)',
          }}
        >
          <p className="font-heading italic text-2xl text-charcoal-dark/70 mb-2">
            {t('faq_still_have')}
          </p>
          <p className="font-body text-sm text-charcoal-light/60 mb-5">
            {t('faq_still_have_sub')}
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello! I have a question about ordering a custom painting.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex text-xs"
          >
            {t('faq_ask_whatsapp')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ faq, question, answer, isOpen, onToggle }: {
  faq: FAQ
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="rounded-sm overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? 'white' : 'rgba(253,251,247,0.7)',
        border: `1px solid ${isOpen ? 'rgba(184,134,11,0.25)' : 'rgba(212,196,160,0.3)'}`,
        boxShadow: isOpen ? '0 4px 20px rgba(184,134,11,0.08)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className={`font-heading text-lg transition-colors duration-300 ${isOpen ? 'text-maroon' : 'text-charcoal-dark'}`}>
          {question}
        </span>
        <span className={`shrink-0 ml-4 w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-maroon text-white'
            : 'bg-sandstone/50 text-charcoal-light'
        }`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 font-body text-[0.9375rem] text-charcoal-light/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
