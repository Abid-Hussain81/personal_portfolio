"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <Container className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 lg:flex-row lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <FadeIn delay={0.1}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm text-muted backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for freelance & remote work
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Frontend Developer Building{" "}
              <span className="gradient-text">Modern Web Experiences</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
              {profile.subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
              <MapPin className="h-4 w-4 text-primary" />
              {profile.location} · {profile.role}
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button href="/projects" size="lg">
                View Projects
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Me
              </Button>
              <Button
                href={profile.resumeUrl}
                variant="outline"
                size="lg"
                external
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} direction="left" className="relative mt-12 lg:mt-0">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />
            <div className="gradient-border relative overflow-hidden rounded-3xl p-1 glow">
              <div className="relative aspect-square w-72 overflow-hidden rounded-[calc(1.5rem-4px)] bg-card sm:w-80 lg:w-96">
                <Image
                  src="/profile-placeholder.svg"
                  alt={`${profile.name} profile photo`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -right-4 -top-4 h-16 w-16 rounded-2xl border border-primary/30 bg-card/90 p-3 backdrop-blur-sm"
            >
              <div className="h-full w-full rounded-lg bg-gradient-to-br from-primary to-accent" />
            </motion.div>
          </motion.div>
        </FadeIn>
      </Container>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
