import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { BlogListing } from "@/components/sections/BlogListing";
import { createMetadata } from "@/lib/metadata";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: blogPosts.length
    ? "Read Abid Hussain’s articles on frontend development, interface design, and building for the web."
    : "Find Abid Hussain’s development notes and follow his frontend and web development updates on LinkedIn.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Insights, tutorials, and thoughts on frontend development, design, and building for the web."
      />
      <BlogListing />
    </>
  );
}
