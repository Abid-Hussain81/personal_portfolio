import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export function ContactCTASection() {
  return (
    <section className="py-10">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl bg-foreground px-8 py-16 text-center sm:px-16">
            {/* subtle grid */}
            <div className="absolute inset-0 grid-pattern opacity-[0.06]" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
                Let&apos;s work together
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-background sm:text-3xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-background/60">
                I&apos;m available for freelance projects and remote opportunities.
                Let&apos;s build something great together.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:opacity-80 hover:gap-3"
                >
                  Get In Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-2.5 text-sm font-medium text-background/70 transition-all hover:border-background/40 hover:text-background"
                >
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
