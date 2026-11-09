# Deployment

- Production is `https://manaskarra.com`, backed by the Vercel project `manaskarra-com` and GitHub `manaskarra/manaskarra-com`.
- Ship through the connected Git integration: fetch the remote, merge approved changes into `main`, and wait for that exact commit's production deployment.
- Never publish new work by promoting/redeploying a previous deployment, a feature branch, or an outdated local checkout. Do not bypass the production-ref checks.
- Compare the production deployment's source SHA with the current remote `main` before reporting success, and verify the public URL reflects the intended changes.
- If a rollback is explicitly requested, prefer a Git revert on `main`. Direct Vercel promotion/rollback bypasses build guards and requires a specific rollback request.
