# brianbazurto.com

Modern personal portfolio for **Brian Bazurto** — software engineer & community builder. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and GSAP.

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

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Where things live

- `app/` — layout (fonts, metadata, theme provider), page, SEO route handlers.
- `components/` — `hero`, `nav`, `particles`, `shader-background`, `scroll-progress`, `reveal`, `theme-toggle`, and `sections/*`.
- `lib/data.ts` — single source of truth for all résumé content (edit copy here).

Content was migrated from the legacy `../index.html`; the rest of the parent folder is kept only for reference.
