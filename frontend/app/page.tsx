import HeroSection from "@/src/components/HeroSection";
import WhyItMatters from "@/src/components/WhyItMatters";
import HowItWorks from "@/src/components/HowItWorks";
import OctavDashboard from "@/src/components/OctavDashboard";
import Features from "@/src/components/Features";
import UseCases from "@/src/components/UseCases";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyItMatters />
      <HowItWorks />
      <OctavDashboard />
      <Features />
      <UseCases />
    </>
  );
}
