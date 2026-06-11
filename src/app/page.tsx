import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedServicesSection } from "@/components/sections/FeaturedServicesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { SkillsPreviewSection } from "@/components/sections/SkillsPreviewSection";
import { TestimonialsPreviewSection } from "@/components/sections/TestimonialsPreviewSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedServicesSection />
      <FeaturedProjectsSection />
      <SkillsPreviewSection />
      <TestimonialsPreviewSection />
      <ContactCTASection />
    </>
  );
}
