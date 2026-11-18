import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredServiceIds, services } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedServicesSection() {
  const featured = services.filter(service => featuredServiceIds.includes(service.id));
  return <section className="section-pad section-divider" id="expertise"><Container>
    <div className="grid gap-7 lg:grid-cols-[1fr_0.6fr] lg:items-end">
      <SectionHeading eyebrow="01 / Expertise" title="The right support for the next part of your product." />
      <p className="max-w-sm text-sm leading-relaxed text-muted">From a new interface to a complex integration, I can work alongside your team or take on a defined piece of delivery.</p>
    </div>
    <div className="mt-10 grid gap-x-14 md:grid-cols-2">
      {featured.map((service, index) => <Link href={"/services#" + service.id} className="service-row group" key={service.id}>
        <span className="service-index pt-1">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex-1"><h3>{service.title}</h3><p>{service.description}</p></div>
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-primary" aria-hidden="true" />
      </Link>)}
    </div>
    <Link className="action-text mt-8" href="/services">Explore the full scope <ArrowUpRight size={15} aria-hidden="true" /></Link>
  </Container></section>;
}
