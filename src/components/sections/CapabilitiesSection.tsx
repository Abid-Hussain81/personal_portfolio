import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { capabilityDemos } from "@/data/capabilities";
import { CapabilityCard } from "./CapabilityCard";

export function CapabilitiesSection() {
  return (
    <section className="section-pad section-divider capabilities-section" id="capabilities" aria-labelledby="capabilities-heading">
      <Container>
        <div className="capabilities-intro">
          <ScrollReveal distance={20} duration={0.6} once>
            <div className="section-heading">
              <p className="text-eyebrow capabilities-eyebrow">Selected capabilities</p>
              <h2 className="text-h2" id="capabilities-heading">Engineering in <em>action.</em></h2>
              <p className="text-lead">Explore interactive examples of how I turn complex requirements into functional digital products.</p>
            </div>
          </ScrollReveal>
          <Link className="action-text capabilities-contact" href="/contact">
            Discuss a similar project <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
          </Link>
        </div>
        <div className="capabilities-grid">
          {capabilityDemos.map((demo, index) => (
            <ScrollReveal key={demo.id} className={demo.id === "booking" ? "capability-entry capability-entry-featured" : "capability-entry"} delay={index * 0.08} distance={24} duration={0.65} once>
              <CapabilityCard demo={demo} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
