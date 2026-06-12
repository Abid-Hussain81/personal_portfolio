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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-primary/15 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
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
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="mb-2 inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Projects
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Selected Works
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
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

        <FadeIn className="mt-8 sm:hidden text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:border-primary"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
