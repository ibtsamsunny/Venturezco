"use client";

import { useCallback, useEffect, useRef } from "react";
import Reveal from "@/components/shared/Reveal";
import { useMagnetic } from "@/hooks/useMagnetic";

type Node = {
  num: string;
  left: string;
  top: string;
  badgeSide: "left" | "right";
  color: string;
  title: string;
  desc: string;
  tag: string;
  icon: React.ReactNode;
};

const NODES: Node[] = [
  {
    num: "01",
    left: "4.61%",
    top: "6.25%",
    badgeSide: "left",
    color: "#4A9EFF",
    title: "Traffic Sources",
    desc: "Paid Ads, Social, SEO, Referrals & More",
    tag: "CAPTURE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20a6.5 6.5 0 0 1 11 0" />
        <circle cx="17.5" cy="9.5" r="2.2" />
        <path d="M15.8 14.4A5.5 5.5 0 0 1 20.5 20" />
      </svg>
    ),
  },
  {
    num: "02",
    left: "73.03%",
    top: "6.25%",
    badgeSide: "right",
    color: "#5B8DEF",
    title: "Funnels",
    desc: "Landing Pages, Forms, Lead Capture Funnels",
    tag: "CONVERT",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h18l-7 8v5l-4 2v-7z" />
      </svg>
    ),
  },
  {
    num: "03",
    left: "75.66%",
    top: "29.17%",
    badgeSide: "right",
    color: "#4A9EFF",
    title: "CRM",
    desc: "Contacts, Pipelines, Opportunities",
    tag: "TRACK",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8.5" r="3" />
        <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    num: "04",
    left: "75.66%",
    top: "52.08%",
    badgeSide: "right",
    color: "#A855F7",
    title: "Automation",
    desc: "Email, SMS, Workflows, Follow-up Sequences",
    tag: "NURTURE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    num: "05",
    left: "73.03%",
    top: "75%",
    badgeSide: "right",
    color: "#EC4899",
    title: "AI Agents",
    desc: "Qualification, Replies, Lead Routing",
    tag: "QUALIFY",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="11" rx="2.5" />
        <circle cx="12" cy="3.4" r="1.3" />
        <path d="M12 4.7V8" />
        <circle cx="9.2" cy="13" r="1.1" />
        <circle cx="14.8" cy="13" r="1.1" />
        <path d="M4 12.5H2.4M21.6 12.5H20" />
      </svg>
    ),
  },
  {
    num: "06",
    left: "4.61%",
    top: "75%",
    badgeSide: "left",
    color: "#F59E0B",
    title: "Appointment Booking",
    desc: "Calendar, Reminders, Confirmations",
    tag: "BOOK",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4.5" width="18" height="17" rx="2" />
        <path d="M16 2.5v4M8 2.5v4M3 10h18" />
        <path d="M8 14.5l2.4 2.3 4.2-4.4" />
      </svg>
    ),
  },
  {
    num: "07",
    left: "1.97%",
    top: "52.08%",
    badgeSide: "left",
    color: "#22C55E",
    title: "Sales Pipeline",
    desc: "Deals, Tasks, Follow-ups, Closing",
    tag: "CLOSE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6.5v11" />
        <path d="M14.6 9c-.6-.8-1.6-1.2-2.7-1.2-1.5 0-2.6.9-2.6 2s1 1.7 2.6 2 2.7.9 2.7 2.1-1.1 2-2.7 2c-1.1 0-2.2-.5-2.7-1.3" />
      </svg>
    ),
  },
  {
    num: "08",
    left: "1.97%",
    top: "29.17%",
    badgeSide: "left",
    color: "#4A9EFF",
    title: "Reporting Dashboard",
    desc: "Revenue, Conversions, Lead Sources",
    tag: "REPORT",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="12" width="3" height="7" rx="1" />
        <rect x="10.5" y="7" width="3" height="12" rx="1" />
        <rect x="17" y="10" width="3" height="9" rx="1" />
        <path d="M3 20.5h18" />
      </svg>
    ),
  },
];

const WIRES = [
  { path: "M410 135 C540 135 555 298 655 298", color: "#4A9EFF", start: { x: 410, y: 135 }, end: { x: 655, y: 298 }, delay: -0.0 },
  { path: "M1110 135 C980 135 965 298 865 298", color: "#5B8DEF", start: { x: 1110, y: 135 }, end: { x: 865, y: 298 }, delay: -0.18 },
  { path: "M1150 355 C1020 355 1057 408 957 408", color: "#4A9EFF", start: { x: 1150, y: 355 }, end: { x: 957, y: 408 }, delay: -0.36 },
  { path: "M1150 575 C1020 575 1057 552 957 552", color: "#A855F7", start: { x: 1150, y: 575 }, end: { x: 957, y: 552 }, delay: -0.54 },
  { path: "M1110 795 C980 795 965 662 865 662", color: "#EC4899", start: { x: 1110, y: 795 }, end: { x: 865, y: 662 }, delay: -0.72 },
  { path: "M410 795 C540 795 555 662 655 662", color: "#F59E0B", start: { x: 410, y: 795 }, end: { x: 655, y: 662 }, delay: -0.9 },
  { path: "M370 575 C500 575 463 552 563 552", color: "#22C55E", start: { x: 370, y: 575 }, end: { x: 563, y: 552 }, delay: -1.08 },
  { path: "M370 355 C500 355 463 408 563 408", color: "#4A9EFF", start: { x: 370, y: 355 }, end: { x: 563, y: 408 }, delay: -1.26 },
];

// Ring dots ("orbiting particles"), 16 evenly spaced around r=210 circle centered at (760,480).
const RING_DOTS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  const r = 210;
  const big = i % 4 === 0;
  return {
    cx: 760 + Math.cos(angle) * r,
    cy: 480 + Math.sin(angle) * r,
    r: big ? 2.6 : 1.5,
    fill: big ? "#9F91FF" : "#5B6BdF",
    opacity: big ? 0.95 : 0.5,
  };
});

/**
 * Ports the source's "2b. Orbit cards" reveal: each `.vz-card` starts
 * rotated/scaled down and alternately tilted, then bounces into place
 * (cubic-bezier(.34,1.72,.56,1)) staggered 95ms apart once the stage
 * scrolls into view — a springy "juggle" rather than a plain fade-up.
 */
function useOrbitReveal<T extends HTMLElement>() {
  const cleanupRef = useRef<() => void>(() => {});
  return useCallback((stage: T | null) => {
    cleanupRef.current();
    cleanupRef.current = () => {};
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>(".vz-card"));
    if (!cards.length) return;
    if (reduce) return;
    cards.forEach((k, idx) => {
      const dir = idx % 2 ? 1 : -1;
      k.style.opacity = "0";
      k.style.transform = `translateY(38px) scale(.86) rotate(${dir * 5}deg)`;
      k.style.transition = "opacity .5s ease, transform .95s cubic-bezier(.34,1.72,.56,1)";
    });
    const juggle = (k: HTMLElement) => {
      k.style.opacity = "1";
      k.style.transform = "";
      setTimeout(() => {
        k.style.transition = "";
      }, 1000);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((k, i) => setTimeout(() => juggle(k), i * 95));
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    io.observe(stage);
    cleanupRef.current = () => io.disconnect();
  }, []);
}

const STAT_ICONS: { value: string; label: string; color: string; icon: React.ReactNode }[] = [
  {
    value: "10+",
    label: "Tools Replaced",
    color: "#4A9EFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3l4 4-4 4" />
        <path d="M21 7H8a4 4 0 0 0-4 4" />
        <path d="M7 21l-4-4 4-4" />
        <path d="M3 17h13a4 4 0 0 0 4-4" />
      </svg>
    ),
  },
  {
    value: "24/7",
    label: "Automated Follow-up",
    color: "#5B8DEF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V12l3 2.5" />
      </svg>
    ),
  },
  {
    value: "100%",
    label: "Lead Visibility",
    color: "#22C55E",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16.5l6-6 4 4 7.5-7.5" />
        <path d="M16 6.5h4.5V11" />
      </svg>
    ),
  },
  {
    value: "1 Platform",
    label: "All Systems Connected",
    color: "#F59E0B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5 2.5 7.5 12 12.5 21.5 7.5 12 2.5z" />
        <path d="M2.5 12.5 12 17.5 21.5 12.5" />
      </svg>
    ),
  },
];

function DiagramNode({ node }: { node: Node }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      el.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="vz-card vz-hoverable"
      style={{
        position: "absolute",
        left: node.left,
        top: node.top,
        width: "22.37%",
        display: "flex",
        gap: 14,
        padding: "18px 20px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.09)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))",
        boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
      }}
    >
      <div className="vz-spot" />
      <div
        className="vz-badge"
        style={{
          position: "absolute",
          top: -13,
          [node.badgeSide]: 16,
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "#0C0D12",
          border: "1px solid rgba(255,255,255,0.16)",
          fontFamily: "'Geist Mono',monospace",
          fontSize: 11,
          fontWeight: 500,
          color: "#C7CBD4",
        }}
      >
        {node.num}
      </div>
      <div
        className="vz-ic"
        style={{
          flex: "none",
          width: 52,
          height: 52,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: `${node.color}1F`,
          border: `1px solid ${node.color}55`,
          color: node.color,
          boxShadow: `0 0 20px ${node.color}22`,
        }}
      >
        {node.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <h3 style={{ margin: "0 0 5px", fontSize: "clamp(15px,1.15vw,18px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{node.title}</h3>
        <p style={{ margin: "0 0 7px", color: "#9AA1AD", fontSize: "clamp(12px,0.95vw,13.5px)", lineHeight: 1.45 }}>{node.desc}</p>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", fontWeight: 600, color: node.color }}>{node.tag}</span>
      </div>
    </div>
  );
}

function BuildCta() {
  const magRef = useMagnetic<HTMLAnchorElement>();
  return (
    <a
      href="#contact"
      ref={magRef}
      className="vz-mag"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 26px",
        borderRadius: 14,
        background: "linear-gradient(100deg,#3B2FE0,#7C4DFF)",
        color: "#fff",
        fontSize: 15.5,
        fontWeight: 700,
        boxShadow: "0 16px 40px rgba(59,47,224,0.4)",
      }}
    >
      Build My Growth System
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

export default function GHLPlatformDiagram() {
  const stageRef = useOrbitReveal<HTMLDivElement>();

  return (
    <section id="platform" style={{ position: "relative", padding: "clamp(50px,7vw,86px) 0", overflow: "hidden", background: "linear-gradient(180deg, rgba(59,47,224,0.05), transparent 40%)" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 560,
          background: "radial-gradient(50% 50% at 50% 30%, rgba(59,47,224,0.16), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Reveal style={{ position: "relative", textAlign: "center", maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
          Powered by GoHighLevel
        </span>
        <h2 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
          One platform. <span style={{ background: "linear-gradient(100deg,#9F91FF,#8B5CF6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Every growth system.</span>
        </h2>
        <p style={{ maxWidth: 640, margin: "22px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.6 }}>
          We connect your marketing, sales, automation, and reporting into one revenue system — so every lead is captured, followed up, qualified, booked,
          and tracked.
        </p>
      </Reveal>

      <Reveal style={{ position: "relative", maxWidth: 1320, margin: "clamp(40px,5vw,60px) auto 0", padding: "0 clamp(20px,4vw,40px)" }}>
        <div ref={stageRef} className="vz-stage" style={{ position: "relative", width: "100%", aspectRatio: "1520/960" }}>
          <svg
            className="vz-wires"
            viewBox="0 0 1520 960"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}
          >
            <defs>
              <linearGradient id="vzRingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4A9EFF" />
                <stop offset="0.5" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#22C55E" />
              </linearGradient>
              <radialGradient id="vzHubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#3B2FE0" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#3B2FE0" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#3B2FE0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="760" cy="480" r="190" fill="url(#vzHubGlow)" style={{ animation: "vzPulseGlow 4s ease-in-out infinite" }} />
            <g style={{ transformOrigin: "760px 480px", animation: "vzSpin 90s linear infinite" }}>
              <circle cx="760" cy="480" r="300" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="2 10" />
            </g>
            <g style={{ transformOrigin: "760px 480px", animation: "vzSpinRev 60s linear infinite" }}>
              <circle cx="760" cy="480" r="256" fill="none" stroke="rgba(130,140,220,0.18)" strokeWidth="1" strokeDasharray="1 13" />
            </g>
            <circle cx="760" cy="480" r="158" fill="none" stroke="rgba(120,120,200,0.14)" strokeWidth="1" />
            <circle cx="760" cy="480" r="210" fill="none" stroke="url(#vzRingGrad)" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 8px rgba(90,110,240,0.6))" }} />
            {WIRES.map((w, i) => (
              <path key={`base-${i}`} d={w.path} fill="none" stroke={`${w.color}44`} strokeWidth="1.6" />
            ))}
            <g style={{ transformOrigin: "760px 480px", animation: "vzSpin 45s linear infinite" }}>
              {RING_DOTS.map((d, i) => (
                <circle key={i} cx={d.cx.toFixed(1)} cy={d.cy.toFixed(1)} r={d.r} fill={d.fill} opacity={d.opacity} />
              ))}
            </g>
            {WIRES.map((w, i) => (
              <path
                key={`flow-${i}`}
                d={w.path}
                fill="none"
                stroke={w.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 24"
                style={{ filter: `drop-shadow(0 0 4px ${w.color}cc)`, animation: "vzFlowLine 1.5s linear infinite", animationDelay: `${w.delay}s` }}
              />
            ))}
            {WIRES.map((w, i) => (
              <g key={`ends-${i}`}>
                <circle cx={w.start.x} cy={w.start.y} r="3.5" fill={w.color} style={{ filter: `drop-shadow(0 0 5px ${w.color})` }} />
                <circle cx={w.end.x} cy={w.end.y} r="5" fill="#0A0A0A" stroke={w.color} strokeWidth="2" style={{ filter: `drop-shadow(0 0 6px ${w.color}aa)` }} />
              </g>
            ))}
          </svg>

          <div className="vz-hub" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", textAlign: "center", width: 220, zIndex: 2 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end", justifyContent: "center", marginBottom: 12 }}>
              <svg width="22" height="30" viewBox="0 0 22 30">
                <path d="M11 0 L22 13 L14.5 13 L14.5 30 L7.5 30 L7.5 13 L0 13 Z" fill="#F5A623" />
              </svg>
              <svg width="22" height="36" viewBox="0 0 22 36">
                <path d="M11 0 L22 13 L14.5 13 L14.5 36 L7.5 36 L7.5 13 L0 13 Z" fill="#4A9EFF" />
              </svg>
            </div>
            <div style={{ fontWeight: 800, fontSize: "clamp(18px,1.7vw,26px)", letterSpacing: "0.02em", color: "#fff", lineHeight: 1 }}>GOHIGHLEVEL</div>
            <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.24em", color: "#9F91FF", marginTop: 7 }}>GROWTH ENGINE</div>
          </div>

          {NODES.map((n) => (
            <DiagramNode key={n.num} node={n} />
          ))}
        </div>
      </Reveal>

      <Reveal style={{ position: "relative", maxWidth: 1240, margin: "clamp(40px,5vw,60px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(28px,4vw,52px)",
            padding: "clamp(28px,3.4vw,44px) clamp(28px,3.6vw,48px)",
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008))",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ flex: "1 1 240px", minWidth: 220 }}>
            <h3 style={{ margin: "0 0 12px", fontWeight: 900, fontSize: "clamp(1.5rem,2.4vw,2rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>
              Stop running your growth on <span style={{ color: "#9F91FF" }}>disconnected tools.</span>
            </h3>
            <p style={{ margin: 0, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6, maxWidth: 340 }}>
              We build GoHighLevel systems that replace scattered software, manual follow-up, and messy sales processes with one connected growth engine.
            </p>
          </div>
          <div style={{ flex: "2 1 440px", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "clamp(14px,2vw,28px)" }}>
            {STAT_ICONS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, textAlign: "center" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: `1px solid ${s.color}66`,
                    color: s.color,
                    boxShadow: `0 0 18px ${s.color}22`,
                    background: `${s.color}12`,
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ fontFamily: "'Satoshi'", fontWeight: 900, fontSize: "clamp(1.5rem,2.4vw,2rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ color: "#9AA1AD", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <BuildCta />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
