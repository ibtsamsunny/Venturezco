"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/shared/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "We stopped guessing. VenturezCo rebuilt our follow-up as a system — our team now closes deals that used to quietly disappear.",
    name: "Sarah Lin",
    role: "Founder, Northwind Labs",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "The audit alone paid for itself. They found revenue leaking in three places we never thought to look, then fixed it in a month.",
    name: "Marcus Reed",
    role: "Director of Growth, Tandem",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "It was never about more traffic — it was better systems. Our conversion rate nearly tripled without raising ad spend.",
    name: "Priya Nair",
    role: "Business Owner, Atlas & Co",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "Every lead used to hit a spreadsheet and go cold. Now follow-up happens automatically and our close rate has never been higher.",
    name: "Daniel Ortiz",
    role: "CEO, Halcyon Group",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    quote: "VenturezCo gave us one dashboard instead of six disconnected tools. Our sales team finally trusts the numbers.",
    name: "Emily Chao",
    role: "VP Sales, Vantage",
    photo: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    quote: "They didn't just build automations — they rebuilt how we think about growth. Predictable pipeline, every month.",
    name: "Ben Whitfield",
    role: "Founder, Meridian",
    photo: "https://randomuser.me/api/portraits/men/71.jpg",
  },
];

const STAR = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#9F91FF">
    <path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.8 6.1 20.8l1.3-6.6L2.5 9l6.6-.8z" />
  </svg>
);
const STAR_SM = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#9F91FF">
    <path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.8 6.1 20.8l1.3-6.6L2.5 9l6.6-.8z" />
  </svg>
);

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section style={{ position: "relative", padding: "clamp(46px,6vw,78px) 0" }}>
      <Reveal style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: "clamp(32px,4vw,48px)" }}>
          <div style={{ maxWidth: 620 }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
              In their words
            </span>
            <h2 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
              Trusted by teams who stopped guessing.
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{STAR}</span>
              ))}
            </div>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12.5, letterSpacing: "0.04em", color: "#7C8492" }}>5.0 average · 40+ clients</span>
          </div>
        </div>
        <div
          className="vz-marquee"
          style={{
            position: "relative",
            overflow: "hidden",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          }}
        >
          <div className="vz-marquee-track vz-marquee-track-reviews" style={{ gap: 22, alignItems: "stretch", padding: "6px 4px" }}>
            {doubled.map((r, i) => (
              <TestimonialCard key={i} review={r} dupe={i >= TESTIMONIALS.length} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

type Review = { quote: string; name: string; role: string; photo: string };

function TestimonialCard({ review: r, dupe }: { review: Review; dupe: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${ev.clientX - rect.left}px`);
      el.style.setProperty("--my", `${ev.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden={dupe}
      className="vz-hoverable"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: "clamp(26px,3vw,34px)",
        width: "min(88vw,380px)",
        flexShrink: 0,
        whiteSpace: "normal",
      }}
    >
      <div className="vz-spot" />
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {Array.from({ length: 5 }).map((_, si) => (
          <span key={si}>{STAR_SM}</span>
        ))}
      </div>
      <p style={{ margin: 0, fontFamily: "'Satoshi'", fontWeight: 500, fontSize: "clamp(1.02rem,1.5vw,1.15rem)", lineHeight: 1.55, letterSpacing: "-0.01em", color: "#E4E7EC", textWrap: "pretty", flex: 1 }}>
        {r.quote}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photos, arbitrary hosts */}
        <img
          src={r.photo}
          alt={r.name}
          width={52}
          height={52}
          style={{ width: 52, height: 52, flexShrink: 0, border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{r.name}</div>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11.5, letterSpacing: "0.05em", color: "#7C8492", marginTop: 4 }}>{r.role}</div>
        </div>
      </div>
    </div>
  );
}
