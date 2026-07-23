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
      {/* WhatsApp SVG icon — official logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 175.216 175.552"
        fill="#fff"
        width={isMobile ? '28' : '32'}
        height={isMobile ? '28' : '32'}
        aria-hidden="true"
      >
        <path d="M87.184 14.2c-40.296 0-73.064 32.736-73.084 72.992a72.7 72.7 0 0 0 9.78 36.556L14.2 161.352l38.572-10.116a73.04 73.04 0 0 0 34.388 8.76h.032c40.284 0 73.064-32.748 73.084-72.992.008-19.5-7.576-37.82-21.34-51.6C125.172 21.62 106.696 14.2 87.184 14.2zm0 133.728h-.028a60.62 60.62 0 0 1-30.868-8.452l-2.216-1.312-22.94 6.016 6.12-22.36-1.44-2.292a60.39 60.39 0 0 1-9.26-32.24c.016-33.408 27.212-60.58 60.66-60.58 16.2.008 31.42 6.32 42.876 17.8 11.456 11.476 17.764 26.728 17.756 42.94-.02 33.416-27.216 60.58-60.66 60.58z" />
        <path d="M126.816 97.94c-2.172-1.088-12.856-6.34-14.844-7.064-1.988-.724-3.436-1.088-4.884 1.088-1.448 2.176-5.608 7.064-6.876 8.512-1.264 1.448-2.532 1.632-4.704.544-2.172-1.088-9.168-3.38-17.468-10.772-6.452-5.752-10.812-12.86-12.08-15.032-1.264-2.176-.136-3.352 .952-4.436.976-.972 2.172-2.536 3.26-3.804 1.088-1.264 1.448-2.176 2.172-3.624.724-1.448.364-2.716-.18-3.804-.544-1.088-4.884-11.776-6.692-16.124-1.764-4.232-3.552-3.66-4.884-3.728-1.264-.06-2.716-.076-4.164-.076-1.448 0-3.8.544-5.788 2.716-1.988 2.176-7.592 7.424-7.592 18.104s7.772 21.004 8.86 22.448c1.088 1.448 15.296 23.36 37.076 32.752 5.18 2.236 9.22 3.572 12.372 4.572 5.2 1.652 9.928 1.42 13.668 .86 4.168-.624 12.856-5.252 14.668-10.324 1.812-5.068 1.812-9.412 1.268-10.324-.544-.908-1.988-1.448-4.16-2.536z" />
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
