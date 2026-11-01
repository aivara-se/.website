<script lang="ts">
  import Masthead from "./Masthead.svelte";
  import CodeMark from "./CodeMark.svelte";
  import type { Dictionary } from "#lib/i18n/index.js";
  import { GITHUB_ORG } from "#lib/routes.js";

  // The lab's masthead: the line every page wears, with the code as its icon.
  let { d }: { d: Dictionary } = $props();
</script>

<Masthead {d}>
  {#snippet icons()}
    <a href={GITHUB_ORG} aria-label={d.nav.github} title={d.nav.github}
      ><CodeMark /></a
    >
  {/snippet}
</Masthead>
