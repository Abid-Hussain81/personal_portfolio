export type Skill = { name: string };
export type SkillCategory = { id: string; title: string; skills: Skill[] };
export const skillCategories: SkillCategory[] = [
  { id: "frontend", title: "Frontend & Responsive Interfaces", skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "shadcn/ui", "Zustand", "TanStack Query", "Zod"].map(name => ({ name })) },
  { id: "backend", title: "Backend & API Integration", skills: ["REST APIs", "GraphQL", "PHP", "CodeIgniter", "Node.js", "NestJS", "Convex", "Axios"].map(name => ({ name })) },
  { id: "data-auth", title: "Data, Authentication & Automation", skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Clerk", "JWT Authentication", "Webhooks", "n8n"].map(name => ({ name })) },
  { id: "tools", title: "Tools & Performance", skills: ["Git", "GitHub", "Postman", "Figma", "VS Code", "Docker", "Lighthouse", "Google PageSpeed Insights", "Image Optimization"].map(name => ({ name })) },
  { id: "wordpress", title: "Website Maintenance", skills: ["WordPress", "Elementor", "Theme & Plugin Management", "Compatibility Testing", "Website Troubleshooting"].map(name => ({ name })) },
];
