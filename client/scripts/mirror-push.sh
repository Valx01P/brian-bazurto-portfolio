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
# It is invoked the same way git invokes pre-push:
#     mirror-push.sh <remote-name> <remote-url>      (ref updates arrive on stdin)
#
# Escape hatch: `MIRROR_SKIP=1 git push` pushes to origin only and skips the
# mirror. Use it only when you knowingly want the live site to lag behind.

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
	echo "↪︎  MIRROR_SKIP=1 — pushing to origin only, deployment mirror skipped." >&2
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
# 6. The mirror push failed. Figure out whether it's a permissions problem
#    (Brian hasn't accepted Pablo's invite yet) and react accordingly.
# ----------------------------------------------------------------------------
ERR="$(cat "$ERRLOG")"
echo "$ERR" >&2

PERMISSION_ISSUE=0
case "$ERR" in
	*403*|*"Permission"*|*"permission"*|*denied*|*"Authentication failed"* | \
	*"could not read Username"*|*"Repository not found"*|*"Invalid username or"*)
		PERMISSION_ISSUE=1 ;;
esac

echo "" >&2
echo "──────────────────────────────────────────────────────────────────────" >&2
echo "✗  Could not update the deployment repo:" >&2
echo "     $MIRROR_URL" >&2
echo "" >&2
if [ "$PERMISSION_ISSUE" = "1" ]; then
	echo "   This looks like a PERMISSIONS problem — your GitHub account can't" >&2
	echo "   write to Pablo's deployment repo yet. Most likely you haven't" >&2
	echo "   accepted the collaborator invite." >&2
	echo "" >&2
	echo "   Fix it:" >&2
	echo "     1. Check your email (and https://github.com/notifications) for" >&2
	echo "        Pablo's invite to Valx01P/brian-bazurto-portfolio and accept it." >&2
	echo "     2. Or ping Pablo <pablovaldes0925@gmail.com> to re-send it." >&2
	echo "     3. Make sure git is signed in as the right GitHub account." >&2
else
	echo "   This looks like a network/git error rather than permissions." >&2
	echo "   Check your connection and try the push again." >&2
fi
echo "──────────────────────────────────────────────────────────────────────" >&2
echo "" >&2

# ----------------------------------------------------------------------------
# 7. Decide whether to let the push to origin proceed.
#    - Interactive human (a real terminal): ask.
#    - GUI / coding agent / CI (no tty): fail loudly so the missing sync is
#      never silent. Override with `MIRROR_SKIP=1 git push` once understood.
# ----------------------------------------------------------------------------
# Note: on macOS `/dev/tty` passes the -e/-r/-w file tests even when there is
# no controlling terminal, so we must actually try to open it to tell a real
# human apart from a GUI / coding agent / CI run.
if (exec 3<>/dev/tty) 2>/dev/null; then
	printf "Push to your origin repo anyway, without updating the live site? [y/N] " >/dev/tty
	read -r answer </dev/tty || answer=""
	case "$answer" in
		[Yy] | [Yy][Ee][Ss])
			echo "↪︎  Proceeding with origin push only. The live site will NOT update yet." >&2
			exit 0 ;;
		*)
			echo "✗  Push aborted. Nothing was pushed. Fix access above and retry." >&2
			exit 1 ;;
	esac
else
	echo "   (Non-interactive shell — GUI, coding agent, or CI.)" >&2
	echo "   The push is BLOCKED so the live site never silently falls behind." >&2
	echo "   If you understand the live site won't update and want to push to" >&2
	echo "   origin anyway, re-run with:  MIRROR_SKIP=1 git push" >&2
	exit 1
fi
