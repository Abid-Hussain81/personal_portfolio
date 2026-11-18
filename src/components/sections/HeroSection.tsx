import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="hero-section">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-kicker text-eyebrow text-muted">Development, with a clear direction</p>
            <h1 className="text-display hero-heading">{profile.tagline}</h1>
            <p className="hero-description">{profile.subheadline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
              <Link className="action-primary" href="/contact">Let&apos;s discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link className="action-text" href="/resume">View experience <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className="mt-7 inline-flex items-center gap-2.5 text-xs text-muted"><span className="status-dot" />Open to freelance projects and remote roles</div>
          </div>
          <div className="portrait-frame">
            <figure>
              <div className="portrait-image"><Image src="/persoanll.jpeg" alt="Abid Hussain" fill sizes="(max-width: 1024px) 85vw, 400px" className="object-cover object-top" priority /></div>
              <figcaption className="portrait-caption">
                <div><p className="text-sm font-semibold text-foreground">Abid Hussain</p><p className="mt-1 max-w-48 text-xs leading-relaxed text-muted">{profile.role}</p></div>
                <span className="text-eyebrow text-primary">Based in<br />Lahore, PK</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="hero-footnote">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted"><ArrowDown size={14} aria-hidden="true" />Web applications <span aria-hidden="true">/</span> Booking platforms <span aria-hidden="true">/</span> API integrations</p>
          <a className="action-text" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><Download size={14} aria-hidden="true" />Download resume</a>
        </div>
      </Container>
    </section>
  );
}
