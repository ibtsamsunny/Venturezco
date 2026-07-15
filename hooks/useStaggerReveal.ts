"use client";

import { useCallback, useRef } from "react";

/**
 * A plain staggered fade-up-on-scroll for a group of children — no hover
 * spotlight injection (unlike useRevealGroup). Matches pages whose design
 * only wants a scroll reveal plus a separate, purely-CSS hover treatment.
 */
export function useStaggerReveal<T extends HTMLElement>(staggerMs = 90) {
  const cleanupRef = useRef<() => void>(() => {});

  return useCallback(
    (container: T | null) => {
      cleanupRef.current();
      cleanupRef.current = () => {};
      if (!container) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const kids = Array.from(container.children) as HTMLElement[];
      if (!reduce) {
        kids.forEach((k) => {
          k.style.opacity = "0";
          k.style.transform = "translateY(20px)";
          k.style.transition = "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)";
        });
      }
      let io: IntersectionObserver | null = null;
      if (!reduce) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                kids.forEach((k, i) =>
                  setTimeout(() => {
                    k.style.opacity = "1";
                    k.style.transform = "none";
                  }, i * staggerMs)
                );
                io?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
        io.observe(container);
      }
      cleanupRef.current = () => io?.disconnect();
    },
    [staggerMs]
  );
}
