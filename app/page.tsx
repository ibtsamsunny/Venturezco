import Hero from "@/components/home/Hero";
import ApproachIntro from "@/components/home/ApproachIntro";
import LogoMarquee from "@/components/home/LogoMarquee";
import StickyServiceCards from "@/components/home/StickyServiceCards";
import GHLPlatformDiagram from "@/components/home/GHLPlatformDiagram";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import InsightsPreview from "@/components/home/InsightsPreview";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main style={{ position: "relative" }}>
        <Hero />
        <ApproachIntro />
        <LogoMarquee />
        <StickyServiceCards />
        <GHLPlatformDiagram />
        <CaseStudies />
        <Testimonials />
        <InsightsPreview />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
