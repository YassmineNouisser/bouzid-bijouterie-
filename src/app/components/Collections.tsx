import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const collections = [
  {
    id: 1,
    name: 'Éternité',
    category: 'Bagues',
    image: 'https://images.unsplash.com/photo-1702721024359-fddf593fef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwcmluZyUyMGdvbGQlMjBibGFjayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzc0Mzk1NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Alliance de diamants et d\'or rose',
  },
  {
    id: 2,
    name: 'Lumière',
    category: 'Colliers',
    image: 'https://images.unsplash.com/photo-1758995115659-06a6cb5787eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ29sZCUyMG5lY2tsYWNlJTIwYmxhY2slMjB2ZWx2ZXR8ZW58MXx8fHwxNzc0Mzk1NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Pendentif saphir et chaîne or blanc',
  },
  {
    id: 3,
    name: 'Audace',
    category: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1758297679736-2e6ff92d2021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwYnJhY2VsZXQlMjBnb2xkJTIwY2hhbXBhZ25lfGVufDF8fHx8MTc3NDM5NTQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Jonc serti de diamants',
  },
  {
    id: 4,
    name: 'Élégance',
    category: 'Boucles d\'oreilles',
    image: 'https://images.unsplash.com/photo-1769078595478-5f756986b818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZWFycmluZ3MlMjBsdXh1cnklMjBlbGVnYW50fGVufDF8fHx8MTc3NDM5NTQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Puces perles et diamants',
  },
];

export function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden bg-[#141414] cursor-pointer"
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                  className="absolute inset-0 bg-[#c9a880]/10"
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <motion.p
                    className="text-[#c9a880] text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.category}
                  </motion.p>
                  <motion.h3
                    className="text-2xl mb-2 text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hoveredId === item.id ? 1 : 0, y: hoveredId === item.id ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-[#f5f0e8]/70"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.description}
                  </motion.p>
                </div>

                {/* Border animation */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9a880]/30 transition-all duration-500" />
              </div>

              {/* Shine effect */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: hoveredId === item.id ? '100%' : '-100%' }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a880]/20 to-transparent skew-x-12"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-[#c9a880] text-[#c9a880] tracking-widest uppercase hover:bg-[#c9a880] hover:text-[#0a0a0a] transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Voir toutes les collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
