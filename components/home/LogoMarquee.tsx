const LOGOS: { name: string; style: React.CSSProperties }[] = [
  { name: "Northwind", style: { fontFamily: "'Satoshi'", fontWeight: 700, fontSize: 23, letterSpacing: "-0.02em" } },
  { name: "Tandem", style: { fontFamily: "'Satoshi'", fontWeight: 800, fontSize: 23, letterSpacing: "-0.03em" } },
  { name: "Atlas & Co", style: { fontFamily: "'Satoshi'", fontWeight: 500, fontSize: 23, letterSpacing: "0.02em" } },
  { name: "Halcyon", style: { fontFamily: "'Satoshi'", fontWeight: 700, fontSize: 23, letterSpacing: "-0.01em" } },
  { name: "BEACON", style: { fontFamily: "'Geist Mono',monospace", fontWeight: 500, fontSize: 20, letterSpacing: "0.04em" } },
  { name: "Vantage", style: { fontFamily: "'Satoshi'", fontWeight: 900, fontSize: 23, letterSpacing: "-0.03em" } },
  { name: "Meridian", style: { fontFamily: "'Satoshi'", fontWeight: 600, fontSize: 23, letterSpacing: "-0.01em" } },
  { name: "Orbit Labs", style: { fontFamily: "'Satoshi'", fontWeight: 700, fontSize: 23, letterSpacing: "-0.02em" } },
];

export default function LogoMarquee() {
  return (
    <section style={{ position: "relative", padding: "clamp(30px,5vw,56px) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "'Geist Mono',monospace",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5B6270",
            marginBottom: 30,
          }}
        >
          Trusted by modern growth teams
        </div>
        <div
          className="vz-marquee"
          style={{
            position: "relative",
            overflow: "hidden",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <div className="vz-marquee-track" style={{ gap: "clamp(40px,5vw,72px)", alignItems: "center", padding: "6px 36px" }}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={i} aria-hidden={i >= LOGOS.length} style={{ ...logo.style, color: "#7C8492", whiteSpace: "nowrap" }}>
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
