'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Info } from 'lucide-react'
import { getWhatsAppUrl, getPhoneUrl, siteConfig } from '@/lib/config'

const pricingFactors = [
  'Painting size & dimensions',
  'Medium — oil, acrylic, or watercolor',
  'Level of detailing & complexity',
  'Number of deities in composition',
  'Gold leaf or special techniques',
  'Framing — type and material',
  'Custom special requests',
]

export function PricingNote() {
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
          {/* Top bar */}
          <div className="px-8 py-4 flex items-center gap-3"
            style={{ background: 'linear-gradient(90deg, rgba(139,0,0,0.06), rgba(184,134,11,0.06))' }}>
            <Info size={16} className="text-maroon shrink-0" strokeWidth={1.5} />
            <p className="font-body text-sm font-medium text-maroon tracking-wider uppercase">
              About Pricing
            </p>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal-dark mb-4">
                  Every Painting is
                  <span className="block italic text-maroon">Priced with Transparency</span>
                </h2>
                <p className="font-body text-charcoal-light/70 leading-relaxed mb-6">
                  We don't list fixed prices because every painting is truly unique. Pricing is determined fairly based on the exact specifications of your order. We will always discuss and agree before beginning.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppUrl(siteConfig.whatsappMessages.quote)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-saffron text-xs"
                  >
                    <MessageCircle size={15} strokeWidth={1.5} />
                    Get Your Quote
                  </a>
                  <a href={getPhoneUrl()} className="btn-outline text-xs">
                    <Phone size={15} strokeWidth={1.5} />
                    Call to Discuss
                  </a>
                </div>
              </div>

              <div>
                <p className="font-body text-xs text-charcoal-light/50 tracking-[0.25em] uppercase mb-4">
                  Pricing depends on
                </p>
                <ul className="space-y-2.5">
                  {pricingFactors.map((factor) => (
                    <li key={factor} className="flex items-center gap-3 font-body text-sm text-charcoal-light/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {factor}
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
