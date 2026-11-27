import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Download, RotateCcw } from "lucide-react";
import { profile } from "@/data/profile";
import { PortraitFlip } from "@/components/animations/PortraitFlip";
import { Container } from "@/components/layout/Container";
import { HeroBadge } from "@/components/sections/hero-badge/HeroBadge";

const availability = "Open to freelance projects and remote roles";
const specialties = ["Web applications", "Booking platforms", "API integrations"];
const badgeProfile = {
  name: profile.name,
  role: profile.role,
  photoUrl: getImageProps({ src: "/Profile.jpg", alt: profile.name, width: 480, height: 566 }).props.src,
  resumeUrl: profile.resumeUrl,
  specialties,
  stack: ["React", "Next.js", "TypeScript", "REST APIs"],
};

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid" data-reveal-group>
          <div className="hero-copy" data-reveal="up" data-reveal-distance={12}>
            <p className="hero-eyebrow">Frontend-focused full-stack developer</p>
            <h1 id="hero-heading" className="text-display hero-heading">
              <span>Turning ideas into</span>{" "}
              <span className="hero-heading-accent">digital experiences.</span>
            </h1>
            <p className="hero-description">I engineer modern web applications, booking platforms and connected digital products for growing teams.</p>
            <div className="hero-actions">
              <Link className="action-primary" href="/contact">Let&apos;s work together <ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link className="action-text" href="#capabilities">Explore work</Link>
            </div>
            <p className="hero-availability"><span className="status-dot" aria-hidden="true" />{availability}</p>
            <div className="hero-footnote">
              <p className="hero-technology">React · Next.js · TypeScript</p>
              <a className="action-text" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><Download size={14} aria-hidden="true" />Download resume</a>
            </div>
          </div>
          <div className="hero-studio">
            <div className="hero-studio-set" aria-hidden="true">
              <div className="hero-studio-light" />
              <div className="hero-studio-floor" />
            </div>
            <HeroBadge profile={badgeProfile}>
              <div className="portrait-frame">
                <div className="portrait-orbit" aria-hidden="true" />
                <div className="portrait-glass-label" aria-hidden="true"><Code2 size={17} /><span>Thoughtfully built.<br /><strong>From idea to interface.</strong></span></div>
                <PortraitFlip
                  front={
                    <figure>
                      <div className="portrait-image"><Image src="/Profile.jpg" alt={profile.name} fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, (max-width: 359px) calc(100vw - 40px), 320px" className="object-cover object-center" priority /></div>
                      <figcaption className="portrait-caption">
                        <div><p className="portrait-name">{profile.name}</p><p className="portrait-role">{profile.role}</p></div>
                      </figcaption>
                    </figure>
                  }
                  back={
                    <>
                      <div>
                        <h2 className="portrait-back-heading">Availability</h2>
                        <p className="portrait-back-status"><span className="status-dot" aria-hidden="true" />{availability}</p>
                      </div>
                      <div className="portrait-back-focus">
                        <h2 className="portrait-back-heading">Core focus</h2>
                        <ul>{specialties.map(specialty => <li key={specialty}>{specialty}</li>)}</ul>
                      </div>
                      <p className="portrait-back-hint" aria-hidden="true"><RotateCcw size={15} />Flip back</p>
                    </>
                  }
                />
              </div>
            </HeroBadge>
          </div>
        </div>
      </Container>
    </section>
  );
}
