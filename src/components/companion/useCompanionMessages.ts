import { useEffect, useState, type RefObject } from "react";
import { trackCompanion } from "@/lib/companion-analytics";
import { generalGreetings, greetings, timing, type HomeSection, type Suggestion } from "./companion-config";

const sessionKey = "aabidev.bit.session";
const hiddenKey = "aabidev.bit.hidden";

type Session = { count: number; muted: boolean; lastId?: string; nextAt: number };
const emptySession: Session = { count: 0, muted: false, nextAt: 0 };

function getSession(): Session {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(sessionKey) || "null") as Partial<Session> | null;
    if (stored && Number.isInteger(stored.count) && typeof stored.nextAt === "number") {
      return {
        count: Math.min(timing.maxMessages, Math.max(0, stored.count ?? 0)),
        muted: stored.muted === true,
        lastId: typeof stored.lastId === "string" ? stored.lastId : undefined,
        nextAt: stored.nextAt,
      };
    }
  } catch { /* Storage can be unavailable. */ }
  return emptySession;
}

export function useCompanionPreferences() {
  // The widget mounts client-side after the idle entrance delay.
  const [session, setSession] = useState(getSession);
  const [hidden, setHidden] = useState(() => {
    try { return window.localStorage.getItem(hiddenKey) === "1"; }
    catch { return false; }
  });

  function setCompanionHidden(value: boolean) {
    setHidden(value);
    try { window.localStorage.setItem(hiddenKey, value ? "1" : "0"); }
    catch { /* The current page still respects the preference. */ }
  }

  useEffect(() => {
    try { window.sessionStorage.setItem(sessionKey, JSON.stringify(session)); }
    catch { /* The current page still respects the preference. */ }
  }, [session]);

  return { session, setSession, hidden, setCompanionHidden };
}

export function useCompanionMessages({
  pathname, section, blocked, engaged, session, onSession,
}: {
  pathname: string;
  section: RefObject<{ section?: HomeSection; since: number }>;
  blocked: boolean;
  engaged: boolean;
  session: Session;
  onSession: (session: Session) => void;
}) {
  const [message, setMessage] = useState<(Suggestion & { pathname: string; section?: HomeSection; first: boolean }) | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (blocked || engaged || session.muted || session.count >= timing.maxMessages || document.hidden) return;
    let timer: number;
    function show() {
      if (document.hidden) return;
      const context = section.current;
      const dwellRemaining = timing.dwell - (Date.now() - context.since);
      if (pathname === "/" && context.section && dwellRemaining > 0) {
        timer = window.setTimeout(show, dwellRemaining);
        return;
      }
      const contextual = pathname === "/" && context.section ? greetings[context.section] : undefined;
      const next = contextual && contextual.id !== session.lastId
        ? contextual
        : generalGreetings.find(greeting => greeting.id !== session.lastId) ?? generalGreetings[0];
      const first = session.count === 0;
      const interval = timing.minInterval + Math.random() * (timing.maxInterval - timing.minInterval);
      setFading(false);
      setMessage({ ...next, pathname, section: context.section, first });
      onSession({ ...session, count: session.count + 1, lastId: next.id, nextAt: Date.now() + interval });
      trackCompanion("mascot_message_impression", { message: next.id, section: context.section });
    }
    const remaining = session.count ? session.nextAt - Date.now() : timing.greeting - performance.now();
    timer = window.setTimeout(show, Math.max(0, remaining));
    return () => window.clearTimeout(timer);
  }, [blocked, engaged, onSession, pathname, section, session]);

  useEffect(() => {
    if (!message) return;
    if (blocked || pathname !== message.pathname) {
      const timer = window.setTimeout(() => setMessage(null), 0);
      return () => window.clearTimeout(timer);
    }
    if (engaged) return;
    const fade = window.setTimeout(() => setFading(true), timing.presence - 240);
    const remove = window.setTimeout(() => setMessage(null), timing.presence);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(remove);
    };
  }, [blocked, engaged, message, pathname]);

  const visible = !blocked && !session.muted && message?.pathname === pathname ? message : null;
  return { message: visible, fading, clearMessage: () => setMessage(null) };
}
