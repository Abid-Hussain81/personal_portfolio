"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { featuredProjects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof featuredProjects)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 ${
        featured ? "lg:flex-row lg:items-stretch" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-background ${
          featured ? "min-h-[280px] lg:w-1/2 lg:min-h-full" : "aspect-video"
        }`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:w-1/2 lg:p-8" : ""}`}>
        <div className="mb-3 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={project.liveUrl} size="sm" external>
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </Button>
          <Button href={project.githubUrl} variant="outline" size="sm" external>
            <GitHubIcon className="h-4 w-4" />
            Source Code
          </Button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsSection() {
  const [hero, ...rest] = featuredProjects;

  return (
    <section className="border-y border-border bg-card/30 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Projects"
            title="Featured Work"
            description="A selection of recent projects showcasing modern frontend development, design conversion, and user-focused interfaces."
          />
        </FadeIn>

        <FadeIn className="mt-14">
          {hero && <ProjectCard project={hero} featured />}
        </FadeIn>

        <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
