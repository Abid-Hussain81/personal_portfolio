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
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
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
