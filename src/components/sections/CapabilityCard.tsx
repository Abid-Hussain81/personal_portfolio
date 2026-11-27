"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { CapabilityDemo } from "@/data/capabilities";

const flipSpring = { type: "spring", stiffness: 175, damping: 23, mass: 0.8 } as const;

const bookingSteps = [
  { label: "Dates", icon: "fa-calendar-days", title: "Apr 18–21", detail: "3 nights · 2 guests" },
  { label: "Room", icon: "fa-bed", title: "Garden double", detail: "Queen bed · Breakfast included" },
  { label: "Confirm", icon: "fa-check", title: "Ready to book", detail: "Garden double · Apr 18–21" },
] as const;

const apiResponses = {
  Healthy: [
    { path: "/availability", status: "200 OK" },
    { path: "/rooms", status: "200 OK" },
  ],
  Errors: [
    { path: "/availability", status: "503 Unavailable" },
    { path: "/rooms", status: "429 Rate limit" },
  ],
} as const;

function BookingPreview() {
  const [step, setStep] = useState<(typeof bookingSteps)[number]>(bookingSteps[0]);

  return (
    <>
      <div className="capability-preview-controls" role="group" aria-label="Booking steps">
        {bookingSteps.map((option) => (
          <button key={option.label} type="button" aria-pressed={step === option} onClick={() => setStep(option)}>{option.label}</button>
        ))}
      </div>
      <div className="capability-booking-summary" aria-live="polite">
        <i className={`fa-solid ${step.icon}`} aria-hidden="true" />
        <div><strong>{step.title}</strong><p>{step.detail}</p></div>
      </div>
    </>
  );
}

function DashboardPreview() {
  const [filter, setFilter] = useState<keyof typeof apiResponses>("Healthy");

  return (
    <>
      <div className="capability-preview-controls" role="group" aria-label="Sample response filter">
        <button type="button" aria-pressed={filter === "Healthy"} onClick={() => setFilter("Healthy")}>Healthy</button>
        <button type="button" aria-pressed={filter === "Errors"} onClick={() => setFilter("Errors")}>Errors</button>
      </div>
      <ul className="capability-request-list" data-errors={filter === "Errors"} aria-live="polite">
        {apiResponses[filter].map((response) => (
          <li key={response.path}><code>{response.path}</code><span>{response.status}</span></li>
        ))}
      </ul>
    </>
  );
}

function DesignSystemPreview() {
  const [compact, setCompact] = useState(false);

  return (
    <>
      <div className="capability-preview-controls" role="group" aria-label="Preview viewport">
        <button type="button" aria-pressed={!compact} onClick={() => setCompact(false)}>
          <i className="fa-solid fa-desktop" aria-hidden="true" /> Desktop
        </button>
        <button type="button" aria-pressed={compact} onClick={() => setCompact(true)}>
          <i className="fa-solid fa-mobile-screen" aria-hidden="true" /> Mobile
        </button>
      </div>
      <div className="capability-component-preview" data-compact={compact} aria-hidden="true">
        <div className="capability-example-toolbar"><b>Library</b><span>Button</span></div>
        <div className="capability-example-grid"><div>Card</div><div>Card</div></div>
      </div>
    </>
  );
}

const previews = {
  booking: BookingPreview,
  dashboard: DashboardPreview,
  "design-system": DesignSystemPreview,
} as const;

export function CapabilityCard({ demo }: { demo: CapabilityDemo }) {
  const id = useId();
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();
  const Preview = previews[demo.id];
  const { state, integration, performance, stack } = demo.architecture;

  return (
    <article className="capability-card" data-tone={demo.tone} aria-labelledby={`${id}-title`}>
      <header className="capability-card-header">
        <h3 id={`${id}-title`} className="text-h3">{demo.title}</h3>
        <p>{demo.description}</p>
      </header>

      <div className="capability-browser">
        <div className="capability-chrome" aria-hidden="true">
          <span className="capability-window-lights"><i /><i /><i /></span>
          <span>{flipped ? "Architecture & stack" : "Frontend UI"}</span>
        </div>
        <div className="capability-perspective" id={`${id}-preview`} data-flipped={flipped}>
          <motion.div
            className="capability-rotor"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reducedMotion ? { duration: 0 } : flipSpring}
          >
            <div className="capability-face capability-front" aria-hidden={flipped} inert={flipped}>
              <p className="capability-preview-title">{demo.preview}</p>
              <Preview />
            </div>
            <div className="capability-face capability-back" aria-hidden={!flipped} inert={!flipped}>
              <dl className="capability-architecture">
                <div><dt>State</dt><dd>{state}</dd></div>
                <div><dt>Integration</dt><dd>{integration}</dd></div>
                <div><dt>Performance</dt><dd>{performance}</dd></div>
              </dl>
              <ul className="capability-stack" aria-label="Example stack">
                {stack.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        className="capability-flip"
        type="button"
        aria-label={`Architecture & stack for ${demo.title}`}
        aria-pressed={flipped}
        aria-controls={`${id}-preview`}
        onClick={() => setFlipped((previous) => !previous)}
      >
        <i className="fa-solid fa-rotate" aria-hidden="true" /> Architecture &amp; stack
      </button>
    </article>
  );
}
