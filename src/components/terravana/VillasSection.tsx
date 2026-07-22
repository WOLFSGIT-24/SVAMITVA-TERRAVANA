import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

const villas = [
  {
    id: '3bhk', type: '3 BHK', title: 'Earth Villa', subtitle: 'Thoughtfully crafted for balance',
    land: '2,067 Sq.Ft.', sba: '2,856–2,887 Sq.Ft.', floors: 'Ground + First Floor',
    features: ['Skylit interiors', 'Private garden', 'Open dining', 'Natural Kota flooring'],
    img: 'https://static.wixstatic.com/media/cef78c_49b89d5c80ec4cf081a5e6937dd400fb~mv2.jpg',
  },
  {
    id: '4bhk', type: '4 BHK', title: 'Premium Earth Villa', subtitle: 'Expansive spaces, soulful living',
    land: '3,032 Sq.Ft.', sba: '4,582–4,595 Sq.Ft.', floors: 'Ground + First Floor',
    features: ['Grand skylit hall', 'Extended garden', 'Family lounge', 'Wooden flooring'],
    img: 'https://static.wixstatic.com/media/cef78c_11d823b14ba04fabba0be6e0ce4eff0b~mv2.jpg',
  },
];

const specs = [
  { group: 'Structure',     items: ['Seismic Zone II resistant', 'RCC Structure', 'Rammed Earth Blocks'] },
  { group: 'Walls & Finish',items: ['Lime & mud plastering', 'Clay-lime internal paint', 'Natural external paint (95% lime)'] },
  { group: 'Flooring',      items: ['Kota stone — living, dining, kitchen', 'Wooden flooring — bedrooms', 'Anti-skid ceramic — bathrooms'] },
  { group: 'Openings',      items: ['Solid wood frame doors', 'Jindal aluminium windows', 'Two toughened glass skylights'] },
  { group: 'Services',      items: ['Solar heater per villa', 'Hydropneumatic water supply', 'AC provision all bedrooms'] },
];

const locations = [
  { place: 'Discovery Village',      time: '5 mins'  },
  { place: 'Pyramid Valley',         time: '7 mins'  },
  { place: 'Hospitals',              time: '7 mins'  },
  { place: 'Universities & Colleges',time: '10 mins' },
  { place: 'Upcoming Metro Station', time: '15 mins' },
  { place: 'Art of Living',          time: '15 mins' },
  { place: 'NICE Road Junction',     time: '20 mins' },
  { place: 'Electronic City / IT Hubs', time: '45 mins' },
];

export default function VillasSection() {
  const [activeVilla, setActiveVilla] = useState(0);
  const [activeSpec,  setActiveSpec]  = useState(-1);
  const { isMobile, isTablet } = useWindowSize();
  const headerRef  = useRef(null);
  const contentRef = useRef(null);
  const headerInView  = useInView(headerRef,  { once: true, margin: '-10%' });
  const contentInView = useInView(contentRef, { once: true, margin: '-8%'  });

  const isStack = isTablet;
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';
  const villa = villas[activeVilla];

  return (
    <section id="villas" className="tv-section" style={{ background: '#F8F6F1' }}>
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `0 ${px}` }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: isMobile ? '3rem' : '4.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="tv-divider" />
            <span className="tv-label">Villas & Location</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 36 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="tv-heading"
            style={{ fontSize: isMobile ? 'clamp(1.9rem, 9vw, 2.8rem)' : isTablet ? 'clamp(2.4rem, 5vw, 3.5rem)' : 'clamp(2.5rem, 4.5vw, 4.8rem)', fontWeight: 300, margin: 0 }}>
            Your{' '}
            <em style={{ fontStyle: 'italic', color: '#C76B33' }}>Earth Villa</em>{' '}awaits.
          </motion.h2>
        </div>

        {/* Two-column content */}
        <div ref={contentRef}
          style={{ display: 'grid', gridTemplateColumns: isStack ? '1fr' : '1fr 1fr', gap: isStack ? '3rem' : '6rem', alignItems: 'start' }}>

          {/* LEFT — Selector + Specs */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 24 : 0 }}
            animate={contentInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>

            {/* Villa type toggle */}
            <div style={{ display: 'flex', gap: '1px', background: 'rgba(31,31,31,0.12)', borderRadius: '100px', padding: '4px', width: 'fit-content', marginBottom: isMobile ? '1.75rem' : '2.25rem' }}>
              {villas.map((v, i) => (
                <button key={v.id} onClick={() => setActiveVilla(i)}
                  style={{ padding: isMobile ? '0.55rem 1.25rem' : '0.6rem 1.6rem', borderRadius: '100px', border: 'none', fontFamily: "'Manrope', sans-serif", fontSize: isMobile ? '0.68rem' : '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.3s ease, color 0.3s ease', background: activeVilla === i ? '#C76B33' : 'transparent', color: activeVilla === i ? '#fff' : '#555' }}>
                  {v.type}
                </button>
              ))}
            </div>

            {/* Villa info card */}
            <motion.div key={villa.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.7rem' : 'clamp(1.8rem, 2.5vw, 2.6rem)', fontWeight: 500, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '0 0 0.35rem' }}>
                {villa.type} {villa.title}
              </h3>
              <p className="tv-body" style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                {villa.subtitle}
              </p>

              {/* Size grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(31,31,31,0.1)', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Land Area',      val: villa.land   },
                  { label: 'Super Built-Up', val: villa.sba    },
                  { label: 'Configuration',  val: villa.floors },
                  { label: 'Orientation',    val: 'East & West'},
                ].map(item => (
                  <div key={item.label} style={{ padding: isMobile ? '1rem' : '1.2rem 1.4rem', background: '#F8F6F1' }}>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1rem' : '1.15rem', fontWeight: 500, color: '#1F1F1F' }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: isMobile ? '2rem' : '2.5rem' }}>
                {villa.features.map(f => <span key={f} className="tv-chip">{f}</span>)}
              </div>
            </motion.div>

            {/* Specifications accordion */}
            <div style={{ borderTop: '1px solid rgba(31,31,31,0.1)', paddingTop: '1.75rem' }}>
              <div className="tv-label" style={{ marginBottom: '1.25rem' }}>Construction Specifications</div>
              {specs.map((s, i) => (
                <div key={s.group} style={{ borderBottom: '1px solid rgba(31,31,31,0.07)' }}>
                  <button onClick={() => setActiveSpec(activeSpec === i ? -1 : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '0.5rem' }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#1F1F1F', letterSpacing: '0.03em' }}>
                      {s.group}
                    </span>
                    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', color: '#C76B33', transition: 'transform 0.3s ease', transform: activeSpec === i ? 'rotate(45deg)' : 'none', display: 'inline-block', flexShrink: 0 }}>
                      +
                    </span>
                  </button>
                  <motion.div initial={false} animate={{ height: activeSpec === i ? 'auto' : 0, opacity: activeSpec === i ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                    <ul style={{ padding: '0 0 1rem 0.75rem', margin: 0, listStyle: 'none' }}>
                      {s.items.map(item => (
                        <li key={item} style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: '#555', lineHeight: 1.8, display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: '#C76B33', marginTop: '0.52rem', flexShrink: 0, fontSize: '0.45rem' }}>●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Villa visual + Location */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 24 : 0 }}
            animate={contentInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.1, delay: isStack ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2rem' : '3rem' }}>

            {/* Villa visual card */}
            <motion.div key={villa.id + '-img'} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', background: '#1a1208' }}>
              <motion.img
                key={villa.id + '-photo'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                src={villa.img}
                alt={`${villa.type} ${villa.title} at Svamitva Terravana`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Caption overlay */}
              <div style={{ position: 'absolute', bottom: isMobile ? '1rem' : '1.5rem', left: isMobile ? '1rem' : '1.5rem', right: isMobile ? '1rem' : '1.5rem', padding: isMobile ? '1rem 1.1rem' : '1.25rem 1.5rem', background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderRadius: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.2rem' : '1.4rem', fontWeight: 500, color: '#fff' }}>
                  {villa.type} {villa.title}
                </div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  {villa.land} Land · {villa.sba} SBA
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <div>
              <div className="tv-label" style={{ marginBottom: '1.25rem' }}>Location & Connectivity</div>
              <p className="tv-body" style={{ fontSize: '0.88rem', marginBottom: '1.5rem', maxWidth: '42ch' }}>
                Nestled in Vaderahalli on Kanakapura Road — serenity of nature meets convenience of Bangalore.
              </p>
              <div>
                {locations.map((loc, i) => (
                  <motion.div key={loc.place}
                    initial={{ opacity: 0, x: 16 }}
                    animate={contentInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.35 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '0.75rem 0' : '0.85rem 0', borderBottom: '1px solid rgba(31,31,31,0.07)', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                      <span style={{ width: '5px', height: '5px', background: '#C76B33', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: isMobile ? '0.8rem' : '0.85rem', color: '#1F1F1F', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {loc.place}
                      </span>
                    </div>
                    <span className="tv-location-badge">{loc.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
