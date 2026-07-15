"use client";

import Reveal from "@/components/shared/Reveal";
import Footer from "@/components/layout/Footer";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useBookingModal } from "@/components/booking/BookingModalProvider";

const AVATARS = [
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80&auto=format&fit=crop",
];
const HERO_PHOTO = "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80&auto=format&fit=crop";
const PROBLEM_BG = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=60&auto=format&fit=crop";
const CLOSE_PHOTO = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80&auto=format&fit=crop";

const PAINS = [
  {
    title: "Leads sit in inboxes",
    body: "Inquiries go unanswered while you're showing another property.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    title: "Slow follow-up",
    body: "You respond too late and the buyer books with someone else.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Showings get missed",
    body: "Back-and-forth texts to schedule a viewing lose you the booking.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "No lead nurturing",
    body: "Cold leads and past clients never hear from you again.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "No visibility",
    body: "You don't know where any deal actually stands.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

const FLOW_STEPS = [
  {
    title: "Capture",
    body: "Leads from ads, forms & referrals",
    delay: "0s",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8M12 3v9M8 6c0 2.2 1.8 4 4 4s4-1.8 4-4" />
      </svg>
    ),
  },
  {
    title: "Qualify",
    body: "AI qualifies and routes instantly",
    delay: ".3s",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.6" />
        <rect x="14" y="14" width="7" height="7" rx="1.6" />
        <path d="M10 6.5h3.5a3 3 0 0 1 3 3V14" />
      </svg>
    ),
  },
  {
    title: "Book",
    body: "Showings scheduled automatically",
    delay: ".6s",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Nurture",
    body: "Follow-ups via SMS, email & calls",
    delay: ".9s",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 20v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const CLOSE_STEP = {
  title: "Close",
  body: "More showings. More deals.",
  delay: "1.2s",
  icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const STATS = [
  { value: "<5 min", label: "Average response time" },
  { value: "24/7", label: "AI qualification & follow-up" },
  { value: "2.8x", label: "More showings booked" },
  { value: "100%", label: "Leads tracked in one CRM" },
];

const TRUST_BADGES = ["No lock-in contracts", "Built on GoHighLevel", "ROI-focused systems"];

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3B2FE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

function FloatingCard({
  label,
  sub,
  iconBg,
  icon,
  style,
}: {
  label: string;
  sub: string;
  iconBg: string;
  icon: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="float-card"
      style={{
        position: "absolute",
        background: "rgba(12,13,18,0.92)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        padding: "14px 16px",
        boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, display: "grid", placeItems: "center", flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{label}</div>
        <div style={{ fontSize: 11.5, color: "#8A919C", marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

function FlowStep({ title, body, delay, icon, emphasized }: { title: string; body: string; delay: string; icon: React.ReactNode; emphasized?: boolean }) {
  return (
    <div
      className="flow-node-card"
      style={{
        width: 132,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "16px 6px",
        borderRadius: 18,
        border: emphasized ? "1px solid rgba(59,47,224,0.5)" : "1px solid rgba(255,255,255,0.08)",
        background: emphasized ? "rgba(59,47,224,0.1)" : "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="flow-node"
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: emphasized ? "1.5px solid #3B2FE0" : "1.5px solid rgba(59,47,224,0.5)",
          background: emphasized ? "rgba(59,47,224,0.25)" : "rgba(59,47,224,0.1)",
          display: "grid",
          placeItems: "center",
          color: emphasized ? "#fff" : "#B3A6FF",
          animationDelay: delay,
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14.5, color: "#fff" }}>{title}</div>
      <div style={{ color: "#8A919C", fontSize: 12, lineHeight: 1.5, textAlign: "center" }}>{body}</div>
    </div>
  );
}

export default function RealEstatePage() {
  const { openBooking } = useBookingModal();
  const painsRef = useStaggerReveal<HTMLDivElement>(90);
  const flowRef = useStaggerReveal<HTMLDivElement>(90);

  return (
    <>
      <header style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "clamp(120px,15vw,168px) clamp(20px,5vw,32px) 0" }}>
        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(32px,5vw,56px)", alignItems: "center" }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 999,
                background: "rgba(59,47,224,0.14)",
                border: "1px solid rgba(59,47,224,0.34)",
                color: "#B3A6FF",
                fontFamily: "'Geist Mono',monospace",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B2FE0", boxShadow: "0 0 8px #3B2FE0" }} />
              Real Estate Growth Systems
            </span>
            <h1 style={{ margin: "22px 0 0", fontWeight: 900, fontSize: "clamp(2.2rem,4.6vw,3.6rem)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
              The first agent to respond{" "}
              <span style={{ background: "linear-gradient(100deg,#B3A6FF,#3B2FE0)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                wins the deal.
              </span>
            </h1>
            <p style={{ maxWidth: 480, margin: "20px 0 0", color: "#9AA1AD", fontSize: "clamp(1.02rem,1.3vw,1.15rem)", lineHeight: 1.6 }}>
              We capture, qualify, and follow up with every lead instantly — so you never miss another showing, listing, or referral.
            </p>
            <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              <a
                href="#contact"
                onClick={openBooking}
                className="cta-btn"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#3B2FE0",
                  color: "#fff",
                  fontSize: 15.5,
                  fontWeight: 600,
                  padding: "15px 26px",
                  borderRadius: 999,
                  boxShadow: "0 14px 40px rgba(59,47,224,0.4)",
                }}
              >
                Book Your Free Strategy Call
                <ArrowIcon />
              </a>
              <a href="#solution" className="nav-link" style={{ textDecoration: "none", color: "#B7BCC5", fontSize: 15, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                See How It Works
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex" }}>
                {AVATARS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- external placeholder photos, arbitrary hosts
                  <img
                    key={src}
                    src={src}
                    alt="Agent"
                    width={40}
                    height={40}
                    style={{ width: 40, height: 40, marginRight: i < AVATARS.length - 1 ? -10 : 0, border: "2px solid #0A0A0A", borderRadius: "50%", objectFit: "cover" }}
                  />
                ))}
              </div>
              <div>
                <div style={{ color: "#FBBF24", fontSize: 13, letterSpacing: "0.05em" }}>★★★★★</div>
                <div style={{ color: "#8A919C", fontSize: 13, marginTop: 2 }}>Trusted by real estate teams across UK, USA &amp; Australia</div>
              </div>
            </div>
          </div>

          <div className="hero-visual" style={{ position: "relative" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3.1" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photo */}
              <img
                src={HERO_PHOTO}
                alt="Listing property"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}
              />
            </div>
            <FloatingCard
              label="New Seller Lead"
              sub="Website inquiry"
              iconBg="rgba(59,47,224,0.18)"
              style={{ top: "8%", right: "-6%", width: "min(230px,52%)" }}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B3A6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              }
            />
            <FloatingCard
              label="AI Qualified"
              sub="Ready to view"
              iconBg="rgba(34,197,94,0.15)"
              style={{ top: "38%", left: "-7%", width: "min(210px,50%)", animationDelay: ".6s" }}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              }
            />
            <FloatingCard
              label="Viewing Booked"
              sub="Tomorrow, 11:00 AM"
              iconBg="rgba(139,92,246,0.16)"
              style={{ bottom: "6%", right: "-4%", width: "min(230px,54%)", animationDelay: "1.2s" }}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              }
            />
          </div>
        </div>
      </header>

      <section style={{ position: "relative", zIndex: 1, margin: "clamp(80px,10vw,130px) 0 0", padding: "clamp(50px,7vw,80px) clamp(20px,5vw,32px)", textAlign: "center", overflow: "hidden" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.94), rgba(10,10,10,0.97) 55%, #0A0A0A), url('${PROBLEM_BG}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
              The Problem
            </span>
            <h2 style={{ margin: "14px auto 0", fontWeight: 900, fontSize: "clamp(1.7rem,3.6vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", maxWidth: 640 }}>
              Every hour you wait, your competitor gets closer.
            </h2>
          </Reveal>
          <div
            ref={painsRef}
            style={{
              marginTop: "clamp(40px,5vw,54px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 0,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {PAINS.map((p) => (
              <div key={p.title} className="feat-card feat-card-tint" style={{ borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "30px 20px" }}>
                <div style={{ width: 38, height: 38, margin: "0 auto", borderRadius: 11, background: "rgba(59,47,224,0.12)", display: "grid", placeItems: "center", color: "#B3A6FF" }}>{p.icon}</div>
                <h3 style={{ margin: "16px 0 0", fontSize: 15.5, fontWeight: 700, color: "#fff" }}>{p.title}</h3>
                <p style={{ margin: "8px 0 0", color: "#8A919C", fontSize: 13.5, lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "clamp(80px,10vw,130px) auto 0", padding: "0 clamp(20px,5vw,32px)", textAlign: "center" }}>
        <Reveal>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>
            The Solution
          </span>
          <h2 style={{ margin: "14px auto 0", fontWeight: 900, fontSize: "clamp(1.7rem,3.6vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", maxWidth: 600 }}>
            We turn inquiries into{" "}
            <span style={{ background: "linear-gradient(100deg,#B3A6FF,#3B2FE0)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              closed deals.
            </span>
          </h2>
        </Reveal>
        <div ref={flowRef} style={{ marginTop: "clamp(40px,5vw,54px)", display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "clamp(6px,1.5vw,14px)", flexWrap: "wrap" }}>
          {FLOW_STEPS.map((s) => (
            <div key={s.title} style={{ display: "contents" }}>
              <FlowStep {...s} />
              <div style={{ alignSelf: "center", color: "#3B2FE0", paddingTop: 10 }}>
                <ArrowIcon />
              </div>
            </div>
          ))}
          <FlowStep {...CLOSE_STEP} emphasized />
        </div>

        <Reveal
          style={{
            marginTop: "clamp(48px,6vw,64px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            padding: "clamp(28px,4vw,40px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 24,
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.3rem)", color: "#B3A6FF", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ marginTop: 6, color: "#8A919C", fontSize: 13.5 }}>{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "clamp(80px,10vw,130px) auto 0", padding: "0 clamp(20px,5vw,32px) clamp(90px,10vw,120px)" }}>
        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px,5vw,56px)",
            alignItems: "center",
            borderRadius: 28,
            border: "1px solid rgba(96,132,220,0.28)",
            background: "radial-gradient(85% 130% at 0% 0%, rgba(38,66,150,0.4), rgba(14,18,34,0.5) 60%)",
            padding: "clamp(28px,4vw,48px)",
            overflow: "hidden",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(1.6rem,3.2vw,2.3rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", textWrap: "balance" }}>
              How many deals are you losing to slow follow-up?
            </h2>
            <p style={{ margin: "16px 0 0", color: "#B9C0CC", fontSize: 15, lineHeight: 1.6, maxWidth: 440 }}>
              Let&apos;s build a real estate growth system that captures every lead and closes more deals.
            </p>
            <div style={{ marginTop: 26 }}>
              <a
                href="#contact"
                onClick={openBooking}
                className="cta-btn"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#3B2FE0",
                  color: "#fff",
                  fontSize: 15.5,
                  fontWeight: 600,
                  padding: "15px 26px",
                  borderRadius: 999,
                  boxShadow: "0 14px 40px rgba(59,47,224,0.4)",
                }}
              >
                Book Your Free Strategy Call
                <ArrowIcon />
              </a>
            </div>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 18 }}>
              {TRUST_BADGES.map((b) => (
                <span key={b} style={{ display: "flex", alignItems: "center", gap: 7, color: "#C7CDE0", fontSize: 13.5 }}>
                  <CheckIcon />
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", aspectRatio: "5/4" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photo */}
            <img
              src={CLOSE_PHOTO}
              alt="Agent with client"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)" }}
            />
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
