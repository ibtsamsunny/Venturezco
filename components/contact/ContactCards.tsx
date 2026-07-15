"use client";

import { useBookingModal } from "@/components/booking/BookingModalProvider";
import { WA_LINK } from "@/content/nav";

export default function ContactCards() {
  const { openBooking } = useBookingModal();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <a
        href="#contact"
        onClick={openBooking}
        className="contact-card"
        style={{ borderRadius: 20, border: "1px solid rgba(59,47,224,0.34)", background: "radial-gradient(120% 130% at 100% 0%, rgba(59,47,224,0.14), transparent 60%), #0C0D11", padding: 24 }}
      >
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B3A6FF" }}>Prefer a call?</span>
        <h3 style={{ margin: "10px 0 0", fontSize: 17, fontWeight: 700, color: "#fff" }}>Book a free strategy call</h3>
        <p style={{ margin: "8px 0 0", color: "#9AA1AD", fontSize: 14, lineHeight: 1.6 }}>30 minutes, no pitch — just a map of where your revenue is leaking.</p>
      </a>
      <a href={WA_LINK} target="_blank" rel="noopener" className="contact-card" style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: 24 }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#86EFAC" }}>Quick question?</span>
        <h3 style={{ margin: "10px 0 0", fontSize: 17, fontWeight: 700, color: "#fff" }}>Message us on WhatsApp</h3>
        <p style={{ margin: "8px 0 0", color: "#9AA1AD", fontSize: 14, lineHeight: 1.6 }}>Fastest way to reach the team directly.</p>
      </a>
      <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: 24 }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7C8492" }}>Email</span>
        <h3 style={{ margin: "10px 0 0", fontSize: 17, fontWeight: 700, color: "#fff" }}>
          <a href="mailto:hello@venturezco.com" style={{ textDecoration: "none" }}>
            hello@venturezco.com
          </a>
        </h3>
      </div>
    </div>
  );
}
