# Notes for coding agents

This repo is Brian Bazurto's portfolio. The Next.js app lives in **`client/`** — run
`npm install`, `npm run dev`, etc. from there, not from the repo root.

## Critical: the push / deploy flow — do not bypass it

Two repos are in play:

- **`origin`** → `github.com/ba-00001/resume` — Brian's repo, where you commit and push.
- **deployment mirror** → `github.com/Valx01P/brian-bazurto-portfolio` — Pablo's repo,
  wired to Vercel, which hosts the live site.

Two things keep the mirror in sync:

1. **A GitHub Action** (`.github/workflows/mirror.yml`) mirrors every push to `main`
   server-side. **This is the guarantee** — it runs regardless of local setup.
2. **A local husky `pre-push` hook** (`client/scripts/mirror-push.sh`) is a best-effort
   fast path that mirrors instantly when it can. It **never blocks**: if it can't reach
   the mirror it prints a note and the push proceeds.

What this means for you:

- **Just run `git push` normally.** Both mechanisms handle the mirror. Do **not** add,
  script, or `git push` to the mirror remote yourself, and do **not** use `--no-verify`.
- If the hook prints **"Couldn't instant-mirror…"**, that's expected and harmless — the
  Action still deploys. Do **not** treat it as an error or try to work around it.
- `MIRROR_SKIP=1 git push` skips only the local fast path (the Action still deploys).
  Don't set it on your own initiative.

## Don't commit these

- `client/node_modules/`, `client/.next/` (already gitignored).
- `client/.husky/_/` is husky's auto-generated wrapper dir — gitignored on purpose;
  never commit it. The committed hook is `client/.husky/pre-push`.
