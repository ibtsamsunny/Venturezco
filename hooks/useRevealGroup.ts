"use client";

import { useCallback, useRef } from "react";

/**
 * Ports the source's `[data-reveal-group]` behavior: each direct child gets
 * a hover spotlight + lift (`.vz-hoverable`/`.vz-spot`, styled in
 * globals.css) and staggers in (100ms/child) the first time the group
 * scrolls into view. Operates on `container.children` directly, same as the
 * source's `querySelectorAll('[data-reveal-group]')` pass.
 */
export function useRevealGroup<T extends HTMLElement>() {
  const cleanupRef = useRef<() => void>(() => {});

  return useCallback((container: T | null) => {
    cleanupRef.current();
    cleanupRef.current = () => {};
    if (!container) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kids = Array.from(container.children) as HTMLElement[];
    const spotCleanups: Array<() => void> = [];

    kids.forEach((k) => {
      k.classList.add("vz-hoverable");
      if (getComputedStyle(k).position === "static") k.style.position = "relative";
      const spot = document.createElement("div");
      spot.className = "vz-spot";
      k.appendChild(spot);
      const onMove = (ev: PointerEvent) => {
        const r = k.getBoundingClientRect();
        k.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        k.style.setProperty("--my", `${ev.clientY - r.top}px`);
      };
      k.addEventListener("pointermove", onMove);
      spotCleanups.push(() => {
        k.removeEventListener("pointermove", onMove);
        spot.remove();
      });
      if (!reduce) {
        k.style.opacity = "0";
        k.style.transform = "translateY(24px)";
        k.style.transition = "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)";
      }
    });

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
                }, i * 100)
              );
              io?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
      );
      io.observe(container);
    }

    cleanupRef.current = () => {
      spotCleanups.forEach((fn) => fn());
      io?.disconnect();
    };
  }, []);
}
