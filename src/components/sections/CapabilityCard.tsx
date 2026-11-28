"use client";

import { useId, useState } from "react";
import type { CapabilityDemo } from "@/data/capabilities";
import { BookingPreview, DashboardPreview, DesignSystemPreview } from "./CapabilityPreviews";

const previews = {
  booking: BookingPreview,
  dashboard: DashboardPreview,
  "design-system": DesignSystemPreview,
} as const;

const notes = {
  booking: "Sample booking",
  dashboard: "Simulated requests",
  "design-system": "Sample workspace",
} as const;

export function CapabilityCard({ demo }: { demo: CapabilityDemo }) {
  const id = useId();
  const [architecture, setArchitecture] = useState(false);
  const Preview = previews[demo.id];

  return (
    <article className="capability-card" data-demo={demo.id} aria-labelledby={id + "-title"}>
      <header className="capability-card-header">
        <h3 id={id + "-title"} className="text-h3">{demo.title}</h3>
        <p>{demo.description}</p>
        <div className="capability-segmented capability-mode" role="group" aria-label={demo.title + " view"}>
          <button type="button" aria-pressed={!architecture} aria-controls={id + "-content"} onClick={() => setArchitecture(false)}>Preview</button>
          <button type="button" aria-pressed={architecture} aria-controls={id + "-content"} onClick={() => setArchitecture(true)}>Architecture</button>
        </div>
      </header>

      <div id={id + "-content"} className="capability-pane-stack capability-stage">
        <div className="capability-surface" aria-hidden={architecture} inert={architecture}>
          <div className="capability-surface-heading">
            <h4>{demo.preview}</h4>
            <p>{notes[demo.id]}</p>
          </div>
          <Preview />
        </div>

        <div className="capability-surface capability-architecture" aria-hidden={!architecture} inert={!architecture}>
          <div className="capability-surface-heading"><h4>Implementation flow</h4></div>
          <ol className="capability-flow">
            {demo.architecture.flow.map(step => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="capability-technology">{demo.architecture.stack.join(" · ")}</p>
        </div>
      </div>
    </article>
  );
}
