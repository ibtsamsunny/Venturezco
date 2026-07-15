import Reveal from "@/components/shared/Reveal";

type Node = { emoji: string; label: string };

export default function FlowChain({
  eyebrow,
  heading,
  nodes,
  accent,
}: {
  eyebrow: string;
  heading: string;
  nodes: Node[];
  accent: string;
}) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: accent }}>{eyebrow}</span>
      <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.2rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff" }}>{heading}</h2>
      <Reveal
        style={{
          marginTop: "clamp(36px,5vw,52px)",
          borderRadius: 26,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          padding: "clamp(28px,4vw,40px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          {nodes.map((n, i) => {
            const last = i === nodes.length - 1;
            return (
              <div key={n.label} style={{ display: "contents" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: last ? "1.2" : "1", minWidth: last ? 100 : 96 }}>
                  <div
                    className="flow-node"
                    style={{
                      width: last ? 62 : 56,
                      height: last ? 62 : 56,
                      borderRadius: last ? 18 : 16,
                      background: last ? `linear-gradient(135deg, ${accent}57, ${accent}33)` : `${accent}${(0x10 + i * 4).toString(16)}`,
                      border: `1px solid ${accent}${(0x4d + i * 0x0a).toString(16)}`,
                      display: "grid",
                      placeItems: "center",
                      fontSize: last ? 24 : 22,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {n.emoji}
                  </div>
                  <span style={{ fontSize: 12.5, color: last ? "#fff" : "#C7CBD1", fontWeight: last ? 600 : 400, textAlign: "center" }}>{n.label}</span>
                </div>
                {!last && (
                  <svg width="40" height="16" viewBox="0 0 40 16" style={{ flexShrink: 0 }}>
                    <path className="flow-line" d="M2 8 H36" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" style={{ animationDelay: `${i * 0.2}s` }} />
                    <path d="M30 3 L36 8 L30 13" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
