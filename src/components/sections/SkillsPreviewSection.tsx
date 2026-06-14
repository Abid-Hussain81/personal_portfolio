import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function SkillsPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/35 py-16 sm:py-20">
      {/* Background blobs for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/4 blur-3xl" />
      </div>

      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I Work With"
            description="A modern toolkit focused on building fast, accessible, and beautifully crafted web experiences."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">
          {skillCategories.slice(0, 4).map((category) => (
            <StaggerItem key={category.id}>
              <div className="group relative rounded-2xl border border-border/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                {/* Subtle hover gradient border glow */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/4 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">
                  {category.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="cursor-default rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-semibold text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/5 hover:text-primary hover:shadow-md hover:shadow-primary/5"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-14 text-center">
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-primary hover:border-primary hover:text-white hover:shadow-md hover:shadow-primary/5 hover:gap-3"
          >
            Explore all skills
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
