import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/content/blogPosts";
import InlineCTA from "@/components/shared/InlineCTA";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} — VenturezCo`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "clamp(130px,15vw,180px) clamp(20px,5vw,32px) clamp(20px,3vw,32px)" }}>
        <Link
          href="/insights"
          className="nav-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#8A93A0", fontSize: 14, fontWeight: 500, marginBottom: 26 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
          </svg>
          Back to blog
        </Link>
        <span style={{ display: "block", fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: post.accent }}>{post.category}</span>
        <h1 style={{ margin: "16px 0 0", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.4rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff", textWrap: "balance" }}>
          {post.title}
        </h1>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14, fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: "0.04em", color: "#5B6270" }}>
          <span>{post.date}</span>
          <span>&middot;</span>
          <span>{post.readTime}</span>
        </div>
      </article>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "clamp(28px,4vw,40px) auto 0", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ position: "relative", height: "clamp(220px,32vw,360px)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)", background: post.heroBg, overflow: "hidden" }}>
          <svg viewBox="0 0 900 360" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} dangerouslySetInnerHTML={{ __html: post.heroSvg }} />
        </div>
      </div>

      <main style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "clamp(40px,5vw,56px) clamp(20px,5vw,32px) 0" }}>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.body }} />

        <div style={{ marginTop: 8, padding: "22px 26px", borderLeft: `3px solid ${post.accent}`, background: "rgba(255,255,255,0.025)", borderRadius: "0 14px 14px 0" }}>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, fontWeight: 600, color: "#EDEFF3", fontStyle: "italic" }}>{post.pullQuote}</p>
        </div>

        <div style={{ marginTop: "clamp(48px,7vw,72px)" }}>
          <InlineCTA
            heading="Ready to fix the system behind your growth?"
            subtext="Start with a free strategy call — we'll map exactly where your revenue is leaking."
          />
        </div>
      </main>

      <section style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,7vw,84px) clamp(20px,5vw,32px) clamp(80px,10vw,120px)" }}>
        <h3 style={{ margin: "0 0 24px", fontWeight: 800, fontSize: "clamp(1.2rem,2vw,1.5rem)", letterSpacing: "-0.02em", color: "#fff" }}>More insights</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/insights/${r.slug}`}
              className="bcard"
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24, gap: 12 }}
            >
              <span style={{ alignSelf: "flex-start", fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: r.accent }}>{r.category}</span>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em", color: "#fff" }}>{r.title}</h4>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.06em", color: "#5B6270" }}>{r.readTime}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
