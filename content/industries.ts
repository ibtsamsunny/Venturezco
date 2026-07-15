export type IndustryContent = {
  slug: string;
  badgeLabel: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  dotColor: string;
  h1Prefix: string;
  h1Gradient: string;
  gradientFrom: string;
  gradientTo: string;
  subhead: string;
  ctaBg: string;
  ctaShadow: string;
  painHeading: string;
  pains: { title: string; body: string }[];
  fixHeading: string;
  fixes: { href: string; label: string; labelColor: string; title: string; body: string }[];
  stats: { value: string; label: string }[];
  ctaHeading: string;
};

// Real Estate has its own bespoke page (app/industries/real-estate/page.tsx)
// with a different layout, so it's intentionally not in this data-driven list.
export const INDUSTRIES: IndustryContent[] = [
  {
    slug: "professional-services",
    badgeLabel: "Professional Services",
    badgeBg: "rgba(139,92,246,0.14)",
    badgeBorder: "rgba(139,92,246,0.34)",
    badgeColor: "#C4B5FD",
    dotColor: "#8B5CF6",
    h1Prefix: "Turn expertise into",
    h1Gradient: "a predictable pipeline.",
    gradientFrom: "#C4B5FD",
    gradientTo: "#8B5CF6",
    subhead: "Referrals and reputation built the practice. A connected system keeps it growing on purpose — for law, accounting, and consulting firms alike.",
    ctaBg: "#8B5CF6",
    ctaShadow: "rgba(139,92,246,0.45)",
    painHeading: "The moments that cap growth for firms built on referrals.",
    pains: [
      { title: "Referrals are unpredictable", body: "A great quarter and a slow one look identical until it's too late to react." },
      { title: "Intake is manual and slow", body: "New inquiries wait on a callback while a competitor answers first." },
      { title: "No visibility into what converts", body: "Without a pipeline view, nobody can say which source actually brings clients." },
    ],
    fixHeading: "The systems built for expertise-led firms.",
    fixes: [
      { href: "/services/growth-consulting", label: "Growth Consulting", labelColor: "#FCD34D", title: "A pipeline view of every referral", body: "See exactly which source, partner, or channel is actually converting." },
      { href: "/services/digital-marketing", label: "Digital Marketing", labelColor: "#B3A6FF", title: "Content that builds authority", body: "Positioning your expertise so new prospects arrive already trusting you." },
      { href: "/services/lead-generation", label: "Lead Generation", labelColor: "#C4B5FD", title: "Instant, structured intake", body: "New inquiries qualified and routed the moment they come in." },
    ],
    stats: [
      { value: "1 pipeline", label: "for every referral source and inquiry" },
      { value: "<1 hr", label: "average intake response time" },
      { value: "Full view", label: "of which channels actually convert to clients" },
    ],
    ctaHeading: "Let's build your firm's growth system.",
  },
  {
    slug: "healthcare",
    badgeLabel: "Healthcare",
    badgeBg: "rgba(34,211,238,0.12)",
    badgeBorder: "rgba(34,211,238,0.32)",
    badgeColor: "#A5F3FC",
    dotColor: "#22D3EE",
    h1Prefix: "Fill the calendar",
    h1Gradient: "without more admin work.",
    gradientFrom: "#A5F3FC",
    gradientTo: "#22D3EE",
    subhead: "Appointment booking, reminders, and patient follow-up that runs itself — built for how patients actually reach out and book.",
    ctaBg: "#0891B2",
    ctaShadow: "rgba(34,211,238,0.4)",
    painHeading: "The moments that drain a practice's schedule.",
    pains: [
      { title: "No-shows drain the schedule", body: "Without automatic reminders, empty slots cost real revenue every week." },
      { title: "Front desk buried in calls", body: "Routine scheduling questions eat the hours staff should spend on patients." },
      { title: "After-hours inquiries go unanswered", body: "New patient interest that arrives at night waits until the office reopens." },
    ],
    fixHeading: "The systems built for patient-facing teams.",
    fixes: [
      { href: "/services/ai-automation", label: "AI Automation", labelColor: "#A5F3FC", title: "Automatic reminders that cut no-shows", body: "Confirmations and reminders sent without staff lifting a finger." },
      { href: "/services/gohighlevel", label: "GoHighLevel", labelColor: "#86EFAC", title: "Self-serve scheduling, 24/7", body: "Patients book directly onto the calendar without calling in." },
      { href: "/services/lead-generation", label: "Lead Generation", labelColor: "#C4B5FD", title: "New patient inquiries, captured", body: "Every after-hours inquiry answered and routed the moment it arrives." },
    ],
    stats: [
      { value: "Fewer", label: "no-shows with automatic reminders" },
      { value: "24/7", label: "self-serve booking for patients" },
      { value: "Hours saved", label: "off the front desk every week" },
    ],
    ctaHeading: "Let's build your practice's growth system.",
  },
  {
    slug: "ecommerce",
    badgeLabel: "Ecommerce",
    badgeBg: "rgba(245,158,11,0.14)",
    badgeBorder: "rgba(245,158,11,0.34)",
    badgeColor: "#FCD34D",
    dotColor: "#F59E0B",
    h1Prefix: "Turn browsers into",
    h1Gradient: "repeat buyers.",
    gradientFrom: "#FCD34D",
    gradientTo: "#F59E0B",
    subhead: "Abandoned cart recovery, retargeting, and lifecycle email/SMS that keeps customers coming back after the first order.",
    ctaBg: "#D97706",
    ctaShadow: "rgba(245,158,11,0.4)",
    painHeading: "The revenue that leaks out of every store.",
    pains: [
      { title: "Cart abandonment goes unrecovered", body: "Most stores lose the majority of carts and never follow up at all." },
      { title: "One-time buyers never return", body: "Without lifecycle follow-up, most customers never place a second order." },
      { title: "Ad spend isn't tied to LTV", body: "Budget gets judged on first-order margin instead of what a customer is actually worth." },
    ],
    fixHeading: "The systems built to turn buyers into repeat customers.",
    fixes: [
      { href: "/services/digital-marketing", label: "Digital Marketing", labelColor: "#B3A6FF", title: "Retargeting tied to actual LTV", body: "Ad spend measured against lifetime value, not just the first sale." },
      { href: "/services/ai-automation", label: "AI Automation", labelColor: "#A5F3FC", title: "Automatic cart recovery", body: "Email and SMS sequences that win back abandoned carts on autopilot." },
      { href: "/services/lead-generation", label: "Lead Generation", labelColor: "#C4B5FD", title: "Lifecycle flows that build repeat orders", body: "Post-purchase sequences engineered to earn the second and third order." },
    ],
    stats: [
      { value: "Recovered", label: "carts that would otherwise be lost revenue" },
      { value: "Higher", label: "repeat purchase rate from lifecycle flows" },
      { value: "LTV-based", label: "ad spend decisions, not just first-order math" },
    ],
    ctaHeading: "Let's build your store's growth system.",
  },
  {
    slug: "financial-services",
    badgeLabel: "Financial Services",
    badgeBg: "rgba(236,72,153,0.14)",
    badgeBorder: "rgba(236,72,153,0.34)",
    badgeColor: "#F9A8D4",
    dotColor: "#EC4899",
    h1Prefix: "Build trust at scale,",
    h1Gradient: "without slowing compliance.",
    gradientFrom: "#F9A8D4",
    gradientTo: "#EC4899",
    subhead: "Lead nurture and client onboarding systems built for a regulated industry — compliant messaging, consistent follow-up.",
    ctaBg: "#DB2777",
    ctaShadow: "rgba(236,72,153,0.4)",
    painHeading: "The friction that slows a long, trust-based sales cycle.",
    pains: [
      { title: "Long sales cycles lose momentum", body: "Without consistent nurture, prospects go quiet somewhere in a multi-month decision." },
      { title: "Compliant follow-up doesn't scale", body: "Manual, carefully-worded outreach is slow to produce and easy to fall behind on." },
      { title: "Onboarding takes too many touches", body: "New clients drop off between the sale and the first real interaction with your team." },
    ],
    fixHeading: "The systems built for regulated, relationship-driven sales.",
    fixes: [
      { href: "/services/growth-consulting", label: "Growth Consulting", labelColor: "#FCD34D", title: "A pipeline built for long cycles", body: "Stages and triggers designed for multi-month, multi-touch decisions." },
      { href: "/services/gohighlevel", label: "GoHighLevel", labelColor: "#86EFAC", title: "Consistent, pre-approved nurture", body: "Sequences built on messaging your compliance team has already reviewed." },
      { href: "/services/ai-automation", label: "AI Automation", labelColor: "#A5F3FC", title: "Onboarding that runs itself", body: "New clients guided through every step automatically after the sale closes." },
    ],
    stats: [
      { value: "Consistent", label: "nurture across a multi-month sales cycle" },
      { value: "Pre-approved", label: "messaging that scales without new review cycles" },
      { value: "Automated", label: "onboarding from signed deal to first touch" },
    ],
    ctaHeading: "Let's build your firm's growth system.",
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
