import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
};

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  );
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/60 pt-28 pb-14 sm:pt-32 sm:pb-18">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      {/* Gradient blob */}
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-64 rounded-full bg-accent/6 blur-3xl" />

      <Container className="relative">
        <span className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          Portfolio
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
