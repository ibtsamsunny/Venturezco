import Reveal from "@/components/shared/Reveal";

export default function CompareSimple({
  heading,
  headingMuted,
  leftLabel,
  leftItems,
  rightLabel,
  rightItems,
  accent,
  rightBg,
}: {
  heading: string;
  headingMuted?: string;
  leftLabel: string;
  leftItems: string[];
  rightLabel: string;
  rightItems: string[];
  accent: string;
  rightBg: string;
}) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)", textAlign: "center" }}>
      <h2 style={{ margin: "0 auto", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.3rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", maxWidth: 620, textWrap: "balance" }}>
        {heading} {headingMuted && <span style={{ color: "#7C8492" }}>{headingMuted}</span>}
      </h2>
      <Reveal
        style={{ marginTop: "clamp(40px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(16px,3vw,32px)", alignItems: "center" }}
      >
        <div style={{ borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "clamp(24px,3vw,32px)", textAlign: "left" }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C8492" }}>{leftLabel}</span>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 11 }}>
            {leftItems.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "#9AA1AD", fontSize: 14.5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B6270", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ justifySelf: "center" }}>
          <path className="flow-line" d="M4 32 H60" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M50 22 L60 32 L50 42" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div
          style={{
            borderRadius: 22,
            border: `1px solid ${accent}59`,
            background: rightBg,
            padding: "clamp(24px,3vw,32px)",
            textAlign: "left",
            boxShadow: `0 24px 60px ${accent}1F`,
          }}
        >
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B3A6FF" }}>{rightLabel}</span>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 11 }}>
            {rightItems.map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "#EDEFF3", fontSize: 14.5 }}>
                <span className="flow-node" style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}`, animationDelay: `${i * 0.4}s`, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
