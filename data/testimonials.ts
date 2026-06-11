export type Testimonial = {
  id: string;
  name: string;
  position: string;
  company: string;
  feedback: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    position: "Founder",
    company: "Bloom Studio",
    feedback:
      "Abid transformed our Figma designs into a stunning, responsive website that exceeded our expectations. His attention to detail and communication throughout the project were outstanding.",
    avatar: "/avatars/sarah-mitchell.svg",
    rating: 5,
  },
  {
    id: "james-chen",
    name: "James Chen",
    position: "Product Manager",
    company: "TechFlow Inc.",
    feedback:
      "Working with Abid on our SaaS landing page was seamless. He delivered a fast, polished product that helped us increase sign-ups by 40%. Highly recommend for any frontend work.",
    avatar: "/avatars/james-chen.svg",
    rating: 5,
  },
  {
    id: "emily-rodriguez",
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "Elevate Digital",
    feedback:
      "Abid's email templates were pixel-perfect across all clients. He understood our brand guidelines perfectly and delivered ahead of schedule. A true professional.",
    avatar: "/avatars/emily-rodriguez.svg",
    rating: 5,
  },
  {
    id: "david-kumar",
    name: "David Kumar",
    position: "Startup Founder",
    company: "LaunchPad",
    feedback:
      "From concept to deployment, Abid built our entire frontend with React and Firebase auth. Clean code, great UX, and ongoing support. Couldn't ask for a better developer.",
    avatar: "/avatars/david-kumar.svg",
    rating: 5,
  },
  {
    id: "lisa-thompson",
    name: "Lisa Thompson",
    position: "Creative Director",
    company: "Pixel & Co.",
    feedback:
      "Abid's Figma-to-React conversions are incredibly accurate. Every spacing, color, and interaction matches the design spec. He's become our go-to frontend developer.",
    avatar: "/avatars/lisa-thompson.svg",
    rating: 5,
  },
  {
    id: "michael-obrien",
    name: "Michael O'Brien",
    position: "CTO",
    company: "DataSync",
    feedback:
      "Abid optimized our legacy website and rebuilt key pages with Next.js. Page load times dropped by 60% and our bounce rate improved significantly. Excellent work.",
    avatar: "/avatars/michael-obrien.svg",
    rating: 5,
  },
];
