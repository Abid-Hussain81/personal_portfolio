import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredServiceIds, services } from "@/data/services";
import { serviceIconMap } from "@/components/icons/ServiceIcons";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";

export function FeaturedServicesSection() {
  const featured = services.filter((service) =>
    featuredServiceIds.includes(service.id),
  );

  return (
    <section className="py-10">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Services"
            title="What I Can Build For You"
            description="From pixel-perfect design conversions to full-scale frontend applications — tailored solutions for your business needs."
          />
        </FadeIn>

        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <StaggerItem key={service.id}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:gradient-bg group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/50 hover:gap-3"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
