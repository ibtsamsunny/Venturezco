import Reveal from "@/components/shared/Reveal";

export default function StatsBar({ stats, accent }: { stats: { value: string; label: string }[]; accent: string }) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <Reveal
        style={{
          borderRadius: 26,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          padding: "clamp(32px,5vw,48px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 28,
          textAlign: "center",
        }}
      >
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontWeight: 900, fontSize: "clamp(2rem,3.4vw,2.6rem)", color: accent, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ marginTop: 8, color: "#9AA1AD", fontSize: 14 }}>{s.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
