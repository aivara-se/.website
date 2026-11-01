import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

// GitHub Pages serves the site, at the root of aivara.se — the CNAME in `static/` is the domain it
// answers for. Every route is prerendered, so the adapter writes the whole site to `build/` and
// nothing runs on the host: a route that cannot be prerendered fails the build rather than 404ing
// on request.
export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },

      adapter: adapter({ pages: "build", assets: "build", precompress: false }),
    }),
  ],
});
