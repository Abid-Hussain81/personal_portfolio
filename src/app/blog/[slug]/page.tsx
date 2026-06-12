import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Container } from "@/components/layout/Container";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return createMetadata({ title: "Article Not Found" });

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <Container className="py-28 sm:py-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article className="mx-auto mt-10 max-w-3xl">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-white p-8 shadow-sm">
          <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-primary">Note: </span>
              This is a placeholder article page. Full blog content management
              will be added in a future update. For now, you can update article
              metadata in{" "}
              <code className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-mono text-primary">
                data/blog.ts
              </code>
              .
            </p>
          </div>
        </div>
      </article>
    </Container>
  );
}
