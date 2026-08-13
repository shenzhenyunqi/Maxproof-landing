# Maxproof — marketing site

The public website for [Maxproof](https://apps.shopify.com/maxproof), a Shopify app that turns
TikTok and Instagram videos into shoppable carousels, stories, and pop-ups on a merchant's
storefront.

This repo is **only the marketing site**. The Shopify app itself lives in a separate repository
and shares no code with this one.

## Architecture

One Express process serves both the API and the frontend — there is no separate API server.

```
server.ts ──┬── POST /api/contact          → SMTP (nodemailer)
            │
            ├── dev  : vite middleware      (NODE_ENV !== "production")
            └── prod : express.static("dist") + SPA fallback
```

| | |
|---|---|
| Frontend | Vite 6 · React 19 · React Router 7 · Tailwind v4 |
| Server | Express 4 (TypeScript, run through `tsx`) |
| Port | `3000`, hardcoded in `server.ts` |
| Routing | Client-side (`/`, `/privacy`, `/terms`) |

### Two ordering traps in `server.ts`

Both have bitten before. Read them before adding a route.

1. **API routes must be registered before the Vite middleware.** `app.use(vite.middlewares)`
   swallows every request that reaches it, so any `/api/*` route declared below it is dead code.

2. **The production SPA fallback is `/^\/(?!api).*/`, not `*`.** Any new backend route that
   isn't prefixed `/api` will be captured by the fallback and served `index.html` instead.

## Running locally

Requires Node.js 22 (the Dockerfile builds on `node:22-alpine`; there is no `engines` field).

```bash
npm install
```

```bash
npm run dev
```

Serves on http://localhost:3000 with Vite HMR.

### Environment

Create a `.env` in the repo root. All `.env*` files are gitignored — never commit one.

| Variable | Required | Purpose |
|---|---|---|
| `SMTP_USER` | yes | Mailbox that sends and receives contact-form submissions |
| `SMTP_PASS` | yes | Password for that mailbox |

The SMTP host is hardcoded to Netease Enterprise Mail (`smtphz.qiye.163.com:465`, TLS).

## Scripts

| Command | What it actually does |
|---|---|
| `npm run dev` | `tsx server.ts` — Express + Vite middleware, port 3000 |
| `npm start` | `node server.ts` — relies on Node's TypeScript stripping, so it needs Node ≥ 22.18. The Dockerfile uses `tsx` instead and does not depend on this. |
| `npm run build` | `vite build` → `dist/` |
| `npm run lint` | **`tsc --noEmit`.** This repo has no ESLint; "lint" here means type-check. |
| `npm run preview` | `vite preview` — static preview of `dist/`, no API |
| `npm run clean` | `rm -rf dist` |

`npm run lint` passes clean. Keep it that way.

## Layout

```
server.ts              Express: /api/contact, Vite middleware, static + SPA fallback
index.html             Vite entry; <title>, meta description, OG tags, theme-color
src/
  main.tsx             React root
  App.tsx              Route table
  config.ts            APP_STORE_URL — every primary CTA reads this one constant
  index.css            Design tokens (@theme), base layer, component classes
  components/          Navbar, Footer
  pages/               Home, Privacy, Terms
PRODUCT.md             Strategic brief: register, audience, anti-references, design principles
```

Design decisions — the palette, the type choice, and the WCAG contrast figures behind them —
are documented inline in `src/index.css` and in `PRODUCT.md`. Read those before restyling;
the colour values are computed against AA thresholds, not picked by eye.

## Build and deploy

```bash
npm run build
```

Production is a container. `Dockerfile` is a two-stage build on `node:22-alpine`: stage one
runs `npm ci && npm run build`, stage two installs production dependencies plus a global `tsx`
and starts `tsx server.ts` with `NODE_ENV=production`.

```bash
docker build -t maxproof-portal .
```

```bash
docker run -d --name maxproof-portal -p 3000:3000 -e NODE_ENV=production -e SMTP_USER=… -e SMTP_PASS=… maxproof-portal
```

CI is `Jenkinsfile.prod`: build → push to the container registry → pull and restart on the
production host. Image tags are the short commit SHA (`git rev-parse --short HEAD`) — never
branch names or timestamps. The published container maps host `3003` to container `3000`.

## Known cruft

Inherited from the Google AI Studio scaffold this repo was generated from. None of it is load
bearing; all of it is safe to remove.

- **Unused dependencies** — `@google/genai`, `better-sqlite3`, and `lucide-react` have zero
  references in `server.ts`, `src/`, or `vite.config.ts`. `better-sqlite3` is a native module
  and is the main cost in `npm ci` and in Docker builds.
- **`vite.config.ts` defines `process.env.GEMINI_API_KEY`** for a client that never reads it.
- **`server.ts` falls back to hardcoded SMTP credentials** when `SMTP_USER` / `SMTP_PASS` are
  unset. Those literals are committed and this repository is public. They need to be rotated
  and the fallback removed, so that a missing variable fails loudly instead of silently
  authenticating as a real mailbox.
