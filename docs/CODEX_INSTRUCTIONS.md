# A2ZConvertor Codex Instructions

## Project Goal

Launch a stable, SEO-focused file conversion website within 7 days.

## Main Priorities

1. Stability
2. Successful Cloudflare deployment
3. SEO
4. User experience
5. New tools

## Critical Workflow Rule

All Codex changes must be made available to the user's local VS Code project.

After every completed task, Codex must:

1. Commit changes.
2. Push the branch to GitHub.
3. Open or update a pull request into `main`.
4. Clearly provide:

   * branch name
   * PR link
   * commit hash
   * exact local commands for the user to run in VS Code.

Example local sync commands:

```bash
git checkout main
git pull origin main
```

If the work is on an unmerged branch, provide:

```bash
git fetch origin
git checkout BRANCH_NAME
```

If a PR must be merged first, say clearly:

```txt
Merge PR first, then run git pull origin main locally.
```

Never assume the user's VS Code project has Codex changes until the user confirms the commit appears in:

```bash
git log --oneline -10
```

## Never

* Do not leave work only inside the Codex environment.
* Do not say a task is complete unless the code is pushed to GitHub.
* Do not modify Cloudflare deployment configuration unless the task is specifically about deployment.
* Do not add unstable AI/background-removal tools.
* Do not remove existing working tools unless asked.
* Do not run `npm audit fix --force` without permission.
* Do not break PDF.js worker setup.
* Do not add server-only dependencies to browser-only tools without checking compatibility.

## Required Checks Before Starting

Before making changes:

1. Inspect the current repo state.
2. Check the branch.
3. Run:

```bash
npm run build
npm run lint
```

If build or lint already fails, report that before making changes.

## Required Checks Before Finishing

Before reporting completion:

1. Run:

```bash
npm run build
npm run lint
```

2. Confirm Cloudflare-sensitive files were not accidentally changed:

   * `wrangler.jsonc`
   * `open-next.config.ts`
   * `package.json`
   * deployment scripts

3. Report:

   * files changed
   * commits created
   * branch name
   * PR link
   * build result
   * lint result
   * local VS Code sync commands

## Existing Architecture

* Next.js 16
* Cloudflare Workers deployment through OpenNext
* Dynamic `/convert/[slug]` route
* Tool data in `tools.ts`
* Custom tool rendering through `ToolRenderer`
* Tool-specific FAQs in `toolFaqs.ts`
* Dynamic sitemap
* robots.txt
* JSON-LD structured data
* Homepage hero search
* `/tools` search and category filters

## Current Known Warnings

`npm run lint` may show existing warnings about `<img>` usage in preview components.

These are acceptable for launch unless a low-risk fix is obvious.

Do not spend time replacing image preview `<img>` tags before launch unless explicitly asked.

## Current Roadmap

1. PDF Merge
2. PDF Split
3. PDF Compress
4. PDF to JPG
5. Multi-image JPG to PDF
6. Final launch QA
7. Google Search Console setup
8. Analytics setup

## Deployment Notes

The Cloudflare deploy command must use OpenNext.

Correct deploy command:

```bash
npm run deploy
```

or:

```bash
opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

Do not use:

```bash
npx wrangler versions upload
```

because it fails without a Worker entry point or assets directory.

## Reporting Format

Use this format after each task:

```txt
Task completed:
[short summary]

Branch:
[branch name]

PR:
[PR link]

Commit:
[commit hash]

Files changed:
- file 1
- file 2

Validation:
- npm run build: pass/fail
- npm run lint: pass/fail

Local VS Code sync:
[exact commands user should run]

Notes:
[anything important]
```
