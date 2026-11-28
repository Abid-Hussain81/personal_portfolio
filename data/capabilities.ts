export const capabilityDemos = [
  {
    id: "booking",
    title: "Multi-step booking engine",
    description: "From availability to booking confirmation.",
    preview: "Stay booking",
    architecture: {
      flow: [
        { title: "Collect dates", detail: "Validate the date range and keep the selection between steps." },
        { title: "Match availability", detail: "Filter rooms by booked nights and calculate the stay total." },
        { title: "Confirm the selection", detail: "Carry the chosen room, dates and total into the confirmation." },
      ],
      stack: ["Next.js", "React state", "TypeScript"],
    },
  },
  {
    id: "dashboard",
    title: "REST API integrations",
    description: "Connecting interfaces with reliable backend services.",
    preview: "Request console",
    architecture: {
      flow: [
        { title: "Build the request", detail: "Pair a GET endpoint with a sample response scenario." },
        { title: "Wait for a response", detail: "Show pending state while the simulated request resolves." },
        { title: "Render the result", detail: "Pair the HTTP status with the formatted JSON body." },
      ],
      stack: ["React state", "HTTP status codes", "JSON fixtures"],
    },
  },
  {
    id: "design-system",
    title: "Figma to Next.js",
    description: "Turning designs into responsive, reusable interfaces.",
    preview: "Component library",
    architecture: {
      flow: [
        { title: "Map design tokens", detail: "Translate typography, color and spacing into shared CSS values." },
        { title: "Compose typed components", detail: "Use the same card component with different project data." },
        { title: "Adapt the layout", detail: "Let the preview container control the grid columns." },
      ],
      stack: ["Figma", "Next.js", "TypeScript", "CSS container queries"],
    },
  },
] as const;

export type CapabilityDemo = (typeof capabilityDemos)[number];
