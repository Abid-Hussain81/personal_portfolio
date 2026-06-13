import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8">
      <div className="flex items-center justify-between">
        <Quote className="h-6 w-6 text-primary/20" />
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-sm text-muted-foreground">
        &ldquo;{testimonial.feedback}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary/15 shrink-0">
          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-caption text-xs truncate">
            {testimonial.position}, {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsPreviewSection() {
  return (
    <section className="border-y border-border bg-secondary/40 py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Clients Say"
            description="Real feedback from clients and collaborators who've worked with me on web projects."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:border-primary hover:text-white hover:gap-3"
          >
            Read all testimonials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
