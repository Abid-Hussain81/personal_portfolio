# Abid Hussain - Personal Portfolio

Frontend-focused full-stack developer helping startup founders build web applications, booking platforms and API integrations.

Built with Next.js App Router, React, TypeScript, Tailwind CSS and Framer Motion. This repository contains the portfolio source. Local edits remain local; pushing main triggers the connected Vercel deployment.

## Local development

    npm install
    npm run dev

Open the local URL printed by Next.js. Validate changes with:

    npm run typecheck
    npm run build

## Content

| File | Purpose |
| --- | --- |
| data/profile.ts | Positioning, contact links, availability and background |
| data/resume.ts | Verified work history, education and certifications |
| data/services.ts | Services and collaboration process |
| data/skills.ts | Technical toolkit without invented proficiency scores |
| data/projects.ts | Project drafts and explicitly published entries |
| data/testimonials.ts | Feedback drafts and explicitly published entries |
| data/blog.ts | Article drafts; publication requires complete content |
| public/resume.pdf | Public-safe resume download |

Only add published: true to a project or testimonial after verifying its accuracy and obtaining any required permission. Blog entries also require full content. Supplied template examples remain unpublished. Add project details, source links and images only when permitted by the client or employer.

The public pages and resume omit restricted employer project names, supplier identities and internal screenshots/code. Regenerate the downloadable PDF after updating resume data with:

    node scripts/generate-resume.mjs

The generator uses a local Chrome/Chromium installation. Set CHROME_PATH if it is not found automatically.

## Configuration

NEXT_PUBLIC_SITE_URL sets the canonical site URL; the existing default is https://abidhussainportfolio.vercel.app. Set it to the actual deployment URL before publishing.

The contact form uses the existing server-side Gmail SMTP integration. Configure EMAIL_USER and EMAIL_PASS in local or deployment environment variables for delivery. Never commit credentials. Direct email, LinkedIn and GitHub links are also available on the Contact page.

## Design and release

The interface uses warm ivory, charcoal, olive and rust with a symbol-based header and a concise founder-facing introduction. Geist fonts are self-hosted with their original licenses, so builds do not fetch Google Fonts. The standard development and production scripts use Next.js with its native compiler; no Webpack override is required.

The connected production app is https://abidhussainportfolio.vercel.app/. Pushes to main use the existing Git-to-Vercel deployment integration.
