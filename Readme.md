# Velasquez Fitness & Nutrition

A mobile-first Next.js App Router website with TypeScript, Tailwind CSS 4, and a photography-led near-black / warm-white / muted-gold editorial identity. No database, payment integration, external fonts, analytics, or stock photography.

## View locally

Use Node.js 20.9+ (validated with Node.js 24) and npm:

```sh
cd /workspace/vfn-website
git switch feat/vfn-editorial-redesign
npm ci
npm run dev -- --hostname 0.0.0.0
```

On a local machine, open `http://localhost:3000`. In GitHub Codespaces, use its **Open in Browser** prompt for port 3000. This Codex onboarding interface does not expose an interactive browser preview. Routes: `/`, `/coaching`, `/about`, `/apply`, `/privacy`.

If npm's default cache is not writable in the cloud environment, prefix installation with `npm_config_cache=/workspace/.npm-cache`.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests start the production server on port 3100 and cover desktop/mobile layouts, page metadata, navigation and keyboard interactions, FAQ disclosure, 404 responses, form validation, and the absence of submission requests. Build before running them. In this cloud environment use the existing browser instead of downloading one:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

For a local production preview, run `npm start -- --hostname 0.0.0.0` after building. No command here deploys the site.

## Content and brand assets

The approved direction follows the founder’s supplied Framer hero reference: cinematic imagery, editorial serif headlines, restrained sans-serif navigation, and quiet text-link CTAs. Bright-yellow panels, repetitive cards, and the temporary vector-panther hero have been removed.

- `src/content/site.ts`: founder background supplied in the master brief and the five method stages. No additional qualifications, years of experience, or results have been invented.
- `src/components/brand-photo.tsx`: Next.js responsive image component for the three exact supplied assets. Hero photography is contained on desktop and presented separately from text on mobile to preserve the subject. Original files are now integrated from `public/images/`; responsive crops are covered by desktop and mobile browser review.
- `src/app/fonts/`: locally hosted Cormorant Garamond and Manrope Latin font files, sourced from Fontsource 5.3.0. Their OFL licenses are included. Builds and visitors do not contact a font provider.
- `src/app/globals.css`: near-black `#0B0B0B`, charcoal `#151515` / `#242424`, warm white `#F5F3EF`, muted gray `#A3A3A3`, and restrained gold `#C3B180`. Reusable Tailwind `brand-*` colors and CSS variables remain available.
- `src/app/privacy/page.tsx`: factual application-preview privacy information; the public privacy notice and contact must be confirmed before accepting applications.

### Original brand photographs

Commit `b688f8d` connects the exact founder-supplied assets:

- `public/images/VFN-Kettlebell-Hero (1).jpg`: homepage founder section and Coaching page.
- `public/images/Arise Professional -65.JPG`: homepage hero and About page.
- `public/images/IMG_0825.JPG`: approved replacement for The 1% Method section, contained without cropping or color filters.
- `public/images/Metallic Panther V Emblem.png`: silver emblem used alone in the header, optimized responsively with its original proportions. Its black canvas is blended with the header through CSS; the original file is unchanged.

The original files remain unchanged. `next/image` provides responsive, optimized delivery; filenames with spaces and uppercase extensions are URL-encoded. The hero is contained on desktop to preserve the full photograph; mobile places the image above the text so the founder is not obscured. Browser tests verify decoded images, correct source mapping, successful optimizer responses, and absence of missing-asset placeholders at every placement.

No testimonials, transformations, performance statistics, prices, or unapproved social/contact links are fabricated. Results have a clearly labeled editorial placeholder. Canonical URLs, a sitemap, and absolute Open Graph image URLs should use the real public domain once confirmed.

## Application status and secure activation plan

**Delivery is intentionally disabled.** The form performs browser field validation, then displays a local “field checks passed” status that explicitly says nothing was submitted. It never sends or persists entries. Submission is disabled, including before JavaScript hydrates. Do not treat this as a live lead collection form.

The simplest next step is an approved hosted form service with a verified VFN destination inbox. Before enabling it:

1. Confirm the recipient, form provider, privacy notice, retention policy, and exact fields with VFN. Keep sensitive medical data out of the application.
2. Configure the provider's verified form endpoint and spam protection. Keep any private API credentials server-side in secure environment settings, never in `NEXT_PUBLIC_*` variables or source control. Use an HTTPS provider endpoint restricted to the intended destination.
3. Add a small same-origin Next.js POST route that validates and bounds every field on the server, enforces origin checks and rate limits/abuse controls, and forwards to that fixed provider endpoint with a timeout. Do not accept a destination from the browser, log application contents, or retry in a way that silently duplicates submissions.
4. Replace the preview-only check with an actual submit action. Show sending/error states, retain entries on recoverable failures, prevent duplicate sends, and show success only after the delivery provider acknowledges acceptance. Explain that acceptance does not guarantee inbox delivery.
5. Add end-to-end tests for successful provider acceptance, validation errors, timeouts, rate limits, and provider failures. Test receipt in the real destination before removing the unavailable notice.

No destination or credentials have been guessed, and no unused backend has been added.

## Approved refinement status

The homepage uses the professional portrait in the hero and the kettlebell photograph in the founder section. Portrait and training photography receive `grayscale(1) contrast(1.04)` through CSS only; original files are unchanged. The Coaching page compares VFN Method (eight-week, one-time PDF program, no ongoing support), VFN Coaching (biweekly check-ins), and VFN Performance (weekly check-ins, technique reviews, priority support). No provisional prices, checkout, subscriptions, or payment backend are enabled.

Both approved replacement assets arrived in commit `efed635` and are integrated. The header shows only the exact silver V-and-panther PNG, with no adjacent text; the footer identity is unchanged. The new panther preserves its original black background and golden eyes. Existing original image files remain unmodified.

For an existing GitHub Codespace, switch to `feat/vfn-editorial-redesign`, pull the latest branch changes, run `npm ci` if dependencies are missing, and run `npm run dev -- --hostname 0.0.0.0 --port 3000`. In the **Ports** tab, open port **3000** in the browser. Keep port visibility private; no public deployment is needed.
