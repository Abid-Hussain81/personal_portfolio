import { skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function SkillsPageContent() {
  return (
    <Container className="py-16 sm:py-20">
      <StaggerContainer className="grid gap-6 lg:grid-cols-2">
        {skillCategories.map((category) => (
          <StaggerItem key={category.id}>
            <section className="h-full rounded-xl border border-border bg-white p-6  sm:p-8">
              <h2 className="text-lg font-bold text-foreground">{category.title}</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">{skill.name}</li>
                ))}
              </ul>
            </section>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Container>
  );
}
