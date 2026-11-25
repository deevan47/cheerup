import { useEffect, useState } from 'react';

// "Narrow" = below 1100px: mobile menu, sticky WhatsApp bar, stacked layouts.
// Matches the breakpoint comment in styles/global.css. Keep the two in step.
export const NARROW_BREAKPOINT = 1100;

const isNarrow = () => (typeof window === 'undefined' ? false : window.innerWidth < NARROW_BREAKPOINT);

export default function useNarrow() {
  // Pre-rendering has no window, so it builds the desktop layout; the first
  // effect in the browser corrects it before paint matters.
  const [narrow, setNarrow] = useState(isNarrow);
  useEffect(() => {
    const onResize = () => setNarrow(isNarrow());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return narrow;
}
