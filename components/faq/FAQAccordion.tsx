"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "What exactly does VenturezCo do?",
    a: "We build the connected marketing, sales, and automation systems behind predictable revenue — lead generation, follow-up automation, CRM setup, and sales process design — so growth doesn't depend on constant hustle or scattered tools.",
  },
  {
    q: "How is this different from a typical marketing agency?",
    a: "Most agencies push more traffic and leads. We fix the system those leads fall into. If your follow-up, qualification, and sales process leak revenue, more traffic just leaks faster. We engineer the whole engine, not one channel.",
  },
  {
    q: "What happens on the free strategy call?",
    a: "In 30 minutes we map exactly where revenue is leaking in your current setup — no pitch, no commitment. You leave with a clear picture of the highest-impact fixes, whether or not you work with us.",
  },
  {
    q: "How long before we see results?",
    a: "Foundational automation and follow-up systems are usually live within the first month. Compounding results — higher conversion, lower acquisition cost — typically show across the first quarter as the system matures.",
  },
  {
    q: "Do you work with our existing tools?",
    a: "Yes. We integrate with the CRM, ad platforms, and tools you already use wherever it makes sense, and only recommend replacing something when it's actively costing you revenue.",
  },
  {
    q: "What size businesses do you work with?",
    a: "We work with established B2B and DTC businesses generating leads but struggling to convert them into predictable revenue. If you already have demand and want to systematize growth, you're a fit.",
  },
  {
    q: "How do we get started?",
    a: "Book a free strategy call or message us on WhatsApp. We'll audit your current growth setup, show you where the gaps are, and map a plan tailored to your business.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="faq-item"
            style={{
              border: `1px solid ${isOpen ? "rgba(59,47,224,0.4)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 18,
              background: isOpen ? "rgba(59,47,224,0.06)" : "rgba(255,255,255,0.025)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen((o) => (o === i ? -1 : i))}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, background: "none", border: "none", cursor: "pointer", padding: "24px 26px", textAlign: "left", fontFamily: "inherit" }}
            >
              <span className="faq-q" style={{ fontSize: "clamp(1rem,1.6vw,1.18rem)", fontWeight: 600, letterSpacing: "-0.01em", color: isOpen ? "#fff" : "#E4E7EC" }}>
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  color: isOpen ? "#fff" : "#9F91FF",
                  background: isOpen ? "#3B2FE0" : "rgba(59,47,224,0.12)",
                  transition: "transform .3s ease, background .3s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </span>
            </button>
            <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows .32s cubic-bezier(.16,1,.3,1)", overflow: isOpen ? undefined : "hidden" }}>
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <p style={{ margin: 0, padding: "0 26px 24px", color: "#9AA1AD", fontSize: 15, lineHeight: 1.65, maxWidth: 640 }}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
