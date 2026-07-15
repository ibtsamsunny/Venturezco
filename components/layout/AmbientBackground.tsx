"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NOISE_BG =
  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')";

/**
 * Ports the source's fixed ambient background: two mousemove-eased parallax
 * depth layers (aurora/mesh drift + light blobs) and a section-enter glow
 * flicker (`#ambientGlow`, IntersectionObserver over every <section> on the
 * page, threshold .35, 1.4s decay). Mounted once in the root layout; the
 * glow's section scan re-runs on every route change.
 */
export default function AmbientBackground() {
  const depth10Ref = useRef<HTMLDivElement>(null);
  const depth22Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = [
      { el: depth10Ref.current, f: 10 },
      { el: depth22Ref.current, f: 22 },
    ];
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const tick = () => {
      tx += (mx - tx) * 0.03;
      ty += (my - ty) * 0.03;
      layers.forEach(({ el, f }) => {
        if (el) el.style.transform = `translate3d(${(tx * f).toFixed(1)}px,${(ty * f).toFixed(1)}px,0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = Array.from(document.querySelectorAll("section"));
    if (!sections.length) return;
    let glowTimeout: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            glow.style.opacity = "1";
            clearTimeout(glowTimeout);
            glowTimeout = setTimeout(() => {
              glow.style.opacity = "0";
            }, 1400);
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      clearTimeout(glowTimeout);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div ref={depth10Ref} style={{ position: "absolute", inset: "-10%", willChange: "transform" }}>
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            opacity: 0.06,
            background:
              "radial-gradient(42% 38% at 22% 28%, #3B2FE0, transparent 70%), radial-gradient(38% 42% at 78% 18%, #22D3EE, transparent 70%), radial-gradient(48% 46% at 50% 88%, #8B5CF6, transparent 70%)",
            filter: "blur(120px)",
            animation: "auroraDrift 52s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-25%",
            opacity: 0.045,
            background:
              "radial-gradient(36% 36% at 30% 72%, #1E1B8C, transparent 70%), radial-gradient(40% 40% at 72% 32%, #4C1D95, transparent 70%)",
            filter: "blur(100px)",
            animation: "meshDrift 64s ease-in-out infinite",
          }}
        />
      </div>
      <div ref={depth22Ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <div
          style={{
            position: "absolute",
            top: "-8%",
            left: "-8%",
            width: 1100,
            height: 1100,
            maxWidth: "72vw",
            maxHeight: "72vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,47,224,0.06), transparent 70%)",
            filter: "blur(90px)",
            animation: "lightA 56s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-12%",
            right: "-10%",
            width: 960,
            height: 960,
            maxWidth: "66vw",
            maxHeight: "66vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.05), transparent 70%)",
            filter: "blur(100px)",
            animation: "lightB 63s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "58%",
            width: 820,
            height: 820,
            maxWidth: "58vw",
            maxHeight: "58vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.045), transparent 70%)",
            filter: "blur(90px)",
            animation: "lightC 70s ease-in-out infinite",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.015,
          mixBlendMode: "overlay",
          backgroundImage: NOISE_BG,
          backgroundSize: "180px 180px",
        }}
      />
      <div
        ref={glowRef}
        id="ambientGlow"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(80% 60% at 50% 40%, rgba(59,47,224,0.05), transparent 70%)",
          opacity: 0,
          transition: "opacity 1.6s ease",
        }}
      />
    </div>
  );
}
