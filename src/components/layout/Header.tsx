"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/profile";
import { BrandMark } from "@/components/layout/BrandMark";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 16);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", escape); };
  }, [isOpen]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="container-base site-header-inner">
        <Link href="/" className="brand-symbol" aria-label="Abid Hussain — Home" onClick={() => setIsOpen(false)}><BrandMark /></Link>
        <nav className="hidden items-center gap-7 md:flex lg:gap-9" aria-label="Main navigation">
          {navLinks.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <span className="hidden text-eyebrow text-muted xl:inline-flex">Lahore, PK</span>
        <button ref={toggle} className="mobile-toggle inline-flex md:hidden" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-navigation" type="button" onClick={() => setIsOpen(value => !value)}>{isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}</button>
      </div>
      {isOpen && <nav id="mobile-navigation" className="container-base mobile-nav md:hidden" aria-label="Mobile navigation">
        {navLinks.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={active(link.href) ? "page" : undefined} onClick={() => setIsOpen(false)}>{link.label}</Link>)}
        <p className="mt-5 border-t border-border pt-5 text-xs text-muted">Based in Lahore. Open to international opportunities.</p>
      </nav>}
    </header>
  );
}
