# Portfolio Content Alignment Implementation Plan

> Execute inline with superpowers:executing-plans in the project the user opened.

**Goal:** Align the portfolio with the supplied CV, LinkedIn positioning and employer confidentiality restrictions.
**Architecture:** Preserve existing Next.js routes, branding and data-driven structure. Correct data and adapt views to factual, publishable material.
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion.
**Spec:** User's portfolio request and verified CV/LinkedIn facts in this conversation.

## Constraints
Lead with web applications, booking platforms and integrations; keep framework names in technical sections. The Mind Gauge starts June 2025. BS Information Technology, MNS University of Agriculture Multan, 2021-2025, CGPA 3.60/4.00. Use 2+ years. Do not publish employer project or supplier identities, internal images or code. Keep sample projects, testimonials and articles as unpublished drafts. No deployment or outbound email.

## Tasks
- [x] Correct profile, experience, education, services, skills, links and metadata.
- [x] Gate showcase drafts; replace invented scores and testimonials with factual capabilities and a collaboration process.
- [x] Replace placeholder resume PDF with a public-safe version and document content management.
- [x] Run type/build checks, inspect desktop/mobile pages and verify navigation, publication gates and CV download.

## Review focus
Check shared links and metadata, unpublished-content leakage, PDF confidentiality, truthful qualifications, responsive layouts and functional CTAs. Contact delivery requires existing SMTP configuration; do not send a test email.

## Verification results
- TypeScript check passed.
- Production build passed with next build --webpack after final source edits.
- Browser checks passed for 9 desktop routes and 5 mobile views, mobile navigation, empty-contact validation, PDF download, draft URL/sitemap exclusion, visible hero and absence of browser exceptions. No email was sent.
- Downloadable PDF has 2 pages, verified education/dates and no restricted project or supplier names.
- Static review found no material issues.
- Existing native SWC installation is truncated (26,443,916 bytes vs a 136,858,624-byte section extent). Same-version repair downloads failed or stalled; no dependency version was changed. Webpack development/build fallback is documented in README.
- Package-lock.json changed during execution outside the authored source scripts; preserved without reverting it.
