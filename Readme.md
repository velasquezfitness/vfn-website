# Velasquez Fitness & Nutrition

A mobile-first Next.js App Router website with TypeScript, Tailwind CSS 4, and a restrained black / white / yellow identity. No database, payment integration, external fonts, analytics, or stock photography.

## View locally

Use Node.js 20.9+ (validated with Node.js 24) and npm:

```sh
cd /workspace/vfn-website
git switch feat/vfn-complete-website
npm ci
npm run dev -- --hostname 0.0.0.0
```

Open port **3000** in your development environment's port viewer. On a local machine, open `http://localhost:3000`. Routes: `/`, `/coaching`, `/about`, `/apply`.

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

- `src/content/site.ts`: editable founder name, biography, and credentials. These are clearly labeled placeholders; replace with verified, founder-approved information.
- `src/components/brand.tsx`: original temporary geometric panther and VFN wordmark. Replace with approved vector brand assets when available. The About portrait space is explicitly labeled as temporary artwork, not a real photograph.
- `src/app/globals.css`: reusable `brand-black`, `brand-white`, and `brand-yellow` Tailwind colors and matching `--color-brand-*` CSS variables, shared layouts, mobile breakpoints, focus treatment, and reduced-motion support.
- `src/app/`: page copy, page-specific SEO titles/descriptions, icon, and 404 page. Canonical URLs and a sitemap should be added once the actual public domain is confirmed; no domain has been invented.

No testimonials, certifications, transformation results, prices, or personal photos are fabricated. The credibility section explains principles rather than claiming unverified outcomes.

## Application status and secure activation plan

**Delivery is intentionally disabled.** The form performs browser field validation, then displays a local “field checks passed” status that explicitly says nothing was submitted. It never sends or persists entries. Submission is disabled, including before JavaScript hydrates. Do not treat this as a live lead collection form.

The simplest next step is an approved hosted form service with a verified VFN destination inbox. Before enabling it:

1. Confirm the recipient, form provider, privacy notice, retention policy, and exact fields with VFN. Keep sensitive medical data out of the application.
2. Configure the provider's verified form endpoint and spam protection. Keep any private API credentials server-side in secure environment settings, never in `NEXT_PUBLIC_*` variables or source control. Use an HTTPS provider endpoint restricted to the intended destination.
3. Add a small same-origin Next.js POST route that validates and bounds every field on the server, enforces origin checks and rate limits/abuse controls, and forwards to that fixed provider endpoint with a timeout. Do not accept a destination from the browser, log application contents, or retry in a way that silently duplicates submissions.
4. Replace the preview-only check with an actual submit action. Show sending/error states, retain entries on recoverable failures, prevent duplicate sends, and show success only after the delivery provider acknowledges acceptance. Explain that acceptance does not guarantee inbox delivery.
5. Add end-to-end tests for successful provider acceptance, validation errors, timeouts, rate limits, and provider failures. Test receipt in the real destination before removing the unavailable notice.

No destination or credentials have been guessed, and no unused backend has been added.
