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
        <span
          className={cn(
            "text-eyebrow mb-4 inline-flex items-center rounded-full border px-3 py-1.5",
            invertColors
              ? "border-white/25 bg-white/15 text-white"
              : "border-primary/25 bg-primary/8 text-primary",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-h2 mt-1",
          invertColors ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lead mt-3",
            invertColors ? "text-white/70" : "",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
