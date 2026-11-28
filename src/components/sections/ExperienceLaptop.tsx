"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode, type RefObject } from "react";
import type { ExperienceScene } from "./ExperienceScreens";

const LaptopScene = dynamic(() => import("./ExperienceLaptopScene"), { ssr: false });

export type LaptopMotion = {
  x: number;
  y: number;
  setInvalidate: (invalidate?: () => void) => void;
};

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function ExperienceLaptop({
  active,
  motion,
}: {
  active: ExperienceScene;
  motion: RefObject<LaptopMotion>;
}) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nearby = false;

    function update() {
      setEnabled(!preference.matches && typeof window.WebGL2RenderingContext !== "undefined");
      if (nearby && !preference.matches) setMounted(true);
    }

    const preload = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      update();
    }, { rootMargin: "180px" });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preload.observe(element);
    visibility.observe(element);
    preference.addEventListener("change", update);
    return () => {
      preload.disconnect();
      visibility.disconnect();
      preference.removeEventListener("change", update);
    };
  }, [element]);

  return (
    <div className="workspace-laptop" ref={setElement}>
      <div className="workspace-laptop-fallback">
        <picture>
          <source media="(max-width: 639px)" srcSet={`/models/experience/${active}-mobile.webp`} />
          <Image
            src={`/models/experience/${active}.webp`}
            alt=""
            fill
            loading="lazy"
            unoptimized
          />
        </picture>
      </div>
      {enabled && mounted && (
        <SceneBoundary>
          <LaptopScene active={active} motion={motion} visible={visible} />
        </SceneBoundary>
      )}
    </div>
  );
}
