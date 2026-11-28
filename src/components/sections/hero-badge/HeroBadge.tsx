"use client";

import dynamic from "next/dynamic";
import { RotateCw } from "lucide-react";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const BadgeScene = dynamic(() => import("./BadgeScene"), { ssr: false });

export type BadgeProfile = {
  name: string;
  location: string;
  photoUrl: string;
  resumeUrl: string;
  specialties: string[];
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
  const [foreground, setForeground] = useState(false);
  const [motion, setMotion] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [fallbackFocused, setFallbackFocused] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setMotion(!preference.matches);
      if (preference.matches) setReady(false);
    };
    const syncForeground = () => setForeground(!document.hidden);
    syncMotion();
    syncForeground();
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncForeground);

    let frame = 0;
    const afterInitialPaint = () => {
      // Give the prerendered copy and portrait a paint opportunity before starting WebGL.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setNearby(true));
      });
    };
    const preloader = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        preloader.disconnect();
        if (document.readyState === "complete") afterInitialPaint();
        else window.addEventListener("load", afterInitialPaint, { once: true });
      }
    }, { rootMargin: "160px" });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preloader.observe(element);
    visibility.observe(element);
    return () => {
      preference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncForeground);
      window.removeEventListener("load", afterInitialPaint);
      cancelAnimationFrame(frame);
      preloader.disconnect();
      visibility.disconnect();
    };
  }, []);

  const renderScene = nearby && motion === true && !failed;
  const showScene = renderScene && ready && !fallbackFocused;
  const flip = useCallback(() => setFlipped(current => !current), []);
  const fail = useCallback(() => setFailed(true), []);
  const markReady = useCallback(() => setReady(true), []);

  return (
    <div className="hero-badge" ref={root} data-badge-ready={showScene} data-badge-fallback={!showScene}>
      <div
        className="hero-badge-fallback"
        aria-hidden={showScene}
        inert={showScene}
        onFocus={() => setFallbackFocused(true)}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFallbackFocused(false);
        }}
      >{children}</div>
      {renderScene && (
        <div className="hero-badge-canvas" aria-hidden="true">
          <BadgeBoundary onFailure={fail}>
            <BadgeScene profile={profile} active={visible && foreground && !fallbackFocused} flipped={flipped} onFlip={flip} onReady={markReady} onFailure={fail} />
          </BadgeBoundary>
        </div>
      )}
      {showScene && (
        <div className="hero-badge-controls">
          <button type="button" onClick={flip} aria-pressed={flipped}><RotateCw size={15} aria-hidden="true" />Flip profile badge</button>
          <p className="sr-only" aria-live="polite">
            {flipped
              ? `${profile.location}. Core focus: ${profile.specialties.join(", ")}.`
              : profile.name}
          </p>
        </div>
      )}
    </div>
  );
}
