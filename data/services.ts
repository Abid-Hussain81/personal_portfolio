export type ServiceIconName = "code" | "layout" | "rocket" | "briefcase" | "pen-tool" | "layers" | "mail" | "shield" | "wrench";
export type Service = { id: string; title: string; description: string; icon: ServiceIconName; featured?: boolean; };
export const services: Service[] = [
  { id: "web-applications", title: "Web Application Development", description: "Build responsive application interfaces, reusable components and data-driven features around your product requirements.", icon: "code", featured: true },
  { id: "booking-platforms", title: "Booking Systems & Interfaces", description: "Develop hotel search, availability, room selection and reservation interfaces, including loading, empty and error states across the booking journey.", icon: "briefcase", featured: true },
  { id: "api-integrations", title: "API Integrations", description: "Connect third-party REST APIs to your application, map response data and handle authentication, webhooks and application states.", icon: "layers", featured: true },
  { id: "figma-to-code", title: "Figma to Responsive Interfaces", description: "Turn designs into responsive, maintainable interfaces with consistent layouts, typography and interactions across screen sizes.", icon: "pen-tool", featured: true },
  { id: "backend-support", title: "Backend Support & Debugging", description: "Troubleshoot PHP and CodeIgniter applications, investigate data-handling issues and resolve problems across frontend and backend boundaries.", icon: "wrench", featured: true },
  { id: "website-performance", title: "Website Performance", description: "Use Lighthouse and PageSpeed Insights to identify bottlenecks, then improve images, asset delivery, minification and caching where appropriate.", icon: "rocket", featured: true },
  { id: "authentication", title: "Authentication & Connected Workflows", description: "Implement sign-in and access flows with Clerk and JWT, and connect workflows using webhooks and automation tools.", icon: "shield" },
  { id: "wordpress-maintenance", title: "WordPress & Website Maintenance", description: "Build and maintain WordPress and Elementor pages, update themes and plugins, check compatibility and fix existing website issues.", icon: "layout" },
];
export const featuredServiceIds = ["web-applications", "booking-platforms", "api-integrations", "figma-to-code", "backend-support", "website-performance"];
export const processSteps = [
  { number: "01", title: "Define the scope", description: "Discuss your users, requirements, existing systems and the outcome each feature needs to support." },
  { number: "02", title: "Map the experience", description: "Review designs, responsive layouts, data requirements and the states users will encounter." },
  { number: "03", title: "Build and connect", description: "Implement interfaces and integrations in reviewable steps, with clear updates on progress and questions." },
  { number: "04", title: "Review and hand over", description: "Check key workflows and screen sizes, address issues and document the work for handover." },
] as const;
