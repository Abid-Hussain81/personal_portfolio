import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Braces, Download, Mail, RotateCcw } from "lucide-react";
import { profile } from "@/data/profile";
import { PortraitFlip } from "@/components/animations/PortraitFlip";
import { Container } from "@/components/layout/Container";
import { HeroBadge } from "@/components/sections/hero-badge/HeroBadge";

const specialties = ["Web applications", "API integrations"];
const stack = [
  { name: "React", logo: "/hero/react.svg" },
  { name: "Next.js", logo: "/hero/nextjs.svg" },
  { name: "TypeScript", logo: "/hero/typescript.svg" },
  { name: "REST APIs" },
  { name: "Tailwind CSS", logo: "/hero/tailwind-css.svg" },
];
const badgeProfile = {
  name: profile.name,
  location: profile.location,
  // The fixed-size Next image URL uses the 2x candidate, sized for the badge texture.
  photoUrl: getImageProps({ src: "/Profile.jpg", alt: "", width: 192, height: 226 }).props.src,
  resumeUrl: profile.resumeUrl,
  specialties,
};

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-availability"><span className="status-dot" aria-hidden="true" />Available for opportunities</p>
            <p className="hero-eyebrow">Frontend-Focused Full-Stack Developer</p>
            <h1 id="hero-heading" className="text-display hero-heading">
              <span>Building Modern</span>{" "}
              <span className="hero-heading-accent">Digital Experiences.</span>
            </h1>
            <p className="hero-description">I build scalable web applications, intuitive user interfaces, booking platforms, and seamless API integrations — combining thoughtful design with reliable engineering.</p>
            <div className="hero-actions">
              <Link className="action-primary" href="/projects">Explore My Work</Link>
              <Link className="hero-action-secondary" href="/contact"><Mail size={17} aria-hidden="true" />Let&apos;s Connect</Link>
            </div>
            <div className="hero-footnote">
              <ul className="hero-stack" aria-label="Technology stack" role="list">
                {stack.map(({ name, logo }) => (
                  <li key={name}>
                    {logo ? (
                      <span
                        aria-hidden="true"
                        className="hero-stack-logo"
                        style={{ maskImage: `url(${logo})` }}
                      />
                    ) : <Braces size={16} aria-hidden="true" />}
                    {name}
                  </li>
                ))}
              </ul>
              <a className="action-text" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><Download size={14} aria-hidden="true" />Download resume</a>
            </div>
          </div>
          <div className="hero-studio">
            <div className="hero-studio-set" aria-hidden="true" />
            <HeroBadge profile={badgeProfile}>
              <div className="portrait-frame">
                <PortraitFlip
                  front={
                    <figure>
                      <div className="portrait-image"><Image src="/Profile.jpg" alt="" fill sizes="(min-width: 1024px) 260px, 208px" className="object-cover" loading="eager" fetchPriority="low" /></div>
                      <figcaption className="portrait-caption">
                        <p className="portrait-name">{profile.name}</p>
                      </figcaption>
                    </figure>
                  }
                  back={
                    <>
                      <div>
                        <h2 className="portrait-back-heading">{profile.name}</h2>
                        <p className="portrait-back-location">{profile.location}</p>
                      </div>
                      <div className="portrait-back-focus">
                        <p className="portrait-back-heading">Core focus</p>
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
