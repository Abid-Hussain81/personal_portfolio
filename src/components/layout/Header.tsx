"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {/* Inner — matches container max-width and padding exactly */}
      <div className="container-base flex h-16 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group shrink-0"
          aria-label={`${profile.name} — Home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-xs font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            AH
          </span>
          <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {profile.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Button href="/contact" size="sm" className="hidden md:inline-flex">
            Hire Me
          </Button>
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((p) => !p)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-foreground hover:bg-secondary transition-colors lg:hidden"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — same container alignment */}
      {isOpen && (
        <div className="border-b border-border bg-white shadow-md lg:hidden">
          <nav
            className="container-base flex flex-col gap-1 py-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-border pt-4">
              <Button href="/contact" className="w-full">Hire Me</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
