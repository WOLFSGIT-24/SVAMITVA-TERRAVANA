import { useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8F6F1',
        fontFamily: "'Manrope', sans-serif",
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <img src="/error.svg" alt="" style={{ width: '120px', opacity: 0.5 }} />
      </div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: '#1F1F1F',
          margin: '0 0 1rem',
          letterSpacing: '-0.02em',
        }}
      >
        Something went wrong.
      </h1>
      <p
        style={{
          fontSize: '0.9rem',
          color: '#555',
          maxWidth: '40ch',
          lineHeight: 1.75,
          marginBottom: '2rem',
        }}
      >
        {error?.message ?? 'An unexpected error occurred. Please return to the homepage.'}
      </p>
      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.85rem 2.2rem',
          background: '#C76B33',
          color: '#fff',
          borderRadius: '100px',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
