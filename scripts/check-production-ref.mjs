import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const repository = "https://github.com/manaskarra/manaskarra-com.git";

function latestMain() {
  return execFileSync("git", ["ls-remote", "--exit-code", repository, "refs/heads/main"], {
    encoding: "utf8",
    timeout: 20_000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  }).trim().split(/\s+/)[0];
}

export function checkProductionRef(env = process.env, resolveMain = latestMain) {
  if (env.VERCEL_ENV !== "production" && env.VERCEL_TARGET_ENV !== "production") return;
  if (env.VERCEL_GIT_COMMIT_REF !== "main") {
    throw new Error("Production must deploy from main. Merge the changes into main first.");
  }
  const sha = env.VERCEL_GIT_COMMIT_SHA;
  if (!sha || !/^[a-f0-9]{40}$/.test(sha)) {
    throw new Error("Production requires Vercel Git commit metadata. Use the connected Git deployment.");
  }
  const head = resolveMain();
  if (!/^[a-f0-9]{40}$/.test(head) || sha !== head) {
    throw new Error(`Production commit ${sha} is not the latest main (${head || "unavailable"}). Deploy the latest main commit.`);
  }
  console.log(`Production source verified: main at ${sha}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    checkProductionRef();
  } catch (error) {
    console.error(`Production deployment blocked: ${error.message}`);
    process.exitCode = 1;
  }
}
