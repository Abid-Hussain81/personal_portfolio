import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { ResumePageContent } from "@/components/sections/ResumePageContent";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description:
    "Professional resume of Abid Hussain — Frontend Developer with experience in React, Next.js, and modern web technologies.",
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
