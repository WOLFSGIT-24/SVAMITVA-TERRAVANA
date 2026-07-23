import { motion } from 'framer-motion';
import { useWindowSize } from '@/hooks/use-window-size';

const WHATSAPP_NUMBER = '918971504584'; // 91 = India country code
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi, I am interested in Svamitva Terravana. Please share more details.'
);

export default function WhatsAppButton() {
  const { isMobile } = useWindowSize();

  const size  = isMobile ? '52px' : '58px';
  const bottom = isMobile ? '5rem' : '5.5rem'; // sits above the Enquire Now pill

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom,
        right: isMobile ? '1.25rem' : '1.75rem',
        zIndex: 201,
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37,211,102,0.45)',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="#fff"
        width={isMobile ? '28' : '32'}
        height={isMobile ? '28' : '32'}
        aria-hidden="true"
      >
        <path d="M16 1C7.73 1 1 7.73 1 16c0 2.65.69 5.13 1.9 7.28L1 31l7.9-1.86A14.94 14.94 0 0 0 16 31c8.27 0 15-6.73 15-15S24.27 1 16 1zm0 27.2a12.13 12.13 0 0 1-6.18-1.69l-.44-.27-4.69 1.1 1.13-4.57-.29-.47A12.18 12.18 0 1 1 16 28.2zm6.68-9.1c-.37-.18-2.17-1.07-2.5-1.19-.34-.12-.58-.18-.83.18-.25.37-.95 1.19-1.16 1.44-.21.24-.43.27-.8.09-.37-.18-1.56-.58-2.97-1.84-1.1-.98-1.84-2.2-2.06-2.57-.21-.37-.02-.57.16-.75.17-.17.37-.43.55-.65.18-.21.24-.37.37-.61.12-.25.06-.46-.03-.65-.09-.18-.83-2-.13-2.74.7-.74 1.9-.5 2.17-.5.09 0 .17 0 .25.01.46.02.7.05 1.01.8.37.9.84 1.85 1.01 2.23.17.37.3.8.06 1.16-.24.37-.37.58-.73.9-.37.31-.78.65-.46.96.33.31 1.45 1.53 3.12 2.47 2.17 1.18 2.17.79 2.56.74.39-.06 1.25-.51 1.43-.1.18.43.18 1.68.03 1.86-.16.18-.37.28-.73.46z" />
      </svg>

      {/* Pulse ring */}
      <motion.span
        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid #25D366',
          pointerEvents: 'none',
        }}
      />
    </motion.a>
  );
}
