"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { FadeIn } from "@/components/animations/FadeIn";

export function HeroSection() {
  return (
    <section className="pt-20 pb-10">
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8">

        {/* Availability badge */}
        <FadeIn delay={0.05}>
          <div className="mb-0 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-muted">Available for new projects</span>
          </div>
        </FadeIn>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* Left */}
          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Hello! I&apos;m
                <span className="block mt-1">{profile.name}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-muted max-w-md">
                {profile.subheadline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-75 hover:gap-3"
                >
                  View my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
                >
                  Get in touch
                </Link>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — square profile image */}
          <FadeIn delay={0.25} direction="left">
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow hover:shadow-xl">
                  <Image
                    src="/profile-placeholder.svg"
                    alt={profile.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-2xl border border-border bg-card -z-10" />
                <div className="absolute -top-2 -left-2 h-12 w-12 rounded-xl border border-border bg-secondary -z-10" />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Working Experience + Awards — clean flat list */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">

          {/* Working Experience */}
          <FadeIn delay={0.1}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
              Working experience
            </h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border border-border text-xs font-bold text-foreground">
                    {exp.company.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{exp.role}</p>
                    <p className="text-xs text-muted">{exp.company} · {exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Awards / Certifications */}
          <FadeIn delay={0.2}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
              Awards &amp; Recognition
            </h2>
            <div className="space-y-6">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border border-border text-xs font-bold text-foreground">
                    {cert.issuer.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{cert.name}</p>
                    <p className="text-xs text-muted">{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* I can help you with */}
        <FadeIn delay={0.1}>
          <div className="mt-16 pt-16 border-t border-border">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
              I can help you with
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile.whatIDo.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground" />
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
