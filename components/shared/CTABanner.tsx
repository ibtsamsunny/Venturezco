"use client";

import Reveal from "@/components/shared/Reveal";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

export default function CTABanner({
  heading,
  subtext,
  buttonLabel,
  buttonBg,
  buttonShadow,
  borderColor = "rgba(96,132,220,0.3)",
  background = "radial-gradient(85% 130% at 50% -10%, rgba(38,66,150,0.55), rgba(14,18,34,0.6) 58%), linear-gradient(180deg, rgba(22,30,58,0.5), rgba(9,11,20,0.6))",
}: {
  heading: string;
  subtext: string;
  buttonLabel: string;
  buttonBg: string;
  buttonShadow: string;
  borderColor?: string;
  background?: string;
}) {
  const { openBooking } = useBookingModal();
  const magRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "clamp(70px,9vw,110px) clamp(20px,5vw,32px) clamp(90px,10vw,130px)" }}>
      <Reveal
        style={{
          borderRadius: 26,
          border: `1px solid ${borderColor}`,
          background,
          padding: "clamp(36px,5vw,58px)",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 auto", maxWidth: 560, fontWeight: 900, fontSize: "clamp(1.7rem,3.6vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", textWrap: "balance" }}>
          {heading}
        </h2>
        <p style={{ maxWidth: 480, margin: "18px auto 0", color: "#B9C0CC", fontSize: "clamp(1rem,1.3vw,1.15rem)", lineHeight: 1.6 }}>{subtext}</p>
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
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
              background: buttonBg,
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 30px",
              borderRadius: 999,
              boxShadow: `0 14px 42px ${buttonShadow}`,
            }}
          >
            {buttonLabel}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
