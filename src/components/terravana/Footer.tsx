import { useWindowSize } from '@/hooks/use-window-size';

const quickLinks = [
  { label: 'Our Story',       id: 'story'          },
  { label: 'Why Terravana',   id: 'why-terravana'  },
  { label: 'Masterplan',      id: 'masterplan'     },
  { label: 'Villas',          id: 'villas'         },
  { label: 'Contact',         id: 'contact'        },
];

const otherProjects = [
  'Svamitva Emerald Square',
  'Svamitva Floresta',
  'Manikchand Soul Spring',
  'Svamitva Rootopia',
];

const social = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { isMobile, isTablet, width } = useWindowSize();
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';

  // Grid: 5-col desktop, 2-col tablet, 1-col mobile
  const gridCols = isMobile ? '1fr' : width < 900 ? '1fr 1fr' : '2fr 1fr 1fr 1fr 1.2fr';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const colHeadStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.3)',
    marginBottom: '1.25rem',
  };

  return (
    <footer style={{ background: '#120E0A', color: 'rgba(255,255,255,0.65)', padding: `clamp(3.5rem, 6vw, 6rem) 0 0`, position: 'relative', overflow: 'hidden' }}>
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: px, right: px, height: '1px', background: 'linear-gradient(to right, transparent, rgba(199,107,51,0.45), transparent)' }} />

      <div style={{ maxWidth: '100rem', margin: '0 auto', padding: `0 ${px}`, display: 'grid', gridTemplateColumns: gridCols, gap: isMobile ? '2.5rem' : isTablet ? '3rem' : '4rem' }}>

        {/* Brand */}
        <div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', marginBottom: '1.25rem', display: 'block' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.06em', color: '#fff' }}>
              SVAMITVA
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.3em', color: '#C76B33', marginTop: '-2px' }}>
              TERRAVANA
            </div>
          </button>

          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.83rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.35)', maxWidth: isMobile ? '100%' : '30ch', marginBottom: '1.75rem', margin: '0 0 1.75rem' }}>
            Homes for your mind, body, and soul. An Earth Villa community nestled in 21 acres
            of living forest on Kanakapura Road, Bangalore.
          </p>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {social.map(s => (
              <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer"
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', transition: 'all 0.25s ease', cursor: 'pointer' }}
                onMouseEnter={e => { Object.assign((e.currentTarget as HTMLElement).style, { borderColor: '#C76B33', color: '#C76B33', background: 'rgba(199,107,51,0.08)' }); }}
                onMouseLeave={e => { Object.assign((e.currentTarget as HTMLElement).style, { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', background: 'transparent' }); }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div style={colHeadStyle}>Navigate</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {quickLinks.map(link => (
              <li key={link.id}>
                <button onClick={() => scrollTo(link.id)}
                  style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.83rem', color: 'rgba(255,255,255,0.48)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.25s ease' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#C76B33'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.48)'; }}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Projects */}
        <div>
          <div style={colHeadStyle}>Other Projects</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {otherProjects.map(p => (
              <li key={p} style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={colHeadStyle}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: '#C76B33', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.28rem' }}>
                Address
              </div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, margin: 0 }}>
                Vaderahalli, Kanakapura Road<br />Bangalore — 560 082
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: '#C76B33', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.28rem' }}>
                Enquiries
              </div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, margin: 0 }}>
                info@svamitvagroup.com<br />+91 89715 04584
              </p>
            </div>
          </div>
        </div>

        {/* Channel Partner */}
        <div>
          <div style={colHeadStyle}>Channel Partner</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: '#C76B33', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.28rem' }}>
                Partner With Us
              </div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
                Join our trusted network of channel partners and help connect clients to conscious living at Terravana.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: '#C76B33', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.28rem' }}>
                Partner Enquiries
              </div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, margin: 0 }}>
                partners@svamitvagroup.com<br />+91 89715 04584
              </p>
            </div>
            <a
              href="mailto:partners@svamitvagroup.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: '1px solid rgba(199,107,51,0.4)',
                borderRadius: '100px',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#C76B33',
                textDecoration: 'none',
                transition: 'background 0.25s ease, border-color 0.25s ease',
                width: 'fit-content',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(199,107,51,0.12)';
                (e.currentTarget as HTMLElement).style.borderColor = '#C76B33';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(199,107,51,0.4)';
              }}
            >
              Become a Partner
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '100rem', margin: '3.5rem auto 0', padding: `1.25rem ${px}`, borderTop: '1px solid rgba(255,255,255,0.055)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em' }}>
          © 2025 Svamitva Group. All rights reserved.
        </span>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.07em' }}>
          RERA Registration Pending · Privacy Policy
        </span>
      </div>
    </footer>
  );
}
