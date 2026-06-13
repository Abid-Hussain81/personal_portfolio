import Link from "next/link";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      {children}
    </section>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h3 className="text-eyebrow text-primary">{children}</h3>
      <div className="mt-2 h-px w-10 rounded bg-primary/30" />
    </>
  );
}

export function ResumePageContent() {
  return (
    <Container className="py-16 sm:py-20">
      <FadeIn>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-h2 text-foreground">{profile.name}</h2>
            <p className="text-lead mt-1">{profile.role}</p>
          </div>
          <Button href={profile.resumeUrl} external>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">

          <FadeIn>
            <SectionCard>
              <CardTitle>Professional Summary</CardTitle>
              <p className="text-body mt-4 leading-relaxed">{resume.summary}</p>
            </SectionCard>
          </FadeIn>

          <FadeIn>
            <SectionCard>
              <CardTitle>Experience</CardTitle>
              <div className="mt-6 space-y-8">
                {resume.experience.map((job) => (
                  <div key={job.id} className="relative border-l-2 border-primary/20 pl-6">
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                    <p className="text-eyebrow text-primary">{job.period}</p>
                    <h4 className="mt-1.5 text-base font-semibold text-foreground">{job.role}</h4>
                    <p className="mt-0.5 text-sm text-muted">{job.company} · {job.location}</p>
                    <ul className="mt-3 space-y-2">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SectionCard>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          <FadeIn>
            <SectionCard>
              <CardTitle>Skills</CardTitle>
              <ul className="mt-4 flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <li key={skill} className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                    {skill}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </FadeIn>

          <FadeIn>
            <SectionCard>
              <CardTitle>Education</CardTitle>
              {resume.education.map((edu) => (
                <div key={edu.id} className="mt-4">
                  <p className="text-eyebrow text-primary">{edu.period}</p>
                  <h4 className="mt-1.5 text-sm font-semibold text-foreground leading-snug">{edu.degree}</h4>
                  <p className="mt-0.5 text-xs text-muted">{edu.institution}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </SectionCard>
          </FadeIn>

          <FadeIn>
            <SectionCard>
              <CardTitle>Certifications</CardTitle>
              <ul className="mt-4 space-y-4">
                {resume.certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary mt-0.5">
                      {cert.year.slice(2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug">{cert.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </FadeIn>

          <FadeIn>
            <SectionCard>
              <CardTitle>Contact</CardTitle>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {profile.email}
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="font-medium text-primary hover:text-accent transition-colors">
                    Send a message →
                  </Link>
                </li>
              </ul>
            </SectionCard>
          </FadeIn>
        </div>
      </div>
    </Container>
  );
}
