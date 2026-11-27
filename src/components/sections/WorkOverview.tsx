import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function WorkOverview() {
  return <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
    <ScrollReveal direction="left"><div>
      <h2 className="text-h2 max-w-sm">Practical experience.<br />Thoughtful execution.</h2>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">My experience spans production interfaces, booking workflows and API integration. Some professional work remains private. Project details are shared only with permission.</p>
      <div className="mt-7 flex flex-wrap gap-6"><Link className="action-text" href="/resume">Read my background <ArrowUpRight size={14} aria-hidden="true" /></Link><a href={profile.github} className="action-text" target="_blank" rel="noopener noreferrer">Public GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></div>
    </div></ScrollReveal>
    <div>
      {resume.experience.map((job, index) => <ScrollReveal direction="right" delay={index * 0.12} key={job.id}><article className="experience-row">
        <div className="flex flex-wrap justify-between gap-x-5 gap-y-2"><h3 className="text-lg font-medium">{job.company}</h3><p className="text-eyebrow text-muted">{job.period}</p></div>
        <p className="mt-2 text-sm text-primary">{job.role}{job.id === "gaply" && " · Remote part-time alongside The Mind Gauge"}</p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{job.highlights[0]}</p>
      </article></ScrollReveal>)}
    </div>
  </div>;
}
