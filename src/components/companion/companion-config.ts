import { companionContactHref } from "@/lib/companion-inquiry";

export const timing = {
  entrance: 4500,
  greeting: 7500,
  presence: 7000,
  minInterval: 25000,
  maxInterval: 40000,
  maxMessages: 4,
  dwell: 4500,
  rest: 60000,
  curious: 1200,
  farewell: 1050,
} as const;

export const homeSections = {
  hero: ".hero-section",
  expertise: "#expertise",
  capabilities: "#capabilities",
  approach: "#approach",
  experience: "#experience",
  toolkit: "#toolkit",
  contact: ".contact-panel",
} as const;

export type HomeSection = keyof typeof homeSections;

type Suggestion = { id: string; text: string; label: string; href: string; action: "contact" | "portfolio" | "resume" };

export const greetings = {
  hero: { id: "hero", text: "Hey! Let me show you around.", label: "Explore my work", href: "/projects", action: "portfolio" },
  expertise: { id: "expertise", text: "Need help building something for your team?", label: "Explore services", href: "/services", action: "portfolio" },
  capabilities: { id: "capabilities", text: "Try the interactive booking demo!", label: "Explore demos", href: "/#capabilities", action: "portfolio" },
  approach: { id: "approach", text: "Curious how we could work together?", label: "See the approach", href: "/#approach", action: "portfolio" },
  experience: { id: "experience", text: "Want to know more about Aabi?", label: "View experience", href: "/#experience", action: "portfolio" },
  toolkit: { id: "toolkit", text: "Looking for a React or Next.js developer?", label: "Explore skills", href: "/skills", action: "portfolio" },
  contact: { id: "contact", text: "Ready to build something together?", label: "Get in touch", href: companionContactHref(), action: "contact" },
} satisfies Record<HomeSection, Suggestion>;

export const generalGreetings: Suggestion[] = [
  { id: "welcome", text: "Hey! Welcome to Abid’s portfolio.", label: "Explore my work", href: "/projects", action: "portfolio" },
  { id: "demo", text: "Have you tried the interactive demos?", label: "Explore demos", href: "/#capabilities", action: "portfolio" },
  { id: "build", text: "Building something exciting? Let’s talk.", label: "Get in touch", href: companionContactHref(), action: "contact" },
];

export type { Suggestion };
