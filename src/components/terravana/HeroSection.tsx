import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

function RevealWords({ text, delay = 0, style }: {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'block', overflow: 'hidden', ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useWindowSize();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToStory   = () => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });

  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        height: '100dvh', // dynamic viewport height — accounts for mobile browser chrome
        minHeight: isMobile ? '560px' : '680px',
        maxHeight: isMobile ? '900px' : undefined,
        overflow: 'hidden',
        background: '#1a1612',
      }}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-8% -5%',
          scale: imgScale,
          x: mouse.x,
          y: mouse.y,
          background: 'linear-gradient(160deg, #2E1A0E 0%, #1a1208 40%, #0e0c08 100%)',
          transition: 'x 0.8s cubic-bezier(0.25,0.46,0.45,0.94), y 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <img
          src="https://static.wixstatic.com/media/cef78c_222f3aa23bdd4bfe9f5812cd38fa6e55~mv2.jpg"
          alt="Svamitva Terravana luxury villa surrounded by lush green forest"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.85 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)', zIndex: 2 }} />
      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, #1a1612, transparent)', zIndex: 3 }} />

      {/* Hero content */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          zIndex: 10,
          padding: `0 ${px}`,
          paddingTop: '5rem', // nav clearance
          y: isMobile ? 0 : textY,
        }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: isMobile ? '1.25rem' : '1.75rem' }}
        >
          <span style={{ width: '2rem', height: '1px', background: '#C76B33', display: 'block', flexShrink: 0 }} />
          <span className="tv-label" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Kanakapura Road · Bangalore
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : isTablet ? 'clamp(3.5rem, 8vw, 5.5rem)' : 'clamp(5rem, 9vw, 9rem)',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '100%',
            wordBreak: 'break-word',
          }}
        >
          <RevealWords text="Homes for" delay={0.5} />
          <RevealWords text="your mind," delay={0.65} style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.88)' }} />
          <RevealWords text="body & soul." delay={0.8} />
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            color: 'rgba(255,255,255,0.58)',
            marginTop: isMobile ? '1.25rem' : '1.75rem',
            maxWidth: isMobile ? '100%' : '42ch',
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          An Earth Villa community on 21 acres of lush forest, where rammed mud blocks,
          skylights, and organic gardens shape a life lived naturally.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.75rem' : '1rem',
            marginTop: isMobile ? '1.75rem' : '2.5rem',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <button
            onClick={scrollToContact}
            className="tv-btn-primary"
            style={{ justifyContent: isMobile ? 'center' : undefined }}
          >
            Book Private Tour
          </button>
          <button
            onClick={scrollToStory}
            className="tv-btn-outline"
            style={{ justifyContent: isMobile ? 'center' : undefined }}
          >
            Explore Project
          </button>
        </motion.div>

        {/* Scroll indicator — hide on mobile to save space */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: px,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Scroll
            </span>
            <div className="tv-scroll-line" />
          </motion.div>
        )}
      </motion.div>

      {/* Bottom stats — only desktop */}
      {!isTablet && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            right: px,
            display: 'flex',
            gap: '3rem',
            zIndex: 10,
          }}
        >
          {[
            { value: '21', unit: 'Acres', label: 'Total Land' },
            { value: '3–4', unit: 'BHK', label: 'Earth Villas' },
            { value: '40+', unit: 'Years', label: 'Developer Legacy' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2rem', fontWeight: 500, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {stat.value}
                <span style={{ fontSize: '0.95rem', color: '#C76B33', marginLeft: '0.2rem' }}>{stat.unit}</span>
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginTop: '0.15rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Mobile stats strip */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {[
            { value: '21', unit: 'Acres' },
            { value: '3–4 BHK', unit: 'Villas' },
            { value: '40+', unit: 'Yrs Legacy' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '0.85rem 0',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                background: 'rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontWeight: 500, color: '#fff', letterSpacing: '-0.01em' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginTop: '0.1rem' }}>
                {s.unit}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
