'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, MessageCircle, ChevronLeft, ChevronRight, Clock, Ruler, Frame } from 'lucide-react'
import type { Painting } from '@/data/paintings'
import { paintingCategories } from '@/data/paintings'
import { getWhatsAppUrl, siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface GallerySectionProps {
  paintings: Painting[]
}

export function GallerySection({ paintings }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const filtered = activeCategory === 'All'
    ? paintings
    : paintings.filter(p => p.category === activeCategory)

  const openLightbox = useCallback((painting: Painting) => {
    setSelectedPainting(painting)
    setLightboxIdx(filtered.findIndex(p => p.id === painting.id))
    document.body.style.overflow = 'hidden'
  }, [filtered])

  const closeLightbox = useCallback(() => {
    setSelectedPainting(null)
    document.body.style.overflow = ''
  }, [])

  const navigate = useCallback((dir: 'prev' | 'next') => {
    const newIdx = dir === 'next'
      ? (lightboxIdx + 1) % filtered.length
      : (lightboxIdx - 1 + filtered.length) % filtered.length
    setLightboxIdx(newIdx)
    setSelectedPainting(filtered[newIdx])
  }, [lightboxIdx, filtered])

  const getWhatsAppOrderUrl = (painting: Painting) => {
    const msg = siteConfig.whatsappMessages.order(painting.deity, painting.sizes[1] || painting.sizes[0])
    return getWhatsAppUrl(msg)
  }

  return (
    <section id="gallery" className="py-24 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          label="Our Gallery"
          title="Sacred Art for Sacred Spaces"
          subtitle="Each painting is handcrafted to order — browse our collection and choose your divine companion."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {paintingCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 text-sm font-body font-medium tracking-wide transition-all duration-300 rounded-sm border',
                activeCategory === cat
                  ? 'bg-maroon border-maroon text-white'
                  : 'bg-transparent border-sandstone text-charcoal-light hover:border-gold hover:text-gold'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <motion.div layout className="gallery-masonry">
          <AnimatePresence mode="popLayout">
            {filtered.map((painting, i) => (
              <motion.div
                key={painting.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="gallery-item"
              >
                <PaintingCard
                  painting={painting}
                  onClick={() => openLightbox(painting)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-heading italic text-2xl text-charcoal-light/60 mb-6">
            Don't see your favorite deity? We paint them all.
          </p>
          <a
            href={getWhatsAppUrl(siteConfig.whatsappMessages.quote)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-saffron inline-flex items-center gap-2"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            Request Custom Painting
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPainting && (
          <LightboxModal
            painting={selectedPainting}
            onClose={closeLightbox}
            onPrev={() => navigate('prev')}
            onNext={() => navigate('next')}
            getOrderUrl={getWhatsAppOrderUrl}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── Painting Card ───────────────────────────────────
function PaintingCard({ painting, onClick }: { painting: Painting; onClick: () => void }) {
  return (
    <motion.div
      className="group relative cursor-pointer card-premium"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image container */}
      <div className={cn(
        'relative overflow-hidden bg-sandstone/20',
        painting.aspectRatio === 'portrait' ? 'aspect-[3/4]' :
        painting.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
      )}>
        <Image
          src={painting.image}
          alt={painting.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <ZoomIn size={20} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Made to Order badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-maroon/90 text-white text-[10px] font-body font-medium tracking-wider uppercase rounded-sm backdrop-blur-sm">
            Made to Order
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4">
        <p className="text-[10px] font-body text-saffron tracking-[0.25em] uppercase mb-1">
          {painting.deity}
        </p>
        <h3 className="font-heading text-lg text-charcoal-dark leading-tight mb-3">
          {painting.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-charcoal-light/60">
            <Clock size={12} strokeWidth={1.5} />
            <span className="text-xs font-body">{painting.deliveryDays}</span>
          </div>
          <span className="text-xs font-body text-charcoal-light/60">{painting.sizes[0]} & more</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Lightbox Modal ───────────────────────────────────
function LightboxModal({
  painting,
  onClose,
  onPrev,
  onNext,
  getOrderUrl,
}: {
  painting: Painting
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  getOrderUrl: (p: Painting) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lightbox-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-sm bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-sm bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors hidden md:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-sm bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors hidden md:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* Modal content */}
      <motion.div
        key={painting.id}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto"
        style={{
          background: 'rgba(15, 7, 3, 0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(184,134,11,0.2)',
          borderRadius: '2px',
        }}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className={cn(
            'relative overflow-hidden',
            painting.aspectRatio === 'portrait' ? 'aspect-[3/4]' :
            painting.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
          )}>
            <Image
              src={painting.image}
              alt={painting.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(184,134,11,0.1) 0%, transparent 100%)'
            }} />
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-saffron text-xs font-body tracking-[0.3em] uppercase mb-2">
                {painting.deity}
              </p>
              <h2 className="font-heading text-3xl text-white mb-2">{painting.name}</h2>
              <p className="text-white/40 text-sm font-body mb-6">{painting.medium}</p>

              {/* Symbolism */}
              <div className="mb-6 p-4 rounded-sm" style={{ background: 'rgba(255,153,51,0.06)', border: '1px solid rgba(255,153,51,0.15)' }}>
                <p className="text-saffron-light text-[10px] font-body tracking-[0.25em] uppercase mb-2">Sacred Symbolism</p>
                <p className="text-white/70 text-sm font-body leading-relaxed">{painting.deitySymbolism}</p>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler size={13} className="text-gold-light" strokeWidth={1.5} />
                  <span className="text-white/50 text-xs font-body tracking-wider uppercase">Available Sizes</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {painting.sizes.map(size => (
                    <span key={size} className="px-2.5 py-1 text-xs font-body text-white/70 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frames */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Frame size={13} className="text-gold-light" strokeWidth={1.5} />
                  <span className="text-white/50 text-xs font-body tracking-wider uppercase">Frame Options</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {painting.frameOptions.map(frame => (
                    <span key={frame} className="px-2.5 py-1 text-xs font-body text-white/70 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {frame}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 p-3 rounded-sm mb-6"
                style={{ background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.15)' }}>
                <Clock size={14} className="text-gold-light shrink-0" strokeWidth={1.5} />
                <p className="text-white/70 text-sm font-body">
                  Estimated delivery: <span className="text-gold-light">{painting.deliveryDays}</span> after confirmation
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a
                href={getOrderUrl(painting)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 rounded-sm"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                Order via WhatsApp
              </a>
              <p className="text-center text-white/30 text-xs font-body italic">
                Contact for personalized quote — pricing based on size & detailing
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
