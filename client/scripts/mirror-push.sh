#!/usr/bin/env sh
#
# mirror-push.sh — keeps the live deployment in sync with Brian's repo.
#
# Brian works in HIS repo (the "origin" remote -> github.com/ba-00001/resume).
# Pablo HOSTS the site: a second repo (github.com/Valx01P/brian-bazurto-portfolio)
# is the one actually wired to Vercel. That repo must always mirror whatever
# Brian pushes, so the site redeploys automatically.
#
# This script runs from the git `pre-push` hook (via husky). On every push to
# origin it force-pushes the same commit onto the deployment repo's production
# branch. "Force" is intentional: the deployment repo is a throwaway mirror, so
# we overwrite it outright and never deal with merge conflicts.
#
# BEST-EFFORT, NEVER BLOCKS. This is only the fast path — it makes the live site
# update within seconds when it can. The real guarantee is the GitHub Action in
# .github/workflows/mirror.yml, which mirrors the same push server-side. So if
# this local push can't reach the deploy repo (no access, offline, …) we just
# print a heads-up and exit 0 — the push to origin always succeeds and the
# Action still publishes the change.
#
# It is invoked the same way git invokes pre-push:
#     mirror-push.sh <remote-name> <remote-url>      (ref updates arrive on stdin)
#
# Escape hatch: `MIRROR_SKIP=1 git push` skips this fast path (the Action still
# deploys, just a touch slower).

set -eu

# ----------------------------------------------------------------------------
# Config — the repo Vercel deploys, and the branch it deploys from.
# ----------------------------------------------------------------------------
MIRROR_REMOTE="deploy-mirror"
MIRROR_URL="https://github.com/Valx01P/brian-bazurto-portfolio.git"
MIRROR_BRANCH="main"
ZERO="0000000000000000000000000000000000000000"

REMOTE_NAME="${1:-}"
REMOTE_URL="${2:-}"

# ----------------------------------------------------------------------------
# 1. Never mirror a push that is already going to the mirror (avoid recursion).
# ----------------------------------------------------------------------------
if [ "$REMOTE_NAME" = "$MIRROR_REMOTE" ]; then
	exit 0
fi
case "$REMOTE_URL" in
	*Valx01P/brian-bazurto-portfolio*) exit 0 ;;
esac

# ----------------------------------------------------------------------------
# 2. Explicit opt-out.
# ----------------------------------------------------------------------------
if [ "${MIRROR_SKIP:-}" = "1" ]; then
	echo "↪︎  MIRROR_SKIP=1 — skipping local mirror (the GitHub Action still deploys)." >&2
	exit 0
fi

# ----------------------------------------------------------------------------
# 3. Work out which commit to deploy. git feeds pre-push the ref updates on
#    stdin as:  <local-ref> <local-sha> <remote-ref> <remote-sha>
#    We deploy the first real (non-deletion) update. If stdin is empty (e.g.
#    the hook was run by hand) we fall back to HEAD.
# ----------------------------------------------------------------------------
DEPLOY_SHA=""
SAW_REF=0
while read -r _local_ref local_sha _remote_ref _remote_sha; do
	SAW_REF=1
	[ "$local_sha" = "$ZERO" ] && continue   # branch deletion — nothing to deploy
	DEPLOY_SHA="$local_sha"
	break
done

if [ "$SAW_REF" = "1" ] && [ -z "$DEPLOY_SHA" ]; then
	# Only deletions were pushed; nothing to mirror.
	exit 0
fi
if [ -z "$DEPLOY_SHA" ]; then
	DEPLOY_SHA="$(git rev-parse HEAD)"
fi
SHORT_SHA="$(git rev-parse --short "$DEPLOY_SHA")"

# ----------------------------------------------------------------------------
# 4. Make sure the mirror remote exists.
# ----------------------------------------------------------------------------
if ! git remote get-url "$MIRROR_REMOTE" >/dev/null 2>&1; then
	git remote add "$MIRROR_REMOTE" "$MIRROR_URL"
fi

# ----------------------------------------------------------------------------
# 5. Force-push the commit onto the deployment branch.
# ----------------------------------------------------------------------------
echo "→  Syncing deployment repo: $SHORT_SHA → $MIRROR_REMOTE/$MIRROR_BRANCH" >&2
ERRLOG="$(mktemp)"
trap 'rm -f "$ERRLOG"' EXIT

if git push --force "$MIRROR_REMOTE" "$DEPLOY_SHA:refs/heads/$MIRROR_BRANCH" 2>"$ERRLOG"; then
	cat "$ERRLOG" >&2
	echo "✓  Deployment repo updated — Vercel will redeploy the live site." >&2
	exit 0
fi

# ----------------------------------------------------------------------------
# 6. The instant mirror failed — but that's OK. This hook is only a fast path;
#    the GitHub Action (.github/workflows/mirror.yml) mirrors the same push
#    server-side and is the real guarantee. So we NEVER block the push: we just
#    print a soft heads-up and let it through (exit 0).
# ----------------------------------------------------------------------------
ERR="$(cat "$ERRLOG")"

PERMISSION_ISSUE=0
case "$ERR" in
	*403*|*"Permission"*|*"permission"*|*denied*|*"Authentication failed"* | \
	*"could not read Username"*|*"Repository not found"*|*"Invalid username or"*)
		PERMISSION_ISSUE=1 ;;
esac

echo "ℹ  Couldn't instant-mirror to the deployment repo — no problem, the" >&2
echo "   GitHub Action will publish this push in ~a minute. Continuing." >&2
if [ "$PERMISSION_ISSUE" = "1" ]; then
	echo "   (Reason: your account can't write to the deploy repo directly. The" >&2
	echo "    site still updates via the Action. Want the faster local path too?" >&2
	echo "    Accept Pablo's invite to Valx01P/brian-bazurto-portfolio — check" >&2
	echo "    your email / https://github.com/notifications, or ask Pablo.)" >&2
else
	echo "   (Reason below — likely a transient network/git error.)" >&2
	echo "$ERR" | sed 's/^/    /' >&2
fi
exit 0
