import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  invertColors?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  invertColors = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn(
          "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest",
          invertColors
            ? "bg-background/20 text-background"
            : "bg-foreground/10 text-foreground"
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "text-2xl font-bold tracking-tight sm:text-3xl",
        invertColors ? "text-background" : "text-foreground"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-3 text-sm leading-relaxed",
          invertColors ? "text-background/70" : "text-muted"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
