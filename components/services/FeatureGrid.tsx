import Reveal from "@/components/shared/Reveal";

export default function FeatureGrid({
  eyebrow,
  eyebrowColor = "#3B2FE0",
  heading,
  cards,
  minColWidth = 240,
  compact = false,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  heading: string;
  cards: { title: string; body?: string }[];
  minColWidth?: number;
  compact?: boolean;
}) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: eyebrowColor }}>{eyebrow}</span>
      <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.7rem,3.4vw,2.4rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", maxWidth: 640 }}>
        {heading}
      </h2>
      <Reveal
        style={{
          marginTop: "clamp(32px,4vw,44px)",
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill,minmax(${minColWidth}px,1fr))`,
          gap: compact ? 18 : 20,
        }}
      >
        {cards.map((c) => (
          <div key={c.title} className="feat-card" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: compact ? 18 : 20, padding: compact ? 22 : 26 }}>
            <h3 style={{ margin: c.body ? "0 0 10px" : 0, fontSize: compact ? 15.5 : 17, fontWeight: 700, color: "#fff" }}>{c.title}</h3>
            {c.body && <p style={{ margin: 0, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{c.body}</p>}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
