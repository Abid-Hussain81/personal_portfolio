# Blog plan

## Agreed direction

The homepage remains the professional portfolio. The blog lives at `/blog` on `https://www.aabidev.site`, with individual articles at `/blog/{slug}` and a Blog link planned for the existing navigation. Keep one Next.js app and the GitHub-to-Vercel deployment. A separate domain or paid CMS is unnecessary for the initial blog.

Write in Markdown while drafting. Repository-backed Markdown or MDX was discussed as a possible publishing format. The current site renders post content from TypeScript, so verify the simplest publishing workflow before changing the format. Add a database or CMS only if the workflow later needs one.

## Existing blog code

- `src/app/blog/page.tsx` and `src/components/sections/BlogListing.tsx` already provide a landing page and listing.
- `src/app/blog/[slug]/page.tsx` builds article pages from published records, creates article metadata, and splits article text into paragraphs. Full Markdown rendering would need implementation if requested.
- `data/blog.ts` has six sample draft records. The public `blogPosts` collection requires `published: true` and non-empty content. No sample met both conditions at handoff.
- `src/app/sitemap.ts` already adds published article URLs. Its static route list omits `/blog`. Confirm navigation and sitemap state before launch.

## Niche and editorial plan

**React and Next.js for booking platforms and API-driven apps.** Hotel booking is the starting specialty. Expand into API and UI patterns that also apply to appointment apps and dashboards. Cover AI when it supports a concrete workflow Abid has tried. Prefer tutorials with firsthand examples, tested code, and a clear troubleshooting section. Link to relevant work when it helps readers.

### Weekly routine

With 8 to 15 hours available, use a 10-hour week as the baseline. Spend about six hours writing and testing one substantial tutorial, two hours on metadata, image optimization, internal links, and Search Console, and two hours sharing the work. Add a second short, verified post when time and material allow. Let the problem determine article length.

### First topics

1. Handling loading, empty, and error states in a React hotel booking UI.
2. Disabling unavailable dates in a React booking calendar.
3. Handling a price change before booking confirmation.
4. Building a hotel availability search from a REST API in Next.js.

Secondary formats include fixes for exact errors, migrations with tested before-and-after examples, and tool comparisons for a specific use case. Use actual evidence for benchmarks and describe the setup. Validate wording and search demand with Keyword Planner where available, then use Search Console impressions and queries to guide follow-ups. Keyword Planner's competition metric measures advertisers.

### Distribution

Publish the full tutorial at `https://www.aabidev.site/blog/{slug}` first. Start with a LinkedIn clip or code snippet, plus a GitHub gist or demo repo when the article benefits from runnable code. Link each back to the full guide. Use an adapted excerpt on DEV or Hashnode when useful. If reposting in full, use the platform's canonical setting where supported and point to the original article on `www.aabidev.site`. Google can choose a different canonical. Share with relevant Reddit, Hacker News, or Lobsters communities when the post fits their rules and audience.

### Coordinating with LinkedIn

Include https://www.aabidev.site/ near the end of every LinkedIn post. For a post promoting a published tutorial, use its verified live URL on the same domain.

Keep Tuesday and Thursday for standalone posts at 8:00 PM PKT. When a tutorial is live, use that week's Wednesday post for its promotion at the time below. If the article is still a draft, write a standalone post with a different angle and save the article link for launch.

Give each promotion one concrete takeaway, such as a tested snippet, a before-and-after UI example, or an annotated demo. Link to the verified live article on `www.aabidev.site`. The first planned tutorial overlaps with the earlier LinkedIn post about loading, empty, and error states. Show a new implementation detail, such as how a retry works after a timeout, so the launch post adds something readers can use. Use synthetic examples or material cleared for public sharing.

### Publishing and promotion timing

Publish the article on the site whenever it is ready and verified. Google's published ranking guidance gives no preferred weekday or hour for tutorials. Its freshness systems apply to searches where recency matters. Crawl, index, and ranking timelines vary.

Use **Wednesday at 7:00 PM PKT** as the first LinkedIn promotion slot. Alternate with **Wednesday at 8:30 PM PKT** over the first 6 to 8 comparable posts as a trial. Keep post format roughly comparable, log the slot and format, and compare impressions, link clicks where available, and tagged referral visits if analytics is enabled. Treat a small sample as directional. Use community-specific rules and audience fit for X, Reddit, Hacker News, and DEV. The LinkedIn studies do not establish a shared best time across platforms or a reliable Sunday peak for this audience.

The proposed **5:00–9:00 PM PKT** window is **12:00–4:00 PM UTC**. It is **7:00–11:00 AM EST** or **8:00 AM–noon EDT** in New York, **4:00–8:00 AM PST** or **5:00–9:00 AM PDT** in Los Angeles, and **noon–4:00 PM GMT** or **1:00–5:00 PM BST** in London. The 7:00 PM PKT slot reaches New York at 9:00 AM EST or 10:00 AM EDT and London at 2:00 PM GMT or 3:00 PM BST. U.S. and UK clocks change on different dates. Use local time zones when scheduling for specific audiences.

- [Google Search ranking systems and freshness](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Buffer LinkedIn posting-time study](https://buffer.com/resources/best-time-to-post-on-linkedin/)
- [Sprout Social LinkedIn posting-time study](https://sproutsocial.com/insights/best-times-to-post-on-linkedin/)
- [NIST daylight saving rules](https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst) and [UK clock changes](https://www.gov.uk/when-do-the-clocks-change)

### First six weeks

- **Week 1.** Draft and publish the first tutorial. Reuse the existing domain, robots file, sitemap, and Search Console setup. Verify the blog navigation, canonical URL, and sitemap entries at launch.
- **Weeks 2–4.** Build the booking cluster with a few connected tutorials. Link them together and distribute each where it fits.
- **Weeks 5–6.** Review indexing, impressions, and clicks. Fix broken links and follow the topics showing interest. Use six weeks as a review point. Indexing timelines vary, and Google publishes no 12–15 indexed article threshold for AdSense.

## First launch

- Gather the facts and examples for one original article and draft it under `blogs_setup/`.
- Use the existing site routes and pick the publishing format. Verify the article on desktop and mobile.
- When the article is ready to go live, add the Blog navigation link and the landing page to the sitemap. Verify metadata, the canonical URL, article links, and draft exclusion.
- Run the portfolio checks. After an authorized push, verify the live article and sitemap. Check discovery and index status in Search Console over time. Track article impressions, clicks, and queries there.

- Once the first article is live, verify that `https://www.aabidev.site/sitemap.xml` lists both `/blog` and the published article. In the `aabidev.site` Search Console property, confirm that exact sitemap URL is registered and submit it if missing. An existing sitemap can be updated in place. Use URL Inspection on the canonical article to check index status or request indexing. Google treats sitemap submission as a discovery hint and gives no immediate indexing guarantee. [Google sitemap guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## Hosting and AdSense

Start by publishing and building steady readership. AdSense is a later option. If approved, the preferred placement is on articles, with the portfolio and contact pages kept ad-free. Google reviews site content and policy compliance and gives no fixed minimum post count or publishing cadence in its eligibility guidance.

Before monetizing, publish a footer-linked privacy policy that describes the site's actual data practices, including disclosures about Google ads and third-party cookies or similar identifiers. Keep the existing About and Contact pages easy to find. A separate Terms of Service page can be useful when the site needs one. Google's published AdSense eligibility checklist does not list it as a general requirement. [Google Publisher Policies on privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794)

Vercel Hobby is available for personal, non-commercial use within its usage limits. Vercel classifies AdSense and advertising paid services as commercial use. If the Services page is actively used to sell freelance services, confirm plan eligibility with Vercel Support. Before serving ads, use a paid Vercel plan or hosting that permits commercial use. The domain can stay the same.

- [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)
- [AdSense eligibility](https://support.google.com/adsense/answer/9724)
- [Google guidance on helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Search Console performance guide](https://support.google.com/webmasters/answer/10268906)
- [Google guidance on crawl and indexing timelines](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google guidance on syndicated content](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting#syndicated-content)
