"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

/**
 * Ports the source's `[data-reveal]` behavior: fades/slides an element up
 * once, the first time it scrolls into view. No-op (always visible) under
 * prefers-reduced-motion.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  style,
  offset = 20,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  style?: CSSProperties;
  offset?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${offset}px)`,
        transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
