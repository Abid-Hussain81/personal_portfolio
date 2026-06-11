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
            <h2 className="text-2xl font-bold text-foreground">
              {profile.name}
            </h2>
            <p className="text-muted">{profile.role}</p>
          </div>
          <Button href={profile.resumeUrl} external>
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <FadeIn>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Professional Summary
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{resume.summary}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Experience
              </h3>
              <div className="mt-6 space-y-8">
                {resume.experience.map((job) => (
                  <div
                    key={job.id}
                    className="relative border-l-2 border-primary/30 pl-6"
                  >
                    <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                    <p className="text-sm font-medium text-primary">{job.period}</p>
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
                          className="text-sm leading-relaxed text-muted before:mr-2 before:content-['•']"
                        >
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

        <div className="space-y-8">
          <FadeIn>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">Skills</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">Education</h3>
              {resume.education.map((edu) => (
                <div key={edu.id} className="mt-4">
                  <p className="text-sm font-medium text-primary">{edu.period}</p>
                  <h4 className="mt-1 font-semibold text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-muted">{edu.institution}</p>
                  <p className="mt-2 text-sm text-muted">{edu.description}</p>
                </div>
              ))}
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Certifications
              </h3>
              <ul className="mt-4 space-y-4">
                {resume.certifications.map((cert) => (
                  <li key={cert.id}>
                    <p className="font-medium text-foreground">{cert.name}</p>
                    <p className="text-sm text-muted">
                      {cert.issuer} · {cert.year}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-muted hover:text-primary"
                  >
                    {profile.email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-primary hover:text-accent"
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
