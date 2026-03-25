import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('Merci pour votre message. Nous vous contacterons sous 24 heures.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
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
            Contact
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl mb-8 text-[#f5f1ed]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Prenez rendez-vous
          </motion.h2>
          <motion.p
            className="text-lg text-[#f5f1ed]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Visitez notre showroom parisien ou contactez-nous pour une consultation privée
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-[#f5f1ed]/70 mb-2 tracking-wider uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-[#1a1a1a] border border-[#d4af37]/20 text-[#f5f1ed] focus:border-[#d4af37] focus:outline-none transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#f5f1ed]/70 mb-2 tracking-wider uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-[#1a1a1a] border border-[#d4af37]/20 text-[#f5f1ed] focus:border-[#d4af37] focus:outline-none transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-[#f5f1ed]/70 mb-2 tracking-wider uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#1a1a1a] border border-[#d4af37]/20 text-[#f5f1ed] focus:border-[#d4af37] focus:outline-none transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-[#f5f1ed]/70 mb-2 tracking-wider uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-[#1a1a1a] border border-[#d4af37]/20 text-[#f5f1ed] focus:border-[#d4af37] focus:outline-none transition-colors duration-300 resize-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-10 py-4 bg-[#d4af37] text-[#0a0a0a] tracking-widest uppercase hover:bg-[#f7e7ce] transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Envoyer ma demande
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Boutique Image */}
            <div className="relative aspect-[4/3] overflow-hidden mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1774110073583-2475ab5ed8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdG9yZSUyMGludGVyaW9yJTIwYm91dGlxdWUlMjBlbGVnYW50fGVufDF8fHx8MTc3NDM5NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Boutique AVELINE"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-[#d4af37]/20" />
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-6 bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors duration-300"
              >
                <MapPin className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#f5f1ed] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    15 Place Vendôme
                  </p>
                  <p className="text-[#f5f1ed]/70 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    75001 Paris, France
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-6 bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors duration-300"
              >
                <Phone className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#f5f1ed] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    +33 1 42 60 70 00
                  </p>
                  <p className="text-[#f5f1ed]/70 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Lun - Sam: 10h00 - 19h00
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-6 bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors duration-300"
              >
                <Mail className="w-6 h-6 text-[#c9a880] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#f5f0e8] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    contact@bouzid.fr
                  </p>
                  <p className="text-[#f5f0e8]/70 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Réponse sous 24h
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-6 bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors duration-300"
              >
                <Clock className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#f5f1ed] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Sur rendez-vous uniquement
                  </p>
                  <p className="text-[#f5f1ed]/70 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Consultation privée et personnalisée
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}