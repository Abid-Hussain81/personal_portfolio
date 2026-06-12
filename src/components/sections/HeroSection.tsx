"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { FadeIn } from "@/components/animations/FadeIn";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-accent/6 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8">

        {/* Availability badge */}
        <FadeIn delay={0.05}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-700">Available for new projects</span>
          </div>
        </FadeIn>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* Left — text */}
          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Hello, I&apos;m
                <span className="block mt-1 gradient-text">{profile.name}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-2 text-base font-medium text-primary sm:text-lg">
                {profile.role}
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mt-4 text-base leading-relaxed text-muted max-w-md">
                {profile.subheadline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{profile.location}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:gap-3 hover:scale-[1.02]"
                >
                  View my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
                >
                  Get in touch
                </Link>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — profile image */}
          <FadeIn delay={0.25} direction="left">
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/10 transition-shadow hover:shadow-2xl hover:shadow-primary/15">
                  <Image
                    src="/profile-placeholder.svg"
                    alt={`${profile.name} — Frontend Developer`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
                {/* Decorative corners */}
                <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-2xl border border-primary/20 bg-primary/5 -z-10" />
                <div className="absolute -top-3 -left-3 h-14 w-14 rounded-xl border border-accent/20 bg-accent/5 -z-10" />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Experience & Certifications */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-border pt-16 md:grid-cols-2">

          <FadeIn delay={0.1}>
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">
              Working Experience
            </h2>
            <div className="space-y-5">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary border border-primary/20">
                    {exp.company.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{exp.role}</p>
                    <p className="text-xs text-muted">{exp.company} · {exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">
              Certifications
            </h2>
            <div className="space-y-5">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xs font-bold text-accent border border-accent/20">
                    {cert.issuer.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted">{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* I can help you with */}
        <FadeIn delay={0.1}>
          <div className="mt-16 rounded-2xl border border-border bg-card p-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">
              I can help you with
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile.whatIDo.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
