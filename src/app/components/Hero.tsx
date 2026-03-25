import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { scrollYProgress } = useScroll();
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const scrollToCollections = () => {
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1410] to-[#0a0a0a]" />
      
      {/* Radial light effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a880]/10 rounded-full blur-[120px]" />

      {/* Floating animated texts */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-20 left-10 text-[#c9a880] text-6xl md:text-8xl font-bold opacity-10"
        style={{ 
          fontFamily: "'Cormorant Garamond', serif",
          textShadow: '0 0 30px rgba(201,168,128,0.3)'
        }}
      >
        Luxe
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-1/3 right-10 text-[#c9a880] text-5xl md:text-7xl font-bold opacity-10"
        style={{ 
          fontFamily: "'Cormorant Garamond', serif",
          textShadow: '0 0 30px rgba(201,168,128,0.3)'
        }}
      >
        Éclat
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 2, delay: 1.1 }}
        className="absolute bottom-32 left-1/4 text-[#c9a880] text-6xl md:text-8xl font-bold opacity-10"
        style={{ 
          fontFamily: "'Cormorant Garamond', serif",
          textShadow: '0 0 30px rgba(201,168,128,0.3)'
        }}
      >
        Prestige
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            L'élégance précieuse,
            <br />
            <span className="text-[#c9a880]">réinventée</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl mb-12 text-[#f5f0e8]/70 tracking-wide max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Des créations uniques qui subliment chaque instant
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,128,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCollections}
              className="px-10 py-4 bg-[#c9a880] text-[#0a0a0a] tracking-widest uppercase hover:bg-[#e8dcc8] transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Découvrir la collection
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border-2 border-[#c9a880] text-[#c9a880] tracking-widest uppercase hover:bg-[#c9a880]/10 transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Prendre rendez-vous
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute bottom-12 cursor-pointer"
          onClick={scrollToCollections}
        >
          <ChevronDown className="w-8 h-8 text-[#c9a880]/60" />
        </motion.div>
      </motion.div>

      {/* Decorative particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-1 h-1 bg-[#c9a880] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </section>
  );
}