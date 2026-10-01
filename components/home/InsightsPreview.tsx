"use client";

import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import { useRevealGroup } from "@/hooks/useRevealGroup";
import { useMagnetic } from "@/hooks/useMagnetic";

const POSTS = [
  {
    slug: "why-estate-agency-websites-dont-convert",
    tag: "Website Development",
    tagColor: "#F9A8D4",
    tagBg: "rgba(236,72,153,0.12)",
    tagBorder: "rgba(236,72,153,0.28)",
    bannerBg: "#130A10",
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    photoAlt: "Luxury property exterior",
    scrim: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.5), rgba(19,10,16,0.55) 65%)",
    title: "Why Most Estate Agency Websites Don't Convert",
    excerpt: "Most estate agency websites are built to look nice, not to convert. Here's what's actually costing you enquiries.",
    date: "Sep 2026 · 6 min read",
    art: (
      <svg viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}>
        <rect x="20" y="18" width="280" height="90" rx="10" fill="rgba(236,72,153,0.14)" stroke="rgba(236,72,153,0.4)" strokeWidth="1.5" />
        <rect x="36" y="34" width="120" height="11" rx="4" fill="rgba(249,168,212,0.55)" />
        <rect x="36" y="54" width="180" height="7" rx="3" fill="rgba(249,168,212,0.28)" />
        <rect x="36" y="66" width="150" height="7" rx="3" fill="rgba(249,168,212,0.28)" />
        <rect x="36" y="84" width="64" height="16" rx="6" fill="#EC4899" />
      </svg>
    ),
  },
  {
    slug: "estate-agency-website-features",
    tag: "Website Development",
    tagColor: "#F9A8D4",
    tagBg: "rgba(236,72,153,0.12)",
    tagBorder: "rgba(236,72,153,0.28)",
    bannerBg: "#130A10",
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    photoAlt: "Modern residential property",
    scrim: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.5), rgba(19,10,16,0.55) 65%)",
    title: "7 Features Every Modern Estate Agency Website Needs",
    excerpt: "From property search to instant lead capture — the features that separate a modern agency site from a digital brochure.",
    date: "Sep 2026 · 7 min read",
    art: (
      <svg viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.65 }}>
        <rect x="26" y="16" width="118" height="56" rx="9" fill="rgba(236,72,153,0.16)" stroke="rgba(236,72,153,0.35)" strokeWidth="1.5" />
        <rect x="160" y="16" width="118" height="56" rx="9" fill="rgba(249,168,212,0.14)" stroke="rgba(236,72,153,0.3)" strokeWidth="1.5" />
        <rect x="26" y="84" width="118" height="56" rx="9" fill="rgba(249,168,212,0.14)" stroke="rgba(236,72,153,0.3)" strokeWidth="1.5" />
        <rect x="160" y="84" width="118" height="56" rx="9" fill="rgba(236,72,153,0.16)" stroke="rgba(236,72,153,0.35)" strokeWidth="1.5" />
        <circle cx="85" cy="44" r="9" fill="#F9A8D4" />
        <circle cx="219" cy="44" r="9" fill="#EC4899" />
        <circle cx="85" cy="112" r="9" fill="#EC4899" />
        <circle cx="219" cy="112" r="9" fill="#F9A8D4" />
      </svg>
    ),
  },
  {
    slug: "website-speed-property-enquiries",
    tag: "Website Development",
    tagColor: "#F9A8D4",
    tagBg: "rgba(236,72,153,0.12)",
    tagBorder: "rgba(236,72,153,0.28)",
    bannerBg: "#130A10",
    photo: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    photoAlt: "Estate agent at a property",
    scrim: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.5), rgba(19,10,16,0.55) 65%)",
    title: "How Website Speed Affects Property Enquiries",
    excerpt: "A slow website doesn't just frustrate visitors — it quietly costs you enquiries before a buyer even sees a listing.",
    date: "Sep 2026 · 5 min read",
    art: (
      <svg viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}>
        <line x1="20" y1="40" x2="140" y2="40" stroke="#F9A8D4" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        <line x1="20" y1="66" x2="220" y2="66" stroke="#F9A8D4" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        <line x1="20" y1="92" x2="300" y2="92" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" opacity="0.75" />
        <line x1="20" y1="118" x2="320" y2="118" stroke="#EC4899" strokeWidth="7" strokeLinecap="round" />
        <circle cx="320" cy="118" r="6" fill="#fff" />
      </svg>
    ),
  },
];

function ViewAllLink() {
  const magRef = useMagnetic<HTMLAnchorElement>();
  return (
    <Link
      href="/insights"
      ref={magRef}
      className="vz-mag"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "13px 22px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#fff",
        fontSize: 15,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      View all articles
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function InsightsPreview() {
  const groupRef = useRevealGroup<HTMLDivElement>();
  return (
    <section id="insights" style={{ position: "relative", padding: "clamp(46px,6vw,78px) 0" }}>
      <Reveal style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: "clamp(32px,4vw,48px)" }}>
          <div style={{ maxWidth: 620 }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
              Insights
            </span>
            <h2 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
              Systems thinking for growth.
            </h2>
          </div>
          <ViewAllLink />
        </div>
        <div ref={groupRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}
            >
              <div style={{ position: "relative", height: 158, background: p.bannerBg, borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- external Unsplash URL, not worth next/image config for a decorative card banner */}
                <img
                  src={p.photo}
                  alt={p.photoAlt}
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: p.scrim }} />
                {p.art}
              </div>
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <span
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: p.tagColor,
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: p.tagBg,
                    border: `1px solid ${p.tagBorder}`,
                  }}
                >
                  {p.tag}
                </span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.015em", color: "#fff" }}>{p.title}</h3>
                <p style={{ margin: 0, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{p.excerpt}</p>
                <div style={{ marginTop: 4, fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.06em", color: "#5B6270" }}>{p.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
