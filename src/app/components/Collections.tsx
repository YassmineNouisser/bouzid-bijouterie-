import { motion } from 'motion/react';
import { useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { collections, CollectionGallery, type CollectionCategory } from './CollectionGallery';

export function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<CollectionCategory | null>(null);

  return (
    <>
      <section id="collections" ref={ref} className="relative py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.p
              className="text-[#c9a880] text-sm tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Nos Collections
            </motion.p>
            <motion.h2
              className="text-5xl md:text-6xl mb-8 text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Créations d'exception
            </motion.h2>
            <motion.p
              className="text-lg text-[#f5f0e8]/70 max-w-2xl mx-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Explorez nos collections où chaque pièce raconte une histoire unique
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {collections.slice(0, 4).map((col, index) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(col.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveCollection(col)}
                className="group relative overflow-hidden bg-[#141414] cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={col.cover}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === col.id ? 1 : 0 }}
                    className="absolute inset-0 bg-[#c9a880]/10"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <motion.p
                      className="text-[#c9a880] text-xs tracking-[0.2em] uppercase mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {col.subtitle}
                    </motion.p>
                    <motion.h3
                      className="text-2xl mb-2 text-[#f5f0e8]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {col.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: hoveredId === col.id ? 1 : 0, y: hoveredId === col.id ? 0 : 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-[#c9a880] flex items-center gap-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Découvrir
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </motion.p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9a880]/30 transition-all duration-500" />
                </div>
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: hoveredId === col.id ? '100%' : '-100%' }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a880]/20 to-transparent skew-x-12"
                />
              </motion.div>
            ))}
          </div>

          {/* 2e ligne — centrée */}
          <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            {collections.slice(4).map((col, index) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: (index + 4) * 0.1 }}
                onMouseEnter={() => setHoveredId(col.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveCollection(col)}
                className="group relative overflow-hidden bg-[#141414] cursor-pointer" style={{ width: 'calc(25% - 15px)', minWidth: 150 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={col.cover}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === col.id ? 1 : 0 }}
                    className="absolute inset-0 bg-[#c9a880]/10"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <motion.p
                      className="text-[#c9a880] text-xs tracking-[0.2em] uppercase mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {col.subtitle}
                    </motion.p>
                    <motion.h3
                      className="text-2xl mb-2 text-[#f5f0e8]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {col.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: hoveredId === col.id ? 1 : 0, y: hoveredId === col.id ? 0 : 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-[#c9a880] flex items-center gap-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Découvrir
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </motion.p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9a880]/30 transition-all duration-500" />
                </div>
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: hoveredId === col.id ? '100%' : '-100%' }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a880]/20 to-transparent skew-x-12"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeCollection && (
          <CollectionGallery
            collection={activeCollection}
            onClose={() => setActiveCollection(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
