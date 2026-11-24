import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = profile.siteUrl;

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/skills",
    "/resume",
    "/contact",
  ].map((route) => ({
    url: new URL(route || "/", baseUrl).href,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, baseUrl).href,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
