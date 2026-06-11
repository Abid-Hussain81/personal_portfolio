# Abid Hussain — Frontend Developer Portfolio

Personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It showcases my projects, skills, services, and experience as a frontend developer.

**Live site:** [https://abidhussain.dev](https://abidhussain.dev)

---

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

## Features

- Responsive design with dark/light mode toggle
- Animated page transitions and scroll reveals
- SEO-optimized metadata and Open Graph tags
- Auto-generated sitemap and robots.txt
- Config-driven content — all data lives in `/data`

## Project Structure

```
data/          # All site content (profile, projects, skills, etc.)
public/        # Static assets (images, resume PDF)
src/
  app/         # Next.js App Router pages
  components/  # Layout, section, UI, and icon components
  lib/         # Utilities and metadata helpers
```

## Getting Started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Customization

All content is managed through the files in `/data`:

| File | Contents |
|------|----------|
| `profile.ts` | Name, bio, contact links, stats |
| `projects.ts` | Portfolio projects |
| `skills.ts` | Skills and proficiency levels |
| `services.ts` | Services offered |
| `resume.ts` | Work experience, education, certifications |
| `testimonials.ts` | Client testimonials |
| `blog.ts` | Blog post metadata |

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://abidhussain.dev
```

## Deployment

Deploy to [Vercel](https://vercel.com) with zero config — connect your repo and it just works.

---

© 2025 Abid Hussain. All rights reserved.
