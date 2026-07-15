"use client";

import Reveal from "@/components/shared/Reveal";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

export default function ContactCTA() {
  const { openBooking } = useBookingModal();
  const magRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="contact" style={{ position: "relative", padding: "clamp(54px,7vw,94px) 0", overflow: "hidden" }}>
      <Reveal style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 32,
            border: "1px solid rgba(96,132,220,0.3)",
            background:
              "radial-gradient(85% 130% at 50% -10%, rgba(38,66,150,0.6), rgba(14,18,34,0.6) 58%), linear-gradient(180deg, rgba(22,30,58,0.55), rgba(9,11,20,0.6))",
            boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            padding: "clamp(52px,8vw,104px) clamp(24px,5vw,60px)",
            textAlign: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-20%",
              background: "conic-gradient(from 0deg, rgba(59,47,224,0.35), rgba(139,92,246,0.28), rgba(34,211,238,0.22), rgba(59,47,224,0.35))",
              filter: "blur(60px)",
              opacity: 0.55,
              animation: "vzSpin 16s linear infinite",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(58% 68% at 50% 6%, rgba(59,47,224,0.24), transparent 62%)",
              pointerEvents: "none",
            }}
          />
          <h2 style={{ position: "relative", margin: "0 auto", maxWidth: 780, fontWeight: 900, fontSize: "clamp(2.3rem,5.5vw,4rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
            Ready to fix the system behind your growth?
          </h2>
          <p style={{ position: "relative", maxWidth: 560, margin: "22px auto 0", color: "#B9C0CC", fontSize: "clamp(1.05rem,1.4vw,1.22rem)", lineHeight: 1.6 }}>
            Let&apos;s identify what&apos;s slowing your business down and build a scalable growth engine — starting with a free strategy call.
          </p>
          <div style={{ position: "relative", marginTop: 38, display: "flex", justifyContent: "center" }}>
            <a
              href="#top"
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
                fontSize: 17,
                fontWeight: 600,
                padding: "18px 34px",
                borderRadius: 999,
                boxShadow: "0 14px 42px rgba(59,47,224,0.45)",
              }}
            >
              Book Your Free Strategy Call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div style={{ position: "relative", marginTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 30px" }}>
            {["No commitment", "30-minute call", "Custom growth roadmap"].map((label) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#9AA1AD", fontSize: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
