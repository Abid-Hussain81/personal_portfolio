import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { profile, stats } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import {
  InteriorHero,
  InteriorPage,
  InteriorPanel,
  InteriorReveal,
} from "@/components/layout/InteriorPage";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: `Learn about ${profile.name}, a ${profile.role} from ${profile.location} building web applications, booking workflows and API integrations.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="01 / About"
        title="Thoughtful work."
        accent="A human approach."
        description={`${profile.role}, helping founders and teams build web applications and connected workflows.`}
      />

      <Container className="interior-content">
        <div className="interior-grid">
          <div className="interior-stack">
            <InteriorReveal>
              <InteriorPanel>
                <p className="interior-section-label">A little introduction</p>
                <h2>Interfaces with purpose.</h2>
                <p className="interior-body">{profile.about}</p>
              </InteriorPanel>
            </InteriorReveal>

            <InteriorReveal>
              <InteriorPanel tone="peach">
                <p className="interior-section-label">My story</p>
                <h2>Learning through real work.</h2>
                <p className="interior-body">{profile.careerStory}</p>
              </InteriorPanel>
            </InteriorReveal>

            <InteriorReveal>
              <InteriorPanel tone="lilac">
                <p className="interior-section-label">What I do</p>
                <h2>From design to a working product.</h2>
                <ul className="about-capabilities">
                  {profile.whatIDo.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InteriorPanel>
            </InteriorReveal>

            <InteriorReveal>
              <InteriorPanel>
                <p className="interior-section-label">Learning journey</p>
                <h2>Curiosity, put into practice.</h2>
                <p className="interior-body">{profile.learningJourney}</p>
              </InteriorPanel>
            </InteriorReveal>

            <InteriorReveal>
              <InteriorPanel>
                <p className="interior-section-label">Along the way</p>
                <h2>Education &amp; experience.</h2>
                <div className="about-timeline">
                  {profile.timeline.map((item) => (
                    <div key={item.title} className="about-timeline-item">
                      <p className="text-sm font-medium text-primary">{item.year}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </InteriorPanel>
            </InteriorReveal>
          </div>

          <aside className="interior-stack" aria-label="Profile and approach">
            <InteriorReveal delay={0.08}>
              <InteriorPanel tone="teal">
                <div className="about-profile-image">
                  <Image
                    src="/Profile.jpg"
                    alt={profile.name}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 580px, 90vw"
                    priority
                  />
                </div>
                <h2 className="about-profile-name">{profile.name}</h2>
                <p className="about-profile-role">{profile.role}</p>
                <p className="about-profile-role flex items-center gap-2">
                  <MapPin size={16} aria-hidden="true" />
                  {profile.location}
                </p>
              </InteriorPanel>
            </InteriorReveal>

            <InteriorReveal>
              <div className="about-stats" aria-label="Professional facts">
                {stats.map((stat) => (
                  <div key={stat.label} className="about-stat">
                    <strong>{stat.value}</strong>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </InteriorReveal>

            <InteriorReveal>
              <InteriorPanel tone="sage">
                <p className="interior-section-label">Personal mission</p>
                <h2>Make the complex feel clear.</h2>
                <p className="interior-body">{profile.mission}</p>
              </InteriorPanel>
            </InteriorReveal>

            <InteriorReveal>
              <InteriorPanel tone="lilac">
                <p className="interior-section-label">Technologies</p>
                <h2>Tools for the task.</h2>
                <ul className="interior-chips">
                  {profile.focus.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
              </InteriorPanel>
            </InteriorReveal>
          </aside>
        </div>

        <InteriorReveal>
          <InteriorPanel tone="teal" className="interior-cta">
            <div>
              <h2>Have something in mind?</h2>
              <p>Let’s talk about your application, interface or next integration.</p>
            </div>
            <Button href="/contact" className="action-primary">
              Start a conversation <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </InteriorPanel>
        </InteriorReveal>
      </Container>
    </InteriorPage>
  );
}
