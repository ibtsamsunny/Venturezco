"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookingModal } from "@/components/booking/BookingModalProvider";
import { SERVICE_LINKS } from "@/content/nav";

const navLinkStyle = { textDecoration: "none", color: "#B7BCC5", fontSize: "14.5px", fontWeight: 500 } as const;
const activeStyle = { ...navLinkStyle, color: "#fff" };

export default function SiteHeader() {
  const { openBooking } = useBookingModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const linkStyle = (active: boolean) => (active ? activeStyle : navLinkStyle);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        background: "rgba(10,10,10,0.62)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px clamp(20px,5vw,32px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M4 19 L10 12 L14.5 15 L22 6" stroke="#3B2FE0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="4" cy="19" r="2.4" fill="#3B2FE0" />
            <circle cx="10" cy="12" r="2.4" fill="#3B2FE0" />
            <circle cx="14.5" cy="15" r="2.2" fill="#3B2FE0" />
            <circle cx="22" cy="6" r="3" fill="#fff" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em", color: "#fff" }}>
            Venturez<span style={{ color: "#3B2FE0" }}>Co</span>
          </span>
        </Link>

        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2vw,30px)" }}>
          <div className="nav-svc">
            <Link href="/#services" className="nav-link" style={{ ...linkStyle(pathname.startsWith("/services")), display: "flex", alignItems: "center", gap: 6 }}>
              Services
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
            <div className="svc-dd">
              <div className="svc-dd-inner">
                {SERVICE_LINKS.map((s) => (
                  <Link key={s.href} href={s.href}>
                    <span className="svc-dot" style={{ background: s.dot }}></span>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/#cases" className="nav-link" style={navLinkStyle}>Case Studies</Link>
          <Link href="/insights" className="nav-link" style={linkStyle(pathname.startsWith("/insights"))}>Insights</Link>
          <Link href="/how-we-work" className="nav-link" style={linkStyle(pathname.startsWith("/how-we-work"))}>How We Work</Link>
          <Link href="/contact" className="nav-link" style={linkStyle(pathname.startsWith("/contact"))}>Contact</Link>
          <a
            href="#contact"
            onClick={openBooking}
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#3B2FE0",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: 999,
              boxShadow: "0 8px 26px rgba(59,47,224,0.35)",
            }}
          >
            Book a Call
          </a>
        </div>

        <button
          className="nav-burger"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,10,10,0.98)", maxHeight: "calc(100vh - 66px)", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", padding: "14px clamp(20px,5vw,32px) 26px" }}>
            <div>
              <button
                onClick={() => setServicesOpen((o) => !o)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  padding: "16px 4px",
                  color: "#fff",
                  fontSize: 16.5,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Services
                <svg
                  className="mob-acc-ic"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : undefined }}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9AA1AD"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {servicesOpen && (
                <div style={{ display: "flex", flexDirection: "column", padding: "0 4px 12px 14px", gap: 2 }}>
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={closeMenu}
                      style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#B7BCC5", fontSize: 15, padding: "11px 0" }}
                    >
                      <span className="svc-dot" style={{ background: s.dot }} />
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/#cases"
              onClick={closeMenu}
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#fff", fontSize: 16.5, fontWeight: 600, padding: "16px 4px" }}
            >
              Case Studies
            </Link>
            <Link
              href="/insights"
              onClick={closeMenu}
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#fff", fontSize: 16.5, fontWeight: 600, padding: "16px 4px" }}
            >
              Insights
            </Link>
            <Link
              href="/how-we-work"
              onClick={closeMenu}
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#fff", fontSize: 16.5, fontWeight: 600, padding: "16px 4px" }}
            >
              How We Work
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#fff", fontSize: 16.5, fontWeight: 600, padding: "16px 4px" }}
            >
              Contact
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                closeMenu();
                openBooking(e);
              }}
              style={{
                marginTop: 18,
                textDecoration: "none",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#3B2FE0",
                color: "#fff",
                fontSize: 15.5,
                fontWeight: 600,
                padding: "15px 18px",
                borderRadius: 999,
                boxShadow: "0 8px 26px rgba(59,47,224,0.35)",
              }}
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
