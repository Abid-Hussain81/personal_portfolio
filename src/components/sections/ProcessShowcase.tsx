"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ProcessScene = dynamic(() => import("@/components/animations/ProcessScene"), { ssr: false });
const desktopQuery = "(min-width: 1024px)";

type Step = { number: string; title: string; description: string };

export function ProcessShowcase({ steps }: { steps: readonly Step[] }) {
  const list = useRef<HTMLOListElement>(null);
  const stage = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = list.current;
    const artwork = stage.current;
    if (!element || !artwork) return;
    const desktopMedia = window.matchMedia(desktopQuery);
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const steps = Array.from(element.children);
    let frame = 0;
    let nearStage = false;

    const update = () => {
      frame = 0;
      if (!desktopMedia.matches || !nearStage) return;
      const focusLine = window.innerHeight * 0.48;
      let closest = 0;
      let distance = Infinity;
      steps.forEach((step, index) => {
        const { top, height } = step.getBoundingClientRect();
        const candidate = Math.abs(top + height / 2 - focusLine);
        if (candidate < distance) {
          closest = index;
          distance = candidate;
        }
      });
      setCurrent(closest);
    };

    const schedule = () => {
      if (!frame && desktopMedia.matches && nearStage) frame = requestAnimationFrame(update);
    };
    const syncLayout = () => {
      setDesktop(desktopMedia.matches);
      if (!desktopMedia.matches || motionMedia.matches) setReady(false);
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearStage = entry.isIntersecting;
      setNearby(nearStage);
      if (!nearStage) setReady(false);
      schedule();
    }, { rootMargin: "160px 0px" });
    observer.observe(artwork);
    syncLayout();
    desktopMedia.addEventListener("change", syncLayout);
    motionMedia.addEventListener("change", syncLayout);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      desktopMedia.removeEventListener("change", syncLayout);
      motionMedia.removeEventListener("change", syncLayout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const showScene = desktop && nearby && !reducedMotion && !failed;

  return (
    <div className="process-showcase lg:grid lg:grid-cols-12" data-tracking={desktop}>
      <ol className="process-steps lg:col-span-5" ref={list} aria-label="How we work together">
        {steps.map((step, index) => (
          <motion.li
            key={step.number}
            className="process-step-entry"
            data-active={current === index}
            aria-current={desktop && current === index ? "step" : undefined}
            initial={reducedMotion ? false : { opacity: 0.8, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="process-step-content">
              <span className="process-step-number" aria-hidden="true">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index === steps.length - 1 && (
                  <Link className="action-primary process-step-cta" href="/contact">
                    Let&apos;s talk about your project <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
      <aside className="process-showcase-stage hidden lg:sticky lg:top-24 lg:col-span-7 lg:block" ref={stage} aria-hidden="true">
        <div className="process-stage-art" data-scene-ready={showScene && ready} data-step={current}>
          <div className="process-stage-fallback"><i /><i /><i /></div>
          {showScene && (
            <ProcessScene step={current} onReady={() => setReady(true)} onFailure={() => setFailed(true)} />
          )}
        </div>
      </aside>
    </div>
  );
}
