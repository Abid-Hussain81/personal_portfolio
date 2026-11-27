import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { capabilityDemos } from "@/data/capabilities";
import { CapabilityCard } from "./CapabilityCard";

export function CapabilitiesSection() {
  return (
    <section className="section-pad section-divider capabilities-section" id="capabilities">
      <Container>
        <div className="capabilities-intro">
          <ScrollReveal distance={20} duration={0.6} once>
            <SectionHeading
              title="Selected capabilities"
              description="Try a sample interface, then flip it over to see how I’d build it."
            />
          </ScrollReveal>
          <Link className="action-text capabilities-contact" href="/contact">
            Discuss a similar project <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
          </Link>
        </div>
        <div className="capabilities-grid">
          {capabilityDemos.map((demo, index) => (
            <ScrollReveal key={demo.id} className="capability-entry" delay={index * 0.08} distance={24} duration={0.65} once>
              <CapabilityCard demo={demo} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
