"use client";

import Reveal from "@/components/shared/Reveal";
import { useRevealGroup } from "@/hooks/useRevealGroup";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

const LABEL = { fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#6B7280", marginBottom: 7 };

export default function CaseStudies() {
  const { openBooking } = useBookingModal();
  const groupRef = useRevealGroup<HTMLDivElement>();
  const magRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="cases" style={{ position: "relative", padding: "clamp(46px,6vw,78px) 0" }}>
      <Reveal style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ maxWidth: 640, marginBottom: "clamp(44px,5vw,60px)" }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
            Case studies
          </span>
          <h2 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
            Business transformation, not just metrics.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, marginBottom: 24 }}>
          <div
            style={{
              gridColumn: "1/-1",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "clamp(28px,3.5vw,44px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "clamp(24px,3vw,44px)",
              alignItems: "start",
            }}
          >
            <div>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B2FE0" }}>B2B Services</span>
              <h3 style={{ margin: "14px 0 0", fontSize: "clamp(1.5rem,2.4vw,2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                From scattered tools to one revenue engine
              </h3>
              <div style={{ display: "flex", gap: 26, marginTop: 26, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "'Satoshi'", fontWeight: 900, fontSize: "1.9rem", color: "#B3A6FF", letterSpacing: "-0.02em" }}>+218%</div>
                  <div style={{ color: "#7C8492", fontSize: 12.5, marginTop: 4 }}>qualified pipeline</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Satoshi'", fontWeight: 900, fontSize: "1.9rem", color: "#B3A6FF", letterSpacing: "-0.02em" }}>4% → 11%</div>
                  <div style={{ color: "#7C8492", fontSize: 12.5, marginTop: 4 }}>close rate</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <div style={LABEL}>Challenge</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 15, lineHeight: 1.6 }}>200+ leads a month but a close rate under 4%. Follow-up lived in inboxes and nothing was tracked.</p>
              </div>
              <div>
                <div style={LABEL}>Strategy</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 15, lineHeight: 1.6 }}>Unified lead capture, built automated multi-touch nurture, and wired the CRM to a defined pipeline with clear stages.</p>
              </div>
              <div>
                <div style={LABEL}>Outcome</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 15, lineHeight: 1.6 }}>Qualified pipeline nearly tripled, close rate rose to 11%, and 15 hours of manual work vanished from the team&apos;s week.</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={groupRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(28px,3.5vw,40px)" }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B2FE0" }}>DTC Brand</span>
            <h3 style={{ margin: "14px 0 22px", fontSize: "clamp(1.35rem,2vw,1.7rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Cutting acquisition cost without cutting spend
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ ...LABEL, marginBottom: 6 }}>Challenge</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 14.5, lineHeight: 1.6 }}>Paid costs kept climbing because every channel was optimized in isolation.</p>
              </div>
              <div>
                <div style={{ ...LABEL, marginBottom: 6 }}>Strategy</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 14.5, lineHeight: 1.6 }}>Rebuilt the funnel end to end — landing pages, offer sequencing, and post-purchase automation feeding targeting.</p>
              </div>
              <div>
                <div style={{ ...LABEL, marginBottom: 6 }}>Outcome</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 14.5, lineHeight: 1.6 }}>38% lower CAC, 2.6x repeat-purchase rate, and revenue that finally became predictable.</p>
              </div>
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(160deg, rgba(59,47,224,0.14), rgba(139,92,246,0.06))",
              border: "1px solid rgba(59,47,224,0.22)",
              borderRadius: 24,
              padding: "clamp(28px,3.5vw,40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 12px", fontSize: "clamp(1.4rem,2.2vw,1.9rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                Your business could be the next one.
              </h3>
              <p style={{ margin: 0, color: "#C7CBD1", fontSize: 15, lineHeight: 1.6 }}>
                Every result above started with a single conversation about where growth was really getting stuck.
              </p>
            </div>
            <a
              href="#contact"
              onClick={openBooking}
              ref={magRef}
              className="vz-mag"
              style={{
                textDecoration: "none",
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "#3B2FE0",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                padding: "14px 24px",
                borderRadius: 999,
                boxShadow: "0 10px 30px rgba(59,47,224,0.4)",
              }}
            >
              Book Free Strategy Call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
