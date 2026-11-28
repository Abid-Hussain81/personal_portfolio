import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const siteDescription =
  "Abid Hussain is a full-stack developer in Lahore, Pakistan. He builds travel and hotel booking workflows, integrates REST and GraphQL APIs, and develops React and Next.js interfaces.";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description = siteDescription,
  path = "/",
  image,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${profile.name}`
    : `${profile.name} | Full Stack Developer`;
  const url = new URL(path, profile.siteUrl).href;
  const socialImage = image
    ? { url: image, alt: pageTitle }
    : { url: "/social-preview", width: 1200, height: 630, alt: `${profile.name}, ${profile.role}` };

  return {
    title: pageTitle,
    description,
    authors: [{ name: profile.name }],
    creator: profile.name,
    metadataBase: new URL(profile.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: pageTitle,
      description,
      siteName: profile.name,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
