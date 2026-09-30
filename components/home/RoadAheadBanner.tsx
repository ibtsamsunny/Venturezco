import Reveal from "@/components/shared/Reveal";
import ParallaxLayer from "@/components/shared/ParallaxLayer";

const BANNER_PHOTO = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80";

export default function RoadAheadBanner() {
  return (
    <Reveal as="section" style={{ position: "relative", padding: "clamp(30px,4vw,52px) 0" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.08)",
            minHeight: "clamp(360px,52vh,560px)",
            display: "flex",
            alignItems: "flex-end",
            boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          }}
        >
          <ParallaxLayer
            factor={0.06}
            aria-hidden="true"
            style={{ position: "absolute", inset: "-7%", background: `url('${BANNER_PHOTO}') center/cover no-repeat` }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(8,9,14,0.32) 0%, rgba(8,9,14,0.55) 45%, rgba(8,9,14,0.93) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 82% at 12% 100%, rgba(59,47,224,0.30), transparent 60%)" }}
          />
          <div style={{ position: "relative", zIndex: 2, padding: "clamp(32px,5vw,64px)", maxWidth: 760 }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#B3A6FF" }}>
              The road ahead
            </span>
            <h2
              style={{
                margin: "16px 0 0",
                fontWeight: 900,
                fontSize: "clamp(2.1rem,4.8vw,3.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
                textWrap: "balance",
              }}
            >
              The future of estate agency growth.
            </h2>
            <p style={{ margin: "20px 0 0", maxWidth: 560, color: "#D3D7E0", fontSize: "clamp(1.05rem,1.4vw,1.25rem)", lineHeight: 1.6 }}>
              The best estate agencies don&apos;t rely on manual follow-ups. They rely on systems that respond instantly, nurture every enquiry, and keep
              their pipeline moving 24/7.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
