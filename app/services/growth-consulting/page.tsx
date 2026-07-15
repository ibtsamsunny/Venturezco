import type { Metadata } from "next";
import ServiceHeader from "@/components/services/ServiceHeader";
import RadialCycle from "@/components/services/RadialCycle";
import FeatureGrid from "@/components/services/FeatureGrid";
import StatsBar from "@/components/shared/StatsBar";
import StaticFAQ from "@/components/shared/StaticFAQ";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Growth Consulting — VenturezCo",
  description: "The strategy layer: we audit, prioritize, and keep every part of the system aimed squarely at revenue — reviewed and re-cut every sprint.",
};

export default function GrowthConsultingPage() {
  return (
    <>
      <ServiceHeader
        badgeLabel="Growth Consulting"
        badgeBg="rgba(245,158,11,0.14)"
        badgeBorder="rgba(245,158,11,0.34)"
        badgeColor="#FCD34D"
        dotColor="#F59E0B"
        h1Prefix="A plan that keeps"
        h1Gradient="growth on course."
        gradientFrom="#FCD34D"
        gradientTo="#F59E0B"
        subhead="The strategy layer: we audit, prioritize, and keep every part of the system aimed squarely at revenue — reviewed and re-cut every sprint."
        ctaLabel="Book Your Free Strategy Call"
        ctaBg="#D97706"
        ctaShadow="rgba(245,158,11,0.4)"
      />

      <RadialCycle eyebrow="The roadmap cycle" heading="A plan that gets re-cut every sprint, not once a year." />

      <FeatureGrid
        eyebrow="What we cover"
        heading="A strategy layer that sits above every channel."
        cards={[
          { title: "Growth Audit", body: "A full pass across marketing, sales, and automation to find where revenue leaks." },
          { title: "Revenue Bottlenecks", body: "Identifying the one or two constraints actually capping growth right now." },
          { title: "Sales Process Optimization", body: "Pipeline stages, qualification criteria, and handoffs mapped so nothing relies on memory." },
          { title: "KPI Dashboards", body: "One view tying spend, pipeline, and revenue together — no more disagreeing tools." },
          { title: "Growth Roadmaps", body: "A prioritized plan tying every initiative back to a revenue target." },
          { title: "Quarterly Planning", body: "Priorities re-cut every quarter based on what the last one actually proved." },
        ]}
      />

      <StatsBar
        accent="#FCD34D"
        stats={[
          { value: "Sprint", label: "cadence roadmap reviews, not a static annual plan" },
          { value: "1 view", label: "of spend, pipeline, and revenue together" },
          { value: "Ongoing", label: "prioritization tied directly to revenue impact" },
        ]}
      />

      <StaticFAQ
        items={[
          { q: "Is this separate from the execution work?", a: "It sits above it — the roadmap directs what marketing, lead gen, and automation actually build each sprint." },
          { q: "How often do we meet?", a: "A recurring sprint review, typically every two weeks, where the roadmap gets re-prioritized with you." },
          { q: "Can we start with just the audit?", a: "Yes — the growth audit stands alone and gives you a clear picture even before any ongoing engagement." },
        ]}
      />

      <CTABanner
        heading="Let's build a roadmap that compounds."
        subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first."
        buttonLabel="Book Your Free Strategy Call"
        buttonBg="#D97706"
        buttonShadow="rgba(245,158,11,0.4)"
        borderColor="rgba(200,150,60,0.3)"
        background="radial-gradient(85% 130% at 50% -10%, rgba(120,80,20,0.5), rgba(24,18,10,0.6) 58%), linear-gradient(180deg, rgba(32,26,14,0.5), rgba(16,12,8,0.6))"
      />

      <Footer />
    </>
  );
}
