import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ExpertiseGrid } from "./ExpertiseGrid";

export function FeaturedServicesSection() {
  return (
    <section className="expertise-section section-divider" id="expertise" aria-labelledby="expertise-heading">
      <Container>
        <ScrollReveal distance={20} duration={.65} once>
          <div className="expertise-intro">
            <div>
              <p className="expertise-eyebrow">Expertise</p>
              <h2 className="text-h2" id="expertise-heading">What I build for your team.</h2>
            </div>
            <Link className="action-text" href="/services">
              Explore all services <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
        <ExpertiseGrid />
      </Container>
    </section>
  );
}
