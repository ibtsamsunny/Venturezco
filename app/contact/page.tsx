import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";
import ContactCards from "@/components/contact/ContactCards";

export const metadata: Metadata = {
  title: "Contact — VenturezCo",
  description: "Tell us a bit about your business, or reach out directly — we typically respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <header style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "clamp(130px,15vw,180px) clamp(20px,5vw,32px) 0", textAlign: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "rgba(59,47,224,0.14)", border: "1px solid rgba(59,47,224,0.34)", color: "#B3A6FF", fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Contact
        </span>
        <h1 style={{ margin: "22px auto 0", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.4rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
          Let&apos;s map your growth system.
        </h1>
        <p style={{ maxWidth: 560, margin: "22px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.6 }}>
          Tell us a bit about your business, or reach out directly — we typically respond within one business day.
        </p>
      </header>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(56px,7vw,84px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(24px,4vw,40px)", alignItems: "start" }}>
          <ContactForm />
          <ContactCards />
        </div>
      </section>

      <Footer />
    </>
  );
}
