export const profile = {
  name: "Abid Hussain",
  role: "Frontend-Focused Full-Stack Developer",
  location: "Lahore, Pakistan",
  tagline: "From a clear idea to a working product.",
  subheadline: "I help startup founders and software teams build web applications, booking platforms and API integrations. Clear interfaces, connected workflows and code your team can maintain.",
  about: "I'm a frontend-focused full-stack developer based in Lahore, Pakistan, with 2+ years of experience across freelance projects and production web applications. I work with startup founders, software agencies and development teams to turn Figma designs into responsive interfaces and connect applications to REST APIs. My experience includes booking workflows, API-driven interfaces, PHP and CodeIgniter debugging, and website performance improvements.",
  email: "dev.abidhussain@gmail.com",
  linkedin: "https://www.linkedin.com/in/abid-hussain-6853043a1/",
  github: "https://github.com/Abid-Hussain81",
  resumeUrl: "/resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abidhussainportfolio.vercel.app",
  focus: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "REST APIs", "PHP", "CodeIgniter", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Git", "Figma"],
  mission: "Make complex application workflows easier to use through clear interfaces, dependable integrations and maintainable code.",
  learningJourney: "My toolkit spans frontend development, backend support, authentication, databases and automation. I choose tools around the requirements and keep learning through practical implementation and debugging.",
  careerStory: "Before joining The Mind Gauge, I delivered independent freelance web projects. Since June 2025, I have worked on production applications with designers and backend developers. I also contributed remotely to client projects at Gaply. That experience shapes how I approach responsive design, API integration and cross-stack troubleshooting.",
  whatIDo: [
    "Build responsive web application interfaces",
    "Develop booking search and reservation workflows",
    "Connect third-party APIs and handle application states",
    "Turn Figma designs into working interfaces",
    "Debug PHP and CodeIgniter applications",
    "Improve performance and maintain existing websites",
  ],
  timeline: [
    { year: "2021 - 2025", title: "BS Information Technology", description: "Studied at MNS University of Agriculture, Multan, graduating with a CGPA of 3.60/4.00." },
    { year: "Before June 2025", title: "Independent Freelance Projects", description: "Delivered freelance web development projects before joining The Mind Gauge." },
    { year: "June 2025 - Present", title: "Frontend Developer at The Mind Gauge", description: "Build and maintain production interfaces, integrate REST APIs and support PHP and CodeIgniter applications." },
    { year: "September 2025 - January 2026", title: "Frontend Developer at Gaply", description: "Contributed remotely to client web applications in a part-time role." },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Expertise" },
  { href: "/resume", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { label: "Across freelance & production work", value: "2+ years" },
  { label: "Information Technology", value: "BS IT" },
  { label: "University CGPA", value: "3.60/4.00" },
  { label: "Open to international opportunities", value: "Remote" },
] as const;

export const socialLinks = [
  { name: "GitHub", href: profile.github, label: "GitHub profile" },
  { name: "LinkedIn", href: profile.linkedin, label: "LinkedIn profile" },
  { name: "Email", href: "mailto:" + profile.email, label: "Send email" },
] as const;
