import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import type { Suggestion } from "./companion-config";

export function CompanionBubble({ suggestion, fading, onChoose, onDismiss, onEngaged }: {
  suggestion: Suggestion;
  fading: boolean;
  onChoose: () => void;
  onDismiss: (restoreFocus: boolean) => void;
  onEngaged: (engaged: boolean) => void;
}) {
  useEffect(() => () => onEngaged(false), [onEngaged]);

  return (
    <aside
      className="bit-bubble"
      aria-label="A tip from Bit"
      data-fading={fading}
      inert={fading}
      onFocus={() => onEngaged(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) onEngaged(false);
      }}
    >
      <button type="button" className="bit-icon-button bit-bubble-close" aria-label="Dismiss automatic tips for this session" onClick={event => onDismiss(event.detail === 0)}>
        <X size={15} aria-hidden="true" />
      </button>
      <p>{suggestion.text}</p>
      <Link href={suggestion.href} className="bit-bubble-action" onNavigate={onChoose}>
        {suggestion.label}<ArrowUpRight size={13} aria-hidden="true" />
      </Link>
    </aside>
  );
}
