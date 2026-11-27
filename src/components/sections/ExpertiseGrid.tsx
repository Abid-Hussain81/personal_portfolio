"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

type ExpertiseCard = {
  id: string;
  icon: string;
  title: string;
  summary: string;
};

const MotionLink = motion.create(Link);
const spring = { type: "spring", stiffness: 300, damping: 24 } satisfies Transition;
const tilt: Variants = {
  rest: { rotateX: 0, rotateY: 0, transition: spring },
  lift: { rotateX: 6, rotateY: -6, transition: spring },
};
const elevate: Variants = {
  rest: { z: 0, transition: spring },
  lift: { z: 14, transition: spring },
};
const shadow: Variants = {
  rest: { opacity: 0, scale: 0.75, transition: spring },
  lift: { opacity: 0.34, scale: 1.15, transition: spring },
};

export function ExpertiseGrid({ cards }: { cards: ExpertiseCard[] }) {
  const grid = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const tiles = [...element.querySelectorAll<HTMLElement>(".expertise-card")];
    const spotlight = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let pointer: { x: number; y: number } | undefined;
    let frame = 0;

    const clear = () => {
      pointer = undefined;
      delete element.dataset.spotlight;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const update = () => {
      frame = 0;
      if (!pointer) return;
      const { x, y } = pointer;
      const bounds = element.getBoundingClientRect();
      if (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom) {
        clear();
        return;
      }

      const positions = tiles.map(tile => tile.getBoundingClientRect());
      tiles.forEach((tile, index) => {
        const { left, top } = positions[index];
        tile.style.setProperty("--expertise-x", `${x - left}px`);
        tile.style.setProperty("--expertise-y", `${y - top}px`);
      });
      element.dataset.spotlight = "true";
    };

    const schedule = () => {
      if (pointer && !frame) frame = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (!spotlight.matches || event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", clear);
    spotlight.addEventListener("change", clear);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("blur", clear);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", clear);
      spotlight.removeEventListener("change", clear);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("blur", clear);
      clear();
    };
  }, []);

  return (
    <div className="expertise-grid" ref={grid}>
      {cards.map((card, index) => (
        <motion.div
          className="expertise-card-entry"
          key={card.id}
          initial={reduceMotion ? false : { opacity: 0.76, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.52, delay: (index % 3) * 0.075, ease: [0.22, 1, 0.36, 1] }}
        >
          <MotionLink
            href={`/services#${card.id}`}
            className={`expertise-card expertise-card-${card.id}`}
            initial="rest"
            animate="rest"
            whileHover={reduceMotion ? undefined : "lift"}
            whileFocus={reduceMotion ? undefined : "lift"}
          >
            <div className="expertise-card-heading">
              <span className="expertise-icon-frame" aria-hidden="true">
                <motion.span className="expertise-icon-scene" variants={tilt}>
                  <motion.span className="expertise-icon-shadow" variants={shadow} />
                  <motion.i className={`expertise-card-icon fa-solid ${card.icon}`} variants={elevate} />
                </motion.span>
              </span>
              <h3>{card.title}</h3>
            </div>
            <p className="expertise-card-copy">{card.summary}</p>
            <span className="expertise-card-bottom" aria-hidden="true">
              <i className="expertise-card-arrow fa-solid fa-arrow-right" />
            </span>
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
}
