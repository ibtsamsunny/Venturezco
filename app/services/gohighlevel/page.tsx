import type { Metadata } from "next";
import ServiceHeader from "@/components/services/ServiceHeader";
import FeatureGrid from "@/components/services/FeatureGrid";
import StatsBar from "@/components/shared/StatsBar";
import StaticFAQ from "@/components/shared/StaticFAQ";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "GoHighLevel Implementation — VenturezCo",
  description:
    "Funnels, CRM, automation, lead nurturing, AI agents, appointment booking, reporting, and sales pipelines — all connected inside one system.",
};

const SCATTER = ["Facebook Ads", "Calendly", "Mailchimp", "Generic CRM", "WhatsApp"];

const WORKFLOW = [
  { label: "Lead clicks ad", size: 14, delay: "0s" },
  { label: "Landing page", size: 14, delay: ".2s" },
  { label: "CRM", size: 14, delay: ".4s" },
  { label: "AI qualification", size: 14, delay: ".6s" },
  { label: "Appointment booked", size: 14, delay: ".8s" },
  { label: "Sales pipeline", size: 14, delay: "1s" },
  { label: "Follow-up automation", size: 14, delay: "1.2s" },
];

const FEATURES = [
  "CRM Setup",
  "Sales Pipelines",
  "Funnels",
  "Landing Pages",
  "Automations",
  "Lead Nurturing",
  "AI Chatbots",
  "Missed Call Text Back",
  "Appointment Booking",
  "Reporting Dashboards",
];

export default function GoHighLevelPage() {
  return (
    <>
      <ServiceHeader
        badgeLabel="GoHighLevel Implementation"
        badgeBg="rgba(34,197,94,0.12)"
        badgeBorder="rgba(34,197,94,0.32)"
        badgeColor="#86EFAC"
        dotColor="#22C55E"
        h1Prefix="Build your entire growth engine"
        h1Gradient="on GoHighLevel."
        gradientFrom="#86EFAC"
        gradientTo="#22C55E"
        subhead="Funnels, CRM, automation, lead nurturing, AI agents, appointment booking, reporting, and sales pipelines — all connected inside one system."
        ctaLabel="Book A GoHighLevel Strategy Call"
        ctaBg="#16A34A"
        ctaShadow="rgba(34,197,94,0.4)"
        extra={
          <div style={{ marginTop: "clamp(48px,6vw,72px)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", fontFamily: "'Geist Mono',monospace", fontSize: 12.5, color: "#7C8492" }}>
            {["Traffic", "Funnel", "CRM", "Automation", "Booking"].map((step) => (
              <span key={step} style={{ display: "contents" }}>
                <span>{step}</span>
                <span style={{ color: "#3B4250" }}>→</span>
              </span>
            ))}
            <span style={{ color: "#86EFAC", fontWeight: 700 }}>Revenue</span>
          </div>
        }
      />

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.3rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", textWrap: "balance" }}>
            Most businesses don&apos;t have a marketing problem. <span style={{ color: "#7C8492" }}>They have a systems problem.</span>
          </h2>
        </div>
        <Reveal style={{ marginTop: "clamp(40px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(16px,3vw,32px)", alignItems: "center" }}>
          <div style={{ borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "clamp(24px,3vw,32px)" }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C8492" }}>Disconnected Tools</span>
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SCATTER.map((s, i) => (
                <span
                  key={s}
                  className="scatter-chip"
                  style={{ padding: "9px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "#C7CBD1", fontSize: 13.5, animationDelay: `${i * 0.6}s` }}
                >
                  {s}
                </span>
              ))}
            </div>
            <p style={{ margin: "18px 0 0", color: "#7C8492", fontSize: 13.5, lineHeight: 1.6 }}>Every handoff between tools is a place a lead can quietly disappear.</p>
          </div>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontWeight: 700, color: "#3B4250", fontSize: 14, justifySelf: "center" }}>VS</span>
          <div style={{ borderRadius: 22, border: "1px solid rgba(34,197,94,0.35)", background: "radial-gradient(120% 130% at 100% 0%, rgba(34,197,94,0.14), transparent 60%), #0A130E", padding: "clamp(24px,3vw,32px)", boxShadow: "0 24px 60px rgba(34,197,94,0.12)" }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#86EFAC" }}>GoHighLevel</span>
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", padding: 22 }}>
              <div className="flow-node" style={{ width: 88, height: 88, borderRadius: 24, background: "linear-gradient(135deg, rgba(34,197,94,0.28), rgba(134,239,172,0.14))", border: "1px solid rgba(34,197,94,0.5)", display: "grid", placeItems: "center", fontSize: 34 }}>
                🟢
              </div>
            </div>
            <p style={{ margin: "6px 0 0", textAlign: "center", color: "#D1FAE5", fontSize: 14, fontWeight: 600 }}>Every tool, one connected system.</p>
          </div>
        </Reveal>
      </section>

      <FeatureGrid
        eyebrow="What we build"
        eyebrowColor="#22C55E"
        heading="Everything your growth engine needs, in one platform."
        minColWidth={200}
        compact
        cards={FEATURES.map((title) => ({ title }))}
      />

      <section style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#22C55E" }}>Example workflow</span>
        <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.2rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff" }}>
          From ad click to customer, automatically.
        </h2>
        <Reveal style={{ marginTop: "clamp(36px,5vw,52px)", borderRadius: 26, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "clamp(28px,4vw,40px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {WORKFLOW.map((step, i) => (
              <div key={step.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div className="flow-node" style={{ width: 14, height: 14, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 10px #22C55E", flexShrink: 0, animationDelay: step.delay }} />
                  <span style={{ color: "#EDEFF3", fontSize: 15, fontWeight: 600 }}>{step.label}</span>
                </div>
                {i < WORKFLOW.length - 1 && (
                  <svg width="14" height="26" viewBox="0 0 14 26">
                    <path className="flow-line" d="M7 0 V26" stroke="#22C55E" strokeWidth="2" fill="none" style={{ animationDelay: step.delay }} />
                  </svg>
                )}
              </div>
            ))}
            <svg width="14" height="26" viewBox="0 0 14 26">
              <path className="flow-line" d="M7 0 V26" stroke="#22C55E" strokeWidth="2" fill="none" style={{ animationDelay: "1.2s" }} />
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div className="flow-node" style={{ width: 16, height: 16, borderRadius: "50%", background: "#86EFAC", boxShadow: "0 0 12px #86EFAC", flexShrink: 0, animationDelay: "1.4s" }} />
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Customer</span>
            </div>
          </div>
        </Reveal>
      </section>

      <StatsBar
        accent="#86EFAC"
        stats={[
          { value: "1 platform", label: "replacing 8-10 disconnected point tools" },
          { value: "15+ hrs", label: "manual work eliminated weekly" },
          { value: "24/7", label: "capture, nurture, and booking" },
        ]}
      />

      <StaticFAQ
        items={[
          { q: "Do we need to already use GoHighLevel?", a: "No — we set up and configure the account from scratch, or migrate your existing tools into it." },
          { q: "What happens to our current tools?", a: "We map what each one does, then consolidate into GoHighLevel step by step — nothing goes dark mid-migration." },
          { q: "Who manages it after launch?", a: "We can hand off full control to your team, or stay on to manage and refine the system ongoing." },
        ]}
      />

      <CTABanner
        heading="Let's build your GoHighLevel system."
        subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first."
        buttonLabel="Book A GoHighLevel Strategy Call"
        buttonBg="#16A34A"
        buttonShadow="rgba(34,197,94,0.4)"
        borderColor="rgba(60,160,110,0.3)"
        background="radial-gradient(85% 130% at 50% -10%, rgba(20,110,70,0.5), rgba(10,24,16,0.6) 58%), linear-gradient(180deg, rgba(14,32,22,0.5), rgba(8,16,11,0.6))"
      />

      <Footer />
    </>
  );
}
