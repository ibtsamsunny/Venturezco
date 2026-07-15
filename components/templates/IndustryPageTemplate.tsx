import ServiceHeader from "@/components/services/ServiceHeader";
import StatsBar from "@/components/shared/StatsBar";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/shared/Reveal";
import type { IndustryContent } from "@/content/industries";

export default function IndustryPageTemplate({ industry }: { industry: IndustryContent }) {
  return (
    <>
      <ServiceHeader
        badgeLabel={industry.badgeLabel}
        badgeBg={industry.badgeBg}
        badgeBorder={industry.badgeBorder}
        badgeColor={industry.badgeColor}
        dotColor={industry.dotColor}
        h1Prefix={industry.h1Prefix}
        h1Gradient={industry.h1Gradient}
        gradientFrom={industry.gradientFrom}
        gradientTo={industry.gradientTo}
        subhead={industry.subhead}
        ctaLabel="Book Your Free Strategy Call"
        ctaBg={industry.ctaBg}
        ctaShadow={industry.ctaShadow}
      />

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
          Where it breaks down
        </span>
        <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.2rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", maxWidth: 600 }}>
          {industry.painHeading}
        </h2>
        <Reveal style={{ marginTop: "clamp(32px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
          {industry.pains.map((p) => (
            <div key={p.title} className="feat-card" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 26 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: "#fff" }}>{p.title}</h3>
              <p style={{ margin: 0, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{p.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
          How we fix it
        </span>
        <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.2rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", maxWidth: 600 }}>
          {industry.fixHeading}
        </h2>
        <Reveal style={{ marginTop: "clamp(32px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
          {industry.fixes.map((f) => (
            <a
              key={f.title}
              href={f.href}
              className="feat-card"
              style={{ textDecoration: "none", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 26, display: "block" }}
            >
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: f.labelColor }}>{f.label}</span>
              <h3 style={{ margin: "10px 0 0", fontSize: 17, fontWeight: 700, color: "#fff" }}>{f.title}</h3>
              <p style={{ margin: "8px 0 0", color: "#9AA1AD", fontSize: 14, lineHeight: 1.6 }}>{f.body}</p>
            </a>
          ))}
        </Reveal>
      </section>

      <StatsBar accent={industry.badgeColor} stats={industry.stats} />

      <CTABanner
        heading={industry.ctaHeading}
        subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first."
        buttonLabel="Book Your Free Strategy Call"
        buttonBg={industry.ctaBg}
        buttonShadow={industry.ctaShadow}
      />

      <Footer />
    </>
  );
}
