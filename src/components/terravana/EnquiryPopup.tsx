import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';
import { useEnquiryForm } from '@/hooks/use-enquiry-form';
import { usePopupStore } from '@/hooks/use-popup-store';

const AUTO_DELAY_MS = 25000;
const DISMISS_KEY   = 'tv_popup_dismissed';

export default function EnquiryPopup() {
  const { isOpen: open, close: closeStore } = usePopupStore();
  const { isMobile, isTablet } = useWindowSize();
  const { form, loading, submitted, error, handleChange, handleSubmit, reset } = useEnquiryForm();

  // Auto-show after 25s (only once per session)
  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => usePopupStore.getState().open(), AUTO_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    closeStore();
    sessionStorage.setItem(DISMISS_KEY, '1');
  };

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => { close(); reset(); }, 3500);
    return () => clearTimeout(t);
  }, [submitted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 300,
              cursor: 'pointer',
            }}
          />

          {/* Modal container — centered via flexbox (avoids transform conflict with framer) */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 301,
              display: 'flex',
              alignItems: isMobile ? 'flex-end' : 'center',
              justifyContent: 'center',
              padding: isMobile ? '0' : '1.5rem',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: isMobile ? 100 : 48, scale: isMobile ? 1 : 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? 100 : 32, scale: isMobile ? 1 : 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Enquire about Svamitva Terravana"
              style={{
                pointerEvents: 'auto',
                width: isMobile ? '100%' : isTablet ? '90vw' : '460px',
                maxWidth: '500px',
                maxHeight: isMobile ? '92vh' : '88vh',
                overflowY: 'auto',
                background: 'linear-gradient(160deg, #2E1A0E 0%, #1a1208 100%)',
                border: isMobile ? 'none' : '1px solid rgba(199,107,51,0.2)',
                borderRadius: isMobile ? '1.4rem 1.4rem 0 0' : '1.6rem',
                padding: isMobile ? '2rem 1.5rem 2.5rem' : '2.5rem',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Close button */}
              <button
                onClick={close}
                aria-label="Close"
                style={{
                  position: 'sticky',
                  top: 0,
                  float: 'right',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '1.3rem',
                  lineHeight: 1,
                  zIndex: 5,
                  marginBottom: '-1rem',
                }}
              >
                ×
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', clear: 'both' }}>
                    <span style={{ width: '1.5rem', height: '1px', background: '#C76B33', display: 'block', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: '#C76B33' }}>
                      Limited Villas Available
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.6rem' : '1.9rem', fontWeight: 400, color: '#fff', letterSpacing: '-0.01em', margin: '0 0 0.4rem', lineHeight: 1.1 }}>
                    Book Your Private Tour
                  </h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: isMobile ? '0.75rem' : '0.8rem', color: 'rgba(255,255,255,0.42)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Experience 21 acres of living forest. Our team will reach you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                      { name: 'name',  label: 'Your Name',     type: 'text'  },
                      { name: 'phone', label: 'Phone Number',  type: 'tel'   },
                      { name: 'email', label: 'Email Address', type: 'email' },
                    ].map(field => (
                      <div key={field.name} className="tv-form-group">
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.label}
                          className="tv-form-input"
                          autoComplete="off"
                          style={{ fontSize: isMobile ? '16px' : undefined }} // prevents iOS zoom
                        />
                        <label className="tv-form-label">{field.label}</label>
                      </div>
                    ))}
                    <div className="tv-form-group">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={2}
                        className="tv-form-input"
                        style={{ resize: 'none', paddingTop: '1.15rem', paddingBottom: '0.55rem', fontSize: isMobile ? '16px' : undefined }}
                      />
                      <label className="tv-form-label">Your Message (optional)</label>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: loading ? 1 : 1.03 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: isMobile ? '1rem' : '0.95rem',
                        background: loading ? 'rgba(199,107,51,0.6)' : '#C76B33',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '100px',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s ease',
                        marginTop: '0.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.55rem',
                      }}
                    >
                      {loading ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block' }} />
                          Sending...
                        </>
                      ) : 'Schedule My Tour'}
                    </motion.button>

                    {error && (
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', color: '#ff7c5c', textAlign: 'center', marginTop: '0.1rem', lineHeight: 1.5 }}>
                        {error}
                      </p>
                    )}

                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', letterSpacing: '0.06em' }}>
                      No spam. Your privacy is respected.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: 'center', padding: '2rem 0', clear: 'both' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(199,107,51,0.15)', border: '1.5px solid rgba(199,107,51,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.4rem', color: '#C76B33' }}>✓</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.6rem' : '1.9rem', color: '#fff', fontWeight: 500, margin: '0 0 0.6rem' }}>
                    Thank you, {form.name.split(' ')[0] || 'friend'}.
                  </h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", color: 'rgba(255,255,255,0.48)', fontSize: '0.85rem', lineHeight: 1.75 }}>
                    We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
