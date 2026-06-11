export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type Skill = {
  name: string;
  level: SkillLevel;
  proficiency: number;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "HTML5", level: "expert", proficiency: 95 },
      { name: "CSS3", level: "expert", proficiency: 92 },
      { name: "JavaScript", level: "advanced", proficiency: 88 },
      { name: "TypeScript", level: "advanced", proficiency: 82 },
      { name: "React.js", level: "advanced", proficiency: 90 },
      { name: "Next.js", level: "advanced", proficiency: 85 },
    ],
  },
  {
    id: "styling",
    title: "Styling",
    skills: [
      { name: "Tailwind CSS", level: "expert", proficiency: 93 },
      { name: "Bootstrap", level: "advanced", proficiency: 85 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", level: "advanced", proficiency: 85 },
      { name: "GitHub", level: "advanced", proficiency: 88 },
      { name: "Figma", level: "advanced", proficiency: 80 },
      { name: "VS Code", level: "expert", proficiency: 95 },
    ],
  },
  {
    id: "backend-services",
    title: "Backend & Services",
    skills: [
      { name: "Firebase", level: "intermediate", proficiency: 75 },
    ],
  },
];

export const levelLabels: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};
