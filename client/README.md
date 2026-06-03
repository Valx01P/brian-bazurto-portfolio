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

You only ever touch your own repo. A git hook (installed automatically by `npm install`) does the rest: **every `git push` also force-pushes your latest commit to Pablo's repo's `main` branch**, and Vercel redeploys the live site. The two repos always match.

This works the same whether you push from the terminal, from the VS Code / Cursor git buttons, or via a coding agent — the hook runs in all of them.

### If a push says it can't update the live site

You'll see a message if the hook can't write to Pablo's deployment repo. Almost always it means you haven't **accepted Pablo's collaborator invite** yet:

1. Check your **email** and https://github.com/notifications for an invite to `Valx01P/brian-bazurto-portfolio` and accept it.
2. Or message **Pablo** (`pablovaldes0925@gmail.com`) to re-send it.
3. Make sure git/GitHub is signed in as the GitHub account Pablo invited.

In a normal terminal it will **ask** whether to push to your own repo anyway (the live site just won't update until access is fixed). In the VS Code/Cursor UI or via a coding agent it **blocks the push** instead, so the live site never silently falls out of sync.

**Escape hatch:** to push to your own repo *without* updating the live site (rarely needed), run:

```bash
MIRROR_SKIP=1 git push
```

> Details of the hook live in `scripts/mirror-push.sh`. The hook is wired up by `.husky/pre-push` and reinstalled automatically whenever you run `npm install`.
