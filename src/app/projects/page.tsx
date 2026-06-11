import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { ProjectsPageContent } from "@/components/sections/ProjectsGrid";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of frontend projects built with React, Next.js, and modern web technologies.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="A collection of web applications, landing pages, and UI projects showcasing modern frontend craftsmanship."
      />
      <ProjectsPageContent />
    </>
  );
}
