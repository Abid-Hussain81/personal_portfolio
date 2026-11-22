import type { Metadata } from "next";
import { InteriorPage, InteriorHero } from "@/components/layout/InteriorPage";
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
    <InteriorPage className="experience-page">
      <InteriorHero
        eyebrow="03 / Experience"
        title="Practical experience."
        accent="Thoughtful execution."
        description="The roles, projects and learning behind the work. Explore my experience, skills, education and certifications."
      />
      <ResumePageContent />
    </InteriorPage>
  );
}
