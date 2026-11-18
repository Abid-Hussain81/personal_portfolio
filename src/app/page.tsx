import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { FeaturedServicesSection } from "@/components/sections/FeaturedServicesSection";
import { SkillsPreviewSection } from "@/components/sections/SkillsPreviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export default function HomePage() {
  return <><HeroSection /><FeaturedServicesSection /><ProcessSection /><FeaturedProjectsSection /><SkillsPreviewSection /><ContactCTASection /></>;
}
