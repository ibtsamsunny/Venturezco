"use client";

import Reveal from "@/components/shared/Reveal";
import { useRevealGroup } from "@/hooks/useRevealGroup";

// No testimonial content lives here — the site doesn't have verified client
// quotes yet, and the brand stance is not to invent names, photos, or
// reviews. This value-proposition section stands in until real
// testimonials exist; see VALUES below for the content to restore it with.
const VALUES = [
  {
    title: "Built Around Real Estate",
    body: "Every website, campaign, and system we build is designed specifically for how estate agencies attract buyers, sellers, and listings — not a generic template.",
  },
  {
    title: "Everything Connected",
    body: "Your website, marketing, CRM, and follow-up work as one connected system, not a pile of disconnected tools fighting each other.",
  },
  {
    title: "Focused On Business Outcomes",
    body: "We build for enquiries, viewings, and deals — not vanity metrics that look good in a report but don't move your agency forward.",
  },
];

export default function Testimonials() {
  const groupRef = useRevealGroup<HTMLDivElement>();
  return (
    <section style={{ position: "relative", padding: "clamp(46px,6vw,78px) 0" }}>
      <Reveal style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ maxWidth: 640, marginBottom: "clamp(32px,4vw,48px)" }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
            Why estate agencies work with us
          </span>
          <h2 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
            A growth partner built for one industry.
          </h2>
        </div>
        <div ref={groupRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {VALUES.map((v) => (
            <div
              key={v.title}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "clamp(26px,3vw,32px)",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{v.title}</h3>
              <p style={{ margin: "12px 0 0", color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
