import { processSteps } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSection() {
  return <section className="section-pad section-divider" id="approach"><Container>
    <SectionHeading eyebrow="02 / Approach" title="Clear scope. Visible progress." description="A practical way to move from the first conversation to a usable handover." />
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map(step => <article className="process-step" key={step.number}>
        <span className="service-index">{step.number}</span>
        <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
      </article>)}
    </div>
  </Container></section>;
}
