"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/sections/FeaturedProjectsSection";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) =>
      p.categories.includes(active as (typeof p.categories)[number]),
    );
  }, [active]);

  return (
    <>
      <FadeIn>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                active === cat
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.05}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-base text-muted">
          No projects in this category.
        </p>
      )}
    </>
  );
}

export function ProjectsPageContent() {
  return (
    <Container className="py-16 sm:py-20">
      <ProjectsGrid />
    </Container>
  );
}
