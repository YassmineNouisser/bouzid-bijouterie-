import { motion } from 'motion/react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] to-[#000000] border-t border-[#c9a880]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl mb-4 tracking-widest text-[#c9a880]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              BOUZID
            </h3>
            <p className="text-xs tracking-[0.3em] text-[#e8dcc8]/70 uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Joaillerie
            </p>
            <p className="text-sm text-[#f5f0e8]/70 leading-relaxed mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              L'excellence de la haute joaillerie française depuis 1990
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, color: '#c9a880' }}
                  className="text-[#f5f0e8]/50 hover:text-[#c9a880] transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#c9a880]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Collections
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {['Bagues', 'Colliers', 'Bracelets', 'Boucles d\'oreilles', 'Créations sur mesure'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#c9a880] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#c9a880]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Services
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {['Consultation privée', 'Personnalisation', 'Entretien & réparation', 'Certificat d\'authenticité', 'Livraison premium'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#c9a880] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#c9a880]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              La Maison
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {['Notre histoire', 'Savoir-faire', 'Engagement qualité', 'Carrières', 'Presse'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#c9a880] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#c9a880]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#f5f0e8]/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              © {currentYear} BOUZID. Tous droits réservés.
            </p>
            <div className="flex gap-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {['Mentions légales', 'Politique de confidentialité', 'Conditions générales'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-[#f5f0e8]/50 hover:text-[#c9a880] transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a880] to-transparent opacity-50" />
    </footer>
  );
}
