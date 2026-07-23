import { useState, useRef } from 'react';

export interface EnquiryFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const EMPTY: EnquiryFormState = { name: '', phone: '', email: '', message: '' };

export function useEnquiryForm() {
  const [form, setForm]           = useState<EnquiryFormState>(EMPTY);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const submitting = useRef(false); // dedup guard

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = (): string | null => {
    if (!form.name.trim())  return 'Please enter your name.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    if (!form.email.trim()) return 'Please enter your email address.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email address.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return; // prevent double-submit

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    submitting.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/enquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          phone:   form.phone.trim(),
          email:   form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      setSubmitted(true);
      setForm(EMPTY); // clear on success
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us directly.'
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
  };

  return { form, loading, submitted, error, handleChange, handleSubmit, reset };
}
