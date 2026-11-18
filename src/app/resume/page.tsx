import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { ResumePageContent } from "@/components/sections/ResumePageContent";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description:
    "Professional resume of Abid Hussain, a frontend-focused full-stack developer working on production interfaces, booking workflows and API integrations.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        title="Resume"
        description="Professional experience, skills, education, and certifications."
      />
      <ResumePageContent />
    </>
  );
}
