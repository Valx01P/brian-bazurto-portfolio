# brianbazurto.com

Modern personal portfolio for **Brian Bazurto** — software engineer & community builder. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and GSAP.

> **New to React/Next?** Jump to [Getting started](#getting-started) and [Making changes](#making-changes-the-daily-workflow). You mostly edit text in one file — `lib/data.ts`.

## Stack & features

- **Next.js 16 / React 19 / TypeScript** — App Router, fully static, SEO-first.
- **Theme** — highlighter yellow + white + dark, with a light/dark toggle (`next-themes`).
- **Fonts** — Fredoka (display) + Plus Jakarta Sans (body) via `next/font`, for a fun, friendly feel.
- **WebGL hero** — custom GLSL fragment-shader backdrop (no libraries) that flows in highlighter yellow + pastel pride colors and reacts to the pointer.
- **Particles** — mouse-interactive, randomized highlighter-yellow particle field with constellation links; sits behind content and scrolls through.
- **GSAP** — timeline hero entrance + `ScrollTrigger` reveals throughout (`@gsap/react`).
- **Icons** — `lucide-react` (brand glyphs inlined in `components/brand-icons.tsx`).
- **SEO** — full Metadata API (Open Graph, Twitter, canonical), `Person` JSON-LD, `sitemap.ts`, `robots.ts`, `manifest.ts`, custom SVG favicon (`public/icon.svg`).

Accessibility: honors `prefers-reduced-motion` (animations and particle motion disable gracefully).

## Getting started

You need [Node.js](https://nodejs.org) 20+ installed (`node -v` to check). **All commands run from inside this `client/` folder**, not the repo root.

```bash
cd client          # the app lives here, not at the repo root
npm install        # install dependencies (also auto-installs the git hooks)
npm run dev        # start the dev server → open http://localhost:3000
```

Leave `npm run dev` running while you work — the page live-reloads on every save. Stop it with `Ctrl+C`.

To preview the real production build:

```bash
npm run build && npm run start    # serves the optimized build on http://localhost:3000
```

## Where things live

- `lib/data.ts` — **single source of truth for all résumé content. Edit your copy here** (name, bio, projects, links, etc.).
- `app/` — layout (fonts, metadata, theme provider), page, SEO route handlers.
- `components/` — `hero`, `nav`, `particles`, `shader-background`, `scroll-progress`, `reveal`, `theme-toggle`, and `sections/*`.

Content was migrated from the legacy `../index.html`; the rest of the parent folder is kept only for reference.

## Making changes (the daily workflow)

1. `npm run dev` and open http://localhost:3000.
2. Edit content in `lib/data.ts` (or components for layout/visual changes). The browser updates as you save.
3. When you're happy, commit and push:

   ```bash
   git add -A
   git commit -m "describe what you changed"
   git push
   ```

That's it. **Pushing automatically publishes the live site** — see below.

## How publishing works (automatic) 🚀

There are **two GitHub repos**:

| Repo | Role |
| --- | --- |
| [`ba-00001/resume`](https://github.com/ba-00001/resume) | **Yours (Brian).** Where you work and push — the `origin` remote. |
| [`Valx01P/brian-bazurto-portfolio`](https://github.com/Valx01P/brian-bazurto-portfolio) | **Pablo's.** Hooked up to **Vercel**, which hosts the live site. |

You only ever touch your own repo. Whatever you push to `main` lands on Pablo's repo's `main` and Vercel redeploys. Two things keep them in sync, so you don't have to think about it:

1. **A GitHub Action** (`.github/workflows/mirror.yml`) — runs on GitHub after every push to `main` and mirrors it to the deploy repo. **This is the guarantee.** It works no matter how you push: terminal, VS Code / Cursor buttons, a coding agent, even editing files directly on github.com.
2. **A local git hook** (husky, auto-installed) — a *fast path* that mirrors instantly at push time so the site updates in seconds instead of ~a minute. It's best-effort: if it can't (you're offline, or don't have direct access to the deploy repo), it just prints a note and the push continues — the Action still publishes it.

So in practice: **commit, `git push`, done.** The site updates either way.

### If you see "Couldn't instant-mirror…"

That's just the fast local path opting out — **it's harmless, the Action still deploys your push.** You don't have to do anything.

If you *want* the instant path too (optional), you need direct write access to the deploy repo: accept Pablo's collaborator invite to `Valx01P/brian-bazurto-portfolio` (check your **email** / https://github.com/notifications), or ask **Pablo** (`pablovaldes0925@gmail.com`). Without it, everything still works — just via the Action.

**Escape hatch:** `MIRROR_SKIP=1 git push` skips the local fast path entirely (the Action still deploys).

> The hook lives in `.husky/pre-push` → `scripts/mirror-push.sh`, and reinstalls automatically on `npm install` / `npm run dev`. The Action needs a one-time `MIRROR_TOKEN` secret in this repo's settings (Pablo set this up).
