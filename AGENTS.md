# Agent Instructions

The lab's public website at https://aivara.se: what the lab is, the bots that work in it, and what they are building.

A SvelteKit application (SvelteKit 2, Svelte 5, Vite 8, TypeScript) with Bun as its package manager and runner, prerendered and served from GitHub Pages. The pages — the home page, one per agent with its log, and one per project — are routes under `src/routes/` that read their content from `src/lib/data/`; the design tokens are in `DESIGN.md` and the product truth in `PRODUCT.md`. `README.md` is the short version: how to run it, how to check it, and where it deploys.

This file is the `aivara-se` agent convention: the rules that hold in every repository. Adopt it, do not fork it. It never describes the state of the work — that lives in the documents below.

## Where a fact lives

- `PRODUCT.md` — what the site is, who it serves, what it must not say, and what it must prove.
- `DESIGN.md` — the interface and the values it fixes.
- `README.md` — how to run it locally.

One fact, one home: link to a document, never restate it.

## House rules

- **Never** add a hue. The site is monochrome on near-black and the four `botGold`/`botCyan`/`botPink`/`botMint` tokens in `DESIGN.md` are the only colour it shows; a new bot's accent is added to `DESIGN.md` and to those tokens at the same time as its portrait, never in one page on its own.
- **Never** write the lab's mechanics into copy. `PRODUCT.md` fixes how the process may be described: one high-level sentence at most, no numbered steps, no pipeline diagrams, no detail about branches, reviews or checks.
- **Never** change the deployment shape or the route table without the operator. GitHub Pages serves this repository from `main` through `.github/workflows/deploy.yml`, which checks, builds and uploads `build/`; its settings live in the repository's configuration, not here.
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

Then the things these commands cannot see. The site is prerendered, so a change to routing or `src/app.css` is checked by building (`bun run build`) and opening the affected page from `build/`, not by a green `svelte-check`. And written copy is checked against the rule in `PRODUCT.md` above — a green build cannot tell you that a paragraph describes the process in too much detail.

## Skills

The organisation's skills live in `aivara-se/.agents/skills` and every agent reads them from there; a repository carries no copy. Each declares a `when-to-use`: open the one that covers the work before starting it.

## Version Control

- **Branches**: lowercase, hyphens, one per task: `docs/`, `feat/`, `fix/` or `chore/` and a short name — `docs/adopt-agents-config`, `fix-log-timezone`. No uppercase, no underscores, no personal prefixes.
- **Commits**: Conventional Commits, lowercase, single line, no scopes — `type: short description`.
- **Never** commit to `main` directly. **Never** force-push a branch another agent or person has seen.
- Keep history linear: no merge commits, no empty commits, no work-in-progress commits left behind.
- Commit under your own identity — your name, your address at this organisation. Never a generic bot, never another agent's identity.
- Remote work is always a branch plus a pull request. The pull request body says what changed, what was verified and how, and what was left out. Leave the working tree clean: no scratch files, no editor backups, no `.env` you created.
- Request review from the operator (`thani-sh`) alone on a documents-only change, and from one peer agent as well on an implementation one.

## Repository Structure

- `src/routes/` — the pages: the home page, one per agent with its log, and one per project
- `src/lib/components/` — the components those routes are built from
- `src/lib/data/` — the site's content (`agents.ts`, `logs.ts`, `projects.json`) and its tests
- `src/lib/i18n/` — the copy each page prints
- `src/lib/routes.ts` — the one route table the paths come from
- `static/` — files served as-is: icons, bot portraits, `manifest.json`, `robots.txt`
- `DESIGN.md`, `PRODUCT.md` — the authoritative design and product documents
- `.github/workflows/` — `validate.yml` checks a pull request; `deploy.yml` publishes `main` to GitHub Pages
- `AGENTS.md` — the entry file an agent reads first
- `README.md` — how to run and check the site, and where it deploys

New markdown goes in the directory that already owns its subject, and a fact has exactly one home. Never add a second copy of something a document already says; link to it. If a path in the map above stops being true, fix the map in the same pull request. A map that lies is worse than no map.
