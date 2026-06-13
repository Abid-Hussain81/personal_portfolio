"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container>

        {/* Availability badge */}
        <FadeIn delay={0.05}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-semibold text-green-700">Available for new projects</span>
          </div>
        </FadeIn>

        {/* Main grid: text left, image right */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left */}
          <div className="max-w-xl">
            <FadeIn delay={0.1}>
              <h1 className="text-display text-foreground">
                Hello, I&apos;m
                <span className="block gradient-text">{profile.name}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="mt-3 text-base font-semibold text-primary sm:text-lg">
                {profile.role}
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <p className="text-lead mt-4 max-w-md">
                {profile.subheadline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{profile.location}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.36}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:gap-3 active:scale-[0.98]"
                >
                  View my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
                >
                  Get in touch
                </Link>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — profile image */}
          <FadeIn delay={0.22} direction="left">
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/10 transition-shadow hover:shadow-2xl hover:shadow-primary/15">
                  <Image
                    src="/persoanll.jpeg"
                    alt={`${profile.name} — Frontend Developer`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
                {/* Decorative offsets */}
                <div className="absolute -bottom-3 -right-3 -z-10 h-20 w-20 rounded-2xl border border-primary/20 bg-primary/5" />
                <div className="absolute -top-3 -left-3 -z-10 h-14 w-14 rounded-xl border border-accent/20 bg-accent/5" />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Experience & Certifications ── */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-border pt-14 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <p className="text-eyebrow mb-6 text-muted">Working Experience</p>
            <div className="space-y-5">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xs font-bold text-primary">
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

          <FadeIn delay={0.18}>
            <p className="text-eyebrow mb-6 text-muted">Certifications</p>
            <div className="space-y-5">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-xs font-bold text-accent">
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

        {/* ── I can help you with ── */}
        <FadeIn delay={0.1}>
          <div className="mt-14 rounded-2xl border border-border bg-card p-7 sm:p-8">
            <p className="text-eyebrow mb-6 text-muted">I can help you with</p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile.whatIDo.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

      </Container>
    </section>
  );
}
