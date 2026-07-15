import type { Metadata } from "next";
import ServiceHeader from "@/components/services/ServiceHeader";
import CompareDetailed from "@/components/services/CompareDetailed";
import FeatureGrid from "@/components/services/FeatureGrid";
import StatsBar from "@/components/shared/StatsBar";
import StaticFAQ from "@/components/shared/StaticFAQ";
import CTABanner from "@/components/shared/CTABanner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Automation — VenturezCo",
  description:
    "We build revenue systems in GoHighLevel that capture, nurture, qualify, and book leads automatically — around the clock, without a team standing by.",
};

export default function AIAutomationPage() {
  return (
    <>
      <ServiceHeader
        badgeLabel="AI Automation"
        badgeBg="rgba(34,211,238,0.12)"
        badgeBorder="rgba(34,211,238,0.32)"
        badgeColor="#A5F3FC"
        dotColor="#22D3EE"
        h1Prefix="Your leads don't stop at 5PM."
        h1Gradient="Neither should your systems."
        gradientFrom="#A5F3FC"
        gradientTo="#22D3EE"
        subhead="We build revenue systems in GoHighLevel that capture, nurture, qualify, and book leads automatically — around the clock, without a team standing by."
        ctaLabel="Book Your Free Strategy Call"
        ctaBg="#0891B2"
        ctaShadow="rgba(34,211,238,0.35)"
      />

      <CompareDetailed
        eyebrow="Manual vs automated"
        heading="The gap between a lead and a booked call."
        leftLabel="Manual Process"
        leftItems={[
          { title: "Lead fills out a form", sub: "Sits in inbox until someone notices" },
          { title: "Rep replies — hours later", sub: "Interest has already cooled" },
          { title: "Manual back-and-forth to book", sub: "Half the leads go quiet before it's scheduled" },
        ]}
        rightLabel="Automated Process"
        rightItems={[
          { title: "AI responds in under a minute", sub: "Any hour, any channel" },
          { title: "Qualifies with real questions", sub: "Scores and routes automatically" },
          { title: "Books directly onto a calendar", sub: "Rep just shows up to a scheduled call" },
        ]}
        accent="#22D3EE"
        rightBg="radial-gradient(120% 130% at 100% 0%, rgba(34,211,238,0.12), transparent 60%), #071316"
      />

      <FeatureGrid
        eyebrow="Core services"
        heading="Automation built as revenue infrastructure."
        minColWidth={220}
        cards={[
          { title: "AI Chatbots", body: "Natural-language first response on every channel, day or night." },
          { title: "Lead Qualification", body: "Dynamic questions that adapt to what the lead just said." },
          { title: "CRM Automation", body: "Every stage transition and follow-up fires without a manual click." },
          { title: "Appointment Booking", body: "Self-serve scheduling with automatic reminders and reschedules." },
          { title: "Email Automation", body: "Sequences that adjust based on engagement, not a fixed calendar." },
          { title: "SMS Automation", body: "Two-way texting for the moments that need a faster reply." },
          { title: "Workflow Automation", body: "Internal handoffs and alerts so nothing depends on memory." },
        ]}
      />

      <StatsBar
        accent="#A5F3FC"
        stats={[
          { value: "15+ hrs", label: "manual follow-up eliminated per week" },
          { value: "<5 min", label: "average first-response time" },
          { value: "24/7", label: "lead capture, qualification, and booking" },
        ]}
      />

      <StaticFAQ
        items={[
          { q: "Will it sound robotic to leads?", a: "We write and tune the conversation flows so they read like your best rep on a good day — not a script." },
          { q: "Does this replace my sales team?", a: "No — it removes the delay in front of them, so reps open conversations already knowing the answer." },
          { q: "How long does setup take?", a: "Core automation is typically live within the first month, with refinement ongoing after that." },
        ]}
      />

      <CTABanner
        heading="Let's put automation to work on revenue."
        subtext="One free strategy call — we'll show you exactly where the leaks are and what to fix first."
        buttonLabel="Book Your Free Strategy Call"
        buttonBg="#0891B2"
        buttonShadow="rgba(34,211,238,0.4)"
      />

      <Footer />
    </>
  );
}
