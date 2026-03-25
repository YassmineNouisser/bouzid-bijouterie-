import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#c9a880]/10 to-transparent" />

      <div className="relative text-center">
        {/* Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl tracking-[0.3em] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[#c9a880]">BOUZID</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm tracking-[0.4em] text-[#e8dcc8]/70 uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Joaillerie
          </motion.p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 max-w-xs mx-auto"
        >
          <div className="h-[1px] bg-[#c9a880]/20 relative overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#c9a880] to-transparent"
            />
          </div>
        </motion.div>

        {/* Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 1.5,
              repeat: Infinity,
            }}
            className="absolute w-1 h-1 bg-[#c9a880] rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}