import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/Container";
import { BlogListing } from "@/components/sections/BlogListing";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Articles on frontend development, design, tutorials, and web development best practices.",
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
