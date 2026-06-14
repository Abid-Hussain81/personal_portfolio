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
    <section className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container>
        {/* Availability badge */}
        <FadeIn delay={0.05}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-semibold text-green-700">Available for new projects</span>
          </div>
        </FadeIn>

        {/* Main grid: text left, image right */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div className="max-w-xl">
            <FadeIn delay={0.1}>
              <h1 className="text-display text-foreground">
                Hello, I&apos;m
                <span className="block gradient-text">{profile.name}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="mt-2 text-base font-semibold text-primary sm:text-lg">
                {profile.role}
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <p className="text-lead mt-3 max-w-md">
                {profile.subheadline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-2.5 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{profile.location}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.36}>
              <div className="mt-6 flex flex-wrap gap-3">
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
        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-2">
          {/* Experience Card */}
          <FadeIn delay={0.1}>
            <div className="group/card relative h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
              {/* Background gradient subtle glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
              
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Working Experience</p>
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              
              <div className="space-y-6">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="group/item flex gap-4 transition-all duration-300 hover:translate-x-1">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-sm font-bold text-primary shadow-sm transition-colors duration-300 group-hover/item:bg-primary group-hover/item:text-white">
                      {exp.company.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground transition-colors group-hover/item:text-primary leading-snug">{exp.role}</p>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">{exp.company}</p>
                      <p className="mt-0.5 text-[11px] text-muted">{exp.period} · {exp.location.split('·')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Certifications Card */}
          <FadeIn delay={0.18}>
            <div className="group/card relative h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-8">
              {/* Background gradient subtle glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
              
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-accent">Certifications</p>
                <div className="h-2 w-2 rounded-full bg-accent" />
              </div>
              
              <div className="space-y-6">
                {resume.certifications.map((cert) => {
                  const content = (
                    <>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/5 text-accent shadow-sm transition-all duration-300 group-hover/item:scale-105 group-hover/item:bg-accent group-hover/item:text-white">
                        {cert.issuer.toLowerCase().includes("meta") ? (
                          <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.847 4.148c-1.127 0-2.18.528-3.053 1.488L12 9.94l-3.794-4.304c-.873-.96-1.926-1.488-3.053-1.488C2.31 4.148 0 6.643 0 9.878c0 2.378 1.258 4.385 3.328 5.253a6.837 6.837 0 0 0 1.205.39c.307.07.625.109.95.109 1.127 0 2.18-.528 3.053-1.488L12 9.839l3.464 3.931a5.614 5.614 0 0 0 3.053 1.488c.325 0 .643-.039.95-.11.417-.09.82-.222 1.205-.39C22.742 14.263 24 12.256 24 9.878c0-3.235-2.31-5.73-5.153-5.73Zm.689 9.388c-.183.08-.376.143-.579.186a4.004 4.004 0 0 1-2.197-.847L13.7 9.839l2.766-3.136a4.238 4.238 0 0 1 2.381-1.111c1.554 0 2.81 1.346 2.81 3.018 0 1.326-.807 2.457-2.121 2.926Zm-15.072.186a3.265 3.265 0 0 1-.58-.186c-1.313-.47-2.12-1.6-2.12-2.926 0-1.672 1.256-3.018 2.81-3.018a4.238 4.238 0 0 1 2.38 1.11L9.7 9.84l-3.06 3.473a4.015 4.015 0 0 1-2.197.848Z" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{cert.issuer.charAt(0)}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-foreground transition-colors group-hover/item:text-accent leading-snug">{cert.name}</p>
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">{cert.issuer}</p>
                        <p className="mt-0.5 text-[11px] text-muted">{cert.year} · Verified Credential</p>
                      </div>
                    </>
                  );

                  if (cert.url) {
                    return (
                      <a
                        key={cert.id}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item flex gap-4 transition-all duration-300 hover:translate-x-1"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div key={cert.id} className="group/item flex gap-4 transition-all duration-300 hover:translate-x-1">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── I can help you with ── */}
        <FadeIn delay={0.1}>
          <div className="mt-12 rounded-2xl border border-border bg-gradient-to-r from-card to-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <p className="text-xs font-bold uppercase tracking-wider text-primary">I can help you with</p>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.whatIDo.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-border/40 bg-white/50 p-3 text-sm text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
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
