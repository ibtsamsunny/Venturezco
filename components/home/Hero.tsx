"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/shared/Reveal";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useParallax } from "@/hooks/useParallax";
import { useCountUpGroup } from "@/hooks/useCountUpGroup";
import { useRevealGroup } from "@/hooks/useRevealGroup";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

const HeroBlobCanvas = dynamic(() => import("./HeroBlobCanvas"), { ssr: false });

const HERO_L1 = "More viewings. More listings.";
const HERO_L2 = "More sales.";

const HERO_PHOTO = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

// Owner-supplied figures — update here as the real numbers change.
const STAT_TARGETS = { sites: 260, lift: 3.2, growth: 100 };

type StatEntry =
  | { kind: "count"; key: keyof typeof STAT_TARGETS; label: string; format: (v: number) => string }
  | { kind: "static"; label: string; value: string };

const STATS: StatEntry[] = [
  { kind: "count", key: "sites", label: "Custom Websites Built", format: (v) => `${Math.round(v)}+` },
  { kind: "count", key: "lift", label: "Avg Conversion Lift", format: (v) => `${v.toFixed(1)}x` },
  { kind: "static", label: "Automated Meeting Scheduling", value: "24/7" },
  { kind: "count", key: "growth", label: "Business Growth", format: (v) => `${Math.round(v)}%` },
];

// The left-near floating card cycles through these live "events" every 3.8s.
const LIVE_EVENTS = [
  { a: "New buyer enquiry", b: "£850,000 · Qualified", c: "#34D399" },
  { a: "AI qualified", b: "Ready to view", c: "#A5F3FC" },
  { a: "Viewing booked", b: "Sat · 11:00 AM", c: "#C4B5FD" },
  { a: "Offer submitted", b: "£812,000", c: "#FCD34D" },
  { a: "Offer accepted", b: "Status updated", c: "#34D399" },
];

function HeroHeadline() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 50);
    return () => clearTimeout(t);
  }, []);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lineStyle = (delayMs: number): React.CSSProperties =>
    reduce
      ? {}
      : {
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(65%)",
          transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delayMs}ms, transform .85s cubic-bezier(.16,1,.3,1) ${delayMs}ms`,
        };
  return (
    <h1
      style={{
        margin: 0,
        fontWeight: 900,
        fontSize: "clamp(2.6rem,7vw,5.2rem)",
        lineHeight: 1.04,
        letterSpacing: "-0.03em",
        color: "#fff",
        textWrap: "balance",
      }}
    >
      <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
        <span className="vz-line" style={lineStyle(150)}>
          {HERO_L1}
        </span>
      </span>
      <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
        <span
          className="vz-line"
          style={{
            ...lineStyle(280),
            background: "linear-gradient(100deg,#9F91FF,#8B5CF6,#22D3EE,#9F91FF,#8B5CF6)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "vzHue 6s linear infinite",
          }}
        >
          {HERO_L2}
        </span>
      </span>
    </h1>
  );
}

function StatsBand() {
  const { values, ref: countUpRef } = useCountUpGroup(STAT_TARGETS);
  const revealGroupRef = useRevealGroup<HTMLDivElement>();
  const setGridRef = useCallback(
    (el: HTMLDivElement | null) => {
      countUpRef(el);
      revealGroupRef(el);
    },
    [countUpRef, revealGroupRef]
  );
  return (
    <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "clamp(48px,6vw,72px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <div
        id="vz-results"
        ref={setGridRef}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "30px 26px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Satoshi'",
                fontWeight: 900,
                fontSize: "clamp(2rem,3.4vw,2.8rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                background: "linear-gradient(120deg,#fff,#B3A6FF)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {s.kind === "static" ? s.value : s.format(values[s.key])}
            </div>
            <div style={{ marginTop: 10, color: "#9AA1AD", fontSize: 14, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function FlowStage({
  icon,
  title,
  sub,
  showArrow,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  showArrow: boolean;
  delay: number;
}) {
  return (
    <>
      <div style={{ flex: "1 1 150px", minWidth: 140, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, padding: 8 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, display: "grid", placeItems: "center", background: "rgba(59,47,224,0.10)", border: "1px solid rgba(59,47,224,0.22)", color: "#B3A6FF" }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14.5, color: "#fff" }}>{title}</div>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7280", marginTop: 3 }}>{sub}</div>
        </div>
      </div>
      {showArrow && (
        <div style={{ flex: "0 0 40px", alignSelf: "center", minWidth: 40, position: "relative", height: 2, background: "linear-gradient(90deg, rgba(59,47,224,0.15), rgba(59,47,224,0.5))", borderRadius: 2 }}>
          <span
            style={{
              position: "absolute",
              top: "50%",
              width: 7,
              height: 7,
              marginTop: -3.5,
              borderRadius: "50%",
              background: "#9F91FF",
              boxShadow: "0 0 10px #3B2FE0",
              animation: "vzFlow 3s linear infinite",
              animationDelay: `${delay}s`,
            }}
          />
        </div>
      )}
    </>
  );
}

function GrowthEngine() {
  const parallaxRef = useParallax<HTMLDivElement>(0.05);
  return (
    <div ref={parallaxRef} style={{ position: "relative", zIndex: 2, maxWidth: 1160, margin: "clamp(56px,7vw,84px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <div style={{ position: "relative", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 26, background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))", padding: "clamp(22px,3.5vw,40px)", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 26 }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7C8492" }}>The VenturezCo Real Estate Growth Engine</span>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B2FE0" }}>● live pipeline</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 26 }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", alignSelf: "center", marginRight: 4 }}>Before —</span>
          {[
            ["Outdated Website", "6s"],
            ["Lost Enquiries", "6.6s"],
            ["Slow Follow-Up", "5.4s"],
            ["Disconnected Tools", "6.2s"],
          ].map(([label, dur]) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 13px",
                borderRadius: 999,
                border: "1px dashed rgba(248,113,113,0.32)",
                background: "rgba(248,113,113,0.05)",
                color: "#C99",
                fontSize: 13,
                animation: `vzFloat ${dur} ease-in-out infinite`,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F87171" }} />
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: 0, flexWrap: "wrap" }}>
          <FlowStage
            delay={0}
            showArrow
            title="High-Performance Website"
            sub="build"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                <line x1="2.5" y1="9" x2="21.5" y2="9" />
                <circle cx="5.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
                <circle cx="7.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
                <path d="M6 13.5h6M6 16.5h9" />
              </svg>
            }
          />
          <FlowStage
            delay={0.6}
            showArrow
            title="Qualified Enquiry"
            sub="capture"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.6" />
                <path d="M10 6.5h3.5a3 3 0 0 1 3 3V14" />
              </svg>
            }
          />
          <FlowStage
            delay={1.2}
            showArrow
            title="AI Follow-Up"
            sub="nurture"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
              </svg>
            }
          />
          <FlowStage
            delay={1.8}
            showArrow
            title="Viewing Booked"
            sub="book"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6l1.8 1.8L8 4.6" />
                <path d="M3 14l1.8 1.8L8 12.6" />
                <line x1="12" y1="6" x2="21" y2="6" />
                <line x1="12" y1="13" x2="21" y2="13" />
                <line x1="12" y1="20" x2="21" y2="20" />
              </svg>
            }
          />
          <div style={{ flex: "1 1 160px", minWidth: 150, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, padding: 8 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, display: "grid", placeItems: "center", background: "rgba(59,47,224,0.16)", color: "#fff", animation: "vzGlow 3.4s ease-in-out infinite" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 17 9 11 13 15 21 7" />
                <polyline points="15 7 21 7 21 13" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: "#fff" }}>Deal Progressed</div>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3B2FE0", marginTop: 3 }}>close</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCardIcon({ children, bg, border, color }: { children: React.ReactNode; bg: string; border: string; color: string }) {
  return (
    <div style={{ flex: "none", width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: bg, border, color }}>
      {children}
    </div>
  );
}

/** The 4 glass-morphism notification cards floating over the hero photo —
 * "near" cards (`.re-m`) stay visible on mobile down to 760px, "far" cards
 * (`.re-d`) are desktop-only and sit dimmed behind the blob. All 4 drift on
 * a mouse-parallax (eased toward the pointer, same pattern as
 * AmbientBackground) scaled by each card's own factor, plus a slow
 * alternating float animation. The left-near card additionally cycles
 * through live "events" every 3.8s. */
function FloatingCards() {
  const leftNearRef = useRef<HTMLDivElement>(null);
  const leftFarRef = useRef<HTMLDivElement>(null);
  const rightNearRef = useRef<HTMLDivElement>(null);
  const rightFarRef = useRef<HTMLDivElement>(null);
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setEventIndex((i) => (i + 1) % LIVE_EVENTS.length), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = [
      { el: leftNearRef.current, px: -1.4 },
      { el: leftFarRef.current, px: -0.6 },
      { el: rightNearRef.current, px: 1.4 },
      { el: rightFarRef.current, px: 0.6 },
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
      cards.forEach(({ el, px }) => {
        if (el) el.style.transform = `translate3d(${(tx * px * 40).toFixed(1)}px,${(ty * px * 40).toFixed(1)}px,0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const live = LIVE_EVENTS[eventIndex];

  return (
    <div aria-hidden="true">
      {/* LEFT near — mobile-kept, live-cycling */}
      <div ref={leftNearRef} className="re-float re-m" style={{ top: 400, left: "15%", zIndex: 3 }}>
        <div className="re-in" style={{ animationDelay: ".15s" }}>
          <div className="re-card" style={{ animation: "reDriftA 7s ease-in-out infinite alternate" }}>
            <FloatingCardIcon bg="rgba(59,47,224,0.16)" border="1px solid rgba(59,47,224,0.34)" color="#B3A6FF">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-7 9 7" />
                <path d="M5 10v10h14V10" />
                <path d="M9 20v-6h6v6" />
              </svg>
            </FloatingCardIcon>
            <div style={{ minWidth: 0 }}>
              <div className="re-t1">{live.a}</div>
              <div className="re-t2" style={{ color: live.c }}>
                {live.b}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT far — desktop only, behind blob */}
      <div ref={leftFarRef} className="re-float re-d" style={{ top: 240, left: "17%", zIndex: 1, opacity: 0.66 }}>
        <div className="re-in" style={{ animationDelay: ".8s" }}>
          <div className="re-card" style={{ animation: "reDriftC 9s ease-in-out infinite alternate" }}>
            <FloatingCardIcon bg="rgba(52,211,153,0.13)" border="1px solid rgba(52,211,153,0.3)" color="#34D399">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.5l2.4 2.4 4.6-5" />
              </svg>
            </FloatingCardIcon>
            <div style={{ minWidth: 0 }}>
              <div className="re-t1">Lead qualified</div>
              <div className="re-t2" style={{ color: "#8A93A0" }}>
                Ready to view
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT near — mobile-kept */}
      <div ref={rightNearRef} className="re-float re-m" style={{ top: 400, right: "15%", zIndex: 3 }}>
        <div className="re-in" style={{ animationDelay: ".3s" }}>
          <div className="re-card" style={{ animation: "reDriftB 7.8s ease-in-out infinite alternate" }}>
            <FloatingCardIcon bg="rgba(34,211,238,0.13)" border="1px solid rgba(34,211,238,0.32)" color="#A5F3FC">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
                <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
              </svg>
            </FloatingCardIcon>
            <div style={{ minWidth: 0 }}>
              <div className="re-t1">Viewing booked</div>
              <div className="re-t2" style={{ color: "#A5F3FC" }}>
                Tomorrow · 2:30 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT far — desktop only, behind blob */}
      <div ref={rightFarRef} className="re-float re-d" style={{ top: 240, right: "17%", zIndex: 1, opacity: 0.66 }}>
        <div className="re-in" style={{ animationDelay: ".92s" }}>
          <div className="re-card" style={{ animation: "reDriftC 8.2s ease-in-out infinite alternate" }}>
            <FloatingCardIcon bg="rgba(139,92,246,0.14)" border="1px solid rgba(139,92,246,0.3)" color="#C4B5FD">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 3l1.5 3.5" />
                <path d="M4 8h16" />
                <path d="M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                <path d="M12 12v3l2 1" />
              </svg>
            </FloatingCardIcon>
            <div style={{ minWidth: 0 }}>
              <div className="re-t1">AI follow-up sent</div>
              <div className="re-t2" style={{ color: "#8A93A0" }}>
                2 seconds ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openBooking } = useBookingModal();
  const ctaMagRef = useMagnetic<HTMLAnchorElement>();
  const blobGlowRef = useParallax<HTMLDivElement>(0.12, "translateX(-50%)");
  const heroPhotoRef = useParallax<HTMLDivElement>(0.03);
  const rootRef = useRef<HTMLElement>(null);

  return (
    <section id="top" ref={rootRef} style={{ position: "relative", overflow: "hidden", padding: "clamp(130px,16vw,190px) 0 clamp(60px,7vw,90px)" }}>
      <div
        ref={heroPhotoRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `url('${HERO_PHOTO}') center 22%/cover no-repeat`,
          opacity: 0.14,
          filter: "blur(6px) saturate(0.85) brightness(0.68)",
          WebkitMaskImage: "radial-gradient(68% 58% at 50% 34%, #000 0%, rgba(0,0,0,0.32) 55%, transparent 80%)",
          maskImage: "radial-gradient(68% 58% at 50% 34%, #000 0%, rgba(0,0,0,0.32) 55%, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(8,8,11,0.55) 0%, rgba(8,8,11,0.18) 34%, rgba(8,8,11,0.92) 100%)",
        }}
      />
      <div
        ref={blobGlowRef}
        style={{
          position: "absolute",
          top: -140,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 600,
          background: "radial-gradient(50% 50% at 50% 40%, rgba(59,47,224,0.20), rgba(59,47,224,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 50% 30%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, #000 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <HeroBlobCanvas />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(62% 58% at 50% 46%, rgba(8,8,11,0.6), rgba(8,8,11,0.28) 55%, rgba(8,8,11,0) 78%)",
        }}
      />
      <FloatingCards />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1000, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            border: "1px solid rgba(140,120,235,0.28)",
            borderRadius: 999,
            background: "rgba(9,12,28,0.62)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#9F91FF", boxShadow: "0 0 10px #9F91FF" }} />
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E7ECF8" }}>
            Websites &middot; Marketing &middot; Automation
          </span>
        </div>
        <HeroHeadline />
        <p style={{ maxWidth: 640, margin: "26px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.5vw,1.28rem)", lineHeight: 1.6 }}>
          We build high-performance websites and growth systems for estate agencies — designed to attract more buyers and sellers, generate qualified
          enquiries, automate follow-ups, and book more viewings.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 36 }}>
          <a
            href="#contact"
            onClick={openBooking}
            ref={ctaMagRef}
            className="vz-mag"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#3B2FE0",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 28px",
              borderRadius: 999,
              boxShadow: "0 12px 36px rgba(59,47,224,0.40)",
            }}
          >
            Book Free Strategy Call
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#process"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 26px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            See How It Works
          </a>
        </div>
      </div>

      <StatsBand />
      <GrowthEngine />
    </section>
  );
}
