import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export function ContactCTASection() {
  return (
    <section className="py-12">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl gradient-bg px-8 py-16 text-center sm:px-16">
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-10" />

            {/* Glow blobs */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 mb-5">
                Let&apos;s work together
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75">
                I&apos;m available for freelance projects and remote opportunities.
                Let&apos;s build something great together.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/95 hover:gap-3 hover:scale-[1.02]"
                >
                  Get In Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
