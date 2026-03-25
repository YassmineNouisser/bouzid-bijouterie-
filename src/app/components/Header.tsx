import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#c9a880]/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <h1 className="text-2xl md:text-3xl tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="text-[#c9a880]">BOUZID</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[#e8dcc8]/70 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Joaillerie
          </p>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {['Collections', 'Savoir-faire', 'Témoignages', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace('-', ''))}
              className="text-sm tracking-wider text-[#f5f0e8]/80 hover:text-[#c9a880] transition-colors duration-300 uppercase"
            >
              {item}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 bg-[#c9a880] text-[#0a0a0a] text-sm tracking-wider uppercase hover:bg-[#e8dcc8] transition-colors duration-300"
          >
            <Phone className="inline-block w-4 h-4 mr-2" />
            Rendez-vous
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#c9a880] p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-[#c9a880]/20"
        >
          <nav className="flex flex-col gap-4 p-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {['Collections', 'Savoir-faire', 'Témoignages', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('-', ''))}
                className="text-left text-sm tracking-wider text-[#f5f0e8]/80 hover:text-[#c9a880] transition-colors uppercase"
              >
                {item}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}