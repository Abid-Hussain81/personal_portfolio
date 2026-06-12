import Link from "next/link";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";

export function ResumePageContent() {
  return (
    <Container className="py-16 sm:py-20">
      <FadeIn>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
            <p className="mt-1 text-base text-muted">{profile.role}</p>
          </div>
          <Button href={profile.resumeUrl} external>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">

          <FadeIn>
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Professional Summary
              </h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-primary/25" />
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {resume.summary}
              </p>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Experience
              </h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-primary/25" />
              <div className="mt-6 space-y-8">
                {resume.experience.map((job) => (
                  <div
                    key={job.id}
                    className="relative border-l-2 border-primary/20 pl-6"
                  >
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {job.period}
                    </p>
                    <h4 className="mt-1 text-base font-semibold text-foreground">
                      {job.role}
                    </h4>
                    <p className="text-sm text-muted">
                      {job.company} · {job.location}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {job.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <FadeIn>
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Skills
              </h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-primary/25" />
              <ul className="mt-4 flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Education
              </h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-primary/25" />
              {resume.education.map((edu) => (
                <div key={edu.id} className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {edu.period}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-muted">{edu.institution}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {edu.description}
                  </p>
                </div>
              ))}
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Certifications
              </h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-primary/25" />
              <ul className="mt-4 space-y-4">
                {resume.certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {cert.year.slice(2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {cert.name}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Contact
              </h3>
              <div className="mt-1 h-0.5 w-12 rounded bg-primary/25" />
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {profile.email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-primary hover:text-accent transition-colors font-medium"
                  >
                    Send a message →
                  </Link>
                </li>
              </ul>
            </section>
          </FadeIn>
        </div>
      </div>
    </Container>
  );
}
