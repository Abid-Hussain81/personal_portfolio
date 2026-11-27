# Portfolio context

## Identity and purpose

- Abid Hussain, **Full Stack Developer (Frontend Focused)**, based in Lahore, Pakistan.
- The portfolio shows work to clients and employers. The blog should demonstrate practical experience in web applications, booking interfaces, frontend implementation, and API integrations.
- GitHub profile is [Abid-Hussain81](https://github.com/Abid-Hussain81). Public links and profile copy are maintained in `data/profile.ts`.

## Code and deployment

- Portfolio repo is `D:\portfolio\personal_portfolio`. GitHub remote is [Abid-Hussain81/personal_portfolio](https://github.com/Abid-Hussain81/personal_portfolio). The `main` branch deploys through Vercel.
- The app uses Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, and npm. Shared navigation is in `src/components/layout/Header.tsx`, with links defined in `data/profile.ts`.
- The canonical host is [www.aabidev.site](https://www.aabidev.site/). The bare domain permanently redirects to `www`. The previous Vercel URL was `https://abidhussainportfolio.vercel.app/`.
- Usual checks from the portfolio repo are `npm run lint`, `npm run typecheck`, and `npm run build`. Use `npm run dev` to check the site locally.
- During handoff preparation, `main` matched `origin/main` and pointed to `80f9577` (search metadata and browser branding). Recheck branch and working tree when resuming.

## Design decisions to carry forward

- Use the existing light, warm palette with sage accents, readable text, and compact vertical spacing. Use shared page layouts and card styles for continuity across the site.
- The homepage uses warm frosted-glass effects and scroll-driven motion, including a stacking-card pattern. On blog pages use motion where it helps, with reduced-motion support and readable mobile layouts.
- In the Expertise cards use plain Font Awesome icons inline with their headings. Avoid decorative numbering, eyebrow labels, separator strokes, and icon background tiles in comparable blog UI.
- Keep the role wording consistent with the rest of the site.

## SEO and Search Console

- Previously verified live on `www`: homepage title, description, and canonical tag, crawl permission in `robots.txt`, and a sitemap listing seven portfolio pages. The homepage title is **Abid Hussain | Full Stack Developer**.
- `src/lib/metadata.ts` contains shared metadata helpers. Check `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` when reviewing new public routes.
- Search Console uses the `aabidev.site` domain property. The live test for the exact `https://www.aabidev.site/` URL passed. Actual index status remained unconfirmed during the discussion. Check **Google Index** for the canonical URL. The older redirect or crawl errors shown for the bare host are historical observations.
- Keep public article canonicals and sitemap links on `www`. Include the blog landing page when it is publicly promoted and add only published articles. Check the production sitemap after deployment.
- [Google URL Inspection guide](https://support.google.com/webmasters/answer/9012289)
