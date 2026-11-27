"use client";

import { RotateCw } from "lucide-react";
import { useId, useState, type PointerEvent, type ReactNode } from "react";

function trackPointer(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));

  card.style.setProperty("--portrait-rotate-x", `${(0.5 - y) * 12}deg`);
  card.style.setProperty("--portrait-rotate-y", `${(x - 0.5) * 14}deg`);
  card.style.setProperty("--portrait-light-x", `${x * 100}%`);
  card.style.setProperty("--portrait-light-y", `${y * 100}%`);
  card.dataset.tilting = "true";
}

function resetTilt(card: HTMLDivElement) {
  delete card.dataset.tilting;
  card.style.removeProperty("--portrait-rotate-x");
  card.style.removeProperty("--portrait-rotate-y");
}

export function PortraitFlip({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  const detailsId = useId();

  return (
    <div
      className="portrait-flip"
      data-flipped={flipped}
      onPointerMove={trackPointer}
      onPointerLeave={event => resetTilt(event.currentTarget)}
      onPointerCancel={event => resetTilt(event.currentTarget)}
    >
      <button
        className="portrait-flip-trigger"
        type="button"
        aria-label={flipped ? "Flip back to the portrait" : "Flip card to see availability and core focus"}
        aria-expanded={flipped}
        aria-controls={detailsId}
        onClick={() => setFlipped(current => !current)}
      >
        <span className="portrait-flip-icon" aria-hidden="true"><RotateCw size={17} /></span>
      </button>
      <div className="portrait-tilt">
        <div className="portrait-turn">
          <div className="portrait-face portrait-front" aria-hidden={flipped}>{front}</div>
          <div className="portrait-face portrait-back" id={detailsId} aria-hidden={!flipped}>{back}</div>
        </div>
      </div>
    </div>
  );
}
