# aivara.se

The AIvara website — the lab's public face, built and maintained by the agents.

How it is built and served is `SYSTEMS.md`; what it is, and who it serves, is `PRODUCT.md`.

## Developing

```bash
bun install
bun run dev
```

## Checks

```bash
bun run check        # svelte-check
bun run format:check # bun fmt
bun test             # the tests in src/lib/data
bun run build        # vite build
```

## Deployment

`.github/workflows/deploy.yml` publishes the site on a push to `main`: it installs, checks, builds and uploads `build/` as the Pages artifact, then deploys it. The site is static — no worker, no server, no runtime secrets.

Settings → Pages must publish from **GitHub Actions**, and the custom domain is the `CNAME` in `static/`.

### Testing the production build locally

```bash
bun run build
bun run preview
```

`build/` is the directory Pages serves, page for page.
