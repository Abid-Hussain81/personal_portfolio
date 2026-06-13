import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { socialIconMap, MailIcon } from "@/components/icons/SocialIcons";
import { PageHeader, Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";

const iconMap = socialIconMap;

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} for freelance frontend development projects and collaborations.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Me"
        description="Have a project in mind? Let's discuss how I can help bring your vision to life."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
            <FadeIn>
              <section>
                <h2 className="text-h3 text-foreground">
                  Let&apos;s Connect
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  I&apos;m always open to discussing new projects, creative ideas,
                  or opportunities to be part of your vision. Fill out the form
                  or reach out directly through any of the channels below.
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  Contact Info
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center gap-3 text-sm text-muted">
                    <MailIcon className="h-4 w-4 text-primary" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="hover:text-primary"
                    >
                      {profile.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted">
                    <MapPin className="h-4 w-4 text-primary" />
                    {profile.location}
                  </li>
                </ul>
              </section>
            </FadeIn>

            <FadeIn>
              <section className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  Social Links
                </h3>
                <ul className="mt-4 space-y-3">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.name as keyof typeof iconMap];
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target={link.name === "Email" ? undefined : "_blank"}
                          rel={
                            link.name === "Email"
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                        >
                          <Icon className="h-4 w-4" />
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </FadeIn>

            <FadeIn>
              <p className="text-sm text-muted">
                Prefer email?{" "}
                <Link href={`mailto:${profile.email}`} className="text-primary hover:text-accent">
                  Send me a message directly
                </Link>
              </p>
            </FadeIn>
          </div>

          <FadeIn className="lg:col-span-3">
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </>
  );
}
