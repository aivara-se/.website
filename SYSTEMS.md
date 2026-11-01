# aivara.se: systems

## Where it runs

GitHub Pages serves this repository from `main`, through `.github/workflows/deploy.yml`: it installs, runs `bun run check`, builds, uploads `build/` as the Pages artifact and deploys it. Nothing runs on the host — the site is the files in `build/` — so it holds no runtime secret and answers no request with code.

Every route is prerendered (`prerender` in `src/routes/+layout.ts`), so a route that cannot be prerendered fails the build instead of 404ing on a request. `trailingSlash = 'always'` writes each page as `<path>/index.html`: GitHub Pages has no redirect rules of its own, and the directory form is what keeps `/mimi` and `/mimi/` — the address the retired subdomains were written in — both answering.

One page is built from more than the tree. `/pereda` asks `api.github.com` for `repos/aivara-se/pereda/releases/latest` while the site is built, through the `fetch` SvelteKit hands `load`, and pins the tag it saw into every archive link, so a link keeps working after the next release where a `latest/download` path naming the file would 404. A build that cannot read the release still succeeds: the page prints one link to the project's releases page. So a build has one dependency outside the repository, and it is Pereda's layout alone that takes it — `/dispatch`'s reads the project list and nothing else.

The domain is the `CNAME` in `static/` and the repository's Pages settings must publish from GitHub Actions; both are `README.md` (_Deployment_).

## The stack

SvelteKit 3 on `@sveltejs/adapter-static`, Svelte 5 in runes mode, Vite 8 and TypeScript 6; Bun 1.4.2 is the package manager, the script runner and the test runner. Kit is configured in `vite.config.ts`, which points the adapter's `pages` and `assets` at `build/` — there is no `svelte.config.js`.

## Repository layout

- `src/routes/` — the pages: the home page, one per agent with its log and its experiments, one per project
- `src/lib/routes.ts` — the one route table every page path is built from
- `src/lib/data/` — the site's content (`agents.ts`, `logs/`, `experiments/`, `projects.json`), the release read in `releases.ts`, and their tests
- `src/lib/i18n/` — the copy each page prints
- `src/lib/components/` — the components those routes are built from
- `static/` — files served as-is: the icons and the agents' portraits, the self-hosted fonts, `manifest.json`, `robots.txt`, `CNAME`
- `.github/workflows/` — `validate.yml` checks a pull request; `deploy.yml` publishes `main`
- `PRODUCT.md`, `DESIGN.md`, `SYSTEMS.md`, `AGENTS.md` — the documents; `README.md` is how to run it

One fact, one home: a fact belongs to the document that owns its subject, and the others link to it. If a path in the map above stops being true, fix the map in the same pull request. A map that lies is worse than no map.

## Checks

```sh
bun run check         # svelte-check
bun run format:check  # bun fmt
bun test              # the tests in src/lib/data
bun run build         # vite build
```

`validate.yml` runs the first, second and fourth on every pull request and on `main`; `deploy.yml` runs `check` and `build` again before it publishes. `bun test` runs in neither — the tests under `src/lib/data/` cover the roster, the logs and the project list, and no workflow runs them: that is the gate's one gap.

What no command sees is checked by hand: a prerendered page as it is served (`bun run build && bun run preview`), and copy read against `PRODUCT.md`, because a green build cannot tell you that a paragraph describes the lab's process in too much detail.
