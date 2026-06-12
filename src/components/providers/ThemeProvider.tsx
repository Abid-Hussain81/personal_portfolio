"use client";

import type { ReactNode } from "react";

// Light-only portfolio — no theme switching needed.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
