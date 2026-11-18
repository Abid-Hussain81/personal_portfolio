import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-base">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
          <div><p className="text-sm font-semibold">{profile.name}</p><p className="mt-1 text-xs text-muted">{profile.role}</p></div>
          <nav className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground" aria-label="Footer navigation">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted"><p>&copy; {new Date().getFullYear()} Abid Hussain</p><p>Lahore, Pakistan · Open to working across time zones</p></div>
      </div>
    </footer>
  );
}
