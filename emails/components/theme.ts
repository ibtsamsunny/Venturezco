// Solid hex values only — no rgba()/gradients on backgrounds or borders, so
// rendering stays correct in Outlook desktop and other clients with weak
// modern-CSS support. Mirrors the site's actual palette (see
// components/layout/SiteHeader.tsx, components/booking/BookingModal.tsx).
export const colors = {
  bgOuter: "#050608",
  cardBg: "#12151f",
  cardBorder: "#242938",
  divider: "#1c2029",
  accent: "#3B2FE0",
  accentSoftBg: "#1c1a3a",
  accentText: "#b3a6ff",
  success: "#34D399",
  successSoftBg: "#123028",
  textWhite: "#ffffff",
  textMuted: "#9aa1ad",
  textDim: "#6b7280",
} as const;

export const fontFamily =
  "'Helvetica Neue', Helvetica, Arial, -apple-system, BlinkMacSystemFont, sans-serif";

export const CONTENT_WIDTH = 600;

export const SITE_URL = process.env.SITE_URL || "https://venturezco.com";
