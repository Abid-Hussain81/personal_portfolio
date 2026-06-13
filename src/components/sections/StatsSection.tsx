import { stats } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14">
      <Container>
        <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/3 to-accent/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="relative text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  <span className="shimmer-text">{stat.value}</span>
                </p>
                <p className="relative mt-2 text-sm font-medium text-muted">
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
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-white p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
