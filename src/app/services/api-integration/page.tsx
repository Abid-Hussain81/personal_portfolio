import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { InteriorHero, InteriorPage, InteriorPanel } from "@/components/layout/InteriorPage";
import { mindGaugeTravelTechHighlight } from "@/data/resume";
import { createMetadata } from "@/lib/metadata";

const description = "Hire Abid Hussain, an API integration developer in Lahore, Pakistan, for REST and GraphQL integrations, travel platforms, and hotel booking workflows.";

export const metadata: Metadata = createMetadata({
  title: "Freelance API Integration Developer",
  description,
  path: "/services/api-integration",
});

export default function ApiIntegrationPage() {
  return (
    <InteriorPage>
      <InteriorHero
        title="API integration developer"
        description="I connect REST and GraphQL APIs to React and Next.js applications. I’m based in Lahore, Pakistan, and work with remote product teams on integrations, booking workflows, and customer-facing interfaces."
      >
        <Link className="action-primary mt-6" href="/contact">
          Discuss your integration <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </InteriorHero>

      <Container className="interior-content">
        <div className="interior-grid">
          <InteriorPanel>
            <h2>REST and GraphQL integrations</h2>
            <p className="interior-body">
              Connect an existing API to a new interface, map responses into application data, or debug an integration that already runs in production. I build the loading, empty, and error states users see when a service responds slowly or returns incomplete data.
            </p>
          </InteriorPanel>
          <InteriorPanel tone="sage">
            <h2>Hotel availability and booking</h2>
            <p className="interior-body">
              Load hotel and room details, show availability, and check that the selected room is still available before checkout. If availability changes, the interface can explain what happened and let the traveler select another option.
            </p>
          </InteriorPanel>
        </div>

        <div className="mt-6">
          <InteriorPanel tone="peach">
            <h2>TravelgateX integration experience</h2>
            <p className="interior-body">{mindGaugeTravelTechHighlight}</p>
            <Link className="action-text mt-3" href="/resume">
              See my work experience <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </InteriorPanel>
        </div>

        <InteriorPanel tone="sage" className="interior-cta">
          <div>
            <h2>Have an API to connect?</h2>
            <p>Share the provider, the workflow you’re building, and where the integration needs support.</p>
          </div>
          <Link className="action-primary" href="/contact">
            Let&apos;s talk <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </InteriorPanel>
      </Container>
    </InteriorPage>
  );
}
