"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

export default function ServiceHeader({
  badgeLabel,
  badgeBg,
  badgeBorder,
  badgeColor,
  dotColor,
  h1Prefix,
  h1Gradient,
  gradientFrom,
  gradientTo,
  subhead,
  ctaLabel,
  ctaBg,
  ctaShadow,
  extra,
}: {
  badgeLabel: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  dotColor: string;
  h1Prefix: string;
  h1Gradient: string;
  gradientFrom: string;
  gradientTo: string;
  subhead: string;
  ctaLabel: string;
  ctaBg: string;
  ctaShadow: string;
  extra?: React.ReactNode;
}) {
  const { openBooking } = useBookingModal();
  const magRef = useMagnetic<HTMLAnchorElement>();

  return (
    <header style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "clamp(130px,15vw,180px) clamp(20px,5vw,32px) 0", textAlign: "center" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 14px",
          borderRadius: 999,
          background: badgeBg,
          border: `1px solid ${badgeBorder}`,
          color: badgeColor,
          fontFamily: "'Geist Mono',monospace",
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />
        {badgeLabel}
      </span>
      <h1 style={{ margin: "22px auto 0", fontWeight: 900, fontSize: "clamp(2.2rem,5.4vw,3.9rem)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance", maxWidth: 820 }}>
        {h1Prefix}{" "}
        <span style={{ background: `linear-gradient(100deg,${gradientFrom},${gradientTo})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          {h1Gradient}
        </span>
      </h1>
      <p style={{ maxWidth: 640, margin: "22px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.6 }}>{subhead}</p>
      <div style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
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
            background: ctaBg,
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            padding: "16px 28px",
            borderRadius: 999,
            boxShadow: `0 14px 40px ${ctaShadow}`,
          }}
        >
          {ctaLabel}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
      {extra}
    </header>
  );
}
