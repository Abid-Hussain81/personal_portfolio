import { stats } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card/50 py-16">
      <Container>
        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  <span className="gradient-text">{stat.value}</span>
                </p>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

export function StatsGrid({ className }: { className?: string }) {
  return (
    <FadeIn className={className}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-4 text-center"
          >
            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
