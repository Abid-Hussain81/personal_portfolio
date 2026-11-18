import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { ProjectsPageContent } from "@/components/sections/ProjectsGrid";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore my development experience across web applications, booking interfaces and API integrations.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Work & Capabilities"
        description="Web application interfaces, booking workflows and connected systems, with respect for client and employer confidentiality."
      />
      <ProjectsPageContent />
    </>
  );
}
