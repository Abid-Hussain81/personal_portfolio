import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIconMap } from "@/components/icons/ServiceIcons";
import { Container } from "@/components/layout/Container";
import {
  InteriorPage,
  InteriorHero,
  InteriorReveal,
  InteriorPanel,
} from "@/components/layout/InteriorPage";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Web Development Services",
  description:
    "Explore Abid Hussain’s web development services, including booking interfaces, REST API integrations, Figma implementation, and PHP backend support.",
  path: "/services",
});

export default function ServicesPage() {
  const tones = ["sage", "lilac", undefined, "peach", undefined, "sage", "lilac", undefined];

  return (
    <InteriorPage>
      <InteriorHero
        title="The right support."
        accent="Where it matters."
        description="From responsive interfaces to connected workflows, practical development support for your product and the people who use it."
      />
      <Container className="interior-content">
        <div className="services-detail-grid">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <InteriorReveal key={service.id} delay={(index % 3) * .07}>
                <article
                  id={service.id}
                  className={"interior-panel service-detail-card" + (tones[index] ? " tone-" + tones[index] : "")}
                >
                  <div className="service-detail-top">
                    <span className="interior-icon">
                      <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="service-detail-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <Link href="/contact" className="action-text" aria-label={"Discuss " + service.title}>
                    Discuss this service <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </InteriorReveal>
            );
          })}
        </div>

        <InteriorReveal>
          <InteriorPanel tone="sage" className="interior-cta">
            <div>
              <h2>Have a specific scope in mind?</h2>
              <p>
                Share what you need to build. We can work through your requirements,
                define the deliverables and agree on the next steps.
              </p>
            </div>
            <Link href="/contact" className="action-primary">
              Let&apos;s discuss your project <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </InteriorPanel>
        </InteriorReveal>
      </Container>
    </InteriorPage>
  );
}
