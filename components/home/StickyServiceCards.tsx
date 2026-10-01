"use client";

import Reveal from "@/components/shared/Reveal";
import { useMagnetic } from "@/hooks/useMagnetic";

type Card = {
  num: string;
  top: number;
  accent: string;
  accentBorder: string;
  bg: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  badgeLabel: string;
  headline: [string, string];
  gradient: string;
  body: string;
  tags: string[];
  statValue: string;
  statColor: string;
  statLabel: string;
  ctaLabel: string;
  ctaBg: string;
  ctaBorder: string;
  href: string;
  art: React.ReactNode;
};

const CARDS: Card[] = [
  {
    num: "01",
    top: 90,
    accent: "#EC4899",
    accentBorder: "rgba(236,72,153,0.24)",
    bg: "radial-gradient(120% 130% at 100% 0%, rgba(236,72,153,0.16), transparent 55%), #100810",
    badgeBg: "rgba(236,72,153,0.14)",
    badgeBorder: "rgba(236,72,153,0.34)",
    badgeColor: "#F9A8D4",
    badgeLabel: "Custom Website Development",
    headline: ["Websites built to turn property searches", "into enquiries."],
    gradient: "linear-gradient(100deg,#F9A8D4,#EC4899)",
    body: "We design and develop bespoke, high-performance websites for estate agencies that combine premium design, fast performance, property search, lead capture, SEO foundations, and conversion-focused user journeys.",
    tags: ["Bespoke Design", "Custom Development", "Property Integrations", "Lead Capture", "Technical SEO"],
    statValue: "Built For",
    statColor: "#F9A8D4",
    statLabel: "speed, search, and conversion — engineered in from day one",
    ctaLabel: "Explore Web Development",
    ctaBg: "rgba(236,72,153,0.16)",
    ctaBorder: "rgba(236,72,153,0.4)",
    href: "/real-estate-website-development",
    art: (
      // A premium estate agency website inside a browser frame — hero photo,
      // a property search bar, and two listing cards. Deliberately not a
      // generic "code"/wireframe graphic.
      <svg viewBox="0 0 340 230" style={{ width: "88%", maxWidth: 400, overflow: "visible", animation: "vzFloat 7.4s ease-in-out infinite" }}>
        <defs>
          <linearGradient id="vgw1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EC4899" stopOpacity="0.5" />
            <stop offset="1" stopColor="#1A0E16" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="vgw2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F9A8D4" stopOpacity="0.4" />
            <stop offset="1" stopColor="#EC4899" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect x="20" y="16" width="300" height="196" rx="12" fill="#120A10" stroke="#EC4899" strokeWidth="1.5" />
        <circle cx="38" cy="32" r="3" fill="#EC4899" />
        <circle cx="50" cy="32" r="3" fill="#F9A8D4" />
        <circle cx="62" cy="32" r="3" fill="#fff" opacity="0.35" />
        <line x1="20" y1="44" x2="320" y2="44" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <rect x="32" y="56" width="276" height="92" rx="8" fill="url(#vgw1)" />
        <rect x="48" y="118" width="180" height="20" rx="10" fill="rgba(10,6,9,0.8)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <circle cx="60" cy="128" r="3" fill="#F9A8D4" />
        <rect x="68" y="124" width="90" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
        <rect x="236" y="118" width="40" height="20" rx="10" fill="#EC4899" />
        <rect x="32" y="160" width="128" height="40" rx="8" fill="url(#vgw2)" stroke="rgba(255,255,255,0.1)" />
        <rect x="42" y="168" width="60" height="7" rx="3" fill="rgba(255,255,255,0.5)" />
        <rect x="42" y="180" width="40" height="12" rx="6" fill="#F9A8D4" opacity="0.8" />
        <rect x="180" y="160" width="128" height="40" rx="8" fill="url(#vgw2)" stroke="rgba(255,255,255,0.1)" />
        <rect x="190" y="168" width="60" height="7" rx="3" fill="rgba(255,255,255,0.5)" />
        <rect x="190" y="180" width="40" height="12" rx="6" fill="#F9A8D4" opacity="0.8" />
      </svg>
    ),
  },
  {
    num: "02",
    top: 106,
    accent: "#8B5CF6",
    accentBorder: "rgba(139,92,246,0.24)",
    bg: "radial-gradient(120% 130% at 100% 0%, rgba(139,92,246,0.16), transparent 55%), #0C0B12",
    badgeBg: "rgba(139,92,246,0.14)",
    badgeBorder: "rgba(139,92,246,0.34)",
    badgeColor: "#C4B5FD",
    badgeLabel: "Lead Generation",
    headline: ["Turn attention into qualified property", "enquiries."],
    gradient: "linear-gradient(100deg,#C4B5FD,#8B5CF6)",
    body: "Google Ads, paid social, landing pages and conversion systems designed to put your agency in front of buyers, sellers, landlords and investors.",
    tags: ["Google Ads", "Meta Ads", "Landing Pages", "Local SEO"],
    statValue: "Full-Funnel",
    statColor: "#C4B5FD",
    statLabel: "campaigns built to reach buyers, sellers, landlords and investors",
    ctaLabel: "Explore Lead Generation",
    ctaBg: "rgba(139,92,246,0.16)",
    ctaBorder: "rgba(139,92,246,0.4)",
    href: "/services/lead-generation",
    art: (
      <svg viewBox="0 0 340 236" style={{ width: "82%", maxWidth: 380, overflow: "visible", animation: "vzFloat 7.6s ease-in-out infinite" }}>
        <polygon points="40,28 300,28 278,66 62,66" fill="rgba(139,92,246,0.30)" />
        <polygon points="66,74 274,74 254,112 86,112" fill="rgba(139,92,246,0.42)" />
        <polygon points="90,120 250,120 232,158 108,158" fill="rgba(139,92,246,0.56)" />
        <polygon points="112,166 228,166 212,204 128,204" fill="rgba(139,92,246,0.72)" />
        <circle cx="170" cy="47" r="3.5" fill="#fff" />
        <circle cx="170" cy="93" r="3.5" fill="#fff" />
        <circle cx="170" cy="139" r="3.5" fill="#fff" />
        <circle cx="170" cy="185" r="3.5" fill="#fff" />
      </svg>
    ),
  },
  {
    num: "03",
    top: 122,
    accent: "#22D3EE",
    accentBorder: "rgba(34,211,238,0.22)",
    bg: "radial-gradient(120% 130% at 100% 0%, rgba(34,211,238,0.14), transparent 55%), #0A0F11",
    badgeBg: "rgba(34,211,238,0.12)",
    badgeBorder: "rgba(34,211,238,0.32)",
    badgeColor: "#A5F3FC",
    badgeLabel: "CRM & AI Automation",
    headline: ["Every enquiry. Followed up.", "Automatically."],
    gradient: "linear-gradient(100deg,#A5F3FC,#22D3EE)",
    body: "We connect your website and marketing directly to your CRM so new enquiries are captured, qualified, nurtured and followed up automatically.",
    tags: ["GoHighLevel CRM", "AI Follow-Up", "Lead Nurturing", "Viewing Booking"],
    statValue: "Zero Delay",
    statColor: "#A5F3FC",
    statLabel: "enquiries qualified and routed the moment they arrive",
    ctaLabel: "Explore Automation",
    ctaBg: "rgba(34,211,238,0.14)",
    ctaBorder: "rgba(34,211,238,0.38)",
    href: "/services/ai-automation",
    art: (
      <svg viewBox="0 0 340 220" style={{ width: "86%", maxWidth: 390, overflow: "visible", animation: "vzFloat 8.2s ease-in-out infinite" }}>
        <line x1="80" y1="60" x2="170" y2="110" stroke="rgba(34,211,238,0.5)" strokeWidth="2" />
        <line x1="80" y1="160" x2="170" y2="110" stroke="rgba(34,211,238,0.5)" strokeWidth="2" />
        <line x1="170" y1="110" x2="270" y2="110" stroke="rgba(34,211,238,0.5)" strokeWidth="2" />
        <circle cx="80" cy="60" r="16" fill="rgba(34,211,238,0.16)" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="80" cy="160" r="16" fill="rgba(34,211,238,0.16)" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="270" cy="110" r="16" fill="rgba(34,211,238,0.16)" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="170" cy="110" r="26" fill="rgba(34,211,238,0.20)" stroke="#22D3EE" strokeWidth="1.8" />
        <g stroke="#A5F3FC" strokeWidth="1.8" fill="none" strokeLinecap="round">
          <circle cx="170" cy="110" r="7" />
          <path d="M170 98v-6M170 122v6M158 110h-6M182 110h6M161.5 101.5l-4-4M178.5 101.5l4-4M161.5 118.5l-4 4M178.5 118.5l4 4" />
        </g>
        <circle cx="125" cy="85" r="3.5" fill="#fff" />
        <circle cx="125" cy="135" r="3.5" fill="#fff" />
        <circle cx="220" cy="110" r="3.5" fill="#fff" />
      </svg>
    ),
  },
  {
    num: "04",
    top: 138,
    accent: "#F59E0B",
    accentBorder: "rgba(245,158,11,0.24)",
    bg: "radial-gradient(120% 130% at 100% 0%, rgba(245,158,11,0.14), transparent 55%), #100D08",
    badgeBg: "rgba(245,158,11,0.14)",
    badgeBorder: "rgba(245,158,11,0.34)",
    badgeColor: "#FCD34D",
    badgeLabel: "Growth Strategy",
    headline: ["A growth plan built around", "your agency."],
    gradient: "linear-gradient(100deg,#FCD34D,#F59E0B)",
    body: "We connect your website, marketing, CRM and sales process into one measurable strategy focused on sustainable agency growth.",
    tags: ["Growth Strategy", "Conversion Strategy", "Performance Reporting"],
    statValue: "One Plan",
    statColor: "#FCD34D",
    statLabel: "tying your website, marketing, CRM and sales process together",
    ctaLabel: "Explore Strategy",
    ctaBg: "rgba(245,158,11,0.14)",
    ctaBorder: "rgba(245,158,11,0.38)",
    href: "/services/growth-consulting",
    art: (
      <svg viewBox="0 0 340 220" style={{ width: "88%", maxWidth: 400, overflow: "visible", animation: "vzFloat 7.2s ease-in-out infinite" }}>
        <defs>
          <linearGradient id="vga4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="20" y1="196" x2="320" y2="196" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <path d="M30,180 L90,150 L150,160 L210,110 L270,80 L310,34 L310,196 L30,196 Z" fill="url(#vga4)" />
        <polyline points="30,180 90,150 150,160 210,110 270,80 310,34" fill="none" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="90" cy="150" r="4" fill="#fff" />
        <circle cx="150" cy="160" r="4" fill="#fff" />
        <circle cx="210" cy="110" r="4" fill="#fff" />
        <circle cx="270" cy="80" r="4" fill="#fff" />
        <circle cx="310" cy="34" r="5" fill="#fff" />
      </svg>
    ),
  },
];

const DOT_COLORS: Record<string, string> = {
  "#EC4899": "#EC4899",
  "#8B5CF6": "#8B5CF6",
  "#22D3EE": "#22D3EE",
  "#F59E0B": "#F59E0B",
};

export default function StickyServiceCards() {
  return (
    <section id="services" style={{ position: "relative", padding: "clamp(46px,6vw,78px) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <Reveal
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: "clamp(40px,5vw,56px)",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
              What we do
            </span>
            <h2 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
              Four disciplines. One connected system.
            </h2>
          </div>
          <p style={{ maxWidth: 340, color: "#9AA1AD", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Each capability is deployed as part of a whole — never as an isolated tactic.
          </p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {CARDS.map((c) => (
            <ServiceCard key={c.num} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ card: c }: { card: Card }) {
  const magRef = useMagnetic<HTMLAnchorElement>();
  return (
    <article
      style={{
        position: "sticky",
        top: c.top,
        borderRadius: 28,
        overflow: "hidden",
        border: `1px solid ${c.accentBorder}`,
        background: c.bg,
        boxShadow: "0 34px 90px rgba(0,0,0,0.5)",
        minHeight: "clamp(500px,72vh,660px)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "clamp(28px,4vw,52px)", alignItems: "center", height: "100%", padding: "clamp(30px,4vw,54px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <span style={{ position: "absolute", top: -6, right: 0, fontFamily: "'Geist Mono',monospace", fontWeight: 500, fontSize: "clamp(3rem,5vw,4.4rem)", lineHeight: 1, color: `${c.accent}29` }}>
            {c.num}
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              borderRadius: 999,
              background: c.badgeBg,
              border: `1px solid ${c.badgeBorder}`,
              color: c.badgeColor,
              fontFamily: "'Geist Mono',monospace",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, boxShadow: `0 0 8px ${c.accent}` }} />
            {c.badgeLabel}
          </span>
          <h3 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(1.9rem,3.4vw,3rem)", lineHeight: 1.04, letterSpacing: "-0.025em", color: "#fff" }}>
            {c.headline[0]}
            <br />
            <span style={{ background: c.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{c.headline[1]}</span>
          </h3>
          <p style={{ margin: 0, maxWidth: 460, color: "#9AA1AD", fontSize: "clamp(1rem,1.3vw,1.12rem)", lineHeight: 1.6 }}>{c.body}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {c.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#C7CBD1",
                  fontSize: 13.5,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: DOT_COLORS[c.accent] }} />
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 6 }}>
            <span style={{ fontFamily: "'Satoshi'", fontWeight: 900, fontSize: "1.5rem", color: c.statColor, letterSpacing: "-0.02em" }}>{c.statValue}</span>
            <span style={{ color: "#7C8492", fontSize: 13.5, lineHeight: 1.4 }}>{c.statLabel}</span>
          </div>
          <a
            href={c.href}
            ref={magRef}
            className="vz-mag"
            style={{
              alignSelf: "flex-start",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 4,
              padding: "12px 20px",
              borderRadius: 999,
              background: c.ctaBg,
              border: `1px solid ${c.ctaBorder}`,
              color: "#fff",
              fontSize: 14.5,
              fontWeight: 600,
            }}
          >
            {c.ctaLabel}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <div
          style={{
            position: "relative",
            minHeight: "clamp(240px,34vh,360px)",
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${c.accent}29`,
            background: `radial-gradient(90% 90% at 30% 20%, ${c.accent}24, rgba(255,255,255,0.015))`,
            display: "grid",
            placeItems: "center",
          }}
        >
          {c.art}
        </div>
      </div>
    </article>
  );
}
