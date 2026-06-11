import Link from "next/link";
import { MapPin } from "lucide-react";
import { navLinks, profile, socialLinks } from "@/data/profile";
import { socialIconMap } from "@/components/icons/SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                AH
              </span>
              {profile.name}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {profile.role} based in {profile.location}. Building modern,
              responsive web experiences that help businesses grow online.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {profile.location}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
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
                      aria-label={link.label}
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
