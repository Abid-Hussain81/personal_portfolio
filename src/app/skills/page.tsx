import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { SkillsPageContent } from "@/components/sections/SkillsPageContent";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description:
    "Technical toolkit spanning frontend development, REST APIs, PHP, Node.js, databases, authentication and performance.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="Skills & Expertise"
        description="The frontend, backend and integration tools I use across web development work."
      />
      <SkillsPageContent />
    </>
  );
}
