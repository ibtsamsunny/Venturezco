"use client";

import { useCallback, useRef } from "react";

/**
 * Ports the source's `[data-parallax]` behavior: scroll-linked translateY
 * derived from the element's distance from the viewport center, times a
 * factor. `base` is an extra transform prepended (e.g. "translateX(-50%)").
 */
export function useParallax<T extends HTMLElement>(factor: number, base = "") {
  const cleanupRef = useRef<() => void>(() => {});

  return useCallback(
    (el: T | null) => {
      cleanupRef.current();
      cleanupRef.current = () => {};
      if (!el) return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      let ticking = false;
      const update = () => {
        const vh = window.innerHeight;
        const r = el.getBoundingClientRect();
        const off = r.top + r.height / 2 - vh / 2;
        el.style.transform = `${base} translateY(${(-off * factor).toFixed(1)}px)`;
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      update();
      cleanupRef.current = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    },
    [factor, base]
  );
}
