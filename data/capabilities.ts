export const capabilityDemos = [
  {
    id: "booking",
    tone: "sage",
    title: "Multi-step booking engine",
    description: "Explore a room reservation from dates to confirmation.",
    preview: "Stay booking",
    architecture: {
      state: "Preserve dates and room selection between steps.",
      integration: "Fetch availability by date and recheck prices at booking.",
      performance: "Cache each search and load room details on demand.",
      stack: ["Next.js", "Zustand", "REST APIs"],
    },
  },
  {
    id: "dashboard",
    tone: "lavender",
    title: "REST API dashboard",
    description: "Switch between healthy and error responses in a request monitor.",
    preview: "Request monitor",
    architecture: {
      state: "Store the filter in the URL and surface empty and failed responses separately.",
      integration: "Poll for recent requests and back off after failures.",
      performance: "Paginate on the server and pause polling in background tabs.",
      stack: ["React", "TanStack Query", "REST APIs"],
    },
  },
  {
    id: "design-system",
    tone: "peach",
    title: "Figma to Next.js design system",
    description: "Switch viewports to see how the same components adapt.",
    preview: "Component library",
    architecture: {
      state: "Use typed component variants and shared CSS breakpoints.",
      integration: "Map Figma tokens to CSS variables and use typed props for API content.",
      performance: "Render the layout on the server and hydrate the interactive components.",
      stack: ["Figma", "Next.js", "TypeScript", "Tailwind CSS"],
    },
  },
] as const;

export type CapabilityDemo = (typeof capabilityDemos)[number];
