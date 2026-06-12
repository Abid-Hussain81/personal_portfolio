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
                "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5",
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
        <div className="mt-16 text-center">
          <p className="text-base text-muted">No projects found in this category.</p>
        </div>
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
