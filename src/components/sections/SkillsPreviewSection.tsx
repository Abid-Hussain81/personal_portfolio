import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsPreviewSection() {
  return <section className="section-pad section-divider"><Container>
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <SectionHeading eyebrow="04 / Toolkit" title="Tools chosen around the work." description="A frontend foundation, with the backend and integration tools to connect the pieces." />
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {skillCategories.slice(0,4).map(category => <div className="border-t border-border pt-5" key={category.id}><h3 className="toolkit-label">{category.title}</h3><p className="toolkit-items">{category.skills.map(skill => skill.name).join(" / ")}</p></div>)}
      </div>
    </div>
    <Link href="/skills" className="action-text mt-9">View the full toolkit <ArrowUpRight size={14} aria-hidden="true" /></Link>
  </Container></section>;
}
