import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';

/* ────────────────────────────────────────────────────────────────
   Product image with logo watermark overlay
   ──────────────────────────────────────────────────────────────── */
function ProductImage({ src, alt, className, loading }: { src: string; alt: string; className?: string; loading?: 'eager' | 'lazy' }) {
  return (
    <div className="relative">
      <img src={src} alt={alt} className={className} loading={loading} />
      <img
        src="/assets/logo-watermark.png"
        alt=""
        aria-hidden="true"
        className="absolute top-2 right-2 w-[30%] max-w-[120px] opacity-40 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}

export interface CollectionSection {
  title: string;
  subtitle: string;
  images: string[];
}

export interface CollectionCategory {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  cover: string;
  images: string[];
  video?: string;
  sections?: CollectionSection[];
}

const mariageRings = [
  '/products/r1.jpg', '/products/r2.jpg', '/products/r3.jpg',
  '/products/r4.jpg', '/products/r5.jpg', '/products/r6.jpg',
  '/products/r8.jpg', '/products/r9.jpg', '/products/r10.jpg',
  '/products/r11.jpg', '/products/r12.jpg',
];

const mariageParures = [
  '/products/m1.jpg', '/products/m2.jpg',
];

export const collections: CollectionCategory[] = [
  {
    id: 'mariage',
    name: 'Pack Mariage',
    subtitle: 'Solitaires, Alliances & Parures',
    description: 'Des bagues solitaires étincelantes aux parures complètes, pour le plus beau jour de votre vie.',
    cover: '/products/r12.jpg',
    video: '/products/vd-mariage.mp4',
    images: ['/products/r12.jpg', ...mariageRings, ...mariageParures],
    sections: [
      { title: 'Bagues Solitaires', subtitle: 'L\'éclat d\'un engagement éternel', images: mariageRings },
      { title: 'Parures de Mariage', subtitle: 'L\'ensemble parfait pour votre jour J', images: mariageParures },
    ],
  },
  {
    id: 'tradition',
    name: 'Chichkhan',
    subtitle: 'Héritage Tunisien',
    description: "L'art ancestral de la joaillerie tunisienne sublimé dans des parures majestueuses.",
    cover: '/products/IMG_4091.jpg',
    video: '/products/vd-chichkhan.mp4',
    images: [
      '/products/IMG_4091.jpg', '/products/IMG_E4100.jpg', '/products/IMG_E4095.jpg', '/products/IMG_E4105.jpg',
      '/products/IMG_4094.jpg', '/products/IMG_4095.jpg', '/products/IMG_4096.jpg',
      '/products/IMG_4097.jpg', '/products/IMG_4098.jpg', '/products/IMG_4099.jpg',
      '/products/IMG_4100.jpg', '/products/IMG_4101.jpg', '/products/IMG_4102.jpg',
      '/products/IMG_4103.jpg', '/products/IMG_4104.jpg', '/products/IMG_4105.jpg',
      '/products/IMG_4106.jpg', '/products/IMG_4107.jpg',
    ],
  },
  {
    id: 'tendance',
    name: 'Tendance',
    subtitle: 'Van Cleef & Cartier',
    description: 'Les pièces les plus recherchées du moment. Inspirées des grandes maisons.',
    cover: '/products/cover-tendance.jpg',
    video: '/products/vd-tendance.mp4',
    images: [
      '/products/cover-tendance.jpg',
      '/products/tendance1.jpg', '/products/tendance2.jpg', '/products/tendance3.jpg',
      '/products/tendance4.jpg', '/products/tendance5.jpg', '/products/tendance6.jpg',
      '/products/tendance7.jpg', '/products/tendance8.jpg', '/products/tendance9.jpg',
    ],
  },
  {
    id: 'eclat',
    name: "Éclat d'Or",
    subtitle: 'Brillance & Raffinement',
    description: "Quand l'or capture la lumière et sublime chaque geste.",
    cover: '/products/t1.jpg',
    video: '/products/vd-eclat.mp4',
    images: [
      '/products/t1.jpg', '/products/t2.jpg', '/products/t3.jpg', '/products/t4.jpg',
    ],
  },
  {
    id: 'lira',
    name: 'Lira',
    subtitle: 'Or Italien Raffiné',
    description: "La finesse de l'or italien dans des créations d'une légèreté exceptionnelle.",
    cover: '/products/lira1.jpg',
    video: '/products/vd-lira.mp4',
    images: [
      '/products/lira1.jpg', '/products/lira2.jpg', '/products/lira3.jpg',
      '/products/lira4.jpg', '/products/lira5.jpg', '/products/lira6.jpg',
    ],
  },
  {
    id: 'perles',
    name: 'Perles',
    subtitle: 'Perles Fines & Précieuses',
    description: "L'élégance intemporelle des perles naturelles. Colliers, boucles et parures d'une rare beauté.",
    cover: '/products/IMG_E4214.jpg',
    video: '/products/vd-perles.mp4',
    images: [
      '/products/IMG_E4214.jpg', '/products/IMG_E4215.jpg',
      '/products/IMG_E4217.jpg', '/products/IMG_E4218.jpg', '/products/IMG_4214.jpg',
    ],
  },
];

/* ════════════════════════════════════════════════════════════════
   LIGHTBOX — shared across all themes
   ════════════════════════════════════════════════════════════════ */
function Lightbox({
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[10000] bg-black/97 flex items-center justify-center"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.25em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {selectedIndex + 1} / {images.length}
      </div>
      <button className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/30 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/30 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
      </button>
      <AnimatePresence mode="wait">
        <motion.div key={selectedIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }} className="relative" onClick={(e) => e.stopPropagation()}>
          <img src={images[selectedIndex]} alt="" className="max-h-[85vh] max-w-[85vw] object-contain select-none" draggable={false} />
          <img src="/assets/logo-watermark.png" alt="" aria-hidden="true" className="absolute top-4 right-4 w-[18%] max-w-[140px] opacity-50 pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   🤍 MARIAGE — Éditorial luxe, storytelling immersif
   ════════════════════════════════════════════════════════════════ */
function MariageGallery({ collection, onClose, onSelect, selectedIndex, goNext, goPrev }: GalleryInnerProps) {
  const sections = collection.sections || [];
  const rings = sections[0]?.images || [];
  const parures = sections[1]?.images || [];
  const gi = (img: string) => collection.images.indexOf(img);

  // Editorial layout: rings split into visual rows
  const editorialRows = [
    // Row 1: 2 large side by side
    rings.slice(0, 2),
    // Row 2: 3 medium
    rings.slice(2, 5),
    // Row 3: 1 full-width cinematic
    rings.slice(5, 6),
    // Row 4: 2 large side by side
    rings.slice(6, 8),
    // Row 5: remaining
    rings.slice(8, -1),
  ].filter(r => r.length > 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-[#0d0906]">
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* ── Minimal header ── */}
        <div className="sticky top-0 z-50 bg-[#0d0906]/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-[#C9A96E]/70 hover:text-[#C9A96E] transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="text-[10px] tracking-[0.25em] uppercase">Retour</span>
            </button>
            <p className="text-[10px] text-[#C9A96E]/30 tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Collection Mariage</p>
          </div>
        </div>

        {/* ══════════════════════════════════════════
           HERO — Full-screen cinematic r12 showcase
           ══════════════════════════════════════════ */}
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background: video */}
          {collection.video && (
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover opacity-50" src={collection.video} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0906]/30 via-[#0d0906]/20 to-[#0d0906]" />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6">
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.5 }} className="h-px bg-[#C9A96E]/40 mx-auto mb-8" />

            <p className="text-[#C9A96E]/60 text-[10px] tracking-[0.5em] uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Collection Exclusive
            </p>

            <h1 className="text-6xl md:text-9xl text-[#F5EFE6] mb-4 leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>
              Pack<br />Mariage
            </h1>

            <p className="text-[#C9A96E]/40 text-xs max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {collection.description}
            </p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-14">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: 3 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.3"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
           SECTION 1 — Bagues Solitaires (Éditorial)
           ══════════════════════════════════════════ */}
        <div className="relative" style={{ background: 'linear-gradient(180deg, #0d0906 0%, #F5ECE3 8%, #FDF8F3 20%)' }}>

          {/* Section title — cinematic reveal */}
          <div className="text-center py-20 md:py-28 px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-[#C9A96E]/30" />
                <div className="w-2 h-2 rounded-full bg-[#C9A96E]/40" />
                <div className="h-px w-16 bg-[#C9A96E]/30" />
              </div>
              <p className="text-[#8B6914]/50 text-[10px] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Chapitre I</p>
              <h2 className="text-4xl md:text-7xl text-[#3D2B1F]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>Bagues Solitaires</h2>
              <p className="text-[#8B6914]/40 text-xs mt-4 tracking-[0.15em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>L'éclat d'un engagement éternel</p>
            </motion.div>
          </div>

          {/* Editorial rows — alternating layouts */}
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {editorialRows.map((row, rowIdx) => {
              if (row.length === 1) {
                // Full-width cinematic shot
                return (
                  <motion.div key={rowIdx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7 }}
                    className="my-6 md:my-10 cursor-pointer group" onClick={() => onSelect(gi(row[0]))}>
                    <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_30px_80px_rgba(139,105,20,0.08)]">
                      <ProductImage src={row[0]} alt="" className="w-full h-auto max-h-[75vh] object-contain mx-auto transition-transform duration-1000 group-hover:scale-[1.02]" />
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/60 to-transparent" />
                    </div>
                  </motion.div>
                );
              }

              if (row.length === 2) {
                // Two large images — asymmetric heights
                return (
                  <div key={rowIdx} className="grid grid-cols-2 gap-4 md:gap-6 my-6 md:my-10">
                    {row.map((img, i) => (
                      <motion.div key={img} initial={{ opacity: 0, y: 30, x: i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.15 }}
                        className="cursor-pointer group" onClick={() => onSelect(gi(img))}>
                        <div className={`overflow-hidden rounded-2xl bg-white/80 shadow-[0_15px_50px_rgba(139,105,20,0.06)] group-hover:shadow-[0_25px_70px_rgba(139,105,20,0.14)] transition-all duration-500 ${i === 0 ? 'mt-0 md:mt-8' : 'mt-0 md:-mt-4'}`}>
                          <div className="p-3 md:p-4">
                            <div className="overflow-hidden rounded-xl">
                              <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              }

              if (row.length === 3) {
                // Three in a row — middle one elevated
                return (
                  <div key={rowIdx} className="grid grid-cols-3 gap-3 md:gap-5 my-6 md:my-10 items-center">
                    {row.map((img, i) => (
                      <motion.div key={img} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="cursor-pointer group" onClick={() => onSelect(gi(img))}>
                        <div className={`overflow-hidden rounded-xl bg-white/80 shadow-[0_10px_40px_rgba(139,105,20,0.06)] group-hover:shadow-[0_20px_60px_rgba(139,105,20,0.15)] transition-all duration-500 ${i === 1 ? 'scale-105 md:scale-110 z-10 relative' : ''}`}>
                          <div className="p-2 md:p-3">
                            <div className="overflow-hidden rounded-lg">
                              <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.05]" loading="lazy" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              }

              // Fallback: masonry-style stagger
              return (
                <div key={rowIdx} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 my-6 md:my-10">
                  {row.map((img, i) => (
                    <motion.div key={img} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="cursor-pointer group" onClick={() => onSelect(gi(img))}>
                      <div className="overflow-hidden rounded-xl bg-white/80 shadow-[0_8px_30px_rgba(139,105,20,0.06)] group-hover:shadow-[0_15px_50px_rgba(139,105,20,0.15)] transition-all duration-500">
                        <div className="p-2 md:p-3">
                          <div className="overflow-hidden rounded-lg">
                            <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════
           TRANSITION — Elegant chapter break
           ══════════════════════════════════════════ */}
        <div className="bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-20 md:py-32 text-center px-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#C9A96E]/20" />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A96E" opacity="0.25"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#C9A96E]/20" />
              </div>
              <p className="text-[#3D2B1F]/15 text-7xl md:text-9xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>
                &
              </p>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
           SECTION 2 — Parures (Full editorial spread)
           ══════════════════════════════════════════ */}
        <div style={{ background: 'linear-gradient(180deg, #FDF8F3 0%, #F5ECE3 50%, #FDF8F3 100%)' }}>
          {/* Section title */}
          <div className="text-center pt-4 pb-16 md:pb-24 px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[#8B6914]/50 text-[10px] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Chapitre II</p>
              <h2 className="text-4xl md:text-7xl text-[#3D2B1F]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>Parures de Mariage</h2>
              <p className="text-[#8B6914]/40 text-xs mt-4 tracking-[0.15em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>L'ensemble parfait pour votre jour J</p>
            </motion.div>
          </div>

          {/* Each parure gets a full cinematic spread */}
          {parures.map((img, i) => (
            <motion.div key={img} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto px-6 md:px-12 mb-16 md:mb-24 cursor-pointer group" onClick={() => onSelect(gi(img))}>

              {/* Parure label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-full border border-[#C9A96E]/30 flex items-center justify-center">
                  <span className="text-[#8B6914]/60 text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="h-px flex-1 bg-[#D4A373]/15" />
                <p className="text-[#8B6914]/40 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Parure {i === 0 ? 'Royale' : 'Impériale'}</p>
              </div>

              {/* Full-width image with premium frame */}
              <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(139,105,20,0.1)] group-hover:shadow-[0_40px_100px_rgba(139,105,20,0.18)] transition-all duration-700">
                <div className="bg-white p-4 md:p-6 rounded-2xl">
                  <div className="overflow-hidden rounded-xl">
                    <ProductImage src={img} alt={`Parure ${i + 1}`} className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]" loading="lazy" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
           CTA — Elegant closing
           ══════════════════════════════════════════ */}
        <div style={{ background: 'linear-gradient(180deg, #FDF8F3 0%, #0d0906 100%)' }}>
          <div className="text-center py-20 md:py-32 px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-16 bg-[#C9A96E]/20" />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E" opacity="0.3"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                <div className="h-px w-16 bg-[#C9A96E]/20" />
              </div>
              <p className="text-[#8B6914]/40 text-[10px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Prête pour le plus beau jour ?</p>
              <h3 className="text-3xl md:text-5xl text-[#3D2B1F] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>Réservez votre<br />essayage privé</h3>
              <a href="tel:+21697476401" className="inline-block px-12 py-5 bg-[#3D2B1F] text-[#F5EFE6] tracking-[0.2em] uppercase text-xs hover:bg-[#8B6914] transition-all duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                +216 97 476 401
              </a>
            </motion.div>
          </div>
        </div>

      </div>
      <AnimatePresence>
        {selectedIndex !== null && <Lightbox images={collection.images} selectedIndex={selectedIndex} onClose={() => onSelect(null)} onNext={goNext} onPrev={goPrev} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   🏛️ TRADITION — Fond bordeaux sombre, or riche, ornements
   ════════════════════════════════════════════════════════════════ */
function TraditionGallery({ collection, onClose, onSelect, selectedIndex, goNext, goPrev }: GalleryInnerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999]" style={{ background: 'linear-gradient(180deg, #1a0a0a 0%, #140808 40%, #0d0505 100%)' }}>
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-[#C9A96E]/20" style={{ backgroundColor: 'rgba(20,8,8,0.9)' }}>
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-[#C9A96E] hover:text-[#E0D0A0] transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="text-xs tracking-[0.2em] uppercase">Retour</span>
            </button>
            <p className="text-xs text-[#C9A96E]/50 tracking-[0.15em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.images.length} pièces</p>
          </div>
        </div>

        {/* Hero — Video background */}
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {collection.video && (
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover opacity-50" src={collection.video} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,10,10,0.3) 0%, rgba(26,10,10,0.2) 50%, rgba(13,5,5,1) 100%)' }} />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E" opacity="0.6"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
              <div className="h-px w-8 bg-[#C9A96E]/60" />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E" opacity="0.6"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A96E]/60" />
            </div>
            <p className="text-[#C9A96E]/60 text-[10px] tracking-[0.5em] uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.subtitle}</p>
            <h1 className="text-6xl md:text-9xl text-[#F5EFE6] mb-4 leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{collection.name}</h1>
            <p className="text-[#C9A96E]/40 text-xs max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.description}</p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-14">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: 3 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.3"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pb-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto mb-8 cursor-pointer group" onClick={() => onSelect(0)}>
            <div className="relative p-4 md:p-6 border-2 border-[#C9A96E]/30 group-hover:border-[#C9A96E]/60 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #1a1008 0%, #0d0805 100%)', boxShadow: '0 0 60px rgba(201,169,110,0.08)' }}>
              <div className="absolute top-1 left-1 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E]/40" />
              <div className="absolute top-1 right-1 w-8 h-8 border-t-2 border-r-2 border-[#C9A96E]/40" />
              <div className="absolute bottom-1 left-1 w-8 h-8 border-b-2 border-l-2 border-[#C9A96E]/40" />
              <div className="absolute bottom-1 right-1 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E]/40" />
              <ProductImage src={collection.images[0]} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {collection.images.slice(1).map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.5) }} className="cursor-pointer group" onClick={() => onSelect(i + 1)}>
                <div className="relative p-2 md:p-3 border border-[#C9A96E]/20 group-hover:border-[#C9A96E]/50 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #1a1008 0%, #0d0805 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A96E]/30" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C9A96E]/30" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C9A96E]/30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A96E]/30" />
                  <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-4 border-t border-[#C9A96E]/15">
          <p className="text-[#C9A96E]/40 text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Un héritage à offrir ?</p>
          <h3 className="text-2xl md:text-3xl text-[#F5EFE6] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>Contactez-nous</h3>
          <a href="tel:+21697476401" className="inline-block px-10 py-4 border-2 border-[#C9A96E] text-[#C9A96E] tracking-[0.15em] uppercase text-sm hover:bg-[#C9A96E] hover:text-[#0d0505] transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>+216 97 476 401</a>
        </div>

      </div>
      <AnimatePresence>
        {selectedIndex !== null && <Lightbox images={collection.images} selectedIndex={selectedIndex} onClose={() => onSelect(null)} onNext={goNext} onPrev={goPrev} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   💎 TENDANCE — Noir pur, ultra minimal, platine
   ════════════════════════════════════════════════════════════════ */
function TendanceGallery({ collection, onClose, onSelect, selectedIndex, goNext, goPrev }: GalleryInnerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black">
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            <span className="text-[10px] tracking-[0.3em] uppercase font-light">Retour</span>
          </button>
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.images.length} pièces</p>
        </div>
      </div>

      {/* Hero — Video background */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {collection.video && (
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover opacity-50" src={collection.video} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6">
          <motion.div initial={{ width: 0 }} animate={{ width: 50 }} transition={{ duration: 0.8, delay: 0.4 }} className="h-px bg-white/20 mx-auto mb-10" />
          <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-5 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.subtitle}</p>
          <h1 className="text-6xl md:text-9xl text-white mb-4 font-extralight tracking-[0.1em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.name}</h1>
          <div className="w-16 h-px bg-white/10 mx-auto mt-6 mb-4" />
          <p className="text-white/25 text-xs max-w-sm mx-auto font-light tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.description}</p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-14">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: 3 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" opacity="0.2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gallery — Editorial luxury layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">

        {/* Hero product — full width cinematic */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20 cursor-pointer group" onClick={() => onSelect(0)}>
          <div className="relative overflow-hidden" style={{ boxShadow: '0 0 80px rgba(255,255,255,0.03)' }}>
            <div className="border border-white/5 group-hover:border-white/15 transition-all duration-700 p-4 md:p-8 bg-[#0a0a0a]">
              <ProductImage src={collection.images[0]} alt="" className="w-full h-auto max-h-[70vh] object-contain mx-auto transition-transform duration-1000 group-hover:scale-[1.02]" />
            </div>
          </div>
        </motion.div>

        {/* Editorial pairs — alternating large/small layouts */}
        {(() => {
          const rest = collection.images.slice(1);
          const rows: string[][] = [];
          let idx = 0;
          // Pattern: 2, 1 (full), 3, 2, 1 (full), remaining
          const pattern = [2, 1, 3, 2, 1];
          for (const count of pattern) {
            if (idx >= rest.length) break;
            rows.push(rest.slice(idx, idx + count));
            idx += count;
          }
          if (idx < rest.length) rows.push(rest.slice(idx));

          return rows.map((row, rowIdx) => {
            if (row.length === 1) {
              // Full-width cinematic
              return (
                <motion.div key={rowIdx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.8 }}
                  className="my-10 md:my-16 cursor-pointer group" onClick={() => onSelect(collection.images.indexOf(row[0]))}>
                  <div className="max-w-4xl mx-auto">
                    <div className="border border-white/5 group-hover:border-white/15 transition-all duration-700 p-4 md:p-8 bg-[#0a0a0a]" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                      <ProductImage src={row[0]} alt="" className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]" loading="lazy" />
                    </div>
                  </div>
                </motion.div>
              );
            }

            if (row.length === 2) {
              // Two images — asymmetric elegant
              return (
                <div key={rowIdx} className="grid grid-cols-2 gap-4 md:gap-8 my-8 md:my-14">
                  {row.map((img, i) => (
                    <motion.div key={img} initial={{ opacity: 0, y: 30, x: i === 0 ? -15 : 15 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.15 }}
                      className="cursor-pointer group" onClick={() => onSelect(collection.images.indexOf(img))}>
                      <div className={`border border-white/5 group-hover:border-white/15 transition-all duration-700 p-3 md:p-6 bg-[#0a0a0a] ${i === 0 ? 'md:mt-8' : 'md:-mt-4'}`} style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                        <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            }

            // Three images — center elevated
            return (
              <div key={rowIdx} className="grid grid-cols-3 gap-3 md:gap-6 my-8 md:my-14 items-center">
                {row.map((img, i) => (
                  <motion.div key={img} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="cursor-pointer group" onClick={() => onSelect(collection.images.indexOf(img))}>
                    <div className={`border border-white/5 group-hover:border-white/15 transition-all duration-700 p-2 md:p-5 bg-[#0a0a0a] ${i === 1 ? 'scale-105 md:scale-110 z-10 relative' : ''}`} style={{ boxShadow: '0 15px 50px rgba(0,0,0,0.4)' }}>
                      <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          });
        })()}
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center py-16 px-4">
        <div className="w-8 h-px bg-white/10 mx-auto mb-8" />
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-2 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>Réservation privée</p>
        <a href="tel:+21697476401" className="inline-block px-12 py-4 border border-white/15 text-white/50 tracking-[0.2em] uppercase text-xs font-light hover:border-white/40 hover:text-white transition-all duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>+216 97 476 401</a>
      </div>

      </div>
      <AnimatePresence>
        {selectedIndex !== null && <Lightbox images={collection.images} selectedIndex={selectedIndex} onClose={() => onSelect(null)} onNext={goNext} onPrev={goPrev} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   🌟 ÉCLAT D'OR — Fond noir profond, reflets or, luxueux
   ════════════════════════════════════════════════════════════════ */
function EclatGallery({ collection, onClose, onSelect, selectedIndex, goNext, goPrev }: GalleryInnerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999]" style={{ background: '#080604' }}>
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-[#D4A050]/10" style={{ backgroundColor: 'rgba(8,6,4,0.85)' }}>
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-[#D4A050]/60 hover:text-[#D4A050] transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="text-[10px] tracking-[0.25em] uppercase">Retour</span>
            </button>
            <p className="text-[10px] text-[#D4A050]/25 tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.images.length} pièces</p>
          </div>
        </div>

        {/* Hero — Video background + golden title */}
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {collection.video && (
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover opacity-50" src={collection.video} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080604]/40 via-[#080604]/20 to-[#080604]" />
          {/* Gold shimmer overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 40%, #D4A050 0%, transparent 70%)' }} />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="relative z-10 text-center px-6">
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="h-px w-16 bg-gradient-to-r from-transparent via-[#D4A050]/50 to-transparent mx-auto mb-10" />
            <p className="text-[#D4A050]/40 text-[10px] tracking-[0.6em] uppercase mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Collection</p>
            <h1 className="text-6xl md:text-[10rem] leading-[0.8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', color: 'transparent', backgroundImage: 'linear-gradient(180deg, #F5E6C8 0%, #D4A050 50%, #8B6914 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Éclat
            </h1>
            <p className="text-[#D4A050]/50 text-lg md:text-2xl tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>d'Or</p>
            <p className="text-[#D4A050]/25 text-xs max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.description}</p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-16">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: 3 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A050" strokeWidth="1" opacity="0.25"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery — luxury gold-on-black editorial */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">

          {/* Full-width hero image */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="mb-10 md:mb-16 cursor-pointer group" onClick={() => onSelect(0)}>
            <div className="relative overflow-hidden" style={{ boxShadow: '0 0 100px rgba(212,160,80,0.06)' }}>
              <div className="border border-[#D4A050]/10 group-hover:border-[#D4A050]/25 transition-all duration-700 p-3 md:p-5" style={{ background: 'linear-gradient(135deg, #0f0c08 0%, #080604 100%)' }}>
                <ProductImage src={collection.images[0]} alt="" className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]" />
              </div>
              {/* Gold glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(212,160,80,0.04)' }} />
            </div>
          </motion.div>

          {/* Remaining images — asymmetric 2-col with gold accents */}
          {collection.images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {collection.images.slice(1).map((img, i) => (
                <motion.div key={img} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.12 }}
                  className={`cursor-pointer group ${i % 2 === 0 ? 'md:mt-0' : 'md:mt-12'}`} onClick={() => onSelect(i + 1)}>
                  {/* Numbering */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#D4A050]/20 text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{String(i + 2).padStart(2, '0')}</span>
                    <div className="h-px flex-1 bg-[#D4A050]/8" />
                  </div>
                  <div className="overflow-hidden border border-[#D4A050]/8 group-hover:border-[#D4A050]/20 transition-all duration-700 p-3 md:p-4" style={{ background: 'linear-gradient(135deg, #0f0c08 0%, #080604 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                    <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center py-20 px-6 border-t border-[#D4A050]/8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4A050]/30 to-transparent mx-auto mb-10" />
          <p className="text-[#D4A050]/25 text-[10px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Laissez-vous séduire</p>
          <h3 className="text-3xl md:text-5xl text-[#F5EFE6] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>Prenez rendez-vous</h3>
          <a href="tel:+21697476401" className="inline-block px-12 py-4 text-[#D4A050]/60 tracking-[0.2em] uppercase text-xs hover:text-[#080604] transition-all duration-500 border border-[#D4A050]/25 hover:bg-[#D4A050] hover:border-[#D4A050]" style={{ fontFamily: "'Montserrat', sans-serif" }}>+216 97 476 401</a>
        </div>

      </div>
      <AnimatePresence>
        {selectedIndex !== null && <Lightbox images={collection.images} selectedIndex={selectedIndex} onClose={() => onSelect(null)} onNext={goNext} onPrev={goPrev} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ✨ LIRA — Or chaud, fond ambre sombre, élégance italienne
   ════════════════════════════════════════════════════════════════ */
function LiraGallery({ collection, onClose, onSelect, selectedIndex, goNext, goPrev }: GalleryInnerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999]" style={{ background: 'linear-gradient(180deg, #110d08 0%, #1a1409 40%, #0e0b06 100%)' }}>
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-[#C9A96E]/15" style={{ backgroundColor: 'rgba(17,13,8,0.85)' }}>
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-[#C9A96E]/70 hover:text-[#C9A96E] transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="text-[10px] tracking-[0.25em] uppercase">Retour</span>
            </button>
            <p className="text-[10px] text-[#C9A96E]/30 tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.images.length} pièces</p>
          </div>
        </div>

        {/* Hero — Video + Title overlay */}
        <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background video */}
          {collection.video && (
            <video
              autoPlay muted loop playsInline preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              src={collection.video}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#110d08]/50 via-[#110d08]/30 to-[#110d08]" />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6">
            <motion.div initial={{ width: 0 }} animate={{ width: 50 }} transition={{ duration: 0.8, delay: 0.4 }} className="h-px bg-[#C9A96E]/40 mx-auto mb-8" />
            <p className="text-[#C9A96E]/50 text-[10px] tracking-[0.5em] uppercase mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Or Italien</p>
            <h1 className="text-7xl md:text-9xl text-[#F5EFE6] leading-[0.85] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>
              Lira
            </h1>
            <p className="text-[#C9A96E]/35 text-xs max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.description}</p>

            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-14">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: 3 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.3"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery — editorial warm gold layout */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">

          {/* First image — full width cinematic */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12 cursor-pointer group" onClick={() => onSelect(0)}>
            <div className="relative overflow-hidden rounded-xl border border-[#C9A96E]/10 group-hover:border-[#C9A96E]/30 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #1a1409 0%, #110d08 100%)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
              <div className="p-4 md:p-6">
                <div className="overflow-hidden rounded-lg">
                  <ProductImage src={collection.images[0]} alt="" className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]" />
                </div>
              </div>
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#C9A96E]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" /></svg>
              </div>
            </div>
          </motion.div>

          {/* 2 images side by side — asymmetric */}
          {collection.images.length > 2 && (
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              {collection.images.slice(1, 3).map((img, i) => (
                <motion.div key={img} initial={{ opacity: 0, y: 30, x: i === 0 ? -15 : 15 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="cursor-pointer group" onClick={() => onSelect(i + 1)}>
                  <div className={`overflow-hidden rounded-xl border border-[#C9A96E]/10 group-hover:border-[#C9A96E]/25 transition-all duration-500 ${i === 0 ? 'md:mt-8' : 'md:-mt-4'}`} style={{ background: 'linear-gradient(135deg, #1a1409 0%, #110d08 100%)', boxShadow: '0 15px 50px rgba(0,0,0,0.3)' }}>
                    <div className="p-3 md:p-4">
                      <div className="overflow-hidden rounded-lg">
                        <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Remaining images — elegant staggered */}
          {collection.images.length > 3 && (
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {collection.images.slice(3).map((img, i) => (
                <motion.div key={img} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="cursor-pointer group" onClick={() => onSelect(i + 3)}>
                  <div className="overflow-hidden rounded-xl border border-[#C9A96E]/10 group-hover:border-[#C9A96E]/25 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #1a1409 0%, #110d08 100%)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
                    <div className="p-3 md:p-4">
                      <div className="overflow-hidden rounded-lg">
                        <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center py-16 px-4 border-t border-[#C9A96E]/10">
          <p className="text-[#C9A96E]/30 text-[10px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Craquez pour l'or italien ?</p>
          <h3 className="text-2xl md:text-4xl text-[#F5EFE6] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>Contactez-nous</h3>
          <a href="tel:+21697476401" className="inline-block px-12 py-4 border border-[#C9A96E]/30 text-[#C9A96E]/70 tracking-[0.2em] uppercase text-xs hover:bg-[#C9A96E] hover:text-[#110d08] transition-all duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>+216 97 476 401</a>
        </div>

      </div>
      <AnimatePresence>
        {selectedIndex !== null && <Lightbox images={collection.images} selectedIndex={selectedIndex} onClose={() => onSelect(null)} onNext={goNext} onPrev={goPrev} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   🦪 PERLES — Bleu nuit profond, nacré, doux
   ════════════════════════════════════════════════════════════════ */
function PerlesGallery({ collection, onClose, onSelect, selectedIndex, goNext, goPrev }: GalleryInnerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999]" style={{ background: 'linear-gradient(180deg, #0a0e14 0%, #0d1118 40%, #080c12 100%)' }}>
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-[#B8C8D8]/10" style={{ backgroundColor: 'rgba(10,14,20,0.9)' }}>
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-[#B8C8D8]/70 hover:text-[#B8C8D8] transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="text-xs tracking-[0.2em] uppercase">Retour</span>
            </button>
            <p className="text-xs text-[#B8C8D8]/30 tracking-[0.15em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.images.length} pièces</p>
          </div>
        </div>

        {/* Hero — Video background */}
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {collection.video && (
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover opacity-40" src={collection.video} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,14,20,0.3) 0%, rgba(10,14,20,0.2) 50%, rgba(8,12,18,1) 100%)' }} />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #E8E0D8, #A09888)', boxShadow: '0 0 6px rgba(184,200,216,0.3)' }} />
              <div className="h-px w-10 bg-[#B8C8D8]/20" />
              <div className="w-3 h-3 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #F0E8E0, #B8A898)', boxShadow: '0 0 10px rgba(184,200,216,0.3)' }} />
              <div className="h-px w-10 bg-[#B8C8D8]/20" />
              <div className="w-2 h-2 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #E8E0D8, #A09888)', boxShadow: '0 0 6px rgba(184,200,216,0.3)' }} />
            </div>
            <p className="text-[#B8C8D8]/60 text-[10px] tracking-[0.5em] uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.subtitle}</p>
            <h1 className="text-6xl md:text-9xl text-[#E8E0D8] mb-4 leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.05em' }}>{collection.name}</h1>
            <p className="text-[#B8C8D8]/35 text-xs max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{collection.description}</p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-14">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: 3 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8C8D8" strokeWidth="1" opacity="0.3"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8 cursor-pointer group" onClick={() => onSelect(0)}>
            <div className="rounded-3xl overflow-hidden p-5 md:p-8 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #141820 0%, #0d1118 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(184,200,216,0.04), inset 0 1px 0 rgba(184,200,216,0.08)' }}>
              <div className="rounded-2xl overflow-hidden">
                <ProductImage src={collection.images[0]} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-5 md:gap-8">
            {collection.images.slice(1).map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.5) }} className="cursor-pointer group" onClick={() => onSelect(i + 1)}>
                <div className="rounded-2xl overflow-hidden p-3 md:p-5 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #141820 0%, #0d1118 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(184,200,216,0.03), inset 0 1px 0 rgba(184,200,216,0.06)' }}>
                  <div className="rounded-xl overflow-hidden">
                    <ProductImage src={img} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #E8E0D8, #A09888)' }} />
            <div className="h-px w-16 bg-[#B8C8D8]/15" />
            <div className="w-2 h-2 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #E8E0D8, #A09888)' }} />
          </div>
          <p className="text-[#B8C8D8]/30 text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Séduite par une perle rare ?</p>
          <h3 className="text-2xl md:text-3xl text-[#E8E0D8] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>Demandez un rendez-vous</h3>
          <a href="tel:+21697476401" className="inline-block px-10 py-4 rounded-full border border-[#B8C8D8]/20 text-[#B8C8D8]/60 tracking-[0.15em] uppercase text-sm hover:border-[#B8C8D8]/40 hover:text-[#B8C8D8] transition-all duration-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>+216 97 476 401</a>
        </div>

      </div>
      <AnimatePresence>
        {selectedIndex !== null && <Lightbox images={collection.images} selectedIndex={selectedIndex} onClose={() => onSelect(null)} onNext={goNext} onPrev={goPrev} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT — Routes to the correct themed gallery
   ════════════════════════════════════════════════════════════════ */
interface GalleryInnerProps {
  collection: CollectionCategory;
  onClose: () => void;
  onSelect: (index: number | null) => void;
  selectedIndex: number | null;
  goNext: () => void;
  goPrev: () => void;
}

interface CollectionGalleryProps {
  collection: CollectionCategory;
  onClose: () => void;
}

export function CollectionGallery({ collection, onClose }: CollectionGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = useCallback(() => {
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex + 1) % collection.images.length);
  }, [selectedIndex, collection.images.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex - 1 + collection.images.length) % collection.images.length);
  }, [selectedIndex, collection.images.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedIndex !== null) setSelectedIndex(null);
        else onClose();
      }
      if (selectedIndex !== null && e.key === 'ArrowRight') goNext();
      if (selectedIndex !== null && e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, selectedIndex, goNext, goPrev]);

  const props: GalleryInnerProps = {
    collection,
    onClose,
    onSelect: (i) => setSelectedIndex(i),
    selectedIndex,
    goNext,
    goPrev,
  };

  switch (collection.id) {
    case 'mariage': return <MariageGallery {...props} />;
    case 'tradition': return <TraditionGallery {...props} />;
    case 'tendance': return <TendanceGallery {...props} />;
    case 'eclat': return <EclatGallery {...props} />;
    case 'lira': return <LiraGallery {...props} />;
    case 'perles': return <PerlesGallery {...props} />;
    default: return <TraditionGallery {...props} />;
  }
}
