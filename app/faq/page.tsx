import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/faq/FAQAccordion";
import Footer from "@/components/layout/Footer";
import FAQCtaButtons from "@/components/faq/FAQCtaButtons";

export const metadata: Metadata = {
  title: "FAQ — VenturezCo",
  description: "Everything you need to know about how we build growth systems.",
};

export default function FAQPage() {
  return (
    <>
      <header style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "clamp(130px,15vw,180px) clamp(20px,5vw,32px) clamp(20px,3vw,36px)", textAlign: "center" }}>
        <Link
          href="/"
          className="nav-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#8A93A0", fontSize: 14, fontWeight: 500, marginBottom: 26 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1px solid rgba(120,120,235,0.28)", borderRadius: 999, background: "rgba(9,12,28,0.62)", marginBottom: 24 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#9F91FF", boxShadow: "0 0 10px #9F91FF" }} />
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E7ECF8" }}>Support</span>
        </div>
        <h1 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(2.6rem,6vw,4.4rem)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
          Frequently asked questions
        </h1>
        <p style={{ maxWidth: 560, margin: "22px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.6 }}>
          Everything you need to know about how we build growth systems. Still curious? Message us on WhatsApp or book a free strategy call.
        </p>
      </header>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "clamp(20px,3vw,30px) clamp(20px,5vw,32px) clamp(60px,8vw,100px)" }}>
        <FAQAccordion />

        <div
          style={{
            marginTop: "clamp(50px,7vw,80px)",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 26,
            background: "radial-gradient(120% 130% at 50% 0%, rgba(59,47,224,0.16), rgba(255,255,255,0.012) 60%)",
            padding: "clamp(36px,5vw,56px) clamp(24px,4vw,44px)",
          }}
        >
          <h2 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>Still have a question?</h2>
          <p style={{ maxWidth: 480, margin: "16px auto 0", color: "#B9C0CC", fontSize: "clamp(1rem,1.3vw,1.12rem)", lineHeight: 1.6 }}>
            Chat with us directly on WhatsApp, or book a free 30-minute strategy call.
          </p>
          <FAQCtaButtons />
        </div>
      </main>

      <Footer />
    </>
  );
}
