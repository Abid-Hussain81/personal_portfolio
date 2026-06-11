export type ProjectCategory =
  | "React"
  | "Next.js"
  | "Landing Pages"
  | "Frontend"
  | "Personal Projects";

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  imageAlt: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  categories: ProjectCategory[];
};

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "React",
  "Next.js",
  "Landing Pages",
  "Frontend",
  "Personal Projects",
];

export const projects: Project[] = [
  {
    id: "devfolio-pro",
    title: "DevFolio Pro",
    description:
      "A premium developer portfolio template with dark mode, animations, and CMS-ready structure.",
    longDescription:
      "Built with Next.js App Router and Tailwind CSS, featuring smooth Framer Motion animations, SEO optimization, and a config-driven content system for easy updates.",
    image: "/projects/devfolio-pro.svg",
    imageAlt: "DevFolio Pro portfolio website preview",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com/devfolio-pro",
    githubUrl: "https://github.com/abid-hussain/devfolio-pro",
    featured: true,
    categories: ["Next.js", "Frontend", "Personal Projects"],
  },
  {
    id: "saas-landing",
    title: "SaaS Launch Landing Page",
    description:
      "High-converting SaaS landing page with pricing tiers, feature highlights, and animated hero section.",
    longDescription:
      "Designed and developed from Figma mockups with focus on conversion optimization, responsive layouts, and fast load times.",
    image: "/projects/saas-landing.svg",
    imageAlt: "SaaS landing page preview",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com/saas-landing",
    githubUrl: "https://github.com/abid-hussain/saas-landing",
    featured: true,
    categories: ["React", "Landing Pages", "Frontend"],
  },
  {
    id: "ecommerce-ui",
    title: "E-Commerce UI Kit",
    description:
      "Modern e-commerce storefront UI with product grid, cart drawer, and checkout flow components.",
    image: "/projects/ecommerce-ui.svg",
    imageAlt: "E-commerce UI kit preview",
    techStack: ["React", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/ecommerce-ui",
    githubUrl: "https://github.com/abid-hussain/ecommerce-ui",
    featured: true,
    categories: ["React", "Frontend"],
  },
  {
    id: "agency-website",
    title: "Creative Agency Website",
    description:
      "Full agency website with services showcase, team section, case studies, and contact form.",
    image: "/projects/agency-website.svg",
    imageAlt: "Creative agency website preview",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://example.com/agency-website",
    githubUrl: "https://github.com/abid-hussain/agency-website",
    featured: true,
    categories: ["Next.js", "Frontend"],
  },
  {
    id: "auth-dashboard",
    title: "Auth Dashboard",
    description:
      "User dashboard with Firebase authentication, protected routes, and profile management.",
    image: "/projects/auth-dashboard.svg",
    imageAlt: "Authentication dashboard preview",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com/auth-dashboard",
    githubUrl: "https://github.com/abid-hussain/auth-dashboard",
    featured: false,
    categories: ["React", "Frontend", "Personal Projects"],
  },
  {
    id: "startup-landing",
    title: "Startup Launch Page",
    description:
      "Minimal startup landing page with waitlist signup, social proof, and FAQ accordion.",
    image: "/projects/startup-landing.svg",
    imageAlt: "Startup landing page preview",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/startup-landing",
    githubUrl: "https://github.com/abid-hussain/startup-landing",
    featured: false,
    categories: ["Landing Pages", "Frontend"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
