import { useWindowSize } from '@/hooks/use-window-size';
import { usePopupStore } from '@/hooks/use-popup-store';

export default function Footer() {
  const { isMobile, isTablet, width } = useWindowSize();
  const openPopup = usePopupStore(s => s.open);
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';

  const navLinks = [
    { label: 'Our Story',           id: 'story'          },
    { label: 'Why Terravana',       id: 'why-terravana'  },
    { label: 'Masterplan',          id: 'masterplan'     },
    { label: 'Villas',              id: 'villas'         },
    { label: 'Location',            id: 'villas'         },
    { label: 'Contact',             id: 'contact'        },
    { label: 'Privacy Policy',      id: '/privacy-policy'      },
    { label: 'Terms & Conditions',  id: '/terms-and-conditions'},
  ];

  const scrollTo = (id: string) => {
    if (id.startsWith('/')) {
      window.location.href = id;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: '1.5rem',
  };

  // Layout: 3-col on desktop, stack on mobile
  const topGrid = isMobile ? '1fr' : width < 900 ? '1fr 1fr' : '1.8fr 1fr 1.4fr';

  return (
    <footer style={{ background: '#120E0A', color: 'rgba(255,255,255,0.6)', position: 'relative', overflow: 'hidden' }}>

      {/* ═══ TOP SECTION ═══ */}
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `clamp(4rem, 7vw, 6rem) ${px} 0` }}>
        <div style={{ display: 'grid', gridTemplateColumns: topGrid, gap: isMobile ? '3rem' : '4rem', alignItems: 'start' }}>

          {/* Column 1 — Brand + Address */}
          <div>
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'block', marginBottom: '1.75rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.7rem', fontWeight: 600, letterSpacing: '0.06em', color: '#fff' }}>
                SVAMITVA
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.3em', color: '#C76B33', marginTop: '-2px' }}>
                TERRAVANA
              </div>
            </button>

            {/* Address */}
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, margin: '0 0 1.5rem' }}>
              Svamitva Terravana,<br />
              Vaderahalli, Kanakapura Road,<br />
              Bangalore — 560 082<br />
              Karnataka, India
            </p>

            {/* Tagline */}
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#C76B33', lineHeight: 1.5, margin: 0 }}>
              Rooted in nature. Blooming in luxury.
            </p>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <div style={labelStyle}>Navigate</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s ease', textAlign: 'left' }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = '#C76B33'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — CTA + Contact */}
          <div>
            {/* Heading */}
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 400, color: '#fff', letterSpacing: '-0.01em', margin: '0 0 0.25rem', lineHeight: 1.15 }}>
              Begin your journey to<br />
              <em style={{ fontStyle: 'italic', color: '#C76B33' }}>extraordinary living.</em>
            </h3>

            {/* Contact label */}
            <div style={{ ...labelStyle, marginTop: '2rem' }}>Contact</div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
              +91 89715 04584
            </p>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: '0 0 2rem' }}>
              wolfmedia.website@gmail.com
            </p>

            {/* CTA Button */}
            <button
              onClick={openPopup}
              style={{
                display: 'block',
                padding: '1rem 2.2rem',
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: '4px',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#fff',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, background 0.3s ease',
                textAlign: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget).style.borderColor = '#C76B33'; (e.currentTarget).style.background = 'rgba(199,107,51,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget).style.background = 'transparent'; }}
            >
              Schedule a Private<br />Viewing
            </button>
          </div>
        </div>
      </div>

      {/* ═══ COMPLIANCE & RERA ═══ */}
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `2.5rem ${px} 0` }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
          <div style={{ ...labelStyle, marginBottom: '0.8rem' }}>Compliance & RERA</div>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75, margin: '0 0 0.5rem', maxWidth: '72ch' }}>
            Phase 1 RERA No: <span style={{ color: '#C76B33' }}>PRM/KA/RERA/1270/305/PR/201106/003693</span><br />
            Phase 2 RERA No: <span style={{ color: '#C76B33' }}>PRM/KA/RERA/1270/305/PR/160622/004995</span><br />
            Available at the official RERA website <a href="https://rera.karnataka.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#C76B33', textDecoration: 'underline', textUnderlineOffset: '2px' }}>rera.karnataka.gov.in</a>.
          </p>
        </div>
      </div>

      {/* ═══ COPYRIGHT + LEGAL LINKS ═══ */}
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `1.5rem ${px}` }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em' }}>
            © 2025 Svamitva Group. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <a href="/privacy-policy" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => { (e.target as HTMLElement).style.color = '#C76B33'; }} onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.28)'; }}>
              Privacy Policy
            </a>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
            <a href="/terms-and-conditions" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => { (e.target as HTMLElement).style.color = '#C76B33'; }} onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.28)'; }}>
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      {/* ═══ AUTHORISED SALES PARTNER ═══ */}
      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `0 ${px} clamp(2.5rem, 4vw, 3.5rem)` }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.75rem' }}>
          <div style={{ ...labelStyle, color: '#C76B33', marginBottom: '0.75rem' }}>Authorised Sales Partner</div>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, margin: '0 0 0.35rem' }}>
            Marketing managed by <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Wolf Media</strong>
          </p>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.75, margin: 0 }}>
            This website is operated by an authorised marketing partner for Svamitva Terravana.
          </p>
        </div>
      </div>
    </footer>
  );
}
