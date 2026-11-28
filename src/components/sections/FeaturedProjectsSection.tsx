"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { featuredProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/layout/Container";
import { ExperienceWorkspace } from "@/components/sections/ExperienceWorkspace";

export function ProjectCard({
  project,
}: {
  project: (typeof featuredProjects)[number];
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3 text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
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
  if (featuredProjects.length === 0) return <ExperienceWorkspace />;
  return (
    <section className="section-pad">
      <Container>
        <ScrollReveal direction="left">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-h2 mt-3 text-foreground">Selected Works</h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <ScrollReveal direction="up" delay={index * 0.14} key={project.id}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:border-primary"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
