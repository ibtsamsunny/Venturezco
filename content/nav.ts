export const SERVICE_LINKS = [
  { href: "/services/digital-marketing", label: "Digital Marketing", dot: "#3B2FE0" },
  { href: "/services/lead-generation", label: "Lead Generation", dot: "#8B5CF6" },
  { href: "/services/ai-automation", label: "AI Automation", dot: "#22D3EE" },
  { href: "/services/gohighlevel", label: "GoHighLevel", dot: "#22C55E" },
  { href: "/services/growth-consulting", label: "Growth Consulting", dot: "#F59E0B" },
] as const;

export const INDUSTRY_LINKS = [
  { href: "/industries/real-estate", label: "Real Estate", dot: "#3B2FE0" },
  { href: "/industries/professional-services", label: "Professional Services", dot: "#8B5CF6" },
  { href: "/industries/healthcare", label: "Healthcare", dot: "#22D3EE" },
  { href: "/industries/ecommerce", label: "Ecommerce", dot: "#F59E0B" },
  { href: "/industries/financial-services", label: "Financial Services", dot: "#EC4899" },
] as const;

export const WA_NUMBER = "447463361502";
export const WA_MESSAGE = "Hi VenturezCo! I have a question about your growth systems.";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
