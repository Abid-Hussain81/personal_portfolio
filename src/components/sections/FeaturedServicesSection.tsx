import Link from "next/link";
import { featuredServiceIds, services, type ServiceIconName } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ExpertiseGrid } from "./ExpertiseGrid";

const expertiseIcons: Record<ServiceIconName, string> = {
  code: "fa-code",
  layout: "fa-table-columns",
  rocket: "fa-gauge-high",
  briefcase: "fa-briefcase",
  "pen-tool": "fa-pen-nib",
  layers: "fa-layer-group",
  mail: "fa-envelope",
  shield: "fa-shield-halved",
  wrench: "fa-wrench",
};

const previews: Record<string, { title: string; summary: string }> = {
  "web-applications": { title: "Web applications", summary: "Build responsive web apps with reusable components your team can maintain." },
  "booking-platforms": { title: "Booking platforms", summary: "Build booking flows that guide users from search through confirmation." },
  "api-integrations": { title: "API integrations", summary: "Connect your app to external services and keep data flowing between them." },
  "figma-to-code": { title: "Design to code", summary: "Turn Figma designs into working interfaces that adapt to different screens." },
  "backend-support": { title: "Backend support", summary: "Debug application logic and keep the systems behind your interface reliable." },
  "website-performance": { title: "Speed & performance", summary: "Speed up pages by reducing asset sizes and improving how they load." },
};

export function FeaturedServicesSection() {
  const featured = services.filter(service => featuredServiceIds.includes(service.id));
  return <section className="section-pad section-divider" id="expertise"><Container>
    <div className="expertise-intro">
      <ScrollReveal distance={20} duration={.65} once><SectionHeading title="The right expertise for your next move." /></ScrollReveal>
      <ScrollReveal distance={20} duration={.65} delay={.08} once><p className="expertise-intro-copy">From the first screen to the final integration, practical support for the work ahead.</p></ScrollReveal>
    </div>
    <ExpertiseGrid
      cards={featured.map(service => {
        const preview = previews[service.id];
        return {
          id: service.id,
          icon: expertiseIcons[service.icon],
          title: preview?.title ?? service.title,
          summary: preview?.summary ?? service.description,
        };
      })}
    />
    <ScrollReveal distance={20} duration={.65} once><Link className="action-text mt-8" href="/services">Explore the full scope <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link></ScrollReveal>
  </Container></section>;
}
