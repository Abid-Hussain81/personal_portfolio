import { useEffect, useState, type RefObject } from "react";
import { timing } from "./companion-config";

export function useCompanionGaze(launcher: RefObject<HTMLButtonElement | null>, enabled: boolean) {
  const [curious, setCurious] = useState(false);

  useEffect(() => {
    const element = launcher.current;
    if (!enabled || !element) return;
    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let timer: number;
    let frame = 0;
    let looking = false;
    let x = 0;
    let y = 0;

    function reset() {
      window.clearTimeout(timer);
      element?.style.removeProperty("--bit-gaze-x");
      element?.style.removeProperty("--bit-gaze-y");
      if (looking) setCurious(false);
      looking = false;
    }

    function draw() {
      frame = 0;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const dx = x - bounds.left - bounds.width / 2;
      const dy = y - bounds.top - bounds.height / 2;
      if (Math.hypot(dx, dy) > 125) { reset(); return; }

      element.style.setProperty("--bit-gaze-x", Math.max(-2.6, Math.min(2.6, dx / 26)) + "px");
      element.style.setProperty("--bit-gaze-y", Math.max(-2.2, Math.min(2.2, dy / 28)) + "px");
      if (!looking) setCurious(true);
      looking = true;
      window.clearTimeout(timer);
      timer = window.setTimeout(reset, timing.curious);
    }

    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType !== "mouse" || document.hidden) return;
      if (!looking && (event.clientX < window.innerWidth - 230 || event.clientY < window.innerHeight - 250)) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(draw);
    }

    window.addEventListener("pointermove", move, { passive: true });
    motion.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      motion.removeEventListener("change", reset);
      window.cancelAnimationFrame(frame);
      reset();
    };
  }, [enabled, launcher]);

  return enabled && curious;
}
