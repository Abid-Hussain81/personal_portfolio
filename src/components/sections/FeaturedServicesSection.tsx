import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredServiceIds, services } from "@/data/services";
import { serviceIconMap } from "@/components/icons/ServiceIcons";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function FeaturedServicesSection() {
  const featured = services.filter((s) => featuredServiceIds.includes(s.id));

  return (
    <section className="relative overflow-hidden bg-secondary/35 py-16 sm:py-20">
      {/* Visual background enhancements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-3xl" />
      </div>

      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Services"
            title="What I Can Build For You"
            description="From pixel-perfect design conversions to full-scale frontend applications — tailored solutions for your needs."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <StaggerItem key={service.id}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-border/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 sm:p-7">
                  {/* Subtle hover gradient border glow */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/10">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground group-hover:text-muted transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn className="mt-14 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-primary hover:border-primary hover:text-white hover:shadow-md hover:shadow-primary/5 hover:gap-3"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
