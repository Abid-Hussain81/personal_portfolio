import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { FeaturedServicesSection } from "@/components/sections/FeaturedServicesSection";
import { SkillsPreviewSection } from "@/components/sections/SkillsPreviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { HomeEffects } from "@/components/animations/HomeEffects";
import "./home-effects.css";
import "./process-stack.css";

export default function HomePage() {
  return <HomeEffects><HeroSection /><FeaturedServicesSection /><ProcessSection /><FeaturedProjectsSection /><SkillsPreviewSection /><ContactCTASection /></HomeEffects>;
}
