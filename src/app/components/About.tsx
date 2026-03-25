import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Gem, Sparkles, Award } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Gem,
      title: 'Matériaux nobles',
      description: 'Or 18 carats, diamants certifiés et pierres précieuses rares',
    },
    {
      icon: Sparkles,
      title: 'Savoir-faire unique',
      description: 'Techniques artisanales ancestrales et innovations contemporaines',
    },
    {
      icon: Award,
      title: 'Excellence reconnue',
      description: 'Plus de 30 ans d\'expertise dans la haute joaillerie',
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0a0a0a] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#c9a880] rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e8dcc8] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            La Maison
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl mb-8 text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            L'art de la perfection
          </motion.h2>
          <motion.p
            className="text-lg text-[#f5f0e8]/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            BOUZID incarne l'excellence de la joaillerie française depuis trois décennies. 
            Chaque création est le fruit d'un dialogue entre tradition et innovation, 
            où le geste du maître artisan rencontre la vision du designer contemporain. 
            Nos pièces uniques célèbrent l'éclat de la beauté intemporelle.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#141414] p-8 border border-[#c9a880]/20 hover:border-[#c9a880]/50 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#c9a880]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-block p-4 bg-[#c9a880]/10 rounded-full">
                  <feature.icon className="w-8 h-8 text-[#c9a880]" />
                </div>
                <h3
                  className="text-2xl mb-4 text-[#f5f0e8] group-hover:text-[#c9a880] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[#f5f0e8]/70 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a880]/30 group-hover:border-[#c9a880] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a880]/30 group-hover:border-[#c9a880] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
