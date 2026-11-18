import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { testimonials } from "@/data/testimonials";
import { PageHeader, Container } from "@/components/layout/Container";
import { TestimonialCard } from "@/components/sections/TestimonialsPreviewSection";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Testimonials",
  description:
    "Professional background and experience of Abid Hussain, frontend-focused full-stack developer.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  if (testimonials.length === 0) {
    return <><PageHeader title="Professional Background" description="Explore my experience and connect with me about a role or project." /><Container className="py-16"><p className="max-w-2xl text-muted-foreground">For my professional background, visit my LinkedIn profile or review my experience and education.</p><div className="mt-6 flex flex-wrap gap-6"><a className="font-semibold text-primary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">View LinkedIn profile</a><Link className="font-semibold text-primary" href="/resume">View resume</Link></div></Container></>;
  }
  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Hear from clients and collaborators who have worked with me on web development projects."
      />
      <Container className="py-16 sm:py-20">
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </>
  );
}
