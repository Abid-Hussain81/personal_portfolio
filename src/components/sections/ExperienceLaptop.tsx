"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode, type RefObject } from "react";
import { experienceDisplays, type ExperienceScene } from "./ExperienceDisplayConfig";

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
  const preview = experienceDisplays[active];

  useEffect(() => {
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const canRender = typeof window.WebGL2RenderingContext !== "undefined" && (memory === undefined || memory > 2);
    let nearby = false;

    function update() {
      const allowed = canRender && !preference.matches;
      setEnabled(allowed);
      if (nearby && allowed) setMounted(true);
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
          <source media="(max-width: 639px)" srcSet={preview.mobilePreview} />
          <Image
            src={preview.preview}
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
