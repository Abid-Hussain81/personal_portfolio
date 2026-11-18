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

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return <section className="page-header"><Container><span className="section-kicker text-eyebrow text-muted">Abid Hussain / Portfolio</span><h1 className="text-h1 max-w-3xl">{title}</h1>{description && <p className="text-lead">{description}</p>}{children}</Container></section>;
}
