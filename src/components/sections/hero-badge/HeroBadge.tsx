"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

const BadgeScene = dynamic(() => import("./BadgeScene"), { ssr: false });

export type BadgeProfile = {
  name: string;
  role: string;
  photoUrl: string;
  resumeUrl: string;
  specialties: string[];
  stack: string[];
};

class BadgeBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroBadge({ profile, children }: { profile: BadgeProfile; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [motion, setMotion] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setMotion(!preference.matches);
      if (preference.matches) setReady(false);
    };
    syncMotion();
    preference.addEventListener("change", syncMotion);
    const preloader = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        preloader.disconnect();
      }
    }, { rootMargin: "160px" });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preloader.observe(element);
    visibility.observe(element);
    return () => {
      preference.removeEventListener("change", syncMotion);
      preloader.disconnect();
      visibility.disconnect();
    };
  }, []);

  const renderScene = nearby && motion === true && !failed;
  const showScene = renderScene && ready;
  const showFallback = motion === false || failed;
  const flip = () => setFlipped(current => !current);
  const fail = () => setFailed(true);

  return (
    <div className="hero-badge" ref={root} data-badge-ready={showScene} data-badge-fallback={showFallback}>
      <div className="hero-badge-fallback" aria-hidden={showScene} inert={showScene}>{children}</div>
      {renderScene && (
        <div className="hero-badge-canvas" aria-hidden="true">
          <BadgeBoundary onFailure={fail}>
            <BadgeScene profile={profile} active={visible} flipped={flipped} onFlip={flip} onReady={() => setReady(true)} onFailure={fail} />
          </BadgeBoundary>
        </div>
      )}
      {showScene && (
        <div className="hero-badge-controls">
          <button type="button" onClick={flip} aria-pressed={flipped}>Flip profile badge</button>
          <a href={profile.resumeUrl} download>Download résumé</a>
          <p className="sr-only" aria-live="polite">
            {flipped
              ? `Back of Pass. Lahore, PK · Open to Remote. Thoughtfully built. From idea to interface. ${profile.stack.join(", ")}.`
              : `${profile.name}, ${profile.role}. ${profile.specialties.join(", ")}.`}
          </p>
        </div>
      )}
    </div>
  );
}
