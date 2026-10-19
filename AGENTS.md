# Agent Instructions

The lab's public website at https://aivara.se: what the lab is, the bots that work in it, and what they are building.

A SvelteKit application (SvelteKit 2, Svelte 5, Vite 8, TypeScript) with Bun as its package manager and runner, deployed to Cloudflare Pages as a server-rendered worker. The pages — home, bots, log, projects — are routes under `src/routes/` that read their content from `src/lib/data/`; the design tokens are in `DESIGN.md` and the product truth in `PRODUCT.md`. `README.md` is the short version: how to run it, how to check it, and where it deploys.

This file is the `aivara-se` agent convention, version `2`, adopted from `0bbd7e674d395dc210397621164654b4d36dd7e0`. Adopt it, do not fork it: repository-specific facts live in the sections below, and nothing else here is meant to be edited per repository.

## Current Project Focus

Keep the site's content, the bot roster and the design tokens true to the lab. Do not restructure the routes or the Cloudflare Pages setup without the operator.

This section is steering, not policy. It is the one place where what matters right now outranks the standing rules below, it changes often, and it is replaced rather than appended to. Keep it short enough to read in full, and current enough to be worth reading.

## House rules

- **Never** add a hue. The site is monochrome on near-black and the four `botGold`/`botCyan`/`botPink`/`botMint` tokens in `DESIGN.md` are the only colour it shows; a new bot's accent is added to `DESIGN.md` and to those tokens at the same time as its portrait, never in one page on its own.
- **Never** write the lab's mechanics into copy. `PRODUCT.md` fixes how the process may be described: one high-level sentence at most, no numbered steps, no pipeline diagrams, no detail about branches, reviews or checks.
- **Never** change the deployment shape without the operator. Cloudflare Pages builds this repository through its Git integration — the build command, the output directory and the `nodejs_als` compatibility flag live in its dashboard, not here — and `.github/workflows/validate.yml` checks, it does not deploy.
- **Always** keep one source per fact: the pages read `src/lib/data/`, the design is declared in `DESIGN.md`, and neither is restated in a component.

## Tooling

- **Bun is the runtime for scripts.** A script that runs commands — a check, a build, a release, a data fix — is written in TypeScript and run with `bun`: `bun run scripts/<name>.ts`. **Never** Python; prefer it over a bash shell script, because a shell script past a handful of lines has no types, no argument handling and no error handling. A one-line command typed at the prompt is not a script.
- **Never** add a second package manager, a second lockfile, a second formatter or a second test runner. The toolchain is the one the repository already uses, declared in the files it already has.
- **Never** report "tests pass", "it builds" or "verified" without the command and the tree it ran against.

## Verify before pushing

```bash
bun run check         # svelte-check
bun run format:check  # prettier
bun test              # the tests in src/lib/data
bun run build         # vite build
```

Run the whole sequence, not just its fast part, and read every result — the exit code of the last command says nothing about the first.

CI (`.github/workflows/validate.yml`) runs the first, second and fourth of these. They are not one wrapper command yet, and `bun test` — which exists in `package.json` and covers `src/lib/data/*.test.ts` — runs nowhere, neither here nor in CI: that is the open finding, not a state to copy into a handoff.

Then the things these commands cannot see. The pages are server-rendered on Cloudflare, so a change to SSR, routing or `src/app.css` is checked by running the worker (`bun run build && bunx wrangler pages dev .svelte-kit/cloudflare`), not by a green `svelte-check`. And written copy is checked against the rule in `PRODUCT.md` above — a green build cannot tell you that a paragraph describes the process in too much detail.

## Version Control

- **Branches**: lowercase, hyphens only, one per task, named for the change — `fix-log-timezone`, `chore/adopt-agents-config`. No uppercase, no underscores, no personal prefixes.
- **Commits**: Conventional Commits, lowercase, single line, no scopes — `type: short description`.
- **Never** commit to `main` directly. **Never** force-push a branch another agent or person has seen.
- Keep history linear: no merge commits, no empty commits, no work-in-progress commits left behind.
- Commit under your own identity — your name, your address at this organisation. Never a generic bot, never another agent's identity.
- Remote work is always a branch plus a pull request. The pull request body says what changed, what was verified and how, and what was left out; request review from request review from the operator (`thani-sh`) and one peer agent. Leave the working tree clean: no scratch files, no editor backups, no `.env` you created.

## Repository Structure

- `src/routes/`: the pages — home, bots, log, projects — as SvelteKit routes
- `src/lib/components/`: the components those routes are built from
- `src/lib/data/`: the site's content (`projects.json`, `lab.ts`) and its tests
- `static/`: files served as-is — icons, bot portraits, `manifest.json`, `robots.txt`
- `DESIGN.md`, `PRODUCT.md`: the authoritative design and product documents
- `.github/workflows/validate.yml`: CI
- `AGENTS.md`: the entry file an agent reads first
- `README.md`: how to run and check the site, and where it deploys

New markdown goes in the directory that already owns its subject, and a fact has exactly one home. Never add a second copy of something a document already says; link to it. If a path in the map above stops being true, fix the map in the same pull request. A map that lies is worse than no map.
