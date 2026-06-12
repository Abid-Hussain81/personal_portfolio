"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
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

      {/* Featured article */}
      {featuredPost && (
        <FadeIn>
          <article className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px] bg-secondary lg:min-h-[320px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                  Featured Article
                </span>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3 hover:text-accent"
                >
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </FadeIn>
      )}

      {/* Filters */}
      <FadeIn className="mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
                  activeCategory === category
                    ? "bg-primary text-white shadow-sm shadow-primary/25"
                    : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Posts grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <FadeIn key={post.id} delay={index * 0.05}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8">
              <div className="relative aspect-video bg-secondary overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-3 w-fit rounded-full border border-primary/15 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {post.category}
                </span>
                <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-base text-muted">No articles found.</p>
        </div>
      )}
    </Container>
  );
}
