import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

const features = [
  {
    id: 'cooling',
    title: 'Natural Cooling',
    sub: 'Zero Air-Conditioning',
    body: 'Rammed earth blocks, terracotta filler slabs with inverted mud pots, and Kota stone flooring create natural thermal mass — keeping interiors up to 8°C cooler without a single AC unit.',
    // Bright, airy living room with large windows — natural light, cool tones
    img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop',
  },
  {
    id: 'gardens',
    title: 'Private Gardens',
    sub: 'Personal Green Retreats',
    body: 'Every villa comes with its own curated garden — a private sanctuary for morning yoga, weekend gardening, or quiet reflection under the open sky.',
    // Lush green garden with flowers and paths
    img: 'https://images.pexels.com/photos/6231750/pexels-photo-6231750.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop',
  },
  {
    id: 'skylights',
    title: 'Skylights & Flow',
    sub: 'Light & Cross-Ventilation',
    body: 'Strategically placed skylights invite daylight deep into the home. Minimal enclosing walls and open layouts encourage natural cross-ventilation and seamless indoor-outdoor living.',
    // Minimal interior with skylight and clean lines
    img: 'https://images.pexels.com/photos/7031732/pexels-photo-7031732.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop',
  },
  {
    id: 'vaastu',
    title: 'Vaastu Aligned',
    sub: 'Harmonised by Design',
    body: 'Layouts are harmonised with natural energies, offering a deep sense of grounding and spiritual alignment — built not just for comfort, but for lasting wellbeing.',
    // Peaceful, warm-toned meditation/yoga interior
    img: 'https://static.wixstatic.com/media/cef78c_8d87dae26b524f669bd58db563e4b116~mv2.jpg',
  },
  {
    id: 'earth',
    title: 'Rammed Earth',
    sub: 'Traditional Construction',
    body: 'Age-old building techniques with lime plaster, organic paint, and naturally antimicrobial surfaces. Walls that regulate humidity, improve air quality, and promote respiratory health.',
    // Textured natural stone/earth wall, architectural detail
    img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop',
  },
];

export default function FeaturesSection() {
  const { isMobile, isTablet } = useWindowSize();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' });
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';

  // Grid columns: mobile=1, tablet=2, desktop=3+2 wrap
  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)';

  return (
    <section id="why-terravana" className="tv-section" style={{ background: '#1a1612', overflow: 'hidden' }}>
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `0 ${px}` }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: isMobile ? '3rem' : '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '2rem', height: '1px', background: '#C76B33', display: 'block', flexShrink: 0 }} />
            <span className="tv-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Why Choose Terravana</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="tv-heading"
            style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : isTablet ? 'clamp(2.5rem, 6vw, 3.8rem)' : 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#fff', margin: 0, maxWidth: '22ch' }}>
            Five pillars of a{' '}
            <em style={{ fontStyle: 'italic', color: '#C76B33' }}>conscious</em> home.
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? '1rem' : '1.25rem' }}>
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index, isMobile }: { feature: typeof features[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="tv-feature-card"
      style={{ aspectRatio: isMobile ? '4/3' : '3/4', minHeight: isMobile ? '200px' : undefined }}
    >
      {/* Real photo background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '1.25rem' }}>
        <motion.img
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          src={feature.img}
          alt={feature.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const p = (e.target as HTMLImageElement).parentElement;
            if (p) p.style.background = 'linear-gradient(160deg, #3A2A1A, #1F1208)';
          }}
        />
      </div>

      <div className="card-overlay" />

      <div className="card-content">
        <span className="tv-label" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', display: 'block' }}>
          {feature.sub}
        </span>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.5rem' : '1.85rem', fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1, margin: '0 0 0.5rem' }}>
          {feature.title}
        </h3>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: isMobile ? '0.78rem' : '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>
          {feature.body}
        </p>
      </div>
    </motion.div>
  );
}
