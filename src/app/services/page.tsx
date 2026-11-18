import type { Metadata } from "next";
import Link from "next/link";
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
    "Web application development, booking interfaces, REST API integrations, Figma implementation and backend support for startups and software teams.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Practical development support for your application, booking workflow or integration project."
      />
      <Container className="py-16 sm:py-20">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <StaggerItem key={service.id}>
                <article id={service.id} className="group relative flex h-full flex-col rounded-xl border border-border bg-card  p-6  transition-all duration-300  hover:border-primary/20 hover:bg-white   sm:p-8">
                  
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary  transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/10">
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

        <FadeIn className="mt-16 rounded-xl border border-border bg-card/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Have a specific scope in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
            Share what you need to build so we can discuss requirements and
            agree on the scope, deliverables and next steps for your project.
          </p>
          <Link href="/contact" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white">Discuss your requirements</Link>
        </FadeIn>
      </Container>
    </>
  );
}
