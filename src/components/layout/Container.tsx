import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
};

/**
 * The single source-of-truth container.
 * Max-width: 1152px (--container-max).
 * Horizontal padding scales: 24px → 32px (sm) → 48px (lg) → 64px (xl).
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("container-base", className)}>
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
    <section className="relative overflow-hidden border-b border-border bg-secondary/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
      {/* Texture */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-64 rounded-full bg-accent/6 blur-3xl" />

      <Container className="relative">
        <span className="text-eyebrow mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-primary">
          Portfolio
        </span>
        <h1 className="text-h1 mt-2 max-w-3xl text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-lead mt-4 max-w-2xl">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
