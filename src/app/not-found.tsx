import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-28">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-8xl font-bold gradient-text">404</p>
          <h1 className="mt-4 text-3xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="mt-4 text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
            <Button href="/projects" variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              View Projects
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:text-accent">
              Contact me
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
