import type { Metadata } from "next";
import { services } from "@/data/services";
import { serviceIconMap } from "@/components/icons/ServiceIcons";
import { PageHeader, Container } from "@/components/layout/Container";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Professional frontend development services including Figma to React, landing pages, responsive websites, and Firebase integration.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Comprehensive frontend development services to bring your digital vision to life with precision and performance."
      />
      <Container className="py-16 sm:py-20">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <StaggerItem key={service.id}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                  {/* Subtle hover gradient border glow */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/4 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h2 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">
                    {service.title}
                  </h2>
                  
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-muted transition-colors duration-300">
                    {service.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn className="mt-16 rounded-2xl border border-border bg-card/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Need a custom solution?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
            Every project is unique. Reach out to discuss your requirements and
            get a tailored quote for your frontend development needs.
          </p>
        </FadeIn>
      </Container>
    </>
  );
}
