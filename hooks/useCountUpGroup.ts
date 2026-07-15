"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Ports the source's hero-stat counters (`this.T` / `runCounters`): all
 * targets animate together with a cubic ease-out over 1700ms, triggered
 * once the observed element (the stats band) is 30% in view. A 4s safety
 * timeout guarantees final values even if the observer never fires.
 */
export function useCountUpGroup<K extends string>(targets: Record<K, number>) {
  const keys = Object.keys(targets) as K[];
  const zeroed = Object.fromEntries(keys.map((k) => [k, 0])) as Record<K, number>;
  const [values, setValues] = useState<Record<K, number>>(zeroed);
  const countedRef = useRef(false);
  const cleanupRef = useRef<() => void>(() => {});

  const run = useCallback(() => {
    if (countedRef.current) return;
    countedRef.current = true;
    const dur = 1700;
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setValues(
        Object.fromEntries(keys.map((k) => [k, targets[k] * e])) as Record<K, number>
      );
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useCallback((el: HTMLElement | null) => {
    cleanupRef.current();
    cleanupRef.current = () => {};
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      countedRef.current = true;
      setValues(targets);
      return;
    }
    const safety = setTimeout(() => {
      if (!countedRef.current) {
        countedRef.current = true;
        setValues(targets);
      }
    }, 4000);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    cleanupRef.current = () => {
      clearTimeout(safety);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, ref };
}
