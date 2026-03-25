import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star } from 'lucide-react';

export function FeaturedProduct() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * 20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0a0a0a] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-square"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-transparent blur-3xl" />
              
              <div className="relative h-full rounded-lg overflow-hidden border-2 border-[#d4af37]/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1702721024359-fddf593fef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwcmluZyUyMGdvbGQlMjBibGFjayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzc0Mzk1NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Solitaire Impérial"
                  className="w-full h-full object-cover"
                />
                
                {/* Light reflections */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-white/30 to-transparent blur-2xl"
                />
              </div>
            </motion.div>

            {/* Floating details */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-6 -right-6 bg-[#1a1a1a] border border-[#d4af37]/30 px-6 py-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <p className="text-xs text-[#f5f1ed]/70 tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Pièce Iconique
              </p>
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Pièce vedette
            </motion.p>
            
            <motion.h2
              className="text-5xl md:text-6xl mb-6 text-[#f5f1ed]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Solitaire Impérial
            </motion.h2>

            <motion.div className="mb-8 space-y-4">
              <p
                className="text-lg text-[#f5f1ed]/80 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Une création d'exception qui incarne la quintessence de notre savoir-faire. 
                Ce solitaire unique marie un diamant de 3 carats taille coussin à un anneau 
                en or rose 18 carats finement ciselé.
              </p>
              <p
                className="text-lg text-[#f5f1ed]/80 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Chaque facette capte et reflète la lumière avec une intensité hypnotique, 
                révélant un feu intérieur d'une pureté absolue. Une œuvre d'art destinée 
                à traverser les générations.
              </p>
            </motion.div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { label: 'Diamant', value: '3.00 ct' },
                { label: 'Pureté', value: 'IF (Internally Flawless)' },
                { label: 'Couleur', value: 'D (Incolore)' },
                { label: 'Or', value: '18 carats rose' },
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 border-[#d4af37]/50 pl-4"
                >
                  <p
                    className="text-xs text-[#d4af37] tracking-wider uppercase mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {spec.label}
                  </p>
                  <p
                    className="text-[#f5f1ed]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {spec.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#d4af37] text-[#0a0a0a] tracking-widest uppercase hover:bg-[#f7e7ce] transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Demander un rendez-vous
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#d4af37] text-[#d4af37] tracking-widest uppercase hover:bg-[#d4af37]/10 transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Personnaliser
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
