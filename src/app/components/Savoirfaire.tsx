import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Heart, Shield, Users } from 'lucide-react';

export function Savoirfaire() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Clock,
      title: 'Artisanat traditionnel',
      description: 'Techniques séculaires transmises de maître en apprenti depuis 1990',
    },
    {
      icon: Heart,
      title: 'Personnalisation',
      description: 'Chaque création peut être adaptée selon vos désirs et émotions',
    },
    {
      icon: Shield,
      title: 'Garantie à vie',
      description: 'Certification d\'authenticité et service après-vente perpétuel',
    },
    {
      icon: Users,
      title: 'Accompagnement privé',
      description: 'Conseiller personnel dédié pour une expérience sur-mesure',
    },
  ];

  return (
    <section id="savoirfaire" ref={ref} className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
            Notre Engagement
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl mb-8 text-[#f5f1ed]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Excellence & Savoir-faire
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1772442125263-c9dd28bbd938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwY3JhZnRzbWFuJTIwYXJ0aXNhbiUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NDM5NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Artisan joaillier au travail"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
              
              {/* Border decoration */}
              <div className="absolute inset-0 border-2 border-[#d4af37]/20" />
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#d4af37]/10" />
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-gradient-to-br from-[#d4af37] to-[#b8941f] p-8 text-center"
            >
              <p className="text-5xl mb-2 text-[#0a0a0a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                30+
              </p>
              <p className="text-xs text-[#0a0a0a] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Années d'expertise
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="text-4xl mb-6 text-[#f5f1ed]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Le geste qui sublime la matière
            </h3>
            <div className="space-y-4 text-[#f5f1ed]/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <p className="leading-relaxed">
                Nos maîtres joailliers perpétuent un héritage ancestral où chaque geste compte, 
                où chaque détail est scruté avec une exigence absolue. De la sélection rigoureuse 
                des pierres précieuses à la finition ultime, chaque étape est une célébration du 
                savoir-faire français.
              </p>
              <p className="leading-relaxed">
                Dans nos ateliers parisiens, la tradition dialogue avec l'innovation. 
                Technologies de pointe et outils séculaires coexistent pour donner naissance 
                à des pièces uniques qui transcendent le temps.
              </p>
              <p className="leading-relaxed text-[#d4af37]">
                "Chaque bijou AVELINE est une promesse d'éternité, un témoignage d'amour et de dévotion 
                envers l'excellence."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6 p-6 bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors duration-300"
              >
                <value.icon className="w-8 h-8 text-[#d4af37]" />
              </motion.div>
              <h4
                className="text-xl mb-3 text-[#f5f1ed]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {value.title}
              </h4>
              <p
                className="text-sm text-[#f5f1ed]/70 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
