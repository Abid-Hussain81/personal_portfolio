"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ProcessStack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layers = Array.from(element.querySelectorAll<HTMLElement>(".process-stack-layer"));
    let frame = 0;

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
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      resize.disconnect();
      layers.forEach(layer => layer.style.removeProperty("--card-arrival"));
    };
  }, []);

  return <ol ref={root} className="process-stack" aria-label="How we work together">{children}</ol>;
}
