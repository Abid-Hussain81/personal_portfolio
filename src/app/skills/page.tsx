import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { SkillsPageContent } from "@/components/sections/SkillsPageContent";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description:
    "Technical skills and proficiency in HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, and more.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="Skills & Expertise"
        description="Technologies and tools I use to build fast, accessible, and beautifully crafted web experiences."
      />
      <SkillsPageContent />
    </>
  );
}
