"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Search } from "lucide-react";
import { blogCategories, blogPosts, featuredPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

export function BlogListing() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Container className="py-16 sm:py-20">
      {featuredPost && (
        <FadeIn>
          <article className="relative overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px] bg-background lg:min-h-[320px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Featured Article
                </span>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-muted">{featuredPost.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="mt-6 inline-flex w-fit text-sm font-semibold text-primary hover:text-accent"
                >
                  Read article →
                </Link>
              </div>
            </div>
          </article>
        </FadeIn>
      )}

      <FadeIn className="mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted hover:text-foreground",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <FadeIn key={post.id} delay={index * 0.05}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <div className="relative aspect-video bg-background">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="mt-10 text-center text-muted">No articles found.</p>
      )}
    </Container>
  );
}
