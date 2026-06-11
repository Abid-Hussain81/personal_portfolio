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
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I Work With"
            description="A modern toolkit focused on building fast, accessible, and beautifully crafted web experiences."
          />
        </FadeIn>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2">
          {previewCategories.map((category) => (
            <StaggerItem key={category.id}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Explore all skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
