import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';

/* ────────────────────────────────────────────────────────────────
   Category data
   ──────────────────────────────────────────────────────────────── */
export interface Category {
  id: string;
  name: string;
  subtitle: string;
  images: string[];
}

export const categories: Category[] = [
  {
    id: 'colliers',
    name: 'Colliers',
    subtitle: 'Chaînes & Pendentifs',
    images: [
      '/assets/v4.png', '/assets/v5.png', '/assets/v6.png', '/assets/v1.png',
      '/products/IMG_4083.jpg', '/products/IMG_4085.jpg',
      '/products/IMG_4086.jpg', '/products/IMG_4087.jpg', '/products/IMG_4088.jpg',
      '/products/IMG_4110.jpg', '/products/IMG_4111.jpg', '/products/IMG_4112.jpg',
    ],
  },
  {
    id: 'bagues',
    name: 'Bagues',
    subtitle: 'Solitaires & Alliances',
    images: [
      '/products/r1.jpg', '/products/r2.jpg', '/products/r3.jpg',
      '/products/r4.jpg', '/products/r5.jpg', '/products/r6.jpg',
      '/products/r8.jpg', '/products/r9.jpg', '/products/r10.jpg',
      '/products/r11.jpg', '/products/r12.jpg',
    ],
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    subtitle: 'Joncs & Chaînes',
    images: [
      '/assets/v2.png', '/assets/v3.png',
      '/products/IMG_4113.jpg', '/products/IMG_4114.jpg', '/products/IMG_4115.jpg',
      '/products/IMG_4116.jpg', '/products/IMG_4117.jpg', '/products/IMG_4118.jpg',
    ],
  },
];

/* ────────────────────────────────────────────────────────────────
   Lightbox
   ──────────────────────────────────────────────────────────────── */
function Lightbox({
  images, selectedIndex, onClose, onNext, onPrev,
}: {
  images: string[]; selectedIndex: number; onClose: () => void; onNext: () => void; onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[10000] bg-black/97 flex items-center justify-center" onClick={onClose}
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
        <motion.img key={selectedIndex} src={images[selectedIndex]} alt="" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }}
          className="max-h-[85vh] max-w-[85vw] object-contain select-none" draggable={false} onClick={(e) => e.stopPropagation()} />
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CategoryGallery — Messika-style product grid
   ════════════════════════════════════════════════════════════════ */
interface CategoryGalleryProps {
  category: Category;
  onClose: () => void;
}

export function CategoryGallery({ category, onClose }: CategoryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = useCallback(() => {
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex + 1) % category.images.length);
  }, [selectedIndex, category.images.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex - 1 + category.images.length) % category.images.length);
  }, [selectedIndex, category.images.length]);

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-[#FAFAF8]">
      <div className="absolute inset-0 overflow-y-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* ── Sticky header ── */}
        <div className="sticky top-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-xl border-b border-[#3B2F1E]/5">
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-[#3B2F1E]/50 hover:text-[#3B2F1E] transition-colors group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="text-[11px] tracking-[0.2em] uppercase">Retour</span>
            </button>
            <p className="text-[11px] text-[#3B2F1E]/30 tracking-[0.15em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {category.images.length} pièces
            </p>
          </div>
        </div>

        {/* ── Page title ── */}
        <div className="text-center pt-12 md:pt-20 pb-10 md:pb-16 px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#C9A96E] text-[10px] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {category.subtitle}
            </p>
            <h1 className="text-5xl md:text-8xl text-[#3B2F1E] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>
              {category.name}
            </h1>
            <div className="w-16 h-px bg-[#C9A96E]/30 mx-auto" />
          </motion.div>
        </div>

        {/* ── Product grid — Messika style ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {category.images.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.6) }}
              >
                <div className="relative bg-white overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-[#F5F0EB]">
                    <img
                      src={img}
                      alt={`${category.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-16 px-6 border-t border-[#3B2F1E]/5">
          <div className="w-12 h-px bg-[#C9A96E]/30 mx-auto mb-8" />
          <p className="text-[#3B2F1E]/30 text-[10px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Intéressé(e) ?
          </p>
          <h3 className="text-2xl md:text-4xl text-[#3B2F1E] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic' }}>
            Prenez rendez-vous
          </h3>
          <a
            href="tel:+21697476401"
            className="inline-block px-12 py-4 bg-[#3B2F1E] text-[#F5EFE6] tracking-[0.2em] uppercase text-xs hover:bg-[#C9A96E] transition-all duration-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            +216 97 476 401
          </a>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            images={category.images}
            selectedIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
