import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const links = ['Story', 'Why Terravana', 'Masterplan', 'Villas', 'Contact'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: scrolled ? 'rgba(248,246,241,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(31,31,31,0.08)' : '1px solid transparent',
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
        }}
      >
        <div className="max-w-[100rem] mx-auto px-8 md:px-14 py-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'none', background: 'none', border: 'none', padding: 0 }}
          >
            <div className="flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: scrolled ? '#1F1F1F' : '#fff',
                  transition: 'color 0.5s ease',
                }}
              >
                SVAMITVA
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.62rem',
                  fontWeight: 500,
                  letterSpacing: '0.32em',
                  color: scrolled ? '#C76B33' : 'rgba(255,255,255,0.75)',
                  transition: 'color 0.5s ease',
                  marginTop: '-2px',
                }}
              >
                TERRAVANA
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: scrolled ? '#1F1F1F' : 'rgba(255,255,255,0.88)',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    transition: 'color 0.3s ease',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C76B33'; }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = scrolled ? '#1F1F1F' : 'rgba(255,255,255,0.88)';
                  }}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo('Contact')}
              className="tv-btn-primary"
              style={{ cursor: 'none', fontSize: '0.68rem', padding: '0.7rem 1.6rem' }}
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: scrolled ? '#1F1F1F' : '#fff',
                  transition: 'background 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translateY(6.5px)' : i === 2 ? 'rotate(-45deg) translateY(-6.5px)' : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] flex flex-col justify-center items-center gap-8"
            style={{ background: 'rgba(248,246,241,0.98)', backdropFilter: 'blur(20px)' }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '2.8rem',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: '#1F1F1F',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
