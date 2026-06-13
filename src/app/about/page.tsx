import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageHeader, Container } from "@/components/layout/Container";
import { StatsGrid } from "@/components/sections/StatsSection";
import { FadeIn } from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: `Learn about ${profile.name}, a ${profile.role} from ${profile.location} specializing in modern frontend development.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Me"
        description="Frontend developer passionate about crafting responsive, modern, and user-friendly web experiences."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <FadeIn>
              <section>
                <h2 className="text-h2 text-foreground">
                  Professional Introduction
                </h2>
                <p className="mt-4 text-body leading-relaxed">{profile.about}</p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="text-h2 text-foreground">My Story</h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {profile.careerStory}
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="text-h2 text-foreground">What I Do</h2>
                <ul className="mt-4 space-y-3">
                  {profile.whatIDo.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="text-h2 text-foreground">
                  Learning Journey
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {profile.learningJourney}
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="text-h2 text-foreground">Timeline</h2>
                <div className="mt-8 space-y-8">
                  {profile.timeline.map((item) => (
                    <div
                      key={item.title}
                      className="relative border-l-2 border-primary/30 pl-6"
                    >
                      <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm font-semibold text-primary">
                        {item.year}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          </div>

          <div className="space-y-8">
            <StatsGrid />

            <FadeIn>
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Personal Mission
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {profile.mission}
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Technologies
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.focus.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </Container>
    </>
  );
}
