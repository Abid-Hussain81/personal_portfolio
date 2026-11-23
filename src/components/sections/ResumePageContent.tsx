import Link from "next/link";
import { ArrowUpRight, Award, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { Container } from "@/components/layout/Container";
import { InteriorPanel, InteriorReveal } from "@/components/layout/InteriorPage";
import { Button } from "@/components/ui/Button";

export function ResumePageContent() {
  return <Container className="interior-content">
    <InteriorReveal><div className="resume-identity">
      <div><h2 className="text-h2">{profile.name}</h2><p className="text-lead mt-2">{profile.role}</p></div>
      <Button href={profile.resumeUrl} external className="interior-button"><Download size={17} aria-hidden="true" />Download PDF</Button>
    </div></InteriorReveal>
    <div className="interior-grid mt-8">
      <div className="interior-stack">
        <InteriorReveal><InteriorPanel tone="sage"><h2>Professional summary</h2><p className="interior-body">{resume.summary}</p></InteriorPanel></InteriorReveal>
        <InteriorPanel>
          <h2>Professional experience</h2>
          <div className="interior-stack mt-8">
            {resume.experience.map(job => <InteriorReveal key={job.id}><article className="resume-job">
              <p className="text-eyebrow text-primary">{job.period}</p>
              <h3 className="mt-2 text-xl font-medium">{job.role}</h3>
              <p className="mt-1 text-sm text-muted">{job.company} · {job.location}</p>
              <ul className="mt-4 space-y-3">
                {job.highlights.map(highlight => <li key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />{highlight}</li>)}
              </ul>
            </article></InteriorReveal>)}
          </div>
        </InteriorPanel>
      </div>
      <div className="interior-stack">
        <InteriorReveal><InteriorPanel tone="lilac"><h2 className="resume-section-title">Skills & capabilities</h2><ul className="interior-chips resume-skills">{resume.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></InteriorPanel></InteriorReveal>
        <InteriorReveal><InteriorPanel><h2 className="resume-section-title">Education</h2><div className="mt-5 space-y-6">
          {resume.education.map(education => <div key={education.id}><p className="text-eyebrow text-primary">{education.period}</p><h3 className="mt-2 text-base font-medium">{education.degree}</h3><p className="mt-1 text-sm text-muted">{education.institution}</p><p className="mt-2 text-sm text-muted-foreground">{education.description}</p></div>)}
        </div></InteriorPanel></InteriorReveal>
        <InteriorReveal><InteriorPanel tone="peach"><h2 className="resume-section-title">Certifications</h2><ul className="mt-5 space-y-5">
          {resume.certifications.map(certificate => {
            const content = <><span className="interior-icon"><Award size={19} aria-hidden="true" /></span><span className="min-w-0"><span className="block text-base font-medium leading-snug">{certificate.name}</span><span className="mt-1 block text-sm text-muted">{certificate.issuer} · {certificate.year}</span></span>{certificate.url && <ArrowUpRight className="mt-1 shrink-0" size={15} aria-hidden="true" />}</>;
            return <li key={certificate.id}>{certificate.url ? <a className="flex items-start gap-3" href={certificate.url} target="_blank" rel="noopener noreferrer">{content}</a> : <div className="flex items-start gap-3">{content}</div>}</li>;
          })}
        </ul></InteriorPanel></InteriorReveal>
        <InteriorReveal><InteriorPanel><h2 className="resume-section-title">A project or role in mind?</h2><p className="interior-body">Let&apos;s discuss where I can support your team.</p><a className="action-text mt-3 break-all" href={"mailto:" + profile.email}>{profile.email}</a><br /><Link className="action-text mt-3" href="/contact">Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></Link></InteriorPanel></InteriorReveal>
      </div>
    </div>
  </Container>;
}
