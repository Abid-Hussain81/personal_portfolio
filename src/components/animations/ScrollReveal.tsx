import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
};

// The stationary outer wrapper keeps observation stable while its content moves.
// Content stays visible until HomeEffects progressively enables the animations.
export function ScrollReveal({ children, className, direction = "up", delay = 0 }: ScrollRevealProps) {
  return (
    <div className={className} data-reveal-group>
      <div className="scroll-reveal-content" data-reveal={direction} data-reveal-delay={delay}>
        {children}
      </div>
    </div>
  );
}
