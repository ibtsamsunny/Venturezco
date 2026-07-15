import type { Metadata } from "next";
import InlineCTA from "@/components/shared/InlineCTA";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "How We Work — VenturezCo",
  description: "Every engagement moves through the same seven stages — so nothing depends on memory, and the system keeps improving after launch.",
};

const STEPS = [
  { num: "01", color: "#3B2FE0", bg: "rgba(59,47,224,0.14)", border: "rgba(59,47,224,0.4)", text: "#B3A6FF", title: "Discovery", body: "We learn your business, your buyers, and where revenue is actually going today.", lineColor: "rgba(59,47,224,0.35)", delay: "0s" },
  { num: "02", color: "#8B5CF6", bg: "rgba(139,92,246,0.14)", border: "rgba(139,92,246,0.4)", text: "#C4B5FD", title: "Audit", body: "A full pass across marketing, sales, and automation to find where leads actually leak.", lineColor: "rgba(139,92,246,0.35)", delay: ".2s" },
  { num: "03", color: "#22D3EE", bg: "rgba(34,211,238,0.12)", border: "rgba(34,211,238,0.38)", text: "#A5F3FC", title: "Strategy", body: "A prioritized roadmap tying every fix directly to a revenue target.", lineColor: "rgba(34,211,238,0.35)", delay: ".4s" },
  { num: "04", color: "#22C55E", bg: "rgba(34,197,94,0.14)", border: "rgba(34,197,94,0.4)", text: "#86EFAC", title: "Build", body: "Funnels, CRM, automation, and campaigns built out against the roadmap.", lineColor: "rgba(34,197,94,0.35)", delay: ".6s" },
  { num: "05", color: "#F59E0B", bg: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.4)", text: "#FCD34D", title: "Launch", body: "The system goes live — tracked from day one so we know what's working immediately.", lineColor: "rgba(245,158,11,0.35)", delay: ".8s" },
  { num: "06", color: "#EC4899", bg: "rgba(236,72,153,0.14)", border: "rgba(236,72,153,0.4)", text: "#F9A8D4", title: "Optimize", body: "Real performance data feeds back into targeting, messaging, and the sequences themselves.", lineColor: "rgba(236,72,153,0.35)", delay: "1s" },
];

export default function HowWeWorkPage() {
  return (
    <>
      <header style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "clamp(130px,15vw,180px) clamp(20px,5vw,32px) 0", textAlign: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "rgba(59,47,224,0.14)", border: "1px solid rgba(59,47,224,0.34)", color: "#B3A6FF", fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          How We Work
        </span>
        <h1 style={{ margin: "22px auto 0", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.4rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
          A repeatable process, not a one-off project.
        </h1>
        <p style={{ maxWidth: 600, margin: "22px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.6 }}>
          Every engagement moves through the same seven stages — so nothing depends on memory, and the system keeps improving after launch.
        </p>
      </header>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "clamp(64px,8vw,96px) auto 0", padding: "0 clamp(20px,5vw,32px) clamp(90px,10vw,130px)" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {STEPS.map((s) => (
            <div key={s.num}>
              <div className="step-card" style={{ display: "flex", gap: 22, borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: 26, alignItems: "flex-start" }}>
                <div className="flow-node" style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, border: `1px solid ${s.border}`, display: "grid", placeItems: "center", flexShrink: 0, fontFamily: "'Geist Mono',monospace", fontWeight: 700, color: s.text, animationDelay: s.delay }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 700, color: "#fff" }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{s.body}</p>
                </div>
              </div>
              <svg width="14" height="30" viewBox="0 0 14 30" style={{ marginLeft: 23 }}>
                <path d="M7 0 V30" stroke={s.lineColor} strokeWidth="2" fill="none" />
              </svg>
            </div>
          ))}
          <div
            className="step-card"
            style={{
              display: "flex",
              gap: 22,
              borderRadius: 20,
              border: "1px solid rgba(59,47,224,0.35)",
              background: "radial-gradient(120% 130% at 100% 0%, rgba(59,47,224,0.14), transparent 60%), #0C0D11",
              padding: 26,
              alignItems: "flex-start",
            }}
          >
            <div
              className="flow-node"
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(59,47,224,0.3), rgba(139,92,246,0.2))",
                border: "1px solid rgba(59,47,224,0.5)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                fontFamily: "'Geist Mono',monospace",
                fontWeight: 700,
                color: "#fff",
                animationDelay: "1.2s",
              }}
            >
              07
            </div>
            <div>
              <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 700, color: "#fff" }}>Scale</h3>
              <p style={{ margin: 0, color: "#C3C8D1", fontSize: 14.5, lineHeight: 1.6 }}>The roadmap gets re-cut every sprint, aiming what&apos;s already working at more of the market.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 clamp(20px,5vw,32px) clamp(90px,10vw,130px)" }}>
        <InlineCTA heading="Ready to start with Discovery?" subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first." headingMaxWidth={560} />
      </section>

      <Footer />
    </>
  );
}
