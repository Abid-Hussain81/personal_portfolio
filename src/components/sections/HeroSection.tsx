import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-kicker text-eyebrow text-muted">Frontend-focused. Full-stack capable.</p>
            <h1 id="hero-heading" className="text-display hero-heading">
              <span>From a clear idea</span>{" "}
              <span className="hero-heading-accent">to a working product.</span>
            </h1>
            <p className="hero-description">{profile.subheadline}</p>
            <div className="hero-actions">
              <Link className="action-primary" href="/contact">Let&apos;s discuss your project</Link>
              <Link className="action-text" href="/resume">View experience</Link>
            </div>
            <p className="hero-availability"><span className="status-dot" aria-hidden="true" />Open to freelance projects and remote roles</p>
          </div>
          <div className="portrait-frame">
            <figure>
              <div className="portrait-image"><Image src="/Profile.jpg" alt="Abid Hussain" fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, (max-width: 359px) calc(100vw - 40px), 320px" className="object-cover object-center" priority /></div>
              <figcaption className="portrait-caption">
                <div><p className="portrait-name">{profile.name}</p><p className="portrait-role">{profile.role}</p></div>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="hero-footnote">
          <ul className="hero-specialties" aria-label="Specialties"><li>Web applications</li><li>Booking platforms</li><li>API integrations</li></ul>
          <a className="action-text" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><Download size={14} aria-hidden="true" />Download resume</a>
        </div>
      </Container>
    </section>
  );
}
