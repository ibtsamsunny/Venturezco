import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/content/blogPosts";
import Reveal from "@/components/shared/Reveal";
import InlineCTA from "@/components/shared/InlineCTA";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Insights — VenturezCo",
  description: "Field notes on building the marketing, sales, and automation systems behind predictable revenue.",
};

export default function InsightsPage() {
  return (
    <>
      <header style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "clamp(130px,15vw,180px) clamp(20px,5vw,32px) clamp(30px,4vw,48px)" }}>
        <Link
          href="/"
          className="nav-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#8A93A0", fontSize: 14, fontWeight: 500, marginBottom: 26 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>
        <span style={{ display: "block", fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3B2FE0" }}>Insights</span>
        <h1 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2.6rem,6vw,4.4rem)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
          Systems thinking for growth.
        </h1>
        <p style={{ maxWidth: 600, margin: "22px 0 0", color: "#9AA1AD", fontSize: "clamp(1.05rem,1.4vw,1.2rem)", lineHeight: 1.6 }}>
          Field notes on building the marketing, sales, and automation systems behind predictable revenue.
        </p>
      </header>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "clamp(20px,3vw,36px) clamp(20px,5vw,32px) clamp(80px,10vw,130px)" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 22 }}>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="bcard"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, overflow: "hidden" }}
            >
              <div style={{ position: "relative", height: 172, background: post.cardBg, borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <svg
                  viewBox="0 0 340 172"
                  preserveAspectRatio="none"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
                  dangerouslySetInnerHTML={{ __html: post.cardSvg }}
                />
              </div>
              <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 13 }}>
                <span
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: post.accent,
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: `${post.accent}1F`,
                    border: `1px solid ${post.accent}47`,
                  }}
                >
                  {post.category}
                </span>
                <h2 style={{ margin: 0, fontSize: 21, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.015em", color: "#fff" }}>{post.title}</h2>
                <p style={{ margin: 0, color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>{post.excerpt}</p>
                <div style={{ marginTop: 4, fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.06em", color: "#5B6270" }}>
                  {post.date} &middot; {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </Reveal>

        <div style={{ marginTop: "clamp(48px,7vw,84px)" }}>
          <InlineCTA
            heading="Ready to fix the system behind your growth?"
            subtext="Start with a free strategy call — we'll map exactly where your revenue is leaking."
            headingMaxWidth={620}
            subtextMaxWidth={520}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
