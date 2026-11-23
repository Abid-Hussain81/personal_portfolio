import Link from "next/link";
import { ArrowUpRight, Braces, Database, Layers3, Workflow } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const categoryPresentation = [
  { title: "Frontend", icon: Layers3, label: "Interfaces & interactions", featured: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Query"] },
  { title: "Backend & APIs", icon: Braces, label: "Logic & connected services", featured: ["REST APIs", "PHP", "CodeIgniter", "Node.js", "NestJS", "Convex"] },
  { title: "Data & automation", icon: Database, label: "Storage, identity & workflows", featured: ["MySQL", "PostgreSQL", "Prisma ORM", "Clerk", "Webhooks", "n8n"] },
  { title: "Workflow & performance", icon: Workflow, label: "Delivery & optimization", featured: ["Git", "GitHub", "Postman", "Figma", "Docker", "Lighthouse"] },
] as const;

export function SkillsPreviewSection() {
  return <section className="section-pad section-divider" id="toolkit" aria-label="Development toolkit"><Container>
    <div className="toolkit-layout">
      <div className="toolkit-intro">
        <ScrollReveal distance={24} duration={.65} once><SectionHeading title="Tools that work together." description="A frontend foundation, backed by the systems and tools that connect the pieces." /></ScrollReveal>
        <ScrollReveal distance={20} duration={.65} delay={.08} once><Link href="/skills" className="toolkit-full-link">Explore the full toolkit <span><ArrowUpRight size={18} aria-hidden="true" /></span></Link></ScrollReveal>
      </div>
      <div className="toolkit-panels">
        {skillCategories.slice(0,4).map((category, index) => {
          const presentation = categoryPresentation[index];
          const Icon = presentation.icon;
          const selected = category.skills.filter(skill => presentation.featured.some(name => name === skill.name));
          const remaining = category.skills.length - selected.length;
          return <ScrollReveal distance={24} duration={.65} delay={(index % 2) * .08} once key={category.id}>
            <article className={"toolkit-panel toolkit-panel-" + category.id} aria-labelledby={"toolkit-" + category.id}>
              <div className="toolkit-panel-top"><span className="toolkit-panel-icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span><span className="toolkit-panel-index" aria-hidden="true">0{index + 1}</span></div>
              <h3 id={"toolkit-" + category.id}>{presentation.title}</h3>
              <p className="toolkit-panel-caption">{presentation.label}</p>
              <ul className="toolkit-chips" aria-label={category.title}>
                {selected.map(skill => <li key={skill.name}>{skill.name}</li>)}
                {remaining > 0 && <li className="toolkit-more-chip"><Link href="/skills" aria-label={"View all " + category.skills.length + " tools in " + category.title}>+{remaining} more <ArrowUpRight size={12} aria-hidden="true" /></Link></li>}
              </ul>
            </article>
          </ScrollReveal>;
        })}
      </div>
    </div>
  </Container></section>;
}
