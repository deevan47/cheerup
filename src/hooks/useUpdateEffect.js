import { useEffect, useRef } from 'react';

// Like useEffect, but skips the first render (only reacts to *changes*).
export default function useUpdateEffect(fn, deps) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
