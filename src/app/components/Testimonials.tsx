import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Marchand',
    location: 'Paris',
    text: 'Une expérience inoubliable. La bague de fiançailles créée pour moi est absolument magnifique. Chaque détail a été pensé avec soin et élégance.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Alexandre Dubois',
    location: 'Lyon',
    text: 'Le service est exceptionnel et la qualité des créations dépasse toutes les attentes. AVELINE incarne le luxe à la française.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Isabelle Laurent',
    location: 'Monaco',
    text: 'Un savoir-faire incomparable. Mon collier personnalisé est une véritable œuvre d\'art que je porterai toute ma vie avec fierté.',
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="témoignages" ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0a0a0a] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.p
            className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Témoignages
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl mb-8 text-[#f5f1ed]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ils nous font confiance
          </motion.h2>
          <motion.p
            className="text-lg text-[#f5f1ed]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Découvrez les expériences de nos clients privilégiés
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#141414] p-8 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Quote icon */}
                <Quote className="w-12 h-12 text-[#d4af37]/30 mb-6" />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p
                  className="text-[#f5f1ed]/80 mb-6 leading-relaxed italic"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-[#d4af37]/20 pt-6">
                  <p
                    className="text-[#f5f1ed] mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-sm text-[#d4af37]/70 tracking-wider"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#d4af37]/20 group-hover:border-[#d4af37]/50 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#d4af37]/20 group-hover:border-[#d4af37]/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {[
            { value: '2000+', label: 'Clients satisfaits' },
            { value: '98%', label: 'Taux de satisfaction' },
            { value: '500+', label: 'Créations uniques' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              className="text-center border-l-2 border-[#d4af37]/30"
            >
              <p
                className="text-4xl md:text-5xl mb-2 text-[#d4af37]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs text-[#f5f1ed]/70 tracking-wider uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
