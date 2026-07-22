import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

const WEBHOOK_URL = 'https://hook.us1.make.com/hkc9abx8432bfl2p01al8k4jiinh6rluits';

const trust = [
  { value: '40+', label: 'Years of\nExpertise'     },
  { value: '4',   label: 'Landmark\nProjects'      },
  { value: '21',  label: 'Acres of\nLiving Nature' },
  { value: '100%',label: 'Power Backup\nClubhouse' },
];

export default function EnquirySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const { isMobile, isTablet } = useWindowSize();

  const [form, setForm]           = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name:        form.name.trim(),
      phone:       form.phone.trim(),
      email:       form.email.trim(),
      message:     form.message.trim(),
      submitted_at: new Date().toISOString(),
      source:      'Svamitva Terravana Website',
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // bypass CORS — Make.com receives data, we can't read response
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      // With no-cors we always get an opaque response — treat as success
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const isStack = isTablet;
  const px = isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(2rem, 8vw, 9rem)';

  return (
    <section id="contact" style={{ position: 'relative', overflow: 'hidden', minHeight: isStack ? 'auto' : '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://static.wixstatic.com/media/cef78c_d7b3751176b94fd2940b3657eec3cd6c~mv2.jpg"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,10,4,0.93) 0%, rgba(36,22,10,0.88) 100%)' }} />
      </div>
      <div className="tv-noise" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      <div
        ref={ref}
        style={{
          position: 'relative', zIndex: 2, width: '100%',
          maxWidth: '100rem', margin: '0 auto',
          padding: `clamp(4rem, 8vw, 9rem) ${px}`,
          display: 'grid',
          gridTemplateColumns: isStack ? '1fr' : '1fr 1fr',
          gap: isStack ? '3rem' : '7rem',
          alignItems: 'center',
        }}
      >
        {/* LEFT — Copy + Trust stats */}
        <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 24 : 0 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            <span style={{ width: '2rem', height: '1px', background: '#C76B33', display: 'block', flexShrink: 0 }} />
            <span className="tv-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Begin Your Journey</span>
          </div>

          <h2 className="tv-heading"
            style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : isTablet ? 'clamp(2.4rem, 5vw, 3.8rem)' : 'clamp(2.5rem, 5vw, 5.2rem)', fontWeight: 300, color: '#fff', margin: `0 0 ${isMobile ? '1.25rem' : '1.75rem'}` }}>
            Life at{' '}
            <em style={{ fontStyle: 'italic', color: '#C76B33' }}>Terravana</em>{' '}starts<br />
            with a single step.
          </h2>

          <p style={{ fontFamily: "'Manrope', sans-serif", color: 'rgba(255,255,255,0.52)', fontSize: isMobile ? '0.88rem' : '0.95rem', lineHeight: 1.8, maxWidth: '42ch', fontWeight: 300, marginBottom: isMobile ? '2rem' : '3rem' }}>
            A legacy of 40 years. An address that breathes. Schedule a private tour and
            experience a home where nature is the neighbor and wellness is in every detail.
          </p>

          {/* Trust stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr', gap: isMobile ? '0.75rem' : '1.25rem' }}>
            {trust.map(t => (
              <div key={t.label} style={{ padding: isMobile ? '1rem' : '1.2rem 1.5rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.9rem', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '2rem' : '2.4rem', fontWeight: 500, color: '#C76B33', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {t.value}
                </div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 500, marginTop: '0.3rem', whiteSpace: 'pre-line' }}>
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Glass form */}
        <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 24 : 0 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1.1, delay: isStack ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="tv-glass"
          style={{ borderRadius: '1.6rem', padding: isMobile ? '1.5rem' : 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>

          {!submitted ? (
            <>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.6rem' : '1.9rem', fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', margin: '0 0 0.35rem' }}>
                Book a Private Tour
              </h3>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.42)', marginBottom: '1.75rem', letterSpacing: '0.04em' }}>
                Our team will reach you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'name',  label: 'Your Name',      type: 'text'  },
                  { name: 'phone', label: 'Phone Number',   type: 'tel'   },
                  { name: 'email', label: 'Email Address',  type: 'email' },
                ].map(field => (
                  <div key={field.name} className="tv-form-group">
                    <input type={field.type} name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange} placeholder={field.label}
                      required className="tv-form-input" autoComplete="off" />
                    <label className="tv-form-label">{field.label}</label>
                  </div>
                ))}

                <div className="tv-form-group">
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Your Message" rows={3} className="tv-form-input"
                    style={{ resize: 'none', paddingTop: '1.15rem', paddingBottom: '0.75rem' }} />
                  <label className="tv-form-label">Your Message (optional)</label>
                </div>

                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={loading}
                  style={{ width: '100%', padding: '1rem', background: loading ? 'rgba(199,107,51,0.6)' : '#C76B33', color: '#fff', border: 'none', borderRadius: '100px', fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s ease', marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                  {loading ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block' }} />
                      Sending...
                    </>
                  ) : 'Schedule My Tour'}
                </motion.button>

                {error && (
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', color: '#ff7c5c', textAlign: 'center', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    {error}
                  </p>
                )}

                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center', letterSpacing: '0.06em', marginTop: '0.25rem' }}>
                  No spam. Your privacy is respected.
                </p>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', padding: isMobile ? '1.5rem 0' : '2.5rem 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(199,107,51,0.15)', border: '1.5px solid rgba(199,107,51,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem', color: '#C76B33' }}>
                ✓
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '1.7rem' : '2.2rem', color: '#fff', fontWeight: 500, margin: '0 0 0.75rem' }}>
                Thank you, {form.name.split(' ')[0] || 'friend'}.
              </h3>
              <p style={{ fontFamily: "'Manrope', sans-serif", color: 'rgba(255,255,255,0.48)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                We'll be in touch within 24 hours to arrange your private experience at Terravana.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
