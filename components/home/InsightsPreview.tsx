"use client";

import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import { useRevealGroup } from "@/hooks/useRevealGroup";
import { useMagnetic } from "@/hooks/useMagnetic";

const POSTS = [
  {
    slug: "crm-follow-up",
    tag: "Automation",
    tagColor: "#B3A6FF",
    tagBg: "rgba(59,47,224,0.12)",
    tagBorder: "rgba(59,47,224,0.28)",
    bannerBg: "#0C0D11",
    photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    photoAlt: "Estate agency property",
    scrim: "radial-gradient(120% 130% at 20% 0%, rgba(59,47,224,0.5), rgba(12,13,17,0.55) 65%)",
    title: "How estate agencies lose qualified leads",
    excerpt: "Slow follow-up is where most property enquiries quietly go cold. Here's how to hand it to a system that never forgets.",
    date: "Jun 2026 · 6 min read",
    art: (
      <svg viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}>
        <polyline points="0,120 60,96 120,104 180,64 240,72 320,28" fill="none" stroke="#9F91FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="180" cy="64" r="3" fill="#fff" />
        <circle cx="320" cy="28" r="3.5" fill="#fff" />
      </svg>
    ),
  },
  {
    slug: "funnel-anatomy",
    tag: "Lead Gen",
    tagColor: "#C4B5FD",
    tagBg: "rgba(139,92,246,0.12)",
    tagBorder: "rgba(139,92,246,0.28)",
    bannerBg: "#0C0B12",
    photo: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    photoAlt: "Modern property interior",
    scrim: "radial-gradient(120% 130% at 20% 0%, rgba(139,92,246,0.5), rgba(12,11,18,0.55) 65%)",
    title: "How AI books more property viewings",
    excerpt: "Instant, intelligent replies turn more enquiries into confirmed viewings. We break down the automation behind it.",
    date: "May 2026 · 5 min read",
    art: (
      <svg viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.65 }}>
        <polygon points="40,26 280,26 236,58 84,58" fill="rgba(196,181,253,0.35)" />
        <polygon points="88,66 232,66 200,98 120,98" fill="rgba(196,181,253,0.5)" />
        <polygon points="124,106 196,106 176,134 144,134" fill="rgba(196,181,253,0.7)" />
      </svg>
    ),
  },
  {
    slug: "systems-beat-tactics",
    tag: "Strategy",
    tagColor: "#A5F3FC",
    tagBg: "rgba(34,211,238,0.1)",
    tagBorder: "rgba(34,211,238,0.26)",
    bannerBg: "#0A0F11",
    photo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    photoAlt: "Estate agent with client",
    scrim: "radial-gradient(120% 130% at 20% 0%, rgba(34,211,238,0.46), rgba(10,15,17,0.58) 65%)",
    title: "Google Ads for estate agencies",
    excerpt: "Where estate agents waste ad budget — and how to structure campaigns that bring in buyer and seller leads.",
    date: "May 2026 · 7 min read",
    art: (
      <svg viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}>
        <g stroke="#22D3EE" strokeWidth="2" fill="none">
          <line x1="80" y1="46" x2="160" y2="80" />
          <line x1="80" y1="114" x2="160" y2="80" />
          <line x1="160" y1="80" x2="244" y2="80" />
        </g>
        <g fill="rgba(34,211,238,0.18)" stroke="#22D3EE" strokeWidth="1.5">
          <circle cx="80" cy="46" r="12" />
          <circle cx="80" cy="114" r="12" />
          <circle cx="244" cy="80" r="12" />
          <circle cx="160" cy="80" r="18" />
        </g>
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
