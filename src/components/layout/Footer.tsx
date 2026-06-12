import Link from "next/link";
import { profile, socialLinks } from "@/data/profile";
import { socialIconMap } from "@/components/icons/SocialIcons";

const footerColumns = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "UI/UX Design", href: "/services" },
      { label: "Figma to Code", href: "/services" },
      { label: "Optimization", href: "/services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: profile.github },
      { label: "LinkedIn", href: profile.linkedin },
      { label: "Email", href: `mailto:${profile.email}` },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-8 lg:px-8">

        {/* Top section */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-sm font-bold text-white shadow-md shadow-primary/30 transition-transform group-hover:scale-110">
                AH
              </span>
              <span className="text-base font-bold text-foreground">{profile.name}</span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.subheadline}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.name === "Email" ? undefined : "_blank"}
                    rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
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
        <div className="mt-12 h-px w-full bg-border" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted underline underline-offset-4 hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-sm text-muted underline underline-offset-4 hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-sm text-muted underline underline-offset-4 hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
