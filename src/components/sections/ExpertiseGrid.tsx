"use client";

import { motion, useInView, useReducedMotion, type Transition, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const compactCards = [
  { id: "figma-to-code", icon: "fa-pen-nib", title: "Design to code", summary: "Turn Figma files into responsive interfaces.", chips: ["Components", "Breakpoints"] },
  { id: "backend-support", icon: "fa-wrench", title: "Backend support", summary: "Debug application logic and data issues.", chips: ["PHP", "CodeIgniter"] },
  { id: "website-performance", icon: "fa-gauge-high", title: "Speed & performance", summary: "Trim assets and improve page load times.", chips: ["Images", "Caching"] },
] as const;

const spring = { type: "spring", stiffness: 280, damping: 22 } satisfies Transition;
const badgeLift: Variants = {
  rest: { y: 0, z: 0, rotateX: 0, transition: spring },
  lift: (index: number) => ({ y: -4 - index * 2, z: 12 + index * 5, rotateX: -6, transition: spring }),
};
const slotFan: Variants = {
  rest: (index: number) => ({ x: index * 8, y: -index * 10, z: -index * 16, rotateZ: -index * 4, transition: spring }),
  lift: (index: number) => ({ x: index * 23, y: -index * 16, z: -index * 27, rotateZ: -index * 9, transition: spring }),
};

function BookingVisual() {
  return (
    <div className="expertise-booking" aria-hidden="true">
      <div className="expertise-booking-deck">
        {[2, 1, 0].map((layer) => (
          <motion.div key={layer} className="expertise-slot" data-layer={layer} custom={layer} variants={slotFan}>
            {layer === 0 && <>
              <div className="expertise-slot-title"><i className="fa-solid fa-calendar-days" /> Check availability</div>
              <div className="expertise-slot-times"><span>09:00</span><span>11:30</span><span>14:00</span></div>
            </>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ApiVisual({ reducedMotion }: { reducedMotion: boolean | null }) {
  const flow = useRef<HTMLDivElement>(null);
  const inView = useInView(flow);
  return (
    <div className="expertise-api-flow" ref={flow} data-playing={inView && !reducedMotion} aria-hidden="true">
      <div className="expertise-api-rail"><span /></div>
      <span><i className="fa-solid fa-window-maximize" />Frontend</span>
      <span><i className="fa-solid fa-code" />API</span>
      <span><i className="fa-solid fa-database" />Database</span>
    </div>
  );
}

export function ExpertiseGrid() {
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

  const hover = reduceMotion ? undefined : "lift";

  return (
    <div className="expertise-grid" ref={grid}>
      <ScrollReveal className="expertise-card-entry expertise-entry-booking" distance={16}>
        <motion.article className="expertise-card expertise-card-booking" initial="rest" animate="rest" whileHover={hover}>
          <div className="expertise-feature-copy">
            <span className="expertise-badge">Product interfaces</span>
            <h3>Web apps &amp; booking platforms</h3>
            <p>Build reusable interfaces and smooth reservations.</p>
          </div>
          <BookingVisual />
          <div className="expertise-feature-links">
            <Link href="/services#web-applications">Web applications <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
            <Link href="/services#booking-platforms">Booking platforms <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
          </div>
        </motion.article>
      </ScrollReveal>
      <ScrollReveal className="expertise-card-entry expertise-entry-api" distance={16} delay={.07}>
        <Link className="expertise-card expertise-card-api" href="/services/api-integration">
          <div className="expertise-feature-copy">
            <span className="expertise-badge">Connected systems</span>
            <h3>API integrations</h3>
            <p>Connect REST and GraphQL APIs to your product.</p>
          </div>
          <ApiVisual reducedMotion={reduceMotion} />
          <i className="expertise-arrow fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </ScrollReveal>
      {compactCards.map((card, index) => (
        <ScrollReveal
          className="expertise-card-entry expertise-entry-compact"
          key={card.id}
          distance={16}
          delay={index * .07}
        >
          <motion.div className="expertise-card expertise-card-compact" initial="rest" animate="rest" whileHover={hover}>
            <h3><Link href={`/services#${card.id}`} className="expertise-compact-link"><i className={`fa-solid ${card.icon}`} aria-hidden="true" />{card.title}</Link></h3>
            <p>{card.summary}</p>
            <div className="expertise-chip-scene" aria-hidden="true">
              {card.chips.map((chip, position) => <motion.span className="expertise-chip" key={chip} custom={position} variants={badgeLift}>{chip}</motion.span>)}
            </div>
            <i className="expertise-arrow fa-solid fa-arrow-right" aria-hidden="true" />
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
}
