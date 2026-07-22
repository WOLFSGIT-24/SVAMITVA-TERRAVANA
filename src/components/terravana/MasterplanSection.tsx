import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

type AmenityCategory = 'Outdoor' | 'Indoor' | 'Wellness' | 'Clubhouse' | 'Nature' | 'Sports';

const amenities: { name: string; category: AmenityCategory }[] = [
  { name: 'Swimming Pool',       category: 'Outdoor'   },
  { name: 'Jogging Trail',       category: 'Outdoor'   },
  { name: 'Outdoor Gym',         category: 'Outdoor'   },
  { name: 'Organic Farming',     category: 'Outdoor'   },
  { name: 'Mud Path',            category: 'Outdoor'   },
  { name: 'Golf Putting',        category: 'Outdoor'   },
  { name: 'Amphitheatre',        category: 'Outdoor'   },
  { name: 'Kid\'s Play Area',    category: 'Outdoor'   },
  { name: 'Meditation Room',     category: 'Clubhouse' },
  { name: 'Library Lounge',      category: 'Clubhouse' },
  { name: 'Mini Theatre',        category: 'Clubhouse' },
  { name: 'Indoor Games',        category: 'Clubhouse' },
  { name: 'Workplace Lounge',    category: 'Clubhouse' },
  { name: 'Guest Room',          category: 'Clubhouse' },
  { name: 'Party Hall',          category: 'Clubhouse' },
  { name: 'Wellness Spa',        category: 'Wellness'  },
  { name: 'Hot & Cold Plunge',   category: 'Wellness'  },
  { name: 'Loaded Gym',          category: 'Wellness'  },
  { name: 'Yoga Deck',           category: 'Wellness'  },
  { name: 'Reflexology Path',    category: 'Wellness'  },
  { name: 'Meditation Labyrinth',category: 'Wellness'  },
  { name: 'Gong Room',           category: 'Wellness'  },
  { name: 'Bamboo Trail',        category: 'Nature'    },
  { name: 'Butterfly Garden',    category: 'Nature'    },
  { name: 'Miyawaki Forest',     category: 'Nature'    },
  { name: 'Aroma Garden',        category: 'Nature'    },
  { name: 'Biodiversity Park',   category: 'Nature'    },
  { name: 'Squash Court',        category: 'Sports'    },
  { name: 'Badminton Court',     category: 'Sports'    },
  { name: 'Multipurpose Court',  category: 'Sports'    },
];

const categories: AmenityCategory[] = ['Outdoor', 'Indoor', 'Wellness', 'Clubhouse', 'Nature', 'Sports'];

const categoryColors: Record<AmenityCategory, string> = {
  Outdoor: '#C76B33', Indoor: '#8B7355', Wellness: '#7A9E7E',
  Clubhouse: '#9B6E50', Nature: '#5E8B4E', Sports: '#C76B33',
};

export default function MasterplanSection() {
  const [active, setActive] = useState<AmenityCategory | null>(null);
  const { isMobile, isTablet } = useWindowSize();
  const headerRef = useRef(null);
  const gridRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' });
  const gridInView   = useInView(gridRef,   { once: true, margin: '-8%'  });

  const isStack = isTablet;
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';
  const filtered = active ? amenities.filter(a => a.category === active) : amenities;

  return (
    <section id="masterplan" className="tv-section" style={{ background: '#F8F6F1' }}>
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `0 ${px}` }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: isMobile ? '3rem' : '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="tv-divider" />
            <span className="tv-label">Masterplan & Amenities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 36 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="tv-heading"
            style={{ fontSize: isMobile ? 'clamp(1.9rem, 9vw, 2.8rem)' : isTablet ? 'clamp(2.4rem, 5vw, 3.5rem)' : 'clamp(2.5rem, 4.5vw, 4.8rem)', fontWeight: 300, margin: 0 }}>
            20,000+ sq. ft. of{' '}
            <em style={{ fontStyle: 'italic', color: '#C76B33' }}>curated wellness.</em>
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isStack ? '1fr' : '1fr 1fr',
            gap: isStack ? '3rem' : '6rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT — Masterplan visual */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 24 : 0 }}
            animate={gridInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="tv-img-zoom"
              style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: isStack ? '16/9' : '1 / 1.05', position: 'relative' }}>
              <img
                src="https://static.wixstatic.com/media/cef78c_41fda945e210476a85ac49f09125acb1~mv2.png"
                alt="Svamitva Terravana masterplan aerial view of 28-acre estate"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const p = (e.target as HTMLImageElement).parentElement;
                  if (p) p.style.background = 'linear-gradient(160deg, #2A3A2A, #1A2A1A)';
                }}
              />
              {/* Info overlay */}
              <div style={{
                position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem',
                padding: isMobile ? '1rem' : '1.2rem 1.4rem',
                background: 'rgba(248,246,241,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                borderRadius: '0.9rem', border: '1px solid rgba(31,31,31,0.07)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem',
              }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.1rem' : '1.35rem', fontWeight: 500, color: '#1F1F1F' }}>
                    21 Acre Estate
                  </div>
                  <div className="tv-label" style={{ marginTop: '0.1rem' }}>
                    Vaderahalli · Kanakapura Road
                  </div>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '2rem' : '2.4rem', fontWeight: 500, color: '#C76B33', lineHeight: 1, textAlign: 'right', flexShrink: 0 }}>
                  36
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: '#888', display: 'block', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                    Features
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Amenities */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 24 : 0 }}
            animate={gridInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.1, delay: isStack ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>
            <p className="tv-body" style={{ fontSize: isMobile ? '0.88rem' : '0.95rem', maxWidth: '44ch', margin: 0 }}>
              Spanning 21 acres of villa land, every space is designed to help you slow down
              and come alive. Filter by category to explore.
            </p>

            {/* Category filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button onClick={() => setActive(null)} className="tv-chip"
                style={{ cursor: 'pointer', background: active === null ? '#C76B33' : undefined, color: active === null ? '#fff' : undefined, borderColor: active === null ? '#C76B33' : undefined }}>
                All
              </button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat === active ? null : cat)} className="tv-chip"
                  style={{ cursor: 'pointer', background: active === cat ? categoryColors[cat] : undefined, color: active === cat ? '#fff' : undefined, borderColor: active === cat ? categoryColors[cat] : undefined }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Amenity chips */}
            <motion.div layout style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {filtered.map((a, i) => (
                <motion.span key={a.name}
                  initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="tv-chip" style={{ borderColor: `${categoryColors[a.category]}30` }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: categoryColors[a.category], display: 'inline-block', flexShrink: 0 }} />
                  {a.name}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(31,31,31,0.1)', display: 'flex', gap: isMobile ? '1.5rem' : '2.5rem', flexWrap: 'wrap' }}>
              {[
                { v: '12', label: 'Clubhouse\nAmenities' },
                { v: '15', label: 'Outdoor &\nCommunity' },
                { v: '20K+', label: 'Sq.ft.\nClubhouse' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '2rem' : '2.4rem', fontWeight: 500, color: '#C76B33', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {s.v}
                  </div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.62rem', color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
