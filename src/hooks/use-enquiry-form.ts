import { useState, useRef } from 'react';

export interface EnquiryFormState {
  name:    string;
  phone:   string;
  email:   string;
  message: string;
}

const EMPTY: EnquiryFormState = { name: '', phone: '', email: '', message: '' };

// Server proxy (preferred — no CORS issues)
const API_ROUTE = '/api/enquiry';
// Direct Make.com webhook (fallback for pure-static hosting)
const MAKE_DIRECT = 'https://hook.us1.make.com/hkc9abx8432bfl2p01al8k4jiinh6rlu';

export function useEnquiryForm() {
  const [form, setForm]           = useState<EnquiryFormState>(EMPTY);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const submitting                = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(null); // clear error on any change
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Client-side validation ───────────────────────
  const validate = (): string | null => {
    if (!form.name.trim())  return 'Please enter your name.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    if (!form.email.trim()) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return 'Please enter a valid email address.';
    return null;
  };

  // ── Try server proxy first, fall back to direct ──
  const submitToWebhook = async (payload: Record<string, string>): Promise<void> => {
    // 1. Try server-side proxy
    try {
      const res = await fetch(API_ROUTE, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (res.status === 404) {
        // API route not available (static mode) — fall through to direct
        throw new Error('API_NOT_FOUND');
      }

      const data = await res.json().catch(() => ({ success: res.ok }));

      if (!res.ok || data.success === false) {
        throw new Error(data.error ?? `Request failed with status ${res.status}`);
      }

      return; // ✅ success via proxy
    } catch (err) {
      if ((err as Error).message !== 'API_NOT_FOUND') throw err;
    }

    // 2. Direct to Make.com with no-cors fallback (opaque response — assume success)
    await fetch(MAKE_DIRECT, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(payload),
    });
    // no-cors always resolves — we optimistically treat it as success
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    submitting.current = true;
    setLoading(true);
    setError(null);

    const payload = {
      name:        form.name.trim(),
      phone:       form.phone.trim(),
      email:       form.email.trim(),
      message:     form.message.trim(),
      submit_date: new Date().toISOString(),
    };

    try {
      await submitToWebhook(payload);
      setSubmitted(true);
      setForm(EMPTY);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(
        msg.includes('Failed to fetch') || msg.includes('Network')
          ? 'Network error. Please check your connection and try again.'
          : msg || 'Something went wrong. Please call us at +91 89715 04584.'
      );
    } finally {
      setLoading(false);
      submitting.current = false;
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setSubmitted(false);
    setError(null);
    submitting.current = false;
  };

  return { form, loading, submitted, error, handleChange, handleSubmit, reset };
}
