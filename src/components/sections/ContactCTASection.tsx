import { ArrowRight, MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";

export function ContactCTASection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageCircle className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
                Let&apos;s discuss your ideas and build something exceptional
                together. I&apos;m available for freelance projects and remote
                opportunities.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get In Touch
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`mailto:${profile.email}`} variant="secondary" size="lg">
                  {profile.email}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
