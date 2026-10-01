import type { Metadata } from "next";
import ServiceHeader from "@/components/services/ServiceHeader";
import FlowChain from "@/components/services/FlowChain";
import FeatureGrid from "@/components/services/FeatureGrid";
import StatsBar from "@/components/shared/StatsBar";
import StaticFAQ from "@/components/shared/StaticFAQ";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Real Estate Website Development — VenturezCo",
  description:
    "Bespoke, high-performance real estate website development for estate agencies — premium design, property search, and conversion-focused pages wired straight into your CRM.",
};

export default function RealEstateWebsiteDevelopmentPage() {
  return (
    <>
      <ServiceHeader
        badgeLabel="Custom Website Development"
        badgeBg="rgba(236,72,153,0.14)"
        badgeBorder="rgba(236,72,153,0.34)"
        badgeColor="#F9A8D4"
        dotColor="#EC4899"
        h1Prefix="A website that closes deals,"
        h1Gradient="not just looks good."
        gradientFrom="#F9A8D4"
        gradientTo="#EC4899"
        subhead="High-end, conversion-focused websites built for estate agencies — fast, mobile-perfect, and wired straight into your booking and CRM systems."
        ctaLabel="Book Your Free Strategy Call"
        ctaBg="#DB2777"
        ctaShadow="rgba(236,72,153,0.4)"
      />

      <FlowChain
        eyebrow="The build process"
        heading="From first call to a site that sells listings, in weeks."
        accent="#EC4899"
        nodes={[
          { emoji: "🔍", label: "Discovery" },
          { emoji: "🎨", label: "Design" },
          { emoji: "💻", label: "Build" },
          { emoji: "🔗", label: "Integrate" },
          { emoji: "🚀", label: "Launch" },
        ]}
      />

      <FeatureGrid
        eyebrow="What we build"
        eyebrowColor="#EC4899"
        heading="Every page engineered to turn visitors into booked viewings."
        cards={[
          { title: "Property Listings Integration", body: "MLS/portal feeds and live listing pages that stay perfectly in sync." },
          { title: "Lead Capture Forms", body: "Every page wired to capture and qualify buyer and seller enquiries instantly." },
          { title: "Mobile-First Design", body: "Built to look and load flawlessly on every device your buyers browse on." },
          { title: "SEO Foundations", body: "Technical SEO and page speed baked in from day one, not bolted on after launch." },
          { title: "CRM & Booking Integration", body: "Connected straight into your GoHighLevel CRM and booking calendar." },
          { title: "Custom Branding", body: "A design system that makes your agency look like the market leader it is." },
        ]}
      />

      <StatsBar
        accent="#F9A8D4"
        stats={[
          { value: "Fast", label: "page performance engineered in from day one" },
          { value: "100%", label: "mobile-optimized, every page" },
          { value: "Built-in", label: "lead capture on every listing page" },
        ]}
      />

      <StaticFAQ
        items={[
          { q: "Do you integrate with our existing CRM?", a: "Yes — every site we build wires directly into GoHighLevel (or your existing CRM) for lead capture and follow-up." },
          { q: "How long does a build take?", a: "Most agency websites launch within 4–6 weeks from kickoff, depending on scope." },
          { q: "Can you migrate our existing listings?", a: "Yes — we handle migration of your current listings, content, and SEO rankings as part of the build." },
        ]}
      />

      <CTABanner
        heading="Let's build a website that works as hard as you do."
        subtext="One free strategy call — we'll show you exactly where your current site is costing you leads."
        buttonLabel="Book Your Free Strategy Call"
        buttonBg="#DB2777"
        buttonShadow="rgba(236,72,153,0.4)"
        borderColor="rgba(220,90,150,0.3)"
        background="radial-gradient(85% 130% at 50% -10%, rgba(150,30,90,0.5), rgba(34,14,24,0.6) 58%), linear-gradient(180deg, rgba(58,14,34,0.5), rgba(16,8,12,0.6))"
      />

      <Footer />
    </>
  );
}
