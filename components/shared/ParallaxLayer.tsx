"use client";

import type { CSSProperties } from "react";
import { useParallax } from "@/hooks/useParallax";

/** Thin wrapper so a `[data-parallax]`-style scroll-linked div can be used
 * from a Server Component page without that page itself needing "use client". */
export default function ParallaxLayer({
  factor,
  base,
  style,
  ...rest
}: {
  factor: number;
  base?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useParallax<HTMLDivElement>(factor, base);
  return <div ref={ref} style={style} {...rest} />;
}
