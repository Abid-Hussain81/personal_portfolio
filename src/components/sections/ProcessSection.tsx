import { processSteps } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProcessShowcase } from "./ProcessShowcase";

export function ProcessSection() {
  return (
    <section className="section-pad section-divider" id="approach">
      <Container>
        <ScrollReveal distance={24} duration={0.65} once>
          <SectionHeading
            className="process-showcase-heading"
            title="From first conversation to final handover."
            description="Four considered steps. One clear way forward."
          />
        </ScrollReveal>
        <ProcessShowcase steps={processSteps} />
      </Container>
    </section>
  );
}
