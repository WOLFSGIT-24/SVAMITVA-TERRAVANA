import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.05, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const imgReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1.35, ease: [0.76, 0, 0.24, 1] } },
};

export default function StorySection() {
  const { isMobile, isTablet } = useWindowSize();
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const leftInView  = useInView(leftRef,  { once: true, margin: '-10%' });
  const rightInView = useInView(rightRef, { once: true, margin: '-10%' });

  const isStack = isTablet; // stack below lg
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';

  const pillars = [
    { num: '01', title: 'Earth',    body: 'Rammed mud blocks sourced locally keep walls naturally cool and carbon-neutral.' },
    { num: '02', title: 'Forest',   body: 'Miyawaki forests, bamboo trails, and butterfly gardens breathe life into every corner.' },
    { num: '03', title: 'Wellness', body: 'Vaastu-aligned layouts, cross-ventilation, and skylights designed for mind & body.' },
  ];

  return (
    <section id="story" className="tv-section" style={{ background: '#F8F6F1', overflow: 'hidden' }}>
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `0 ${px}` }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isStack ? '1fr' : '1fr 1fr',
            gap: isStack ? '3.5rem' : '6rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT — copy */}
          <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="tv-divider" />
              <span className="tv-label">The Philosophy</span>
            </motion.div>

            <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}
              className="tv-heading"
              style={{ fontSize: isMobile ? 'clamp(2.2rem, 9vw, 3.2rem)' : isTablet ? 'clamp(2.8rem, 6vw, 4rem)' : 'clamp(2.8rem, 5vw, 5.5rem)', fontWeight: 300, margin: 0 }}>
              Terra meets Vana —<br />
              <em style={{ fontStyle: 'italic', color: '#C76B33' }}>Earth</em> meets{' '}
              <em style={{ fontStyle: 'italic' }}>Forest.</em>
            </motion.h2>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}
              className="tv-body" style={{ fontSize: isMobile ? '0.88rem' : '0.97rem', maxWidth: '46ch', margin: 0 }}>
              At Svamitva, we believe a home should breathe with you — quietly, intentionally,
              naturally. Terravana is the physical embodiment of this philosophy: a living
              ecosystem built with natural materials, generous space, and open skies.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.4rem', marginTop: '0.5rem' }}>
              {pillars.map((p, i) => (
                <motion.div key={p.num} custom={3 + i} variants={fadeUp} initial="hidden" animate={leftInView ? 'visible' : 'hidden'}
                  style={{ display: 'flex', gap: '1.25rem', paddingTop: isMobile ? '1rem' : '1.4rem', borderTop: '1px solid rgba(31,31,31,0.09)', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.8rem', color: '#C76B33', fontWeight: 500, letterSpacing: '0.1em', flexShrink: 0, marginTop: '0.12rem' }}>
                    {p.num}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 500, color: '#1F1F1F', letterSpacing: '-0.01em', marginBottom: '0.25rem' }}>
                      {p.title}
                    </div>
                    <p className="tv-body" style={{ fontSize: '0.85rem', margin: 0 }}>{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — image */}
          <div ref={rightRef} style={{ position: 'relative' }}>
            {/* Main image */}
            <motion.div variants={imgReveal} initial="hidden" animate={rightInView ? 'visible' : 'hidden'}
              className="tv-img-zoom"
              style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: isStack ? '16/9' : '4/5' }}>
              <img
                src="https://static.wixstatic.com/media/cef78c_4b806a2c3ad4462793d925081264047f~mv2.jpg"
                alt="Natural earth villa with rammed mud walls and organic architecture"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const p = (e.target as HTMLImageElement).parentElement;
                  if (p) p.style.background = 'linear-gradient(160deg, #2E1A0E 0%, #7A5C3A 100%)';
                }}
              />
            </motion.div>

            {/* Floating "21 acres" callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, x: isMobile ? 0 : 30 }}
              animate={rightInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="tv-glass"
              style={{
                position: 'absolute',
                bottom: isMobile ? '1rem' : '-2rem',
                left: isMobile ? '1rem' : '-2.5rem',
                padding: isMobile ? '1rem 1.25rem' : '1.5rem 1.75rem',
                borderRadius: '1rem',
                maxWidth: isMobile ? '160px' : '210px',
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '2.2rem' : '2.8rem', fontWeight: 500, color: '#C76B33', lineHeight: 1, letterSpacing: '-0.03em' }}>
                21
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#555', marginTop: '0.2rem' }}>
                Acres of Living Forest
              </div>
            </motion.div>

            {/* Secondary image — desktop only */}
            {!isStack && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="tv-img-zoom"
                style={{ position: 'absolute', top: '-3rem', right: '-2.5rem', width: '42%', aspectRatio: '1', borderRadius: '1.2rem', overflow: 'hidden' }}
              >
                <img
                  src="https://static.wixstatic.com/media/cef78c_0f716be94afb44dab231b377ed8d4bec~mv2.jpg"
                  alt="Private garden at Svamitva Terravana earth villa"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const p = (e.target as HTMLImageElement).parentElement;
                    if (p) p.style.background = 'linear-gradient(135deg, #4A7A4A, #2E5C2E)';
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
