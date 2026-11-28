"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { ExperienceLaptop, type LaptopMotion } from "./ExperienceLaptop";
import { experienceDisplays, type ExperienceScene } from "./ExperienceDisplayConfig";

const scenes = [
  {
    id: "mind-gauge",
    period: "June 2025 – Present",
    label: "Production frontend",
    stack: ["React.js", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    id: "gaply",
    period: "September 2025 – January 2026",
    label: "Responsive client applications",
    stack: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "independent",
    period: "Before June 2025",
    label: "Freelance web delivery",
    stack: ["HTML", "CSS", "JavaScript"],
  },
] as const;

const experiences = scenes.flatMap(scene => {
  const job = resume.experience.find(item => item.id === scene.id);
  return job ? [{ ...job, ...scene }] : [];
});

function WorkspaceVisual({ active }: { active: ExperienceScene }) {
  const root = useRef<HTMLDivElement>(null);
  const invalidate = useRef<(() => void) | undefined>(undefined);
  const tilt = useRef<LaptopMotion>({
    x: 0,
    y: 0,
    setInvalidate: callback => { invalidate.current = callback; },
  });
  const scene = scenes.find(item => item.id === active);
  const display = experienceDisplays[active];

  useEffect(() => {
    const stage = root.current;
    if (!stage) return;
    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let pointer: PointerEvent | undefined;
    let frame = 0;

    function clear() {
      pointer = undefined;
      cancelAnimationFrame(frame);
      frame = 0;
      tilt.current.x = 0;
      tilt.current.y = 0;
      invalidate.current?.();
    }

    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType !== "mouse") return;
      pointer = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!pointer || !stage) return;
        const rect = stage.getBoundingClientRect();
        const x = Math.max(-.5, Math.min(.5, (pointer.clientX - rect.left) / rect.width - .5));
        const y = Math.max(-.5, Math.min(.5, (pointer.clientY - rect.top) / rect.height - .5));
        Object.assign(tilt.current, { x, y });
        invalidate.current?.();
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      stage.dataset.entered = "true";
      observer.disconnect();
    }, { threshold: .2 });
    observer.observe(stage);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", clear);
    motion.addEventListener("change", clear);
    window.addEventListener("blur", clear);
    return () => {
      observer.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", clear);
      motion.removeEventListener("change", clear);
      window.removeEventListener("blur", clear);
      clear();
    };
  }, []);

  return (
    <figure className="workspace-figure">
      <div
        className="workspace-stage"
        ref={root}
        data-workspace={active}
        style={{ "--workspace-tint": display.tint, "--workspace-edge": display.edge } as CSSProperties}
        aria-hidden="true"
      >
        <ExperienceLaptop active={active} motion={tilt} />
      </div>
      <figcaption><span>Illustrative workspace</span><span>{scene?.label}</span></figcaption>
    </figure>
  );
}

export function ExperienceWorkspace() {
  const [active, setActive] = useState<ExperienceScene>("mind-gauge");
  const controls = useRef<HTMLDivElement>(null);
  const id = useId();
  const index = experiences.findIndex(job => job.id === active);

  function handleSelectorKey(event: KeyboardEvent<HTMLDivElement>) {
    const previous = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const next = event.key === "ArrowRight" || event.key === "ArrowDown";
    if (!previous && !next && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const last = experiences.length - 1;
    const target = event.key === "Home" ? 0 : event.key === "End" ? last : (index + (previous ? last : 1)) % experiences.length;
    setActive(experiences[target].id);
    controls.current?.querySelectorAll("button")[target]?.focus();
  }

  return (
    <section className="section-pad section-divider experience-workspace" id="experience" aria-labelledby={id + "-heading"}>
      <Container>
        <ScrollReveal distance={18} once>
          <header className="workspace-intro">
            <div>
              <p className="text-eyebrow">Professional experience</p>
              <h2 className="text-h2" id={id + "-heading"}>Practical experience. <em>Thoughtful execution.</em></h2>
            </div>
            <p className="text-lead">My work spans production interfaces, booking workflows and API integration. Explore the workspace behind each role.</p>
          </header>
        </ScrollReveal>
        <div className="workspace-layout">
          <ScrollReveal className="workspace-navigation" distance={12} delay={.14} once>
            <div className="workspace-selectors" ref={controls} role="group" aria-label="Experience workspaces" onKeyDown={handleSelectorKey}
              style={{ "--workspace-index": index } as CSSProperties}>
              {experiences.map((job, position) => (
                <button key={job.id} type="button" aria-pressed={job.id === active} aria-controls={id + "-details"} onClick={() => setActive(job.id)}>
                  <span aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>{job.company}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="workspace-visual" direction="scale" distance={18} once>
            <WorkspaceVisual active={active} />
          </ScrollReveal>
          <div className="workspace-details" id={id + "-details"} aria-live="polite">
            {experiences.map(job => (
              <article className="workspace-detail" key={job.id} data-active={job.id === active} aria-hidden={job.id !== active} inert={job.id !== active}>
                <p className="workspace-period">
                  {job.id === "mind-gauge" && <span className="workspace-current"><i />Current role</span>}
                  {job.period}
                </p>
                <h3>{job.company}</h3>
                <p className="workspace-role">{job.role}</p>
                <p className="workspace-location">{job.id === "gaply" ? "Remote, part-time alongside The Mind Gauge" : job.location}</p>
                <p className="workspace-description">{job.highlights[0]}</p>
                <dl className="workspace-stack">
                  <dt>{job.id === "independent" ? "Illustrative stack" : "Technologies"}</dt>
                  <dd>{job.stack.join(" · ")}</dd>
                </dl>
              </article>
            ))}
          </div>
        </div>
        <ScrollReveal distance={12} delay={.12} once>
          <footer className="workspace-footer">
            <p>Some professional work remains private. Project details are shared only with permission.</p>
            <div>
              <Link className="action-text" href="/resume">Read my background <ArrowUpRight size={14} aria-hidden="true" /></Link>
              <a href={profile.github} className="action-text" target="_blank" rel="noopener noreferrer">Public GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </footer>
        </ScrollReveal>
      </Container>
    </section>
  );
}

