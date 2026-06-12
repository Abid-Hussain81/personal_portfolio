import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";

export function SkillsPreviewSection() {
  const previewCategories = skillCategories.slice(0, 4);

  return (
    <section className="py-10">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I Work With"
            description="A modern toolkit focused on building fast, accessible, and beautifully crafted web experiences."
          />
        </FadeIn>

        <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2">
          {previewCategories.map((category) => (
            <StaggerItem key={category.id}>
              <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-default"
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
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/50 hover:gap-3"
          >
            Explore all skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
