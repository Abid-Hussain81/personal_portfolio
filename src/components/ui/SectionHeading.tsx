import { cn } from "@/lib/utils";
type SectionHeadingProps = { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string; invertColors?: boolean };
export function SectionHeading({ eyebrow, title, description, align = "left", className, invertColors = false }: SectionHeadingProps) {
  return <div className={cn("section-heading", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && <p className={"section-kicker text-eyebrow " + (invertColors ? "text-white/70" : "text-muted")}>{eyebrow}</p>}
    <h2 className={"text-h2 " + (invertColors ? "text-white" : "text-foreground")}>{title}</h2>
    {description && <p className={cn("text-lead mt-4", invertColors && "text-white/70")}>{description}</p>}
  </div>;
}
