import { levelLabels, skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";

const levelColors: Record<string, string> = {
  beginner: "bg-slate-100 text-slate-600 border-slate-200",
  intermediate: "bg-blue-50 text-blue-700 border-blue-200",
  advanced: "bg-primary/8 text-primary border-primary/20",
  expert: "bg-violet-50 text-violet-700 border-violet-200",
};

export function SkillsPageContent() {
  return (
    <Container className="py-16 sm:py-20">
      <StaggerContainer className="grid gap-6 lg:grid-cols-2">
        {skillCategories.map((category) => (
          <StaggerItem key={category.id}>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-foreground">
                {category.title}
              </h2>
              <div className="mt-6 space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelColors[skill.level] ?? levelColors.beginner}`}>
                        {levelLabels[skill.level]}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <FadeIn>
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </FadeIn>
                    </div>
                    <p className="mt-1 text-right text-xs text-muted">
                      {skill.proficiency}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Container>
  );
}
