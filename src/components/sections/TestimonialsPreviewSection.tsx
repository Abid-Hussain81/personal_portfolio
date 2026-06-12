import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeIn";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      <Quote className="h-8 w-8 text-primary/30" />
      <div className="mt-3 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-accent text-accent"
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        &ldquo;{testimonial.feedback}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <div className="relative h-11 w-11 overflow-hidden rounded-full p-px gradient-bg">
          <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted">
            {testimonial.position}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsPreviewSection() {
  const preview = testimonials.slice(0, 3);

  return (
    <section className="border-y border-border bg-card/30 py-10">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Clients Say"
            description="Real feedback from clients and collaborators who've worked with me on web projects."
          />
        </FadeIn>

        <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/50 hover:gap-3"
          >
            Read all testimonials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
