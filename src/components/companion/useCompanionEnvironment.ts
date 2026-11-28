import { useEffect, useRef, useState } from "react";
import { homeSections, timing, type HomeSection } from "./companion-config";

type SectionContext = { section?: HomeSection; since: number };
const overlays = 'dialog[open], [role="dialog"]:not(.bit-panel):not([hidden]):not([aria-hidden="true"]), #mobile-navigation';
const matchesForm = "form[data-contact-form]";

export function useCompanionEnvironment(pathname: string) {
  const section = useRef<SectionContext>({ since: 0 });
  const [pageHidden, setPageHidden] = useState(false);
  const [obstructed, setObstructed] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    section.current = { since: Date.now() };
    if (pathname !== "/") return;

    const sections = new Map<Element, HomeSection>();
    for (const name of Object.keys(homeSections) as HomeSection[]) {
      const element = document.querySelector(homeSections[name]);
      if (element) sections.set(element, name);
    }

    const visible = new Set<Element>();
    function updateSection(entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      // Prefer the section nearest the middle of the reading area at a boundary.
      const center = window.innerHeight * .45;
      let nearest: Element | undefined;
      let distance = Infinity;
      for (const element of visible) {
        const rect = element.getBoundingClientRect();
        const next = Math.max(rect.top - center, center - rect.bottom, 0);
        if (next < distance) {
          nearest = element;
          distance = next;
        }
      }
      const name = nearest ? sections.get(nearest) : undefined;
      if (section.current.section !== name) section.current = { section: name, since: Date.now() };
    }

    let observer: IntersectionObserver;
    function observe() {
      observer?.disconnect();
      visible.clear();
      // IntersectionObserver resolves percentage margins against viewport width.
      const top = Math.round(window.innerHeight * .35);
      const bottom = Math.round(window.innerHeight * .45);
      observer = new IntersectionObserver(updateSection, { rootMargin: `-${top}px 0px -${bottom}px 0px` });
      sections.forEach((_, element) => observer.observe(element));
    }
    observe();
    window.addEventListener("resize", observe, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    function refresh() {
      const active = document.activeElement;
      const viewport = window.visualViewport;
      const keyboard = !!active?.matches("input, textarea, [contenteditable=true]") &&
        !!viewport && window.innerHeight - viewport.height > 140;
      setObstructed(
        keyboard ||
        Boolean(active?.closest(matchesForm)) ||
        Boolean(document.querySelector(`${matchesForm}[data-active="true"]`)) ||
        Array.from(document.querySelectorAll(overlays)).some(overlay =>
          !overlay.closest('[inert], [hidden], [aria-hidden="true"]') && overlay.getClientRects().length > 0
        )
      );
    }

    function update() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        refresh();
      });
    }

    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open", "hidden", "inert", "aria-hidden", "data-active"] });
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    window.visualViewport?.addEventListener("resize", update);
    const visibility = () => { setPageHidden(document.hidden); update(); };
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
      document.removeEventListener("visibilitychange", visibility);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    let timer: number;
    const activity = () => {
      window.clearTimeout(timer);
      setResting(false);
      timer = window.setTimeout(() => setResting(true), timing.rest);
    };
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    activity();
    return () => {
      events.forEach(event => window.removeEventListener(event, activity));
      window.clearTimeout(timer);
    };
  }, []);

  return { section, pageHidden, obstructed, resting };
}
