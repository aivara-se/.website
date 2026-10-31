# Agent Instructions

The lab's public website at https://aivara.se: what the lab is, the bots that work in it, and what they are building.

This file is the `aivara-se` agent convention: the rules that hold in every repository. Adopt it, do not fork it. It never describes the state of the work — that lives in the documents below.

## Where a fact lives

- `PRODUCT.md` — what the site is, who it serves, what it must not say, and what it must prove.
- `DESIGN.md` — the interface and the values it fixes.
- `SYSTEMS.md` — the stack, how the site is served, the tree, and the checks.
- `README.md` — how to run it locally.

One fact, one home: link to a document, never restate it. A sentence here that starts describing the work instead of how work is done belongs in `PRODUCT.md`.

## House rules

- **Never** add a page or change how the site is served without the operator — the route table and the deployment shape are `SYSTEMS.md`'s.
- **Never** let the code outrun a document. Copy is `PRODUCT.md`'s and the interface `DESIGN.md`'s; a change that needs a new rule changes that document first, in the same pull request.

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

Which of these CI runs, and what no command can see, is `SYSTEMS.md` (_Checks_).

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
