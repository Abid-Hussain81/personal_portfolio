"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { featuredProjects } from "@/data/projects";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function ProjectCard({
  project,
}: {
  project: (typeof featuredProjects)[number];
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/5">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            Code
          </a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Selected works
            </h2>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-10 sm:hidden text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded-full px-6 py-2.5 hover:bg-card transition-colors"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
