'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { X, ZoomIn, MessageCircle, ChevronLeft, ChevronRight, Clock, Ruler, Frame, Crown, Maximize2 } from 'lucide-react'
import type { Painting } from '@/data/paintings'
import { paintingCategories } from '@/data/paintings'
import { getWhatsAppUrl, siteConfig } from '@/lib/config'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface GallerySectionProps {
  paintings: Painting[]
}

export function GallerySection({ paintings }: GallerySectionProps) {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')

  const [visibleCount, setVisibleCount] = useState(12)

  const filtered = useMemo(() =>
    activeCategory === 'All' ? paintings : paintings.filter(p => p.category === activeCategory),
    [activeCategory, paintings]
  )

  // Reset visible count when category changes
  useEffect(() => { setVisibleCount(12) }, [activeCategory])

  const visiblePaintings = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const openLightbox = useCallback((painting: Painting, currentFiltered: Painting[]) => {
    setSelectedPainting(painting)
    setLightboxIdx(currentFiltered.findIndex(p => p.id === painting.id))
    document.body.style.overflow = 'hidden'
  }, [])

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedPainting) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedPainting, closeLightbox, navigate])

  const getWhatsAppOrderUrl = (painting: Painting) => {
    const msg = siteConfig.whatsappMessages.order(painting.deity, painting.sizes[1] || painting.sizes[0])
    return getWhatsAppUrl(msg)
  }

  const getCategoryLabel = (cat: string) => cat === 'All' ? t('gallery_filter_all') : cat

  return (
    <section id="gallery" className="py-24 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader
          label={t('gallery_label')}
          title={t('gallery_title')}
          subtitle={t('gallery_subtitle')}
        />

        {/* Gold plating banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="flex items-center gap-2.5 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(184,134,11,0.12), rgba(255,215,0,0.08))',
              border: '1px solid rgba(184,134,11,0.3)',
            }}>
            <Crown size={14} className="text-gold" />
            <span className="text-gold-dark text-xs font-body tracking-[0.3em] uppercase font-medium">
              All Paintings Feature Pure 24K Gold Plating on Sacred Elements
            </span>
            <Crown size={14} className="text-gold" />
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {paintingCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'px-4 py-2 text-sm font-body font-medium tracking-wide transition-all duration-300 rounded-sm border',
                activeCategory === cat
                  ? 'bg-maroon border-maroon text-white shadow-md'
                  : 'bg-transparent border-sandstone text-charcoal-light hover:border-gold hover:text-gold'
              )}
            >
              {getCategoryLabel(cat)}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="gallery-masonry">
          <AnimatePresence mode="popLayout">
            {visiblePaintings.map((painting, i) => (
              <motion.div
                key={painting.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.35) }}
                className="gallery-item"
              >
                <PaintingCard
                  painting={painting}
                  onClick={() => openLightbox(painting, filtered)}
                  index={i}
                  t={t}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 mt-10"
          >
            <button
              onClick={() => setVisibleCount(c => c + 12)}
              className="btn-outline px-8 py-3 text-sm"
            >
              Load More ({filtered.length - visibleCount} remaining)
            </button>
            <p className="text-xs font-body text-charcoal-light/40">
              Showing {visibleCount} of {filtered.length} paintings
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-heading italic text-2xl text-charcoal-light/60 mb-6">
            {t('gallery_custom_cta')}
          </p>
          <a
            href={getWhatsAppUrl(siteConfig.whatsappMessages.quote)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-saffron inline-flex items-center gap-2"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            {t('gallery_request_custom')}
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedPainting && (
          <LightboxModal
            painting={selectedPainting}
            onClose={closeLightbox}
            onPrev={() => navigate('prev')}
            onNext={() => navigate('next')}
            getOrderUrl={getWhatsAppOrderUrl}
            currentIdx={lightboxIdx}
            total={filtered.length}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── Painting Card ───────────────────────────────────
function PaintingCard({ painting, onClick, index, t }: { painting: Painting; onClick: () => void; index: number; t: (k: string) => string }) {
  return (
    <motion.div
      className="group relative cursor-pointer card-premium"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={cn(
        'relative overflow-hidden bg-sandstone/20',
        painting.aspectRatio === 'portrait' ? 'aspect-[3/4]' :
        painting.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
      )}>
        <Image
          src={painting.image}
          alt={painting.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 384px, 320px"
          priority={index < 4}
          loading={index < 4 ? 'eager' : 'lazy'}
          quality={65}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIRAAAQQCAgMAAAAAAAAAAAAAAQIDBBEABRIhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmFn1La6llNR4GMxKkFLhSqOkFJBBB36gjBJJPfGMYwAEn//Z"
        />

        {/* Dark gradient overlay on hover */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'linear-gradient(to top, rgba(10,4,2,0.8) 0%, rgba(10,4,2,0.3) 50%, transparent 100%)' }}
        />

        {/* Zoom icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
            <Maximize2 size={20} className="text-white" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Painting name on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-heading text-white text-lg leading-tight drop-shadow-lg">{painting.name}</p>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 bg-maroon/90 text-white text-[9px] font-body font-medium tracking-wider uppercase rounded-sm backdrop-blur-sm">
            {t('gallery_made_to_order')}
          </span>
          {painting.hasGoldPlating && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-2.5 py-1 text-[9px] font-body font-medium tracking-wider uppercase rounded-sm backdrop-blur-sm flex items-center gap-1"
              style={{
                background: 'linear-gradient(135deg, rgba(184,134,11,0.9), rgba(255,215,0,0.8))',
                color: '#1A0A05',
              }}
            >
              <Crown size={8} />
              {t('gallery_gold_plated')}
            </motion.span>
          )}
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4">
        <p className="text-[10px] font-body text-saffron tracking-[0.25em] uppercase mb-1">{painting.deity}</p>
        <h3 className="font-heading text-lg text-charcoal-dark leading-tight mb-2">{painting.name}</h3>
        <p className="text-xs font-body text-charcoal-light/60 leading-relaxed line-clamp-2 mb-3">
          {painting.description.split('.')[0]}.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-charcoal-light/60">
            <Clock size={11} strokeWidth={1.5} />
            <span className="text-[11px] font-body">{painting.deliveryDays}</span>
          </div>
          <span className="text-[11px] font-body text-charcoal-light/50">{painting.sizes[0]} & more</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Fullscreen Lightbox Modal ────────────────────────
function LightboxModal({
  painting, onClose, onPrev, onNext, getOrderUrl, currentIdx, total, t,
}: {
  painting: Painting
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  getOrderUrl: (p: Painting) => string
  currentIdx: number
  total: number
  t: (k: string) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(5,2,1,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/15"
        aria-label={t('gallery_close')}
      >
        <X size={18} />
      </motion.button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-white/50 text-xs font-body"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {currentIdx + 1} / {total}
      </div>

      {/* Nav arrows */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/12 hidden md:flex"
      >
        <ChevronLeft size={22} />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/12 hidden md:flex"
      >
        <ChevronRight size={22} />
      </motion.button>

      {/* Main content */}
      <motion.div
        key={painting.id}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-6xl mx-4 md:mx-16 max-h-[92vh] overflow-y-auto rounded-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(20,8,3,0.98) 0%, rgba(30,12,5,0.98) 100%)',
          border: '1px solid rgba(184,134,11,0.25)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(184,134,11,0.1)',
        }}
      >
        <div className="grid md:grid-cols-[1fr_1.1fr]">
          {/* Full Image Panel */}
          <div className="relative">
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
                sizes="(max-width: 768px) 100vw, 640px"
                quality={78}
              />
              {/* Subtle gold overlay */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(184,134,11,0.06) 0%, transparent 60%)'
              }} />
            </div>

            {/* Mobile nav */}
            <div className="flex md:hidden items-center justify-between px-4 py-3 border-t border-white/10">
              <button onClick={onPrev} className="flex items-center gap-2 text-white/60 text-sm font-body">
                <ChevronLeft size={16} /> Prev
              </button>
              <span className="text-white/40 text-xs font-body">{currentIdx + 1} / {total}</span>
              <button onClick={onNext} className="flex items-center gap-2 text-white/60 text-sm font-body">
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Details Panel */}
          <div className="p-7 flex flex-col justify-between">
            <div>
              <p className="text-saffron text-[10px] font-body tracking-[0.35em] uppercase mb-2">{painting.deity}</p>
              <h2 className="font-heading text-2xl md:text-3xl text-white mb-1 leading-tight">{painting.name}</h2>
              <p className="text-white/40 text-sm font-body mb-5">{painting.medium}</p>

              {/* Gold plating highlight */}
              {painting.hasGoldPlating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 mb-5 px-4 py-2.5 rounded-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(184,134,11,0.15), rgba(255,215,0,0.08))',
                    border: '1px solid rgba(184,134,11,0.3)',
                  }}
                >
                  <Crown size={14} className="text-gold-shine shrink-0" />
                  <p className="text-gold-light text-xs font-body leading-relaxed">{t('gallery_gold_note')}</p>
                </motion.div>
              )}

              {/* Description */}
              <p className="text-white/70 text-sm font-body leading-relaxed mb-5">{painting.description}</p>

              {/* Sacred Symbolism */}
              <div className="mb-5 p-4 rounded-sm" style={{ background: 'rgba(255,153,51,0.06)', border: '1px solid rgba(255,153,51,0.15)' }}>
                <p className="text-saffron-light text-[10px] font-body tracking-[0.25em] uppercase mb-2">{t('gallery_symbolism')}</p>
                <p className="text-white/65 text-sm font-body leading-relaxed">{painting.deitySymbolism}</p>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler size={12} className="text-gold-light" strokeWidth={1.5} />
                  <span className="text-white/45 text-[10px] font-body tracking-wider uppercase">{t('gallery_sizes')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {painting.sizes.map(size => (
                    <span key={size}
                      className="px-2.5 py-1 text-xs font-body text-white/65 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frames */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Frame size={12} className="text-gold-light" strokeWidth={1.5} />
                  <span className="text-white/45 text-[10px] font-body tracking-wider uppercase">{t('gallery_frames')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {painting.frameOptions.map(frame => (
                    <span key={frame}
                      className="px-2.5 py-1 text-xs font-body text-white/65 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {frame}
                    </span>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-2 p-3 rounded-sm mb-5"
                style={{ background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.15)' }}>
                <Clock size={13} className="text-gold-light shrink-0" strokeWidth={1.5} />
                <p className="text-white/65 text-sm font-body">
                  {t('gallery_delivery')}: <span className="text-gold-light">{painting.deliveryDays}</span> {t('gallery_delivery_after')}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <motion.a
                href={getOrderUrl(painting)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 rounded-sm"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                {t('gallery_order_whatsapp')}
              </motion.a>
              <p className="text-center text-white/30 text-xs font-body italic">
                {t('gallery_quote_note')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
