export type ServiceIconName =
  | "code"
  | "layout"
  | "rocket"
  | "briefcase"
  | "pen-tool"
  | "layers"
  | "mail"
  | "shield"
  | "wrench";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "frontend-development",
    title: "Frontend Development",
    description:
      "Custom frontend solutions using React, Next.js, and modern JavaScript. Clean architecture, reusable components, and maintainable code.",
    icon: "code",
    featured: true,
  },
  {
    id: "responsive-website",
    title: "Responsive Website Development",
    description:
      "Websites that look and perform flawlessly across all devices — from mobile phones to large desktop screens.",
    icon: "layout",
    featured: true,
  },
  {
    id: "landing-page",
    title: "Landing Page Development",
    description:
      "High-converting landing pages designed to capture attention, communicate value, and drive user action.",
    icon: "rocket",
    featured: true,
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website Development",
    description:
      "Professional portfolio websites that showcase your work, skills, and personality to attract clients and opportunities.",
    icon: "briefcase",
  },
  {
    id: "figma-to-html",
    title: "Figma to HTML Conversion",
    description:
      "Pixel-perfect conversion of Figma designs into semantic, accessible HTML and CSS with responsive layouts.",
    icon: "pen-tool",
    featured: true,
  },
  {
    id: "figma-to-react",
    title: "Figma to React Conversion",
    description:
      "Transform design files into production-ready React components with clean structure and modern styling.",
    icon: "layers",
    featured: true,
  },
  {
    id: "email-templates",
    title: "Email Template Development",
    description:
      "Cross-client compatible email templates that render consistently across Gmail, Outlook, and mobile devices.",
    icon: "mail",
    featured: true,
  },
  {
    id: "firebase-auth",
    title: "Firebase Authentication Integration",
    description:
      "Secure user authentication flows including sign-up, login, password reset, and social auth with Firebase.",
    icon: "shield",
    featured: true,
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance & Bug Fixing",
    description:
      "Ongoing support, performance improvements, bug fixes, and feature updates to keep your site running smoothly.",
    icon: "wrench",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description:
      "Modernize outdated websites with fresh UI, improved UX, and updated technology stacks.",
    icon: "layout",
    featured: true,
  },
];

export const featuredServiceIds = [
  "frontend-development",
  "figma-to-html",
  "figma-to-react",
  "landing-page",
  "responsive-website",
  "website-redesign",
  "email-templates",
  "firebase-auth",
];
