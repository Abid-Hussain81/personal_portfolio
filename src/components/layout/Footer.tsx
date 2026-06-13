import Link from "next/link";
import { profile, socialLinks } from "@/data/profile";
import { socialIconMap } from "@/components/icons/SocialIcons";

const footerColumns = [
  {
    title: "Pages",
    links: [
      { label: "Home",     href: "/" },
      { label: "About",    href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Resume",   href: "/resume" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "UI/UX Design",    href: "/services" },
      { label: "Figma to Code",   href: "/services" },
      { label: "Optimization",    href: "/services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact",  href: "/contact" },
      { label: "GitHub",   href: profile.github },
      { label: "LinkedIn", href: profile.linkedin },
      { label: "Email",    href: `mailto:${profile.email}` },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-base pt-14 pb-8">

        {/* Top */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* Brand */}
          <div className="max-w-64">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
                AH
              </span>
              <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {profile.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {profile.subheadline}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.name === "Email" ? undefined : "_blank"}
                    rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-muted transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-eyebrow mb-4 text-foreground">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
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
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-border" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <Link
                key={label}
                href="/"
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
