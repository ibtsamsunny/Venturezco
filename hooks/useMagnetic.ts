"use client";

import { useCallback, useRef } from "react";

/**
 * Ports the source's `[data-magnetic]` behavior: the element's transform
 * follows the pointer (x*0.3, y*0.45) and scales up slightly on hover,
 * snapping back on pointer leave. No-op under prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>() {
  const cleanupRef = useRef<() => void>(() => {});

  return useCallback((el: T | null) => {
    cleanupRef.current();
    cleanupRef.current = () => {};
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2;
      const y = ev.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${(x * 0.3).toFixed(1)}px,${(y * 0.45).toFixed(1)}px) scale(1.04)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    cleanupRef.current = () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
}
