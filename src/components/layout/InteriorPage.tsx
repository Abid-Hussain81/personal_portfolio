import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { HomeEffects } from "@/components/animations/HomeEffects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import "@/app/interior-pages.css";

export function InteriorPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <HomeEffects className={"interior-page " + className}>{children}</HomeEffects>;
}

export function InteriorReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <ScrollReveal className={className} distance={24} duration={.65} delay={delay} once>{children}</ScrollReveal>;
}

export function InteriorHero({ title, accent, description, children }: {
  title: string; accent?: string; description: string; children?: ReactNode;
}) {
  return <section className="interior-hero"><Container><InteriorReveal>
    <h1>{title}{accent && <> <em>{accent}</em></>}</h1>
    <p className="interior-description">{description}</p>
    {children}
  </InteriorReveal></Container></section>;
}

export function InteriorPanel({ children, className = "", tone }: { children: ReactNode; className?: string; tone?: "teal" | "lilac" | "peach" | "sage" }) {
  return <section className={"interior-panel " + (tone ? "tone-" + tone + " " : "") + className}>{children}</section>;
}
