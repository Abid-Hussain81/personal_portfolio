"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeEffects({ children, className = "home-page" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const isHome = element.classList.contains("home-page");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const groups = element.querySelectorAll<HTMLElement>("[data-reveal-group]");
    const running = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;

    const reset = () => {
      running.forEach(animation => animation.cancel());
      running.clear();
      element.querySelectorAll("[data-reveal]").forEach(target => target.classList.remove("reveal-pending"));
    };

    const setup = () => {
      observer?.disconnect();
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      const initiallyVisible = new Set<Element>();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const target = entry.target.querySelector<HTMLElement>("[data-reveal]");
          if (!target) return;
          if (!entry.isIntersecting) {
            initiallyVisible.delete(entry.target);
            running.get(target)?.cancel();
            running.delete(target);
            target.classList.add("reveal-pending");
            return;
          }
          if (initiallyVisible.delete(entry.target)) return;

          const mobile = window.matchMedia("(max-width: 639px)").matches;
          const requestedDistance = Number(target.dataset.revealDistance ?? (mobile ? 40 : 80));
          const distance = isHome ? Math.min(requestedDistance, mobile ? 12 : 22) : requestedDistance;
          const vertical = isHome && entry.boundingClientRect.top < 0 ? -distance : distance;
          const direction = target.dataset.reveal;
          const from = direction === "left" ? `translate3d(-${distance}px, 0, 0)`
            : direction === "right" ? `translate3d(${distance}px, 0, 0)`
            : direction === "scale" ? (isHome ? `translate3d(0, ${vertical}px, 0) scale(.985)` : "translate3d(0, 48px, 0) scale(.92)")
            : `translate3d(0, ${vertical}px, 0)`;
          running.get(target)?.cancel();
          target.classList.remove("reveal-pending");
          const animation = target.animate([
            { opacity: isHome ? .82 : 0, transform: from },
            { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
          ], {
            duration: (isHome ? (mobile ? .42 : .52) : Number(target.dataset.revealDuration ?? (mobile ? .75 : 1))) * 1000,
            delay: Number(target.dataset.revealDelay || 0) * (mobile ? 500 : isHome ? 750 : 1000),
            easing: "cubic-bezier(.16, 1, .3, 1)",
            fill: "both",
          });
          running.set(target, animation);
          if (!isHome && target.dataset.revealOnce === "true") observer?.unobserve(entry.target);
          animation.onfinish = () => {
            animation.cancel();
            running.delete(target);
          };
        });
      }, { threshold: 0, rootMargin: isHome ? "12px 0px" : "0px 0px -48px 0px" });
      groups.forEach(group => {
        const { top, bottom } = group.getBoundingClientRect();
        if (isHome && top < window.innerHeight && bottom > 0) initiallyVisible.add(group);
        if (top > window.innerHeight) {
          group.querySelector("[data-reveal]")?.classList.add("reveal-pending");
        }
        observer?.observe(group);
      });
    };

    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      reset();
    };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
