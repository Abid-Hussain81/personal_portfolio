import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Companion concepts",
  robots: { index: false, follow: false },
};

export default async function CompanionPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const { CompanionConcepts } = await import("@/components/companion/CompanionConcepts");
  return <CompanionConcepts />;
}
