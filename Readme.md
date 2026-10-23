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
- `src/components/brand-photo.tsx`: Next.js responsive image component for the three exact supplied assets. Hero photography is contained on desktop and presented separately from text on mobile to preserve the subject. Final crop review requires the actual image files.
- `src/app/fonts/`: locally hosted Cormorant Garamond and Manrope Latin font files, sourced from Fontsource 5.3.0. Their OFL licenses are included. Builds and visitors do not contact a font provider.
- `src/app/globals.css`: near-black `#0B0B0B`, charcoal `#151515` / `#242424`, warm white `#F5F3EF`, muted gray `#A3A3A3`, and restrained gold `#C3B180`. Reusable Tailwind `brand-*` colors and CSS variables remain available.
- `src/app/privacy/page.tsx`: factual application-preview privacy information; the public privacy notice and contact must be confirmed before accepting applications.

### Current image blocker

The founder supplied three inline images in chat, but their original downloadable files are not available in the execution workspace. No replacement imagery has been generated or substituted. The page image slots are explicitly labeled pending originals and do not request nonexistent URLs.

Expected asset paths for integration by the developer after receiving downloadable originals:

- `public/brand/sebastian-kettlebells.jpg`: the supplied kettlebell photograph.
- `public/brand/sebastian-portrait.jpg`: the supplied smiling portrait.
- `public/brand/panther.jpg`: the exact supplied architectural panther image.

Adding the actual files and rebuilding enables optimized responsive delivery. Do not fabricate the files, rename a different image into these paths, alter the founder’s appearance, or treat these placeholders as completed image integration. Image load quality, crops, and subject preservation must be verified on desktop and mobile after the originals arrive.

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
