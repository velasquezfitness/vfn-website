# Velasquez Fitness & Nutrition

Minimal Next.js App Router foundation with TypeScript, Tailwind CSS 4, and ESLint.

## Development

Use Node.js 20.9 or newer (validated with Node.js 24) and npm.

```sh
npm ci
npm run dev -- --hostname 0.0.0.0
```

The development server uses port 3000. No environment variables or external services are required.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start -- --hostname 0.0.0.0
```

Run the production server after building. This does not deploy the application.

## Structure

- `src/app/page.tsx`: responsive homepage placeholder.
- `src/app/layout.tsx`: document language and site metadata.
- `src/app/globals.css`: Tailwind and reusable brand tokens.

Use `bg-brand-black`, `text-brand-white`, and `bg-brand-yellow` (or other Tailwind color utilities) for the brand palette. The same colors are available as CSS variables: `--color-brand-black`, `--color-brand-white`, and `--color-brand-yellow`.

System fonts keep builds independent of external font services. Dependencies are pinned through `package-lock.json`; use `npm ci` for repeatable installation.
