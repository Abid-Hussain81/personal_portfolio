"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/sections/FeaturedProjectsSection";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) =>
      project.categories.includes(
        activeCategory as (typeof project.categories)[number],
      ),
    );
  }, [activeCategory]);

  return (
    <>
      <FadeIn>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-border bg-card text-muted hover:border-primary/40 hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.05}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="mt-10 text-center text-muted">
          No projects found in this category.
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
