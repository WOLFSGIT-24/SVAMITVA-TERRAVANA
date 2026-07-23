import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';
import { useEnquiryForm } from '@/hooks/use-enquiry-form';

// Auto-show after 25 seconds, or can be triggered externally
const AUTO_DELAY_MS = 25000;
const DISMISS_KEY   = 'tv_popup_dismissed';

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const { isMobile } = useWindowSize();
  const { form, loading, submitted, error, handleChange, handleSubmit, reset } = useEnquiryForm();

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setOpen(true), AUTO_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, '1');
  };

  // Auto-close success state after 3s
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => {
      close();
      reset();
    }, 3500);
    return () => clearTimeout(t);
  }, [submitted]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

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
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 300, cursor: 'pointer' }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 48, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Enquire about Svamitva Terravana"
            style={{
              position: 'fixed',
              zIndex: 301,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? 'calc(100vw - 2rem)' : '480px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'linear-gradient(160deg, #2E1A0E 0%, #1a1208 100%)',
              border: '1px solid rgba(199,107,51,0.2)',
              borderRadius: '1.6rem',
              padding: isMobile ? '1.75rem 1.5rem' : '2.5rem',
            }}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close"
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1 }}
            >
              ×
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <span style={{ width: '1.5rem', height: '1px', background: '#C76B33', display: 'block', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#C76B33' }}>
                    Limited Villas Available
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.7rem' : '2rem', fontWeight: 400, color: '#fff', letterSpacing: '-0.01em', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
                  Book Your Private Tour
                </h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Experience 21 acres of living forest. Our team will reach you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    { name: 'name',  label: 'Your Name',     type: 'text'  },
                    { name: 'phone', label: 'Phone Number',  type: 'tel'   },
                    { name: 'email', label: 'Email Address', type: 'email' },
                  ].map(field => (
                    <div key={field.name} className="tv-form-group">
                      <input type={field.type} name={field.name} value={form[field.name as keyof typeof form]} onChange={handleChange} placeholder={field.label} className="tv-form-input" autoComplete="off" />
                      <label className="tv-form-label">{field.label}</label>
                    </div>
                  ))}
                  <div className="tv-form-group">
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={2} className="tv-form-input" style={{ resize: 'none', paddingTop: '1.15rem', paddingBottom: '0.55rem' }} />
                    <label className="tv-form-label">Your Message (optional)</label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: loading ? 1 : 1.03 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    disabled={loading}
                    style={{ width: '100%', padding: '0.95rem', background: loading ? 'rgba(199,107,51,0.6)' : '#C76B33', color: '#fff', border: 'none', borderRadius: '100px', fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s ease', marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem' }}
                  >
                    {loading ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block' }} />
                        Sending...
                      </>
                    ) : 'Schedule My Tour'}
                  </motion.button>

                  {error && (
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', color: '#ff7c5c', textAlign: 'center', marginTop: '0.15rem', lineHeight: 1.5 }}>
                      {error}
                    </p>
                  )}

                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)', textAlign: 'center', letterSpacing: '0.06em' }}>
                    No spam. Your privacy is respected.
                  </p>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(199,107,51,0.15)', border: '1.5px solid rgba(199,107,51,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.4rem', color: '#C76B33' }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.9rem', color: '#fff', fontWeight: 500, margin: '0 0 0.6rem' }}>
                  Thank you, {form.name.split(' ')[0] || 'friend'}.
                </h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", color: 'rgba(255,255,255,0.48)', fontSize: '0.85rem', lineHeight: 1.75 }}>
                  We'll be in touch within 24 hours to arrange your private Terravana experience.
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
