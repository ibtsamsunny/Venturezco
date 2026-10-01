"use client";

import Link from "next/link";
import { SERVICE_LINKS } from "@/content/nav";

const navLink = { textDecoration: "none", color: "#B7BCC5", fontSize: "14.5px" } as const;
const social = {
  width: 40,
  height: 40,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#B7BCC5",
  textDecoration: "none",
} as const;

export default function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "clamp(48px,6vw,72px) 0 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40, paddingBottom: 44 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                <path d="M4 19 L10 12 L14.5 15 L22 6" stroke="#3B2FE0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="19" r="2.4" fill="#3B2FE0" />
                <circle cx="10" cy="12" r="2.4" fill="#3B2FE0" />
                <circle cx="14.5" cy="15" r="2.2" fill="#3B2FE0" />
                <circle cx="22" cy="6" r="3" fill="#fff" />
              </svg>
              <div>
                <span style={{ display: "block", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>
                  Venturez<span style={{ color: "#3B2FE0" }}>Co</span>
                </span>
                <span style={{ display: "block", marginTop: 4, fontFamily: "'Geist Mono',monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B7280" }}>
                  Real Estate Growth Systems
                </span>
              </div>
            </div>
            <p style={{ margin: 0, color: "#7C8492", fontSize: 14, lineHeight: 1.6 }}>
              VenturezCo builds high-performance websites and connected growth systems for modern estate agencies.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <Link href="/#contact" aria-label="LinkedIn" className="vz-social" style={social}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24H8z" />
                </svg>
              </Link>
              <a href="https://www.instagram.com/venturezco/" target="_blank" rel="noopener" aria-label="Instagram" className="vz-social" style={social}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61591253202830"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="vz-social"
                style={social}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3.2V5.6H14c-2.4 0-4 1.6-4 4V12H7.4v3.4H10V24h3.4v-8.6h2.8L16.7 12H13.4V9.9c0-.6.2-.9.6-.9z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6270", marginBottom: 16 }}>
              Services
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {SERVICE_LINKS.map((s) => (
                <Link key={s.href} href={s.href} style={navLink}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6270", marginBottom: 16 }}>
              Navigate
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <Link href="/#cases" style={navLink}>Case Studies</Link>
              <Link href="/insights" style={navLink}>Insights</Link>
              <Link href="/how-we-work" style={navLink}>How We Work</Link>
              <Link href="/contact" style={navLink}>Contact</Link>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6270", marginBottom: 16 }}>
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <Link href="/#contact" style={navLink}>LinkedIn</Link>
              <Link href="/#contact" style={navLink}>X / Twitter</Link>
              <a href="mailto:info@venturezco.com" style={navLink}>info@venturezco.com</a>
            </div>
          </div>
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6270", marginBottom: 16 }}>
              Newsletter
            </div>
            <p style={{ margin: "0 0 14px", color: "#7C8492", fontSize: 14, lineHeight: 1.55 }}>Systems thinking for growth, once a month.</p>
            <form
              style={{ display: "flex", gap: 8 }}
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("email") as HTMLInputElement;
                fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: input.value }),
                }).catch(() => {});
                form.reset();
              }}
            >
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "11px 16px",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "'Satoshi'",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#3B2FE0",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "11px 18px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Satoshi'",
                }}
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div style={{ paddingTop: 38, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 11, marginBottom: 26 }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5B6270" }}>
              Global Presence
            </span>
            <span style={{ color: "#3B4048", fontSize: 12 }}>&middot;</span>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.06em", color: "#6B7280" }}>3 Countries</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🇺🇸</span>
                <span style={{ color: "#EDEFF3", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>United States</span>
              </div>
              <div style={{ color: "#7C8492", fontSize: 13.5, lineHeight: 1.65 }}>
                123 Market Street, Suite 400
                <br />
                San Francisco, CA 94105
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🇬🇧</span>
                <span style={{ color: "#EDEFF3", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>United Kingdom</span>
              </div>
              <div style={{ color: "#7C8492", fontSize: 13.5, lineHeight: 1.65 }}>
                45 Old Street
                <br />
                London, EC1V 9HX
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🇦🇺</span>
                <span style={{ color: "#EDEFF3", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>Australia</span>
              </div>
              <div style={{ color: "#7C8492", fontSize: 13.5, lineHeight: 1.65 }}>
                120 Collins Street, Level 12
                <br />
                Melbourne, VIC 3000
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 38,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "#5B6270", fontSize: 13 }}>&copy; 2026 VenturezCo. All rights reserved.</span>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: "0.08em", color: "#5B6270" }}>
            Websites. Marketing. Automation.
          </span>
        </div>
      </div>
    </footer>
  );
}
