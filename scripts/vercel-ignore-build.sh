# Copy the next line into Vercel > Build and Deployment > Ignored Build Step > Custom.
# Keep it inline there so it also protects historical commits without this file.
# Vercel's convention: exit 1 builds; exit 0 skips. Lookup failures skip production.
[ "$VERCEL_ENV" != production ] && exit 1; [ "$VERCEL_GIT_COMMIT_REF" = main ] && [ -n "$VERCEL_GIT_COMMIT_SHA" ] && [ "$VERCEL_GIT_COMMIT_SHA" = "$(git ls-remote https://github.com/manaskarra/manaskarra-com refs/heads/main | cut -f1)" ] && exit 1; exit 0
