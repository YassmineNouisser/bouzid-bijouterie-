import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { RingCanvas } from './RingViewer';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: 'Solitaire Impérial', category: 'Bagues', price: 'Sur demande', image: 'https://images.unsplash.com/photo-1702721024359-fddf593fef3f?w=400&h=500&fit=crop' },
  { name: 'Collier Lumière', category: 'Colliers', price: 'Sur demande', image: 'https://images.unsplash.com/photo-1758995115659-06a6cb5787eb?w=400&h=500&fit=crop' },
  { name: 'Bracelet Audace', category: 'Bracelets', price: 'Sur demande', image: 'https://images.unsplash.com/photo-1758297679736-2e6ff92d2021?w=400&h=500&fit=crop' },
  { name: 'Boucles Élégance', category: "Boucles d'oreilles", price: 'Sur demande', image: 'https://images.unsplash.com/photo-1769078595478-5f756986b818?w=400&h=500&fit=crop' },
];

/* ═══════════════════════════════════════════════════════════════════
   Camera positions — exact values from webgi-jewelry source
   The RING stays at origin. The CAMERA orbits around it.
   ═══════════════════════════════════════════════════════════════════ */
const isMobile = () => window.innerWidth < 768;

const CAM = {
  introStart: { pos: { x: 3, y: -0.8, z: 1.2 }, tgt: { x: 2.5, y: -0.07, z: -0.1 } },
  // Desktop / Mobile camera positions
  get hero() {
    return isMobile()
      ? { pos: { x: 0, y: -1.5, z: 9 }, tgt: { x: 0, y: 0.2, z: 0 } }
      : { pos: { x: 1.28, y: -1.7, z: 5.86 }, tgt: { x: 0.91, y: 0.03, z: -0.25 } };
  },
  get forever() {
    return isMobile()
      ? { pos: { x: 0, y: -1, z: 9 }, tgt: { x: 0, y: 0.2, z: 0 } }
      : { pos: { x: -4, y: -0.14, z: 6 }, tgt: { x: -1.5, y: -0.03, z: -0.12 } };
  },
  get emotions() {
    return isMobile()
      ? { pos: { x: 0, y: -1.5, z: 7 }, tgt: { x: 0, y: 0.8, z: 0 } }
      : { pos: { x: -0.06, y: -1.15, z: 4.42 }, tgt: { x: -0.01, y: 0.9, z: 0.07 } };
  },
};

export function JewelryPage() {
  const ringRef = useRef<THREE.Group>(null);
  // Camera refs — start at intro close-up position
  const cameraPositionRef = useRef(new THREE.Vector3(CAM.introStart.pos.x, CAM.introStart.pos.y, CAM.introStart.pos.z));
  const targetRef = useRef(new THREE.Vector3(CAM.introStart.tgt.x, CAM.introStart.tgt.y, CAM.introStart.tgt.z));
  const [orbitEnabled] = useState(false);

  useEffect(() => {
    // ─── Lenis smooth scroll ──────────────────────────────────
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -5 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.body.style.overflowY = 'hidden';
    window.scrollTo(0, 0);
    const timer = setTimeout(runIntroAnimation, 2000);
    return () => { clearTimeout(timer); lenis.destroy(); };
  }, []);

  /* ─── INTRO ANIMATION ──────────────────────────────────────── */
  const runIntroAnimation = () => {
    const ring = ringRef.current;
    if (!ring) { setTimeout(runIntroAnimation, 100); return; }

    const pos = cameraPositionRef.current;
    const tgt = targetRef.current;

    gsap.timeline()
      // 1. Loader slides away
      .to('.loader-screen', { x: '100%', duration: 0.6, ease: 'power4.inOut', delay: 0.3 })
      // 2. Camera zooms out from close-up → hero view (2.5 seconds)
      .to(pos, { ...CAM.hero.pos, duration: 2.5, ease: 'power2.out' }, '-=0.6')
      .to(tgt, { ...CAM.hero.tgt, duration: 2.5, ease: 'power2.out' }, '-=2.5')
      // 3. UI fades in
      .fromTo('.header-bar', { opacity: 0, y: '-100%' }, { opacity: 1, y: '0%', ease: 'power1.inOut', duration: 0.8 }, '-=1')
      .fromTo('.hero--scroller', { opacity: 0, y: '150%' }, { opacity: 1, y: '0%', ease: 'power4.inOut', duration: 1 }, '-=1')
      .fromTo('.hero--container', { opacity: 0, x: '100%' }, { opacity: 1, x: '0%', ease: 'power4.inOut', duration: 1.8, onComplete: setupScrollAnimation }, '-=1')
      .fromTo('.side-nav', { opacity: 0, x: '50%' }, { opacity: 1, x: '0%', ease: 'power4.inOut', duration: 2 }, '-=1');
  };

  /* ─── SCROLL ANIMATIONS ────────────────────────────────────── */
  const setupScrollAnimation = () => {
    document.body.style.overflowY = 'scroll';
    const ring = ringRef.current;
    const pos = cameraPositionRef.current;
    const tgt = targetRef.current;
    if (!ring) return;

    /* ═══════════════════════════════════════════════════════════
       ONE single timeline for camera + ring rotation.
       No conflicts — one tween chain, one ScrollTrigger.
       Spans from cam-view-2 entering to cam-view-3 leaving.
       ═══════════════════════════════════════════════════════════ */
    const camTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.cam-view-2',
        start: 'top bottom',
        endTrigger: '.cam-view-3',
        end: 'top top',
        scrub: 0.3,
      },
    });

    // Phase 1 (0→0.5): Hero → Forever — ring LEFT → RIGHT
    camTL.to(pos, { ...CAM.forever.pos, duration: 1, ease: 'none' }, 0);
    camTL.to(tgt, { ...CAM.forever.tgt, duration: 1, ease: 'none' }, 0);
    camTL.to(ring.rotation, { x: 0, y: 0, z: Math.PI / 2, duration: 1, ease: 'none' }, 0);

    // Phase 2 (0.5→1): Forever → Emotions — ring RIGHT → CENTER
    camTL.to(pos, { ...CAM.emotions.pos, duration: 1, ease: 'none' }, 1);
    camTL.to(tgt, { ...CAM.emotions.tgt, duration: 1, ease: 'none' }, 1);
    camTL.to(ring.rotation, { x: 0, y: 0, z: -Math.PI / 2, duration: 1, ease: 'none' }, 1);

    /* ═══ UI TEXT ANIMATIONS (separate per section) ═══════════ */
    const s2ui = { trigger: '.cam-view-2', start: 'top bottom', end: 'top top', scrub: 0.5, immediateRender: false };
    const s3ui = { trigger: '.cam-view-3', start: 'top bottom', end: 'top top', scrub: 0.5, immediateRender: false };

    // Section 2: hero exits, forever enters
    gsap.to('.hero--container', { opacity: 0, xPercent: 100, scrollTrigger: s2ui });
    gsap.to('.hero--scroller', { opacity: 0, y: '150%', scrollTrigger: { trigger: '.cam-view-2', start: 'top bottom', end: 'top center', scrub: 0.5, immediateRender: false } });
    gsap.to('.forever--text-bg', { opacity: 0.1, scrollTrigger: s2ui });
    gsap.fromTo('.forever--container', { opacity: 0, x: '-110%' }, { opacity: 1, x: '0%', scrollTrigger: s2ui });
    gsap.to('.nav-dot-1', { opacity: 0.5, scale: 1, scrollTrigger: s2ui });
    gsap.to('.nav-dot-2', { opacity: 1, scale: 1.5, scrollTrigger: s2ui });

    // Section 3: forever exits, emotions enters
    gsap.to('.forever--container', { opacity: 0, x: '-110%', scrollTrigger: s3ui });
    gsap.to('.emotions--text-bg', { opacity: 0.1, scrollTrigger: s3ui });
    gsap.fromTo('.emotions--content', { opacity: 0, y: '130%' }, { opacity: 1, y: '0%', scrollTrigger: s3ui });
    gsap.to('.nav-dot-2', { opacity: 0.5, scale: 1, scrollTrigger: s3ui });
    gsap.to('.nav-dot-3', { opacity: 1, scale: 1.5, scrollTrigger: s3ui });

    // Section 4: ring fades away
    const s4ui = { trigger: '.scroll-section-4', start: 'top bottom', end: 'top top', scrub: 0.5, immediateRender: false };
    gsap.to('#webgi-canvas-container', { opacity: 0, scrollTrigger: s4ui });
    gsap.to('.emotions--content', { opacity: 0, y: '-50%', scrollTrigger: s4ui });
    gsap.to('.side-nav', { opacity: 0, scrollTrigger: s4ui });
  };

  const scrollTo = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative bg-[#D9C9AB] overflow-x-hidden">
      {/* ─── Loading Screen (z-100, covers canvas) ─────────────── */}
      <div className="loader-screen fixed inset-0 z-[100] bg-[#D9C9AB] flex items-center justify-center">
        <div className="text-center">
          <img src="/assets/logo-bouzid.png" alt="Bouzid" className="h-32 mx-auto" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          <div className="mt-8 w-48 mx-auto h-[2px] bg-[#3B2F1E]/20 overflow-hidden rounded">
            <div className="h-full bg-[#3B2F1E]/60" style={{ animation: 'loadbar 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* ─── 3D Canvas (z-20, behind everything except loader) ─── */}
      <RingCanvas ringRef={ringRef} cameraPositionRef={cameraPositionRef} targetRef={targetRef} orbitEnabled={orbitEnabled} />

      {/* ─── Header ────────────────────────────────────────────── */}
      <header className="header-bar fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 opacity-0">
        <img src="/assets/logo-bouzid.png" alt="Bouzid" className="h-16 md:h-28 object-contain" />
        <nav className="hidden md:flex gap-8">
          {['Accueil', 'Collections', 'Contact'].map((item, i) => (
            <button key={item} onClick={() => scrollTo(i === 0 ? '.cam-view-1' : i === 1 ? '.scroll-section-4' : '.scroll-section-5')}
              className="text-sm tracking-[0.15em] text-[#3B2F1E]/80 hover:text-[#3B2F1E] transition-colors uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>{item}</button>
          ))}
        </nav>
        <a href="tel:+21697476401" className="hidden md:inline-block text-sm tracking-[0.1em] text-[#3B2F1E] border border-[#3B2F1E]/30 px-5 py-2 hover:bg-[#3B2F1E]/10 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}>Rendez-vous</a>
      </header>

      {/* ─── Side Nav (right) ──────────────────────────────────── */}
      <div className="side-nav hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 opacity-0">
        {['Unique', "L'Eternité", 'Émotions'].map((label, i) => (
          <button key={label} onClick={() => i === 0 ? window.scrollTo({ top: 0, behavior: 'smooth' }) : scrollTo(`.cam-view-${i + 1}`)}
            className={`nav-dot-${i + 1} text-xs tracking-[0.1em] text-[#3B2F1E] transition-all`}
            style={{ fontFamily: "'Montserrat', sans-serif", opacity: i === 0 ? 1 : 0.5, transform: i === 0 ? 'scale(1.5)' : 'scale(1)' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ═══ SECTION 1: Hero — text RIGHT (50% right half) ═══════ */}
      <section className="cam-view-1 relative h-screen w-full z-30 pointer-events-none">
        {/* Hero text container: fixed, right half */}
        <div className="hero--container fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:left-auto md:right-0 w-full md:w-1/2 h-auto md:h-screen flex items-end md:items-center pointer-events-auto opacity-0 z-30">
          <div className="w-full px-6 pb-20 md:pb-0 md:px-0 md:mr-[12%] md:ml-auto md:max-w-[500px] text-center md:text-right">
            <h1 className="text-[48px] md:text-[100px] lg:text-[124px] text-[#3B2F1E] mb-4 leading-[0.9] uppercase" style={{ fontFamily: "'Playfair Display SC', 'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
              Bijoux<br />uniques
            </h1>
            <p className="text-[#3B2F1E]/60 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-[280px] md:max-w-[320px] mx-auto md:mx-0 md:ml-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Personnalisez votre bague avec des angles graphiques et des lignes pures. Un bijou qui vous ressemble.
            </p>
            <button onClick={() => scrollTo('.cam-view-2')}
              className="px-6 md:px-8 py-3 bg-[#3B2F1E] text-[#D9C9AB] tracking-[0.15em] uppercase text-xs md:text-sm hover:bg-[#4A3C28] transition-colors md:float-right"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>Explorer</button>
          </div>
        </div>
        {/* Scroll indicator: bottom center */}
        <div className="hero--scroller fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto opacity-0 z-30"
          onClick={() => scrollTo('.cam-view-2')}>
          <span className="text-[#3B2F1E]/50 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Défiler</span>
          <div className="w-[1px] h-8 bg-[#3B2F1E]/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#3B2F1E]" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: "L'Eternité" — text LEFT (70% left half) ═ */}
      <section className="cam-view-2 relative h-screen w-full z-30 pointer-events-none">
        <div className="forever--text-bg fixed inset-0 flex items-center pointer-events-none opacity-0 z-20">
          <h2 className="text-[20vw] text-[#3B2F1E] leading-none select-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Eternité</h2>
        </div>
        <div className="forever--container fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:right-auto md:left-0 w-full md:w-[70%] h-auto md:h-screen flex items-end md:items-center pointer-events-auto opacity-0 z-30">
          <div className="w-full px-6 pb-20 md:pb-0 md:px-0 md:ml-[12%] md:max-w-lg text-center md:text-left">
            <p className="text-[#3B2F1E]/50 text-sm italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em' }}>créé pour durer</p>
            <h2 className="text-[48px] md:text-[100px] lg:text-[124px] text-[#3B2F1E] leading-[0.9] uppercase mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display SC', 'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
              Pour<br />l'éternité
            </h2>
            <p className="text-[#3B2F1E]/60 text-xs md:text-sm leading-relaxed max-w-[280px] md:max-w-[320px] mx-auto md:mx-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Personnalisez votre bague avec des angles graphiques et des lignes pures. Un bijou créé pour traverser le temps.
            </p>
            <div className="flex gap-4">
              {[{ l: 'Diamant', v: '3.00 ct' }, { l: 'Or', v: '18 carats' }, { l: 'Pureté', v: 'IF' }].map((s) => (
                <div key={s.l} className="border border-[#3B2F1E]/20 px-4 py-3">
                  <p className="text-xs text-[#3B2F1E]/50 uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.l}</p>
                  <p className="text-[#3B2F1E] font-light text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: "Émotions" — text CENTER-BOTTOM ══════════ */}
      <section className="cam-view-3 relative h-screen w-full z-30 pointer-events-none">
        <div className="emotions--text-bg fixed inset-0 flex items-start justify-center pointer-events-none opacity-0 z-20">
          <h2 className="text-[20vw] text-[#3B2F1E] leading-none select-none mt-[5vh]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Émotions</h2>
        </div>
        <div className="emotions--content fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-center max-w-2xl w-full px-6 pointer-events-auto opacity-0 z-30">
          <p className="text-[#3B2F1E]/50 text-xs md:text-sm italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em' }}>partagez vos</p>
          <h2 className="text-[40px] md:text-[80px] lg:text-[114px] text-[#3B2F1E] leading-[0.9] uppercase mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display SC', 'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            Émotions
          </h2>
          <p className="text-[#3B2F1E]/60 text-xs md:text-sm leading-relaxed max-w-[280px] md:max-w-[400px] mx-auto mb-6 md:mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Des pierres précieuses colorées, de l'aigue-marine aux diamants, combinées avec de l'or blanc pour capturer l'essence de vos plus beaux souvenirs.
          </p>
          <button onClick={() => scrollTo('.scroll-section-4')}
            className="px-8 py-3 bg-[#3B2F1E] text-[#D9C9AB] tracking-[0.15em] uppercase text-sm hover:bg-[#4A3C28] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>Découvrir</button>
        </div>
      </section>

      {/* ═══ SECTION 4: Collections ═══════════════════════════════ */}
      <section className="scroll-section-4 relative z-40 bg-[#2A2118]/85 text-[#F5EFE6] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="text-center mb-16">
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Nos Collections</p>
            <h2 className="text-5xl md:text-6xl mb-6 text-[#F5EFE6]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>Créations d'exception</h2>
            <p className="text-[#F5EFE6]/60 max-w-2xl mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>Explorez nos collections où chaque pièce raconte une histoire unique</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item.name} className="group relative overflow-hidden bg-[#3B2F1E] cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2118] via-[#2A2118]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.category}</p>
                    <h3 className="text-2xl mb-1 text-[#F5EFE6]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.name}</h3>
                    <p className="text-sm text-[#C9A96E]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.price}</p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C9A96E]/30 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: Contact ═══════════════════════════════════ */}
      <section className="scroll-section-5 relative z-40 bg-[#F5EFE6] text-[#3B2F1E]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact</p>
              <h2 className="text-5xl md:text-6xl mb-4 text-[#3B2F1E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>Visitez notre<br /><span className="text-[#C9A96E]">boutique</span></h2>
              <p className="text-[#3B2F1E]/60 text-sm mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Bouzid Youssef — Founder</p>
              <div className="space-y-6 mb-10">
                {[
                  { icon: '📍', title: 'Adresse', text: '24, Souk El Bey, El Berka' },
                  { icon: '📞', title: 'Téléphone', text: '+216 97 476 401' },
                  { icon: '✉️', title: 'Email', text: 'youssefbouzid631@gmail.com' },
                ].map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center flex-shrink-0"><span className="text-[#C9A96E]">{c.icon}</span></div>
                    <div>
                      <h4 className="text-[#3B2F1E] mb-1 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.title}</h4>
                      <p className="text-[#3B2F1E]/60 text-sm whitespace-pre-line" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="tel:+21697476401" className="inline-block px-10 py-4 bg-[#3B2F1E] text-[#F5EFE6] tracking-[0.15em] uppercase text-sm hover:bg-[#4A3C28] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>Prendre rendez-vous</a>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#E8DFD0] border border-[#C9A96E]/20 overflow-hidden">
                <iframe title="Localisation Bouzid Bijouterie" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.5!2d4.05!3d36.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQyJzM2LjAiTiA0wrAwMycwMC4wIkU!5e0!3m2!1sfr!2sdz!4v1234567890" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#C9A96E]/40" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#C9A96E]/40" />
            </div>
          </div>
        </div>
        <div className="border-t border-[#3B2F1E]/10 py-8 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <img src="/assets/logo-bouzid.png" alt="Bouzid" className="h-16 object-contain" />
            <p className="text-[#3B2F1E]/40 text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>© 2026 Bouzid Youssef. Tous droits réservés.</p>
          </div>
        </div>
      </section>

      {/* ─── CSS Animations ────────────────────────────────────── */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes loadbar {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          51% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
      `}</style>
    </div>
  );
}
