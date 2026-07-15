import Reveal from "@/components/shared/Reveal";

type Item = { title: string; sub: string };

export default function CompareDetailed({
  eyebrow,
  heading,
  leftLabel,
  leftItems,
  rightLabel,
  rightItems,
  accent,
  rightBg,
}: {
  eyebrow: string;
  heading: string;
  leftLabel: string;
  leftItems: Item[];
  rightLabel: string;
  rightItems: Item[];
  accent: string;
  rightBg: string;
}) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: accent }}>{eyebrow}</span>
        <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.3rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", textWrap: "balance" }}>
          {heading}
        </h2>
      </div>
      <Reveal
        style={{ marginTop: "clamp(40px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(16px,3vw,32px)", alignItems: "center" }}
      >
        <div style={{ borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "clamp(24px,3vw,32px)", textAlign: "left" }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C8492" }}>{leftLabel}</span>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
            {leftItems.map((item) => (
              <div key={item.title}>
                <div style={{ color: "#C7CBD1", fontSize: 14.5, fontWeight: 600 }}>{item.title}</div>
                <div style={{ marginTop: 3, color: "#6B7280", fontSize: 13 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ justifySelf: "center" }}>
          <path className="flow-line" d="M4 32 H60" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M50 22 L60 32 L50 42" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ borderRadius: 22, border: `1px solid ${accent}59`, background: rightBg, padding: "clamp(24px,3vw,32px)", textAlign: "left", boxShadow: `0 24px 60px ${accent}1F` }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}>{rightLabel}</span>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
            {rightItems.map((item, i) => (
              <div key={item.title} style={{ display: "flex", gap: 10 }}>
                <span className="live-dot" style={{ width: 7, height: 7, marginTop: 6, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}`, animationDelay: `${i * 0.3}s`, flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#EDEFF3", fontSize: 14.5, fontWeight: 600 }}>{item.title}</div>
                  <div style={{ marginTop: 3, color: "#7C8492", fontSize: 13 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
