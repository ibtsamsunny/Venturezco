import Reveal from "@/components/shared/Reveal";

export default function StaticFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
      <h2 style={{ margin: "0 0 28px", fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.6rem)", letterSpacing: "-0.02em", color: "#fff" }}>Common questions</h2>
      <Reveal style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item) => (
          <div key={item.q} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 24px", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 15.5 }}>{item.q}</div>
            <div style={{ marginTop: 8, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{item.a}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
