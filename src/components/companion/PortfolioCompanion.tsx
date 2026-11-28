"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { trackCompanion } from "@/lib/companion-analytics";
import { CompanionBubble } from "./CompanionBubble";
import { CompanionCharacter, type CharacterState } from "./CompanionCharacter";
import { CompanionPanel, type Destination, type PanelView } from "./CompanionPanel";
import { timing } from "./companion-config";
import { useCompanionEnvironment } from "./useCompanionEnvironment";
import { useCompanionGaze } from "./useCompanionGaze";
import { useCompanionMessages, useCompanionPreferences } from "./useCompanionMessages";
import "@/app/companion.css";

export function PortfolioCompanion({ whatsapp }: { whatsapp?: string }) {
  const pathname = usePathname();
  const conceptPreview = pathname === "/companion-preview";
  const [entered, setEntered] = useState(false);
  const [panel, setPanel] = useState<{ view: PanelView; pathname: string } | null>(null);
  const [gesture, setGesture] = useState<"happy" | "farewell" | null>(null);
  const [bubbleEngaged, setBubbleEngaged] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const restoreButton = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const impression = useRef(false);
  const gestureTimer = useRef<number>(0);
  const { section, pageHidden, obstructed, resting } = useCompanionEnvironment(pathname);
  const { session, setSession, hidden, setCompanionHidden } = useCompanionPreferences();
  const view = !obstructed && panel?.pathname === pathname ? panel.view : null;
  const visible = entered && !hidden && !obstructed && !conceptPreview;
  const { message, fading, clearMessage } = useCompanionMessages({
    pathname, section, blocked: !visible || pageHidden || Boolean(view) || gesture === "farewell",
    engaged: bubbleEngaged, session, onSession: setSession,
  });
  const curious = useCompanionGaze(launcher, visible && !pageHidden && !view && !message);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), Math.max(0, timing.entrance - performance.now()));
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || pageHidden || impression.current) return;
    impression.current = true;
    trackCompanion("mascot_impression", { section: section.current.section });
  }, [pageHidden, section, visible]);

  useLayoutEffect(() => {
    if (view) heading.current?.focus({ preventScroll: true });
  }, [view]);

  useEffect(() => {
    if (!panel || (!obstructed && panel.pathname === pathname)) return;
    const timer = window.setTimeout(() => {
      setPanel(null);
      trackCompanion("mascot_panel_close", { section: section.current.section, action: obstructed ? "overlay" : "navigation" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [obstructed, panel, pathname, section]);

  useEffect(() => {
    if (!view && !message) return;
    function onOutside(event: PointerEvent) {
      if (!view || widget.current?.contains(event.target as Node)) return;
      setPanel(null);
      trackCompanion("mascot_panel_close", { section: section.current.section, action: "outside" });
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented || (!view && !widget.current?.contains(document.activeElement))) return;
      event.preventDefault();
      if (view) {
        setPanel(null);
        trackCompanion("mascot_panel_close", { section: section.current.section, action: "escape" });
      } else {
        setBubbleEngaged(false);
        setSession(current => ({ ...current, muted: true }));
        trackCompanion("mascot_dismiss", { message: message?.id, section: section.current.section, action: "mute" });
      }
      launcher.current?.focus({ preventScroll: true });
    }
    window.addEventListener("pointerdown", onOutside, { passive: true });
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("keydown", onEscape);
    };
  }, [message, section, setSession, view]);

  useEffect(() => () => window.clearTimeout(gestureTimer.current), []);

  function track(event: Parameters<typeof trackCompanion>[0], properties: Parameters<typeof trackCompanion>[1] = {}) {
    trackCompanion(event, { section: section.current.section, ...properties });
  }

  function play(next: "happy" | "farewell") {
    window.clearTimeout(gestureTimer.current);
    setGesture(next);
    gestureTimer.current = window.setTimeout(() => setGesture(null), next === "happy" ? 650 : timing.farewell);
  }

  function closePanel(action: string, focus = true) {
    setPanel(null);
    track("mascot_panel_close", { action });
    if (focus) launcher.current?.focus({ preventScroll: true });
  }

  function togglePanel() {
    track("mascot_click", { action: view ? "close" : "open" });
    if (view) { closePanel("launcher"); return; }
    setBubbleEngaged(false);
    clearMessage();
    play("happy");
    setPanel({ view: { step: "home" }, pathname });
    track("mascot_panel_open");
  }

  function changeView(next: PanelView) {
    if (next.step === "project-contact") track("mascot_project_interest", { category: next.topic });
    if (next.step === "hire-contact") track("mascot_hiring_interest", { category: next.topic });
    setPanel({ view: next, pathname });
  }

  function openDestination(destination: Destination) {
    if (destination.event) track(destination.event, { action: destination.id, category: destination.category });
    if (destination.id === "contact" || destination.id === "whatsapp") play("farewell");
    closePanel(destination.id, Boolean(destination.external));
  }

  function toggleMessages(muted: boolean, restoreFocus = false) {
    if (muted) track("mascot_dismiss", { action: "mute", message: message?.id });
    clearMessage();
    setBubbleEngaged(false);
    setSession(current => ({ ...current, muted }));
    if (restoreFocus) launcher.current?.focus({ preventScroll: true });
  }

  function hide() {
    closePanel("hide", false);
    track("mascot_dismiss", { action: "hide" });
    setCompanionHidden(true);
    window.requestAnimationFrame(() => restoreButton.current?.focus({ preventScroll: true }));
  }

  function restore() {
    setCompanionHidden(false);
    window.requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
  }

  if (!entered || conceptPreview) return null;
  const state: CharacterState = gesture ?? (view ? "thinking" : message ? (message.first ? "greeting" : "guiding") : curious ? "curious" : resting ? "resting" : "idle");

  return (
    <div ref={widget} className="bit-widget" data-page-hidden={pageHidden} hidden={obstructed}>
      {hidden ? (
        <button ref={restoreButton} type="button" className="bit-restore" onClick={restore}>Show Bit</button>
      ) : <>
        <button
          ref={launcher}
          type="button"
          className="bit-launcher"
          data-bit-launcher
          aria-label="Bit, Aabi’s digital companion"
          aria-expanded={Boolean(view)}
          aria-controls={view ? "bit-panel" : undefined}
          aria-haspopup="dialog"
          onClick={togglePanel}
        >
          <CompanionCharacter state={state} />
        </button>
        {message && (
          <CompanionBubble
            suggestion={message}
            fading={fading}
            onEngaged={setBubbleEngaged}
            onDismiss={restoreFocus => toggleMessages(true, restoreFocus)}
            onChoose={() => {
              track("mascot_message_click", { message: message.id, action: message.action, section: message.section });
              track(message.action === "contact" ? "mascot_contact_click" : "mascot_portfolio_click", { message: message.id });
              if (message.action === "contact") play("farewell");
              setBubbleEngaged(false);
              clearMessage();
            }}
          />
        )}
        {view && (
          <CompanionPanel
            view={view}
            heading={heading}
            muted={session.muted}
            whatsapp={whatsapp}
            onView={changeView}
            onDestination={openDestination}
            onClose={() => closePanel("button")}
            onMute={() => toggleMessages(!session.muted)}
            onHide={hide}
          />
        )}
      </>}
    </div>
  );
}
