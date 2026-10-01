// Website Development is the primary service and must stay first wherever
// this list is rendered (nav dropdown, footer). Digital Marketing and
// GoHighLevel still exist as pages but aren't part of the primary 4-service
// hierarchy, so they're intentionally left out of this list.
export const SERVICE_LINKS = [
  { href: "/real-estate-website-development", label: "Custom Website Development", dot: "#EC4899" },
  { href: "/services/lead-generation", label: "Lead Generation", dot: "#8B5CF6" },
  { href: "/services/ai-automation", label: "CRM & AI Automation", dot: "#22D3EE" },
  { href: "/services/growth-consulting", label: "Growth Strategy", dot: "#F59E0B" },
] as const;

export const WA_NUMBER = "447463361502";
export const WA_MESSAGE = "Hi VenturezCo! I'd like to grow my estate agency with your systems.";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
