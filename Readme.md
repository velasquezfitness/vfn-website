# Velasquez Fitness & Nutrition

A mobile-first Next.js App Router website with TypeScript, Tailwind CSS 4, and a photography-led near-black / warm-white / muted-gold editorial identity. No database, payment integration, external fonts, analytics, or stock photography.

## View locally

Use Node.js 20.9+ (validated with Node.js 24) and npm:

```sh
cd /workspace/vfn-website
git switch feat/vfn-bilingual
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
- `src/app/[locale]/privacy/page.tsx`: English and Spanish privacy disclosures for the current Formspree application integration.

### Original brand photographs

Commit `b688f8d` connects the exact founder-supplied assets:

- `public/images/VFN-Kettlebell-Hero (1).jpg`: homepage founder section and Coaching page.
- `public/images/Arise Professional -65.JPG`: homepage hero and About page.
- `public/images/IMG_0825.JPG`: approved replacement for The 1% Method section, contained without cropping or color filters.
- `public/images/Metallic Panther V Emblem.png`: unchanged approved source emblem.
- `public/images/vfn-emblem-transparent.png`: shared header/footer cutout with real alpha transparency. Source RGB pixels and original dimensions are unchanged; only the surrounding background is removed from its alpha channel. No CSS blending or filters are used.

The original files remain unchanged. `next/image` provides responsive, optimized delivery; filenames with spaces and uppercase extensions are URL-encoded. The hero is contained on desktop to preserve the full photograph; mobile places the image above the text so the founder is not obscured. Browser tests verify decoded images, correct source mapping, successful optimizer responses, and absence of missing-asset placeholders at every placement.

No testimonials, transformations, performance statistics, prices, or unapproved social/contact links are fabricated. Unpublished client stories remain hidden. A public domain must be confirmed before enabling a production sitemap or absolute social image URLs.

## Formspree integration and test isolation

The working integration inherited from `ac90499` is preserved: the form sends `POST` requests to `https://formspree.io/f/mdeeeown` and uses the existing Formspree privacy/contact disclosures. There is no new backend, credential, payment service, or database. Field names and existing English option values stay stable in both languages; the additional `language` field identifies `en` or `es`. Entered free text is not translated or changed.

Playwright blocks Formspree by default and mocks every submission outcome. Tests cover field validation, pending state, acknowledged success, provider/network failures, retained entries, and retry in both languages. **Do not remove the default provider interception or send real applications during automated testing.** The mocked checks do not establish new live inbox-delivery verification.

## Approved refinement status

The homepage uses the professional portrait in the hero and the kettlebell photograph in the founder section. Portrait and training photography receive `grayscale(1) contrast(1.04)` through CSS only; original files are unchanged. The Coaching page compares VFN Method (eight-week, one-time PDF program, no ongoing support), VFN Coaching (biweekly check-ins), and VFN Performance (weekly check-ins, technique reviews, priority support). No provisional prices, checkout, subscriptions, or payment backend are enabled.

Both approved replacement assets arrived in commit `efed635` and are integrated. The header and footer show the same transparent silver V-and-panther emblem, without adjacent brand-name text. Footer links, philosophy, and layout are preserved. The new panther preserves its original black background and golden eyes. Existing original image files remain unmodified.

For an existing GitHub Codespace, switch to `feat/vfn-bilingual`, pull the latest branch changes, run `npm ci` if dependencies are missing, and run `npm run dev -- --hostname 0.0.0.0 --port 3000`. In the **Ports** tab, open port **3000** in the browser. Keep port visibility private; no public deployment is needed.

## English / Spanish routing

English is always the default, including for browsers configured in Spanish. Existing English URLs remain `/`, `/coaching`, `/about`, `/apply`, and `/privacy`. Spanish equivalents use `/es`, `/es/coaching`, `/es/about`, `/es/apply`, and `/es/privacy`. The header EN / ES links preserve the current page, query string, and fragment, and work with native navigation. Links within each language retain that language. No cookies or browser-language redirects are needed.

`src/proxy.ts` rewrites English requests to the internal `/en` route tree. Direct `/en` URLs redirect to the public English equivalent. Shared pages live in `src/app/[locale]` and are statically generated for both locales. Unmatched paths render a localized 404.

English copy is the translation key; reviewed Puerto Rican Spanish copy lives in `src/i18n/es.json`. Keep approved product names (VFN Method, VFN Coaching, VFN Performance), the founder’s name, and email addresses unchanged. Shared layout, image assets, transparent emblems, photography treatments, and package structure are reused. Localized titles, descriptions, Open Graph locales, canonical URLs, and reciprocal English/Spanish alternates are generated per page.

Validation messages use the selected website language rather than depending on the browser language. Formspree delivery settings are not localized. No real submissions are made by the browser test suite.
