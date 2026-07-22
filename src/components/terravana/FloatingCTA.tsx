import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.88 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: isMobile ? '1.25rem' : '1.75rem',
            right: isMobile ? '1.25rem' : '1.75rem',
            zIndex: 200,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            style={{
              padding: isMobile ? '0.75rem 1.4rem' : '0.85rem 1.8rem',
              background: '#C76B33',
              color: '#fff',
              border: 'none',
              borderRadius: '100px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: isMobile ? '0.65rem' : '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              boxShadow: '0 6px 28px rgba(199,107,51,0.38)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.75)', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
            {isMobile ? 'Enquire' : 'Enquire Now'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
