"use client";

import Reveal from "@/components/shared/Reveal";
import { useRevealGroup } from "@/hooks/useRevealGroup";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

const LABEL = { fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#6B7280", marginBottom: 7 };

/** These are illustrative, not verified client results — flagged inline so
 * nobody mistakes them for real case studies. */
function ConceptBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        marginLeft: 10,
        padding: "3px 9px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#7C8492",
        fontFamily: "'Geist Mono',monospace",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      Concept Project
    </span>
  );
}

const CASE1_PHOTO = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
const CASE2_PHOTO = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80";

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
          <p style={{ margin: "14px 0 0", color: "#7C8492", fontSize: 13.5, lineHeight: 1.5 }}>
            Illustrative examples based on typical engagements — not specific client outcomes.
          </p>
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
            <div style={{ gridColumn: "1/-1", position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "21/6", minHeight: 150, border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- external Unsplash URL, not worth next/image config for a decorative case-study photo */}
              <img
                src={CASE1_PHOTO}
                alt="Luxury London townhouse"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,8,11,0.15), rgba(8,8,11,0.75))" }} />
            </div>
            <div>
              <div>
                <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B2FE0" }}>Real Estate Website</span>
                <ConceptBadge />
              </div>
              <h3 style={{ margin: "14px 0 0", fontSize: "clamp(1.5rem,2.4vw,2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                From outdated website to a premium digital sales platform
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <div style={LABEL}>Challenge</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 15, lineHeight: 1.6 }}>The agency&apos;s website looked dated, performed poorly on mobile and wasn&apos;t effectively converting property traffic into enquiries.</p>
              </div>
              <div>
                <div style={LABEL}>Strategy</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 15, lineHeight: 1.6 }}>Redesign the complete digital experience around property discovery, local SEO, conversion-focused pages and integrated lead capture.</p>
              </div>
              <div>
                <div style={LABEL}>Outcome</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 15, lineHeight: 1.6 }}>Faster experience, clearer customer journeys, stronger brand positioning and an integrated enquiry process.</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={groupRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(28px,3.5vw,40px)" }}>
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", aspectRatio: "16/9", marginBottom: 22, border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- external Unsplash URL, not worth next/image config for a decorative case-study photo */}
              <img
                src={CASE2_PHOTO}
                alt="Modern residential property"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,8,11,0.1), rgba(8,8,11,0.6))" }} />
            </div>
            <div>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B2FE0" }}>Manchester Estate Agency</span>
              <ConceptBadge />
            </div>
            <h3 style={{ margin: "14px 0 22px", fontSize: "clamp(1.35rem,2vw,1.7rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Turning property enquiries into booked viewings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ ...LABEL, marginBottom: 6 }}>Challenge</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 14.5, lineHeight: 1.6 }}>Enquiries came in fast but replies took hours, so interest cooled before anyone followed up.</p>
              </div>
              <div>
                <div style={{ ...LABEL, marginBottom: 6 }}>Strategy</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 14.5, lineHeight: 1.6 }}>Automated instant response, AI qualification, and one-tap viewing booking wired straight into the CRM.</p>
              </div>
              <div>
                <div style={{ ...LABEL, marginBottom: 6 }}>Outcome</div>
                <p style={{ margin: 0, color: "#B7BCC5", fontSize: 14.5, lineHeight: 1.6 }}>Faster response times, more viewings booked, and a follow-up process the team can finally rely on.</p>
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
