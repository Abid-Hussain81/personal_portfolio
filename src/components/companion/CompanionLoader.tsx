"use client";

import { useEffect, useState, type ComponentType } from "react";

export function CompanionLoader({ whatsapp }: { whatsapp?: string }) {
  const [Companion, setCompanion] = useState<ComponentType<{ whatsapp?: string }> | null>(null);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      void import("./PortfolioCompanion").then(module => {
        if (active) setCompanion(() => module.PortfolioCompanion);
      }).catch(() => {
        // The widget is optional if its chunk fails to load.
      });
    }, Math.max(0, 1500 - performance.now()));
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  return Companion ? <Companion whatsapp={whatsapp} /> : null;
}
