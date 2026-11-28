import type { ReactNode } from "react";

export const characterStates = ["idle", "greeting", "curious", "happy", "thinking", "guiding", "resting", "farewell"] as const;
export type CharacterState = (typeof characterStates)[number];

export function CharacterFrame({ state, children }: { state: CharacterState; children: ReactNode }) {
  return (
    <svg className="bit-character" data-state={state} viewBox="0 0 96 100" aria-hidden="true" focusable="false">
      <ellipse className="bit-shadow" cx="48" cy="91" rx="30" ry="4" />
      <g className="bit-pose">{children}</g>
    </svg>
  );
}

export function CompanionCharacter({ state }: { state: CharacterState }) {
  return (
    <CharacterFrame state={state}>
      <g stroke="var(--bit-outline)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M33 78h12v8c0 2-2 3-4 3H30c-2 0-3-3-1-5l4-3Zm18 0h12v3l4 3c2 2 1 5-1 5H55c-2 0-4-1-4-3Z" fill="var(--bit-cream)" />
        <path d="M32 85h10m12 0h10" stroke="var(--bit-sage-deep)" strokeWidth="1.2" />
        <path d="M32 61c-8-1-13 3-13 10 0 3 2 5 5 5s5-2 5-5l5-4" fill="var(--bit-sage)" />
        <g className="bit-hand">
          <path d="M64 61c6 1 8 7 13 7l4-5a4 4 0 0 1 6 5l-4 7c-2 3-6 4-10 2l-10-8" fill="var(--bit-sage)" />
          <path d="m78 69 4 3" stroke="var(--bit-sage-deep)" strokeWidth="1.3" />
        </g>
        <path d="M38 59h20c5 0 9 4 9 9v4c0 6-5 10-10 10H39c-5 0-10-4-10-10v-4c0-5 4-9 9-9Z" fill="var(--bit-sage)" />
        <path d="M37 71h22" stroke="var(--bit-sage-deep)" strokeWidth="1.2" />
        <rect x="41" y="66" width="14" height="10" rx="3" fill="var(--bit-cream)" strokeWidth="1.2" />
        <path d="m48 68 2 3-2 3-2-3Z" fill="var(--bit-terra)" stroke="none" />
        <g className="bit-head">
          <path d="M48 23v-8l8-5" fill="none" />
          <circle cx="57" cy="9" r="3.5" fill="var(--bit-terra)" />
          <rect x="12" y="33" width="72" height="23" rx="7" fill="var(--bit-sage)" />
          <path d="M15 43v5m66-5v5" stroke="var(--bit-sage-deep)" strokeWidth="1.2" />
          <rect x="18" y="23" width="60" height="40" rx="15" fill="var(--bit-cream)" />
          <rect x="23" y="28" width="50" height="29" rx="10" fill="var(--bit-visor)" />
          <path d="M30 32h22" stroke="var(--bit-visor-line)" strokeWidth="1.2" />
          <g className="bit-gaze" stroke="none">
            <g className="bit-eyes" fill="var(--bit-eye)">
              <rect x="34" y="36" width="5" height="10" rx="2.5" />
              <rect x="57" y="36" width="5" height="10" rx="2.5" />
            </g>
            <path className="bit-smile-eyes" d="M33 43q3-6 7 0m16 0q3-6 7 0" stroke="var(--bit-eye)" strokeWidth="2.4" fill="none" />
            <path className="bit-sleep-eyes" d="M34 42q2.5 2 5 0m18 0q2.5 2 5 0" stroke="var(--bit-eye)" fill="none" />
            <path className="bit-smile" d="M45 48q3 3 6 0" stroke="var(--bit-eye)" strokeWidth="1.5" fill="none" />
          </g>
          <path d="M41 60h14" stroke="var(--bit-sage-deep)" strokeWidth="1" />
        </g>
      </g>
    </CharacterFrame>
  );
}
