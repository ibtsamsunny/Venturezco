import Reveal from "@/components/shared/Reveal";

export default function ApproachIntro() {
  return (
    <section style={{ position: "relative", padding: "clamp(38px,5vw,64px) 0", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 760,
          height: 420,
          background: "radial-gradient(50% 50% at 50% 50%, rgba(59,47,224,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Reveal as="div" style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)", textAlign: "center" }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
          The approach
        </span>
        <h2
          style={{
            margin: "16px 0 0",
            fontWeight: 900,
            fontSize: "clamp(2.1rem,5vw,3.6rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: "#fff",
            textWrap: "balance",
          }}
        >
          We build the digital foundations behind{" "}
          <span style={{ background: "linear-gradient(100deg,#9F91FF,#8B5CF6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            high-performing estate agencies.
          </span>
        </h2>
        <p style={{ maxWidth: 620, margin: "24px auto 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.22rem)", lineHeight: 1.6 }}>
          From your website and lead generation to CRM, AI follow-up and sales automation, we connect every part of your digital journey into one growth
          system.
        </p>
      </Reveal>
    </section>
  );
}
