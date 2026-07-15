"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

/** The smaller in-flow CTA card used on Insights/BlogPost (as opposed to
 * the full-bleed section-level CTABanner used on service/industry pages). */
export default function InlineCTA({
  heading,
  subtext,
  headingMaxWidth = 520,
  subtextMaxWidth = 460,
}: {
  heading: string;
  subtext: string;
  headingMaxWidth?: number;
  subtextMaxWidth?: number;
}) {
  const { openBooking } = useBookingModal();
  const magRef = useMagnetic<HTMLAnchorElement>();

  return (
    <div
      style={{
        borderRadius: 26,
        border: "1px solid rgba(96,132,220,0.3)",
        background:
          "radial-gradient(85% 130% at 50% -10%, rgba(38,66,150,0.55), rgba(14,18,34,0.6) 58%), linear-gradient(180deg, rgba(22,30,58,0.5), rgba(9,11,20,0.6))",
        padding: "clamp(32px,5vw,48px)",
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: "0 auto", maxWidth: headingMaxWidth, fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.1rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", textWrap: "balance" }}>
        {heading}
      </h2>
      <p style={{ maxWidth: subtextMaxWidth, margin: "16px auto 0", color: "#B9C0CC", fontSize: 16, lineHeight: 1.6 }}>{subtext}</p>
      <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
        <a
          href="#contact"
          onClick={openBooking}
          ref={magRef}
          className="vz-mag"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#3B2FE0",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            padding: "15px 28px",
            borderRadius: 999,
            boxShadow: "0 14px 42px rgba(59,47,224,0.45)",
          }}
        >
          Book Your Free Strategy Call
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
