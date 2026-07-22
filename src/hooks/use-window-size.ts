import { useEffect, useState } from 'react';

export function useWindowSize() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    width,
    isMobile: width < 640,   // < sm
    isTablet: width < 1024,  // < lg
    isDesktop: width >= 1024,
  };
}
