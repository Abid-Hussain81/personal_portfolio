export type BlogCategory =
  | "Development"
  | "Design"
  | "Tutorial"
  | "Career"
  | "Tools";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  author: string;
};

export const blogCategories: Array<BlogCategory | "All"> = [
  "All",
  "Development",
  "Design",
  "Tutorial",
  "Career",
  "Tools",
];

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-portfolio-guide",
    slug: "building-modern-portfolio-nextjs",
    title: "Building a Modern Portfolio with Next.js App Router",
    excerpt:
      "Learn how to create a premium developer portfolio using Next.js 14+, Tailwind CSS, and Framer Motion for smooth animations.",
    category: "Development",
    date: "2025-11-15",
    readTime: "8 min read",
    featured: true,
    image: "/blog/nextjs-portfolio.svg",
    author: "Abid Hussain",
  },
  {
    id: "figma-to-react",
    slug: "figma-to-react-best-practices",
    title: "Figma to React: Best Practices for Pixel-Perfect UI",
    excerpt:
      "A practical guide to converting Figma designs into clean, maintainable React components without losing design fidelity.",
    category: "Design",
    date: "2025-10-22",
    readTime: "6 min read",
    featured: false,
    image: "/blog/figma-react.svg",
    author: "Abid Hussain",
  },
  {
    id: "tailwind-tips",
    slug: "tailwind-css-productivity-tips",
    title: "10 Tailwind CSS Tips to Boost Your Productivity",
    excerpt:
      "Discover advanced Tailwind techniques, custom configurations, and workflow optimizations for faster development.",
    category: "Tutorial",
    date: "2025-09-08",
    readTime: "5 min read",
    featured: false,
    image: "/blog/tailwind-tips.svg",
    author: "Abid Hussain",
  },
  {
    id: "freelance-frontend",
    slug: "starting-freelance-frontend-career",
    title: "Starting Your Freelance Frontend Development Career",
    excerpt:
      "Essential tips for landing your first clients, pricing your services, and building a portfolio that converts.",
    category: "Career",
    date: "2025-08-14",
    readTime: "7 min read",
    featured: false,
    image: "/blog/freelance-career.svg",
    author: "Abid Hussain",
  },
  {
    id: "web-performance",
    slug: "frontend-performance-optimization",
    title: "Frontend Performance Optimization: A Practical Guide",
    excerpt:
      "Core Web Vitals, lazy loading, code splitting, and image optimization techniques for faster websites.",
    category: "Development",
    date: "2025-07-03",
    readTime: "9 min read",
    featured: false,
    image: "/blog/performance.svg",
    author: "Abid Hussain",
  },
  {
    id: "vscode-extensions",
    slug: "essential-vscode-extensions-frontend",
    title: "Essential VS Code Extensions for Frontend Developers",
    excerpt:
      "My curated list of VS Code extensions that save time and improve code quality for web development.",
    category: "Tools",
    date: "2025-06-18",
    readTime: "4 min read",
    featured: false,
    image: "/blog/vscode-extensions.svg",
    author: "Abid Hussain",
  },
];

export const featuredPost = blogPosts.find((post) => post.featured);
