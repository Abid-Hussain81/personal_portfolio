import { levelLabels, skillCategories } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

const levelColors: Record<string, string> = {
  beginner:     "border-slate-200  bg-slate-50   text-slate-600",
  intermediate: "border-blue-200   bg-blue-50    text-blue-700",
  advanced:     "border-primary/20 bg-primary/8  text-primary",
  expert:       "border-violet-200 bg-violet-50  text-violet-700",
};

export function SkillsPageContent() {
  return (
    <Container className="py-16 sm:py-20">
      <StaggerContainer className="grid gap-6 lg:grid-cols-2">
        {skillCategories.map((category) => (
          <StaggerItem key={category.id}>
            <div className="group relative rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 sm:p-8">
              {/* Radial gradient backdrop hover glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <h2 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">{category.title}</h2>
              <div className="mt-7 space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group/item">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors duration-300">{skill.name}</span>
                      <span className={`shrink-0 rounded-xl border px-3 py-1 text-[11px] font-bold shadow-sm transition-all duration-300 ${levelColors[skill.level] ?? levelColors.beginner}`}>
                        {levelLabels[skill.level]}
                      </span>
                    </div>
                    <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary shadow-inner">
                      <FadeIn>
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out group-hover/item:brightness-110"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </FadeIn>
                    </div>
                    <p className="mt-1.5 text-right text-[11px] font-bold text-muted-foreground">{skill.proficiency}% Proficiency</p>
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
