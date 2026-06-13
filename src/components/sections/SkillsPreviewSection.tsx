import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function SkillsPreviewSection() {
  return (
    <section className="bg-secondary/30 py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I Work With"
            description="A modern toolkit focused on building fast, accessible, and beautifully crafted web experiences."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2">
          {skillCategories.slice(0, 4).map((category) => (
            <StaggerItem key={category.id}>
              <div className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                <h3 className="text-h3 text-foreground transition-colors group-hover:text-primary">
                  {category.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="cursor-default rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:border-primary hover:text-white hover:gap-3"
          >
            Explore all skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
