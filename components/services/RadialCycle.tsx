import Reveal from "@/components/shared/Reveal";

export default function RadialCycle({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <section style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "clamp(70px,9vw,110px) auto 0", padding: "0 clamp(20px,5vw,32px)", textAlign: "center" }}>
      <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F59E0B" }}>{eyebrow}</span>
      <h2 style={{ margin: "14px 0 0", fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.3rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff" }}>{heading}</h2>
      <Reveal style={{ marginTop: "clamp(40px,5vw,60px)", display: "flex", justifyContent: "center" }}>
        <svg width="340" height="340" viewBox="0 0 340 340" style={{ maxWidth: "80vw", height: "auto" }}>
          <circle className="ring-outer" cx="170" cy="170" r="150" fill="none" stroke="rgba(245,158,11,0.14)" strokeWidth="1.5" strokeDasharray="2 12" />
          <circle className="ring-inner" cx="170" cy="170" r="118" fill="none" stroke="rgba(139,92,246,0.14)" strokeWidth="1" strokeDasharray="1 10" />
          <circle cx="170" cy="170" r="86" fill="none" stroke="url(#rgc)" strokeWidth="2.5" />
          <defs>
            <linearGradient id="rgc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <g className="flow-node">
            <circle cx="170" cy="60" r="30" fill="rgba(245,158,11,0.14)" stroke="#F59E0B" strokeWidth="1.6" />
            <text x="170" y="65" textAnchor="middle" fill="#FCD34D" fontSize="11" fontFamily="Geist Mono, monospace">
              Audit
            </text>
          </g>
          <g className="flow-node" style={{ animationDelay: ".5s" }}>
            <circle cx="280" cy="170" r="30" fill="rgba(139,92,246,0.14)" stroke="#8B5CF6" strokeWidth="1.6" />
            <text x="280" y="175" textAnchor="middle" fill="#C4B5FD" fontSize="11" fontFamily="Geist Mono, monospace">
              Roadmap
            </text>
          </g>
          <g className="flow-node" style={{ animationDelay: "1s" }}>
            <circle cx="170" cy="280" r="30" fill="rgba(34,211,238,0.12)" stroke="#22D3EE" strokeWidth="1.6" />
            <text x="170" y="285" textAnchor="middle" fill="#A5F3FC" fontSize="11" fontFamily="Geist Mono, monospace">
              Sprint
            </text>
          </g>
          <g className="flow-node" style={{ animationDelay: "1.5s" }}>
            <circle cx="60" cy="170" r="30" fill="rgba(59,47,224,0.14)" stroke="#3B2FE0" strokeWidth="1.6" />
            <text x="60" y="175" textAnchor="middle" fill="#B3A6FF" fontSize="10.5" fontFamily="Geist Mono, monospace">
              Review
            </text>
          </g>
        </svg>
      </Reveal>
    </section>
  );
}
