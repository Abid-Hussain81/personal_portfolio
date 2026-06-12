import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { FeaturedServicesSection } from "@/components/sections/FeaturedServicesSection";
import { SkillsPreviewSection } from "@/components/sections/SkillsPreviewSection";
import { TestimonialsPreviewSection } from "@/components/sections/TestimonialsPreviewSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <FeaturedServicesSection />
      <SkillsPreviewSection />
      <TestimonialsPreviewSection />
      <ContactCTASection />
    </>
  );
}
