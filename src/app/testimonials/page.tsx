import type { Metadata } from "next";
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
    "Client testimonials and feedback from web development projects and collaborations.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
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
