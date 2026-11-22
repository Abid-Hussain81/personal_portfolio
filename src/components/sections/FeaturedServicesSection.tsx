import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredServiceIds, services } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { serviceIconMap } from "@/components/icons/ServiceIcons";

const previews: Record<string, { title: string; summary: string; label: string }> = {
  "web-applications": { title: "Web applications", summary: "Responsive interfaces and reusable components that turn your product idea into something people can use.", label: "Build your product" },
  "booking-platforms": { title: "Booking platforms", summary: "A smooth journey from the first search to the final confirmation.", label: "Connect the journey" },
  "api-integrations": { title: "API integrations", summary: "Bring your services, data and workflows together. Make the pieces work as one.", label: "Connect your systems" },
  "figma-to-code": { title: "Design to code", summary: "Your Figma designs, thoughtfully translated into responsive, production-ready interfaces.", label: "Bring designs to life" },
  "backend-support": { title: "Backend support", summary: "Untangle application issues and keep the logic behind your interface running reliably.", label: "Keep things moving" },
  "website-performance": { title: "Speed & performance", summary: "Faster pages, lighter assets and a better experience on every screen.", label: "Make every second count" },
};

export function FeaturedServicesSection() {
  const featured = services.filter(service => featuredServiceIds.includes(service.id));
  return <section className="section-pad section-divider" id="expertise"><Container>
    <div className="expertise-intro">
      <ScrollReveal distance={20} duration={.65} once><SectionHeading eyebrow="01 / Expertise" title="The right expertise for your next move." /></ScrollReveal>
      <ScrollReveal distance={20} duration={.65} delay={.08} once><p className="expertise-intro-copy">From the first screen to the final integration, practical support for the work ahead.</p></ScrollReveal>
    </div>
    <div className="expertise-grid">
      {featured.map((service, index) => {
        const preview = previews[service.id];
        const Icon = serviceIconMap[service.icon];
        return <ScrollReveal distance={24} duration={.65} delay={(index % 3) * .07} once key={service.id}>
          <Link href={"/services#" + service.id} className={"expertise-card expertise-card-" + service.id}>
            <div className="expertise-card-top"><span className="expertise-card-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><span className="expertise-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
            <div className="expertise-card-copy"><h3>{preview?.title ?? service.title}</h3><p>{preview?.summary ?? service.description}</p></div>
            <div className="expertise-card-bottom"><span>{preview?.label ?? "Explore this service"}</span><span className="expertise-card-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span></div>
          </Link>
        </ScrollReveal>;
      })}
    </div>
    <ScrollReveal distance={20} duration={.65} once><Link className="action-text mt-8" href="/services">Explore the full scope <ArrowUpRight size={15} aria-hidden="true" /></Link></ScrollReveal>
  </Container></section>;
}
