export const profile = {
  name: "Abid Hussain",
  role: "Frontend Developer & Web Developer",
  location: "Pakistan",
  tagline: "Frontend Developer Building Modern Web Experiences",
  subheadline:
    "I create responsive, fast, and user-friendly websites that help businesses grow online.",
  about:
    "I am a Frontend Developer passionate about building responsive, modern, and user-friendly web applications. I specialize in converting UI/UX designs into pixel-perfect websites and creating clean, scalable interfaces using modern frontend technologies. I enjoy solving UI challenges, optimizing user experiences, and continuously learning new technologies.",
  email: "abid.hussain@example.com",
  linkedin: "https://linkedin.com/in/abid-hussain",
  github: "https://github.com/abid-hussain",
  resumeUrl: "/resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abidhussain.dev",
  focus: [
    "Frontend Development",
    "Responsive Web Design",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "JavaScript",
    "Next.js",
    "React.js",
    "Firebase Authentication",
    "Email Template Development",
    "Figma to HTML",
    "Figma to React",
    "Website Optimization",
  ],
  mission:
    "To craft exceptional digital experiences that combine beautiful design with flawless functionality, helping businesses and individuals establish a powerful online presence.",
  learningJourney:
    "From exploring HTML and CSS fundamentals to mastering modern React ecosystems, my journey has been driven by curiosity and a commitment to building products that users love.",
  careerStory:
    "What started as a fascination with how websites work evolved into a dedicated career in frontend development. Today, I partner with clients and teams to transform ideas into polished, production-ready web applications.",
  whatIDo: [
    "Convert Figma designs into pixel-perfect, responsive websites",
    "Build scalable React and Next.js applications",
    "Optimize websites for performance and accessibility",
    "Integrate authentication and modern backend services",
    "Develop email templates and landing pages that convert",
  ],
  timeline: [
    {
      year: "2020",
      title: "Learning Web Development",
      description:
        "Started with HTML, CSS, and JavaScript fundamentals. Built small projects to understand how the web works.",
    },
    {
      year: "2021",
      title: "Building Real Projects",
      description:
        "Created responsive websites and interactive UIs. Explored Bootstrap, Tailwind CSS, and modern layout techniques.",
    },
    {
      year: "2022",
      title: "Freelance Work",
      description:
        "Began taking on freelance projects — landing pages, portfolio sites, and Figma-to-code conversions for clients.",
    },
    {
      year: "2023 – Present",
      title: "Advanced Frontend Development",
      description:
        "Focused on React, Next.js, TypeScript, and Firebase. Delivering premium web experiences with performance and UX in mind.",
    },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { label: "Projects Completed", value: "25+" },
  { label: "Technologies Used", value: "15+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Years Learning & Building", value: "4+" },
] as const;

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/abid-hussain",
    label: "GitHub profile",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/abid-hussain",
    label: "LinkedIn profile",
  },
  {
    name: "Email",
    href: "mailto:abid.hussain@example.com",
    label: "Send email",
  },
] as const;
