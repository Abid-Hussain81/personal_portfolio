"use client";

import { useInView } from "framer-motion";
import { ArrowRight, Box, Braces, Code2, Database, Gauge, Image, Layers3, Network, PanelsTopLeft, Pause, Play, ShieldCheck, Terminal, Webhook, Workflow, Wrench, type LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import bootstrap from "@fortawesome/fontawesome-free/svgs/brands/bootstrap.svg";
import css from "@fortawesome/fontawesome-free/svgs/brands/css3-alt.svg";
import docker from "@fortawesome/fontawesome-free/svgs/brands/docker.svg";
import elementor from "@fortawesome/fontawesome-free/svgs/brands/elementor.svg";
import figma from "@fortawesome/fontawesome-free/svgs/brands/figma.svg";
import git from "@fortawesome/fontawesome-free/svgs/brands/git-alt.svg";
import github from "@fortawesome/fontawesome-free/svgs/brands/github.svg";
import html from "@fortawesome/fontawesome-free/svgs/brands/html5.svg";
import javascript from "@fortawesome/fontawesome-free/svgs/brands/js.svg";
import node from "@fortawesome/fontawesome-free/svgs/brands/node-js.svg";
import php from "@fortawesome/fontawesome-free/svgs/brands/php.svg";
import wordpress from "@fortawesome/fontawesome-free/svgs/brands/wordpress-simple.svg";
import { skillCategories } from "@/data/skills";

const categories = [
  {
    id: "frontend",
    groups: ["frontend"],
    title: "Frontend",
    descriptor: "Interfaces & interactions",
    layer: "Interface",
    icon: Layers3,
    description: "Build responsive screens from reusable components and keep interface state in sync with live data.",
    steps: ["Components", "App state", "Responsive screens"],
  },
  {
    id: "backend",
    groups: ["backend"],
    title: "Backend & APIs",
    descriptor: "Logic & connected services",
    layer: "Services",
    icon: Braces,
    description: "Connect application logic to booking providers and other services through consistent API responses.",
    steps: ["Request", "Business logic", "API response"],
  },
  {
    id: "data-auth",
    groups: ["data-auth"],
    title: "Data & automation",
    descriptor: "Storage, identity & events",
    layer: "Data",
    icon: Database,
    description: "Store application records, manage access and trigger workflows when data changes.",
    steps: ["Authenticate", "Store records", "Trigger events"],
  },
  {
    id: "tools",
    groups: ["tools", "wordpress"],
    title: "Workflow & performance",
    descriptor: "Delivery & optimization",
    layer: "Delivery",
    icon: Workflow,
    description: "Move from design to release, measure how pages perform and maintain the sites people use.",
    steps: ["Design review", "Release", "Measure & maintain"],
  },
] as const;

const toolkit = categories.map(category => ({
  ...category,
  skills: skillCategories
    .filter(group => category.groups.some(id => id === group.id))
    .flatMap(group => group.skills),
}));

type ToolkitCategory = (typeof toolkit)[number];

const logos: Partial<Record<string, StaticImageData | string>> = {
  "React.js": "/hero/react.svg",
  "Next.js": "/hero/nextjs.svg",
  TypeScript: "/hero/typescript.svg",
  "Tailwind CSS": "/hero/tailwind-css.svg",
  JavaScript: javascript,
  HTML5: html,
  CSS3: css,
  Bootstrap: bootstrap,
  PHP: php,
  "Node.js": node,
  Git: git,
  GitHub: github,
  Figma: figma,
  Docker: docker,
  WordPress: wordpress,
  Elementor: elementor,
};

const toolIcons: Partial<Record<string, LucideIcon>> = {
  "shadcn/ui": PanelsTopLeft,
  "TanStack Query": Network,
  "REST APIs": Braces,
  "MySQL": Database,
  "PostgreSQL": Database,
  "Prisma ORM": Database,
  "Clerk": ShieldCheck,
  "JWT Authentication": ShieldCheck,
  "Webhooks": Webhook,
  "n8n": Workflow,
  "Postman": Network,
  "VS Code": Terminal,
  "Lighthouse": Gauge,
  "Google PageSpeed Insights": Gauge,
  "Image Optimization": Image,
  "Theme & Plugin Management": Box,
  "Compatibility Testing": ShieldCheck,
  "Website Troubleshooting": Wrench,
};

function TechnologyIcon({ name }: { name: string }) {
  const logo = logos[name];
  if (logo) {
    const url = typeof logo === "string" ? logo : logo.src;
    return <span className="toolkit-tech-logo" style={{ maskImage: `url("${url}")` }} aria-hidden="true" />;
  }

  const Icon = toolIcons[name] ?? Code2;
  return <Icon className="toolkit-tech-icon" size={17} strokeWidth={1.65} aria-hidden="true" />;
}

function EngineeringFlow({ active }: { active: number }) {
  return (
    <ol className="toolkit-flow" aria-label="Engineering layers">
      {toolkit.map((category, index) => (
        <li
          key={category.id}
          aria-current={active === index ? "step" : undefined}
          data-connected={active === index || active === index + 1}
        >
          <span className="toolkit-flow-node">
            <category.icon size={14} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span>{category.layer}</span>
        </li>
      ))}
    </ol>
  );
}

function ToolkitCategoryPanel({ category, selected, id }: { category: ToolkitCategory; selected: boolean; id: string }) {
  return (
    <section
      className="toolkit-detail"
      role="tabpanel"
      id={`${id}-${category.id}-panel`}
      aria-labelledby={`${id}-${category.id}-tab`}
      aria-hidden={!selected}
      tabIndex={selected ? 0 : -1}
      inert={!selected}
      data-selected={selected}
      data-toolkit-category={category.id}
    >
      <div className="toolkit-detail-header">
        <div className="toolkit-detail-title">
          <h3>{category.title}</h3>
          <span className="toolkit-total">{category.skills.length} tools</span>
        </div>
        <p>{category.description}</p>
      </div>
      <ul className="toolkit-inventory" aria-label={`${category.title} technologies`} data-compact={category.skills.length < 9}>
        {category.skills.map(skill => (
          <li key={skill.name}>
            <TechnologyIcon name={skill.name} />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
      <ol className="toolkit-route" aria-label={`${category.layer} workflow`}>
        {category.steps.map((step, index) => (
          <li key={step}>
            {index > 0 && <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />}
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ToolkitWorkspace({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const entered = useInView(root, { once: true, amount: .2 });
  const tabs = useRef<HTMLDivElement>(null);
  const tabsInView = useInView(tabs, { amount: .6 });
  const id = useId();

  useEffect(() => {
    if (!tabsInView || paused || hovered) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    function schedule() {
      window.clearTimeout(timer);
      if (document.hidden || preference.matches) return;

      timer = window.setTimeout(() => {
        if (document.hidden || preference.matches) return;
        setActive(index => (index + 1) % toolkit.length);
        schedule();
      }, 5000);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [tabsInView, paused, hovered]);

  function selectTab(index: number) {
    setPaused(true);
    setActive(index);
  }

  function handleTabKey(event: KeyboardEvent<HTMLDivElement>) {
    const last = toolkit.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowLeft": next = (active + last) % toolkit.length; break;
      case "ArrowRight": next = (active + 1) % toolkit.length; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }

    event.preventDefault();
    selectTab(next);
    tabs.current?.querySelectorAll("button")[next]?.focus();
  }

  return (
    <div
      className="toolkit-layout"
      ref={root}
      data-entered={entered}
      data-toolkit-category={toolkit[active].id}
    >
      <div className="toolkit-intro">
        {children}
        <EngineeringFlow active={active} />
        <button
          className="toolkit-rotation"
          type="button"
          aria-controls={`${id}-workspace`}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? "Resume auto-advance" : "Pause auto-advance"}
        </button>
      </div>

      <div
        className="toolkit-workspace"
        id={`${id}-workspace`}
        onFocusCapture={() => setPaused(true)}
        onPointerDown={() => setPaused(true)}
        onPointerEnter={event => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <div
          className="toolkit-tabs"
          ref={tabs}
          role="tablist"
          aria-label="Toolkit categories"
          onKeyDown={handleTabKey}
          style={{ "--toolkit-tab-x": active % 2, "--toolkit-tab-y": Math.floor(active / 2) } as CSSProperties}
        >
          <span className="toolkit-indicator" aria-hidden="true" />
          {toolkit.map((category, index) => (
            <button
              key={category.id}
              className="toolkit-tab"
              type="button"
              role="tab"
              id={`${id}-${category.id}-tab`}
              aria-controls={`${id}-${category.id}-panel`}
              aria-labelledby={`${id}-${category.id}-label`}
              aria-describedby={`${id}-${category.id}-description`}
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              data-toolkit-category={category.id}
              style={{ "--toolkit-delay": `${index * 50}ms` } as CSSProperties}
              onClick={() => selectTab(index)}
            >
              <span className="toolkit-tab-icon"><category.icon size={17} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className="toolkit-tab-copy">
                <span className="toolkit-tab-title" id={`${id}-${category.id}-label`}>{category.title}</span>
                <span id={`${id}-${category.id}-description`} className="toolkit-tab-description">{category.descriptor}</span>
              </span>
              <span className="toolkit-tab-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="toolkit-details">
          {toolkit.map((category, index) => (
            <ToolkitCategoryPanel category={category} selected={index === active} id={id} key={category.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
