import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { FeaturedServicesSection } from "@/components/sections/FeaturedServicesSection";
import { SkillsPreviewSection } from "@/components/sections/SkillsPreviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { HomeEffects } from "@/components/animations/HomeEffects";
import { profile } from "@/data/profile";
import { siteDescription } from "@/lib/metadata";
import "./home-effects.css";
import "./process-showcase.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "./expertise-cards.css";
import "./toolkit-panels.css";

export default function HomePage() {
  const url = new URL("/", profile.siteUrl).href;
  const personId = `${url}#abid-hussain`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: profile.name,
        description: siteDescription,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.role,
        url,
        image: new URL("/Profile.jpg", url).href,
        sameAs: [profile.linkedin, profile.github],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <HomeEffects>
        <HeroSection />
        <FeaturedServicesSection />
        <ProcessSection />
        <FeaturedProjectsSection />
        <SkillsPreviewSection />
        <ContactCTASection />
      </HomeEffects>
    </>
  );
}
