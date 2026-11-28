# Bit, Aabi’s portfolio companion

Run `npm run dev` and open the portfolio to try Bit in the bottom-right corner. Open `/companion-preview` to compare the three concepts and replay any of the eight animation states. The widget appears in development by default. Set `PORTFOLIO_COMPANION=0` to switch it off locally, or set `PORTFOLIO_COMPANION=1` when building an explicitly enabled preview. Production builds default to off, and the concepts URL returns a 404 in production.

## Character direction

| Concept | Design and motion |
| --- | --- |
| Bit | A cream-and-sage developer robot with a dark visor, expressive eyes, a status antenna and articulated arms. It blinks and breathes at rest, waves to greet and uses short gestures to direct attention. |
| Moss | A rounded sage creature with a leaf-like crest and small cream feet. It lifts a flipper to greet and shifts its gaze as its body breathes. |
| Patch | A terracotta fox with a cream muzzle and curled tail. The tail flicks to greet, and the head and eyes carry the expressions. |

Bit is the selected concept. The antenna and visor stay legible at the 58 px mobile size, while the pale shell, sage joints and terracotta accents fit the existing portfolio palette. The rendering component receives an animation state from the widget, so a different character can reuse the same message and navigation flows.

## Browser captures

- [Desktop greeting](desktop-greeting.png) and [desktop interaction panel](desktop-panel.png)
- [Mobile interaction panel](mobile-panel.png) and [TravelTech inquiry flow](mobile-project.png)
- [Three concepts](concepts.png) and [short motion recording](concepts-motion.webp)

## Library research

The comparison reflects the publishers’ documentation and public repositories reviewed on November 28, 2026. Published size claims are the maintainers’ figures.

| Option | Character and implementation | Fit for AabiDev |
| --- | --- | --- |
| Exode Interactive Mascots | Rigged 2D and 3D characters with a script-backed web component, cursor gaze and color controls. The repository documents React and Next.js usage and a runtime around 140 KB gzip. MIT license. | Strong prebuilt character range and gesture quality. The repository showed one commit, the hosted gallery could not be loaded in this environment, and touch, reduced-motion and keyboard behavior would still need evaluation for the selected rig. [Source and license](https://github.com/fridayowl/exode-interactive-mascots) |
| Rive | Visual rigging and state machines with supported React and web runtimes. Rive lists 222 KB Brotli for the Canvas Lite Wasm alone in its January 2026 size report. Asset permissions must be checked independently of the open-source runtime. | Highest control over transitions for a designer-managed asset. Adds an asset plus a renderer, and a canvas character needs semantic HTML controls around it. [Marketplace](https://rive.app/marketplace/) · [Web runtime](https://rive.app/docs/runtimes/web/web-js) · [Runtime sizes](https://rive.app/docs/runtimes/runtime-sizes) |
| React Live Avatar | React-only SVG and CSS robot, with eight expressions, small-screen scaling, keyboard-button mode and reduced-motion support. Its documented reduced-motion behavior retains cursor tracking. MIT license, two commits in the reviewed repository. | Closest technical match. The existing mascot is a glowing robot head. A brand-aligned full body and gesture rig would require substantial drawing and state changes. [Implementation and license](https://github.com/progarin/react-live-avatar) |
| Agent Pet | Self-hostable, sprite-atlas renderer with a vanilla widget and React exports. The maintainer lists a roughly 7 KB gzip vanilla script before imagery. Apache 2.0 code, with lineage documented by the project. | Useful for a sprite-based pet. An original atlas and asset-specific permissions would still be needed, along with the portfolio's focus and guided interaction flows. [Implementation and license](https://github.com/gibbon/agent-pet) |
| Blob Studio | SVG expression editor with a self-contained React export, runtime gaze and morphing, and a documented reduced-motion mode. The source uses an imperative animation loop for some effects. | Useful for prototyping organic forms. The reviewed repository did not display a license granting commercial reuse, and procedural face motion adds work beyond Bit’s rig. [Source repository](https://github.com/aivsomkar/blobstudio) |
| React Bits | Copyable React and Next.js animation components with dependencies varying by effect. The repository describes its license as MIT with the Commons Clause. | General interface effects are available. The reviewed catalog did not provide a full-body mascot with the required gesture set. [Catalog and license](https://github.com/DavidHDev/react-bits) |
| Aceternity UI | React and Tailwind catalog includes a pointer-following tooltip with avatar images. Its license permits commercial end products subject to restrictions on standalone redistribution. | Can supply a UI effect. The image avatars would need an original full-body illustration and expression system. [Animated Tooltip](https://ui.aceternity.com/components/animated-tooltip) · [Catalog](https://ui.aceternity.com/explore) · [License](https://ui.aceternity.com/licence) |
| Magic UI | MIT open component library with Next.js-oriented examples, animated lists, avatar circles and pointers. | Reusable interface treatments. The reviewed component catalog did not provide an expressive articulated mascot. [Catalog](https://magicui.design/docs/components) · [License](https://github.com/magicuidesign/magicui/blob/main/LICENSE) |
| LottieFiles and Lottie Web | Public animations may be commercially used under the Lottie Simple License. A chosen file requires its own review. Lottie Web is an MIT player with SVG and canvas rendering. | Good for preauthored gestures. An original character, cursor tracking, responsive state transitions and semantic controls would still need development. [Asset license](https://lottiefiles.com/page/license) · [Player](https://github.com/airbnb/lottie-web) |

The implementation uses original SVG artwork, CSS transforms and React state. Eye tracking uses a single queued animation frame only when a mouse moves near Bit. This gives the portfolio direct control over geometry, timing, focus and touch with no added npm dependencies.

## Portfolio integration

- The shared layout mounts one client loader. The widget preserves its session through internal navigation and yields to the booking calendar, mobile navigation, other dialogs, the contact form and the mobile keyboard.
- The first greeting is scheduled for 7.5 seconds, with dwell time for homepage sections. Tips expire at seven seconds and have a randomized 25–40 second cooldown and a four-tip session limit. Closing a tip mutes unsolicited messages for that session. Hide Bit persists across sessions, with a small **Show Bit** button for restoration.
- Project and hiring topics are allowlisted before contact-form prefilling. The project and hiring flows use the existing contact form, and the portfolio flow points to existing anchors and routes. Bit uses Aabi’s WhatsApp number from the shared profile. The optional `NEXT_PUBLIC_WHATSAPP_URL` override accepts `wa.me/<international-number>` and `api.whatsapp.com/send?phone=<international-number>` HTTPS links.
- The analytics adapter emits the local `portfolio:companion` event with the event name, page, device category and applicable content identifiers. Existing analytics integrations can subscribe to it in the future. There is no configured provider in the repository. A confirmed contact form response emits `mascot_conversion`. Contact and WhatsApp clicks have separate events. Form names, email addresses, message bodies and raw query strings are excluded.

## Artwork and attribution

Bit, Moss and Patch are original inline SVGs created for this portfolio. No third-party character files, rigs, sprites or animation code were copied from the research sources. The panel also uses the repository’s existing [Lucide icons](https://lucide.dev/license).

## Modified files

| Files | Responsibility |
| --- | --- |
| `src/app/layout.tsx`, `data/profile.ts` | Shared feature flag and single contact-channel configuration |
| `src/app/companion.css`, `src/app/companion-preview/page.tsx` | Site-token styling, animation and local concept preview |
| `src/components/companion/` | Lazy entry point, artwork, messages, controls, interaction flows and browser state |
| `src/components/sections/ContactForm.tsx`, `src/lib/companion-inquiry.ts` | Allowlisted prefills, contact form state and WhatsApp URL construction |
| `src/lib/companion-analytics.ts` | Local event adapter |
| `docs/companion/` | Research, screenshots and verification results |

## Verification and limits

- `npm run lint`, `npm run typecheck` and `npm run build` passed. Production builds were checked with the feature enabled and with its disabled default. The default build kept Bit hidden and returned HTTP 404 for `/companion-preview`.
- The enabled build emitted about **10.8 KiB gzip** for the lazy widget JavaScript chunk and its stylesheet combined, or about **9.5 KiB Brotli**. This measurement excludes shared Next.js chunks and the small loader. The widget added zero package dependencies and loads no external character files.
- Local Chromium tests exercised 1920, 1440, 1280, 1024, 768, 430, 390 and 375 px widths. The panel and launcher stayed inside the viewport, below navigation, with zero horizontal overflow in those checks.
- Browser checks covered the delayed greeting and disappearance, contextual Toolkit message and dwell, cooldown and session limit, visibility events, pointer tracking, touch, keyboard activation and Escape focus return, reduced motion, booking calendar, mobile navigation, modal suppression, guided routes, inquiry prefilling, hide and restore after reload, and local conversion events. The three concepts each replayed all eight animation states.
- A separate browser check verified that dismissing a tip left Bit visible and muted further unsolicited tips. The inactivity timer was accelerated to check resting and waking on input.
- The contact test intercepted delivery with representative 503 and 200 responses and verified that only the success generated a conversion event. No external email or WhatsApp message was sent.
- The live portfolio URL was unreachable from this environment. The repository and local app provided the portfolio context. The screenshots predate the WhatsApp configuration. Firefox and WebKit were unavailable in the local browser setup. The headless Chromium captures use the portfolio's image fallback for the WebGL hero.
