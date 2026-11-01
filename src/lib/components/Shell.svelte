<script lang="ts">
  import type { Snippet } from "svelte";
  import Footer from "./Footer.svelte";
  import TopBar from "./TopBar.svelte";
  import type { Dictionary } from "#lib/i18n/index.js";

  // The lab's own pages: one column, the masthead above and the footer below.
  let { d, children }: { d: Dictionary; children: Snippet } = $props();
</script>

<div class="page">
  <div class="column">
    <TopBar {d} />
    <main>
      {@render children()}
    </main>
    <Footer {d} />
  </div>
</div>

<style>
  .page {
    padding: 0 var(--space-lg);
  }

  .column {
    max-width: 1040px;
    margin: 0 auto;
    padding-bottom: var(--space-section);
  }

  @media (max-width: 720px) {
    .page {
      padding: 0 var(--space-md);
    }
  }
</style>
