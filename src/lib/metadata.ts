import type { Metadata } from "next";
import { profile } from "@/data/profile";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description = "Abid Hussain helps startup founders build web applications, booking platforms and API integrations. Frontend-focused full-stack developer in Lahore, Pakistan.",
  path = "",
  image = "/og-image.png",
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${profile.name}`
    : `${profile.name} — ${profile.role}`;
  const url = `${profile.siteUrl}${path}`;

  return {
    title: pageTitle,
    description,
    icons: { icon: "/brand-mark.svg", apple: "/brand-mark.svg" },
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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
