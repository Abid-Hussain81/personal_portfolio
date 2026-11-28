import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ToolkitWorkspace } from "./ToolkitWorkspace";

export function SkillsPreviewSection() {
  return (
    <section className="section-pad section-divider" id="toolkit" aria-labelledby="toolkit-heading">
      <Container>
        <ToolkitWorkspace>
          <div className="toolkit-heading">
            <p className="text-eyebrow">Technical Toolkit</p>
            <h2 className="text-h2" id="toolkit-heading">
              Tools that work together. <em>Systems built to last.</em>
            </h2>
            <p className="text-lead">
              From responsive interfaces to connected services, reliable data and optimized delivery — the technologies behind my development workflow.
            </p>
          </div>
          <Link href="/skills" className="toolkit-full-link">
            Explore the full toolkit <span><ArrowUpRight size={16} aria-hidden="true" /></span>
          </Link>
        </ToolkitWorkspace>
      </Container>
    </section>
  );
}
