import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function ContactCTASection() {
  return <section className="section-end"><Container><ScrollReveal direction="scale"><div className="contact-panel">
    <div><h2 className="max-w-lg text-h2">Let&apos;s work through<br />what comes next.</h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/65">Tell me what you are building, where you need support and what a useful next step would look like.</p></div>
    <div className="flex flex-col items-start gap-5"><Link className="action-primary" href="/contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></Link><a className="break-all text-xs text-white/70 underline decoration-white/25 underline-offset-4 hover:text-white" href={"mailto:" + profile.email}>{profile.email}</a></div>
  </div></ScrollReveal></Container></section>;
}
