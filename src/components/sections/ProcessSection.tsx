import { processSteps } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProcessStack } from "@/components/animations/ProcessStack";
import { ArrowDown, ArrowUpRight, Code2, Compass, Layers3, Rocket } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

const stepDetails = [
  { icon: Compass, label: "A shared starting point", output: "A clear scope and a practical plan", tags: ["Your users", "Requirements", "Priorities"] },
  { icon: Layers3, label: "Every interaction considered", output: "A connected, responsive user journey", tags: ["User flows", "Responsive layouts", "Interface states"] },
  { icon: Code2, label: "Progress you can see", output: "Working features, delivered in reviewable steps", tags: ["Interfaces", "API integrations", "Progress updates"] },
  { icon: Rocket, label: "Ready for what comes next", output: "A tested product and a confident handover", tags: ["Workflow checks", "Documentation", "Handover"] },
] as const;

export function ProcessSection() {
  return <section className="section-pad section-divider" id="approach"><Container>
    <div className="process-stack-intro">
      <ScrollReveal direction="left"><SectionHeading title="From first conversation to final handover." description="Four considered steps. One clear way forward." /></ScrollReveal>
      <p className="process-scroll-cue"><ArrowDown size={16} aria-hidden="true" />Scroll through the process</p>
    </div>
    <ProcessStack>
      {processSteps.map((step, index) => {
        const detail = stepDetails[index];
        const Icon = detail.icon;
        return <li className="process-stack-layer" key={step.number} style={{ "--step-index": index } as CSSProperties}>
          <article className="process-stack-card" aria-labelledby={"process-step-" + step.number}>
            <header className="process-stack-header">
              <h3 id={"process-step-" + step.number}>{step.title}</h3>
              <span className="process-stack-number" aria-hidden="true">{step.number}</span>
            </header>
            <div className="process-stack-body">
              <div className="process-stack-copy">
                <p className="process-stack-label">{detail.label}</p>
                <p className="process-stack-description">{step.description}</p>
                <ul className="process-stack-tags" aria-label="Focus areas">{detail.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                {index === processSteps.length - 1
                  ? <Link className="action-primary process-stack-cta" href="/contact">Let&apos;s talk about your project <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  : <p className="process-stack-output"><span aria-hidden="true">↳</span>{detail.output}</p>}
              </div>
              <div className="process-stack-visual" aria-hidden="true">
                <div className="process-visual-orbit" />
                <div className="process-visual-window"><div className="process-visual-toolbar"><i /><i /><i /></div><Icon className="process-visual-icon" strokeWidth={1.15} /><div className="process-visual-lines"><span /><span /></div></div>
              </div>
            </div>
          </article>
        </li>;
      })}
    </ProcessStack>
  </Container></section>;
}
