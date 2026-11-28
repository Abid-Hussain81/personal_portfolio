"use client";

import { useState } from "react";
import { CharacterFrame, CompanionCharacter, characterStates, type CharacterState } from "./CompanionCharacter";
import "@/app/companion.css";

function Creature({ state }: { state: CharacterState }) {
  return (
    <CharacterFrame state={state}>
      <g stroke="var(--bit-outline)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 76c-4 4-7 12 1 13h13c4-1 6-5 6-9m10 0c0 4 2 8 6 9h13c8-1 5-9 1-13" fill="var(--bit-cream)" />
        <path className="bit-hand" d="M70 62c11 0 11-14 16-11 7 4-2 23-13 23" fill="var(--bit-sage)" />
        <g className="bit-head">
          <path d="M48 29c-3-7-2-13 2-19 6 5 8 11 5 19 8-4 14-3 19 2-6 6-15 7-21 3" fill="var(--bit-sage)" />
          <path d="M47 26c17 0 22 11 30 24 8 13 5 26-6 30-15 6-39 5-52-1-10-5-12-17-5-27C22 38 28 26 47 26Z" fill="var(--bit-sage)" />
          <path d="M23 46c5-9 12-14 20-15m-18 39c3 4 8 6 15 7" fill="none" stroke="var(--bit-cream)" />
          <path d="M24 58h6m36 0h6" stroke="var(--bit-terra)" strokeWidth="2.5" />
          <g className="bit-gaze" fill="var(--bit-outline)">
            <g className="bit-eyes" stroke="none"><ellipse cx="35" cy="50" rx="3.3" ry="5" /><ellipse cx="61" cy="50" rx="3.3" ry="5" /></g>
            <path className="bit-smile-eyes" d="M31 52q4-6 8 0m18 0q4-6 8 0" fill="none" />
            <path className="bit-sleep-eyes" d="M32 51q3 3 6 0m20 0q3 3 6 0" fill="none" />
            <path className="bit-smile" d="M44 56q4 4 8 0" fill="none" />
          </g>
        </g>
      </g>
    </CharacterFrame>
  );
}

function Fox({ state }: { state: CharacterState }) {
  return (
    <CharacterFrame state={state}>
      <g stroke="var(--bit-outline)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <g className="bit-hand">
          <path d="M60 77c13 0 22-10 23-24 10 8 11 30-8 34-7 1-13-2-16-5Z" fill="var(--bit-russet)" />
          <path d="M83 53c6 5 8 13 7 19l-8-4-4 1c3-4 4-9 5-16Z" fill="var(--bit-cream)" />
        </g>
        <path d="M35 60c-8 6-12 18-7 23 5 6 32 7 39 0 4-5-1-17-8-23" fill="var(--bit-russet)" />
        <path d="M40 66c-5 6-6 13-3 17 3 4 19 3 21-1 2-4 1-11-3-16" fill="var(--bit-cream)" stroke="none" />
        <path d="M39 79c-5 0-10 3-9 7 1 3 13 4 15 0m12-7c5 0 10 3 9 7-1 3-13 4-15 0" fill="var(--bit-russet)" />
        <g className="bit-head">
          <path d="M14 46c-4-9-4-23-1-35 12 3 21 10 26 18a42 42 0 0 1 18 0c5-8 14-15 26-18 3 12 3 26-1 35 4 10-1 17-12 21-15 6-29 6-44 0-11-4-16-11-12-21Z" fill="var(--bit-russet)" />
          <path d="M17 19c7 3 12 7 16 12-6 1-11 4-14 7-2-6-3-13-2-19Zm62 0c-7 3-12 7-16 12 6 1 11 4 14 7 2-6 3-13 2-19Z" fill="var(--bit-cream)" strokeWidth="1.2" />
          <path d="M15 49c15-3 25 1 33 10 8-9 18-13 33-10 2 9-4 15-13 18-13 5-27 5-40 0-9-3-15-9-13-18Z" fill="var(--bit-cream)" stroke="none" />
          <g className="bit-gaze" fill="var(--bit-outline)">
            <g className="bit-eyes" stroke="none"><ellipse cx="34" cy="46" rx="2.8" ry="4.2" /><ellipse cx="62" cy="46" rx="2.8" ry="4.2" /></g>
            <path className="bit-smile-eyes" d="M30 47q4-5 8 0m20 0q4-5 8 0" fill="none" />
            <path className="bit-sleep-eyes" d="M31 45q3 3 6 0m22 0q3 3 6 0" fill="none" />
          </g>
          <path d="M44 57q4-3 8 0l-4 4Z" fill="var(--bit-outline)" />
          <path className="bit-smile" d="M43 63q3 3 5 0 2 3 5 0" fill="none" strokeWidth="1.4" />
        </g>
      </g>
    </CharacterFrame>
  );
}

const concepts = [
  { name: "Bit", description: "A pocket-sized developer robot", Character: CompanionCharacter },
  { name: "Moss", description: "A soft digital creature", Character: Creature },
  { name: "Patch", description: "An editorial coding fox", Character: Fox },
];

export function CompanionConcepts() {
  const [preview, setPreview] = useState<{ state: CharacterState; playback: number }>({ state: "idle", playback: 0 });
  return (
    <div className="bit-concepts">
      <h1 className="text-h1">Meet the companion concepts.</h1>
      <div className="bit-preview-controls" role="group" aria-label="Animation state">
        {characterStates.map(state => (
          <button key={state} type="button" aria-pressed={state === preview.state} onClick={() => setPreview(previous => ({ state, playback: previous.playback + 1 }))}>{state}</button>
        ))}
      </div>
      <div className="bit-concept-grid">
        {concepts.map(({ name, description, Character }) => (
          <article key={name} className="bit-concept">
            <div className="bit-concept-stage"><Character key={preview.playback} state={preview.state} /></div>
            <h2>{name}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
