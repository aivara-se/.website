<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Dictionary } from "#lib/i18n/index.js";
  import { href } from "#lib/routes.js";

  // The line every page wears at the top: the wordmark home at the left, the page's own icon
  // links at the right. A page may add to the trail after the wordmark — an agent's name — and
  // brings its own glyphs; everything else is shared, so the wordmark and the icons' boxes land
  // in exactly the same place on every page.
  let { d, trail, icons }: { d: Dictionary; trail?: Snippet; icons: Snippet } =
    $props();

  const home = $derived(href("home"));
</script>

<header class="masthead">
  <div class="start">
    <a class="wordmark" href={home}>{d.title}</a>
    {#if trail}
      {@render trail()}
    {/if}
  </div>

  <nav aria-label={d.nav.label}>
    {@render icons()}
  </nav>
</header>

<style>
  .masthead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    padding: var(--space-md) 0 0;
  }

  .masthead nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .start {
    display: flex;
    align-items: baseline;
    gap: var(--space-xs);
  }

  .wordmark {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-strong);
  }

  .wordmark:hover {
    color: var(--primary-hover);
  }

  /* The icons are the page's own, but their box is the masthead's: the same padding, the same
	   colour and the same place on every page. One page has more than one, so the rules are on
	   the link rather than a class the page would have to guess at. */
  .masthead nav :global(a) {
    display: inline-flex;
    padding: 6px;
    color: var(--tertiary);
    border-bottom: none;
  }

  .masthead nav :global(a:hover) {
    color: var(--primary-hover);
  }

  /* The icons arrive as components that draw their own strokes, so the masthead only places
	   them: the box and the colour are its, the drawing is theirs. */
  .masthead nav :global(svg) {
    display: block;
  }
</style>
