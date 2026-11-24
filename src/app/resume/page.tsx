import type { Metadata } from "next";
import { InteriorPage, InteriorHero } from "@/components/layout/InteriorPage";
import { ResumePageContent } from "@/components/sections/ResumePageContent";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Experience & Resume",
  description:
    "Read Abid Hussain’s work history, technical skills, education, and certifications. Download the resume for details on frontend and API integration work.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <InteriorPage className="experience-page">
      <InteriorHero
        title="Practical experience."
        accent="Thoughtful execution."
        description="The roles, projects and learning behind the work. Explore my experience, skills, education and certifications."
      />
      <ResumePageContent />
    </InteriorPage>
  );
}
