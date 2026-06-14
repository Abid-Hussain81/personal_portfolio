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
                {resume.certifications.map((cert) => {
                  const content = (
                    <>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary mt-0.5">
                        {cert.issuer.toLowerCase().includes("meta") ? (
                          <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.847 4.148c-1.127 0-2.18.528-3.053 1.488L12 9.94l-3.794-4.304c-.873-.96-1.926-1.488-3.053-1.488C2.31 4.148 0 6.643 0 9.878c0 2.378 1.258 4.385 3.328 5.253a6.837 6.837 0 0 0 1.205.39c.307.07.625.109.95.109 1.127 0 2.18-.528 3.053-1.488L12 9.839l3.464 3.931a5.614 5.614 0 0 0 3.053 1.488c.325 0 .643-.039.95-.11.417-.09.82-.222 1.205-.39C22.742 14.263 24 12.256 24 9.878c0-3.235-2.31-5.73-5.153-5.73Zm.689 9.388c-.183.08-.376.143-.579.186a4.004 4.004 0 0 1-2.197-.847L13.7 9.839l2.766-3.136a4.238 4.238 0 0 1 2.381-1.111c1.554 0 2.81 1.346 2.81 3.018 0 1.326-.807 2.457-2.121 2.926Zm-15.072.186a3.265 3.265 0 0 1-.58-.186c-1.313-.47-2.12-1.6-2.12-2.926 0-1.672 1.256-3.018 2.81-3.018a4.238 4.238 0 0 1 2.38 1.11L9.7 9.84l-3.06 3.473a4.015 4.015 0 0 1-2.197.848Z" />
                          </svg>
                        ) : (
                          <span className="text-[10px] font-bold">{cert.year.slice(2)}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{cert.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                      </div>
                    </>
                  );

                  if (cert.url) {
                    return (
                      <li key={cert.id}>
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-3 hover:opacity-90 transition-opacity"
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={cert.id} className="flex items-start gap-3">
                      {content}
                    </li>
                  );
                })}
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
