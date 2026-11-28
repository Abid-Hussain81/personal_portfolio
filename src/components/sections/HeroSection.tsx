import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { profile } from "@/data/profile";
import { PortraitFlip } from "@/components/animations/PortraitFlip";
import { Container } from "@/components/layout/Container";
import { HeroBadge } from "@/components/sections/hero-badge/HeroBadge";

const specialties = ["Web applications", "API integrations"];
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
            <p className="hero-availability">
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </p>
            <p className="hero-intro">Hi, I&apos;m {profile.name}.</p>
            <h1 id="hero-heading" className="text-display hero-heading">
              <span>Building modern</span>{" "}
              <span className="hero-heading-accent">digital experiences.</span>
            </h1>
            <p className="hero-description">Full-stack developer building web applications, booking platforms and API integrations.</p>
            <div className="hero-actions">
              <Link className="action-primary" href="/projects">
                Explore my work <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link className="action-text hero-action-secondary" href="/contact">
                Let&apos;s connect <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
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
