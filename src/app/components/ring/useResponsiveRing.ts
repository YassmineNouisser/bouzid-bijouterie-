import { useState, useEffect } from 'react';
import { desktopKeyframes, mobileKeyframes, type RingKeyframe } from './keyframes';

export function useResponsiveRing() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const keyframes: RingKeyframe[] = isMobile ? mobileKeyframes : desktopKeyframes;

  return { isMobile, keyframes };
}

