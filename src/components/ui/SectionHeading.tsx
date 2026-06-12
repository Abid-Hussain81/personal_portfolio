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
          "mb-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest",
          invertColors
            ? "border-white/25 bg-white/15 text-white"
            : "border-primary/20 bg-primary/8 text-primary"
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "text-2xl font-bold tracking-tight sm:text-3xl",
        invertColors ? "text-white" : "text-foreground"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-3 text-sm leading-relaxed sm:text-base",
          invertColors ? "text-white/70" : "text-muted"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
