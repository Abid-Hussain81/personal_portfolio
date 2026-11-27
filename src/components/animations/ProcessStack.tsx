"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const ProcessScene = dynamic(() => import("./ProcessScene"), { ssr: false });
const sceneMedia = "(min-width: 1024px) and (min-height: 541px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function ProcessStack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLOListElement>(null);
  const [scene, setScene] = useState<{ host: HTMLDivElement; step: number } | null>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scenePreference = window.matchMedia(sceneMedia);
    const layers = Array.from(element.querySelectorAll<HTMLElement>(".process-stack-layer"));
    const visuals = layers.map(layer => layer.querySelector<HTMLElement>(".process-stack-visual"));
    const host = document.createElement("div");
    host.className = "process-3d-host";
    let nearby = false;
    let activeStep = -1;
    let frame = 0;

    const updateScene = () => {
      if (!scenePreference.matches || !nearby) {
        if (activeStep >= 0) {
          activeStep = -1;
          setScene(null);
          host.remove();
        }
        return;
      }

      // A later card covers the cards before it. Pick the most visible artwork.
      let visibleHeight = 0;
      let nextStep = -1;
      let visibleBottom = window.innerHeight;
      for (let index = layers.length - 1; index >= 0; index--) {
        const visual = visuals[index];
        if (!visual) continue;
        const bounds = visual.getBoundingClientRect();
        const shown = Math.min(bounds.bottom, visibleBottom) - Math.max(bounds.top, 0);
        if (shown > visibleHeight && shown >= bounds.height * 0.5) {
          visibleHeight = shown;
          nextStep = index;
        }
        const card = layers[index].firstElementChild;
        if (card) visibleBottom = Math.min(visibleBottom, card.getBoundingClientRect().top);
      }

      if (nextStep < 0 || nextStep === activeStep) return;
      const visual = visuals[nextStep];
      if (!visual) return;
      activeStep = nextStep;
      visual.appendChild(host);
      setScene({ host, step: nextStep });
    };

    const update = () => {
      frame = 0;
      // Measure stationary layers first, then update only their moving surfaces.
      const arrivals = layers.map(layer => {
        if (preference.matches || getComputedStyle(layer).position !== "sticky") return 0;
        const pinnedTop = parseFloat(getComputedStyle(layer).top) || 0;
        const distance = layer.getBoundingClientRect().top - pinnedTop;
        const progress = Math.max(0, Math.min(1, distance / Math.max(1, window.innerHeight - pinnedTop)));
        return progress * progress * (3 - 2 * progress);
      });
      updateScene();
      layers.forEach((layer, index) => layer.style.setProperty("--card-arrival", arrivals[index].toFixed(4)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      schedule();
    }, { rootMargin: "160px 0px" });
    intersection.observe(element);
    scenePreference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      scenePreference.removeEventListener("change", schedule);
      intersection.disconnect();
      resize.disconnect();
      host.remove();
      layers.forEach(layer => layer.style.removeProperty("--card-arrival"));
    };
  }, []);

  return (
    <>
      <ol ref={root} className="process-stack" aria-label="How we work together">{children}</ol>
      {scene && createPortal(<ProcessScene step={scene.step} />, scene.host)}
    </>
  );
}
