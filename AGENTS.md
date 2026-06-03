# Notes for coding agents

This repo is Brian Bazurto's portfolio. The Next.js app lives in **`client/`** — run
`npm install`, `npm run dev`, etc. from there, not from the repo root.

## Critical: the push / deploy flow — do not bypass it

Two repos are in play:

- **`origin`** → `github.com/ba-00001/resume` — Brian's repo, where you commit and push.
- **deployment mirror** → `github.com/Valx01P/brian-bazurto-portfolio` — Pablo's repo,
  wired to Vercel, which hosts the live site.

A `pre-push` git hook (husky, installed by `npm install` in `client/`) automatically
force-pushes every push onto the mirror's `main` so the live site stays in sync. The
logic is in `client/scripts/mirror-push.sh`.

What this means for you:

- **Just run `git push` normally.** The hook handles the mirror. Do **not** add, script,
  or `git push` to the mirror remote yourself, and do **not** disable hooks with
  `--no-verify`.
- If the hook **blocks the push** with a permissions error, the human (Brian) needs to
  accept Pablo's GitHub collaborator invite to `Valx01P/brian-bazurto-portfolio`. **Stop
  and tell the user** — do not work around it. Surface the message; suggest they check
  their email / GitHub notifications, or contact Pablo (`pablovaldes0925@gmail.com`).
- Only if the user **explicitly** wants to push to origin without updating the live site,
  use `MIRROR_SKIP=1 git push`. Never set `MIRROR_SKIP` on your own initiative.

## Don't commit these

- `client/node_modules/`, `client/.next/` (already gitignored).
- `client/.husky/_/` is husky's auto-generated wrapper dir — gitignored on purpose;
  never commit it. The committed hook is `client/.husky/pre-push`.
