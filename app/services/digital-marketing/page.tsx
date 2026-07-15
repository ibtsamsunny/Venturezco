import type { Metadata } from "next";
import ServiceHeader from "@/components/services/ServiceHeader";
import CompareSimple from "@/components/services/CompareSimple";
import FeatureGrid from "@/components/services/FeatureGrid";
import StatsBar from "@/components/shared/StatsBar";
import StaticFAQ from "@/components/shared/StaticFAQ";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Digital Marketing — VenturezCo",
  description: "Paid, social, and content run as one compounding engine — every channel feeding the next instead of fighting for the same budget.",
};

const CHANNELS: { emoji: string; label: string; color: string; delay: string }[] = [
  { emoji: "📢", label: "Paid", color: "#3B2FE0", delay: "0s" },
  { emoji: "💬", label: "Social", color: "#8B5CF6", delay: ".4s" },
  { emoji: "✍️", label: "Content", color: "#22D3EE", delay: ".8s" },
];

export default function DigitalMarketingPage() {
  return (
    <>
      <ServiceHeader
        badgeLabel="Digital Marketing"
        badgeBg="rgba(59,47,224,0.14)"
        badgeBorder="rgba(59,47,224,0.34)"
        badgeColor="#B3A6FF"
        dotColor="#3B2FE0"
        h1Prefix="Demand that compounds,"
        h1Gradient="not resets each month."
        gradientFrom="#B3A6FF"
        gradientTo="#3B2FE0"
        subhead="Paid, social, and content run as one compounding engine — every channel feeding the next instead of fighting for the same budget."
        ctaLabel="Book Your Free Strategy Call"
        ctaBg="#3B2FE0"
        ctaShadow="rgba(59,47,224,0.45)"
      />

      <CompareSimple
        heading="Most businesses don't have a marketing problem."
        headingMuted="They have a compounding problem."
        leftLabel="One-Off Campaigns"
        leftItems={["This month's ad push", "One social post series", "A blog article, once", "Resets to zero next month"]}
        rightLabel="Compounding Engine"
        rightItems={[
          "Content feeds retargeting audiences",
          "Paid amplifies what's proven organically",
          "Every closed deal becomes new content",
          "Compounds — cost per lead keeps falling",
        ]}
        accent="#3B2FE0"
        rightBg="radial-gradient(120% 130% at 100% 0%, rgba(59,47,224,0.14), transparent 60%), #0C0D11"
      />

      <FeatureGrid
        eyebrow="What we run"
        heading="Every channel, tied to one measured funnel."
        cards={[
          { title: "Paid Advertising", body: "Google, Meta, and LinkedIn campaigns built around a single measured funnel." },
          { title: "Google Ads", body: "Search and performance-max campaigns tuned to intent, not just impressions." },
          { title: "Facebook & Instagram Ads", body: "Full-funnel Meta campaigns from cold reach through retargeting." },
          { title: "Content Strategy", body: "Editorial calendar tied to the objections your sales team hears most." },
          { title: "Social Media Marketing", body: "Organic presence engineered to warm up audiences before they see an ad." },
          { title: "Retargeting", body: "Every engaged visitor re-approached with the message that fits where they are." },
        ]}
      />

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <Reveal style={{ borderRadius: 26, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "clamp(32px,5vw,52px)" }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3B2FE0" }}>
            How channels feed each other
          </span>
          <div style={{ marginTop: "clamp(28px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            {CHANNELS.map((c, i) => (
              <div key={c.label} style={{ display: "contents" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1, minWidth: 110 }}>
                  <div
                    className="flow-node"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: `${c.color}24`,
                      border: `1px solid ${c.color}66`,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 20,
                      animationDelay: c.delay,
                    }}
                  >
                    {c.emoji}
                  </div>
                  <span style={{ fontSize: 13, color: "#C7CBD1", textAlign: "center" }}>{c.label}</span>
                </div>
                <svg width="40" height="16" viewBox="0 0 40 16" style={{ flexShrink: 0 }}>
                  <path className="flow-line" d="M2 8 H36" stroke={c.color} strokeWidth="2" fill="none" strokeLinecap="round" style={{ animationDelay: `${i * 0.3}s` }} />
                  <path d="M30 3 L36 8 L30 13" stroke={c.color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1.3, minWidth: 130 }}>
              <div
                className="flow-node"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, rgba(59,47,224,0.3), rgba(139,92,246,0.2))",
                  border: "1px solid rgba(59,47,224,0.5)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 24,
                  animationDelay: "1.2s",
                }}
              >
                🎯
              </div>
              <span style={{ fontSize: 13, color: "#fff", fontWeight: 600, textAlign: "center" }}>Pipeline</span>
            </div>
          </div>
        </Reveal>
      </section>

      <StatsBar
        accent="#B3A6FF"
        stats={[
          { value: "3.1x", label: "average ROAS across managed accounts" },
          { value: "40%", label: "lower cost-per-lead within 90 days" },
          { value: "Weekly", label: "reporting on spend, mix, and pipeline impact" },
        ]}
      />

      <StaticFAQ
        items={[
          { q: "Is there a minimum ad budget?", a: "We scope spend to what your funnel can convert profitably — usually starting from a few thousand a month, reviewed monthly as data comes in." },
          { q: "Which channels do you manage?", a: "Google, Meta, and LinkedIn ads, plus organic content and social — chosen based on where your buyers actually spend attention." },
          { q: "How is performance reported?", a: "A weekly dashboard tying spend directly to pipeline and revenue — not just clicks and impressions." },
        ]}
      />

      <CTABanner
        heading="Let's map your marketing system."
        subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first."
        buttonLabel="Book Your Free Strategy Call"
        buttonBg="#3B2FE0"
        buttonShadow="rgba(59,47,224,0.45)"
      />

      <Footer />
    </>
  );
}
