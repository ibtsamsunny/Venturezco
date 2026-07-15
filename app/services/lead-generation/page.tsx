import type { Metadata } from "next";
import ServiceHeader from "@/components/services/ServiceHeader";
import FlowChain from "@/components/services/FlowChain";
import FeatureGrid from "@/components/services/FeatureGrid";
import StatsBar from "@/components/shared/StatsBar";
import StaticFAQ from "@/components/shared/StaticFAQ";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Lead Generation — VenturezCo",
  description: "Landing pages, funnels, and conversion work tuned to turn traffic into sales-ready conversations — not just clicks that leak away.",
};

export default function LeadGenerationPage() {
  return (
    <>
      <ServiceHeader
        badgeLabel="Lead Generation"
        badgeBg="rgba(139,92,246,0.14)"
        badgeBorder="rgba(139,92,246,0.34)"
        badgeColor="#C4B5FD"
        dotColor="#8B5CF6"
        h1Prefix="Turn attention into"
        h1Gradient="qualified pipeline."
        gradientFrom="#C4B5FD"
        gradientTo="#8B5CF6"
        subhead="Landing pages, funnels, and conversion work tuned to turn traffic into sales-ready conversations — not just clicks that leak away."
        ctaLabel="Book Your Free Strategy Call"
        ctaBg="#8B5CF6"
        ctaShadow="rgba(139,92,246,0.45)"
      />

      <FlowChain
        eyebrow="The interactive funnel"
        heading="Every visitor moves through one measured path."
        accent="#8B5CF6"
        nodes={[
          { emoji: "🌐", label: "Traffic" },
          { emoji: "📄", label: "Landing Page" },
          { emoji: "👤", label: "Lead" },
          { emoji: "✅", label: "Qualified Lead" },
          { emoji: "📅", label: "Booked Call" },
          { emoji: "🏆", label: "Customer" },
        ]}
      />

      <FeatureGrid
        eyebrow="What we build"
        heading="Every stage of the funnel, engineered on purpose."
        cards={[
          { title: "Landing Pages", body: "High-intent pages built around one offer and one action." },
          { title: "Funnels", body: "Multi-step flows that pre-sell a visitor before sales ever talks to them." },
          { title: "Conversion Optimization", body: "Ongoing testing on headlines, offers, and forms as conversion keeps climbing." },
          { title: "Lead Magnets", body: "Offers designed to earn a real contact detail in exchange for real value." },
          { title: "Lead Qualification", body: "Scoring and routing so sales only sees leads worth their time." },
          { title: "Appointment Booking", body: "Self-serve scheduling built directly into the funnel's final step." },
        ]}
      />

      <StatsBar
        accent="#C4B5FD"
        stats={[
          { value: "+218%", label: "qualified pipeline in one quarter for a B2B client" },
          { value: "2.4x", label: "typical lift in landing page conversion rate" },
          { value: "<48h", label: "average time to launch a new funnel variant" },
        ]}
      />

      <StaticFAQ
        items={[
          { q: "Do you build the pages, or just optimize existing ones?", a: "Both — new funnels from scratch, or a structured audit and rebuild of what you already have." },
          { q: "How is a qualified lead defined?", a: "We build the scoring criteria with you before launch, so “qualified” means the same thing to marketing and sales." },
          { q: "What tools does this run on?", a: "Typically GoHighLevel end-to-end, though we can integrate with your existing stack where it makes sense." },
        ]}
      />

      <CTABanner
        heading="Let's build a funnel that converts."
        subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first."
        buttonLabel="Book Your Free Strategy Call"
        buttonBg="#8B5CF6"
        buttonShadow="rgba(139,92,246,0.45)"
      />

      <Footer />
    </>
  );
}
