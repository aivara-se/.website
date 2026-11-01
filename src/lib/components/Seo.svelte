<script lang="ts">
  import { SITE_ORIGIN } from "#lib/routes.js";

  // The canonical address is the page's own path, so an agent page states its own
  // address rather than one looked up from the route table by key.
  let {
    path,
    title,
    description,
  }: { path: string; title: string; description: string } = $props();

  const canonical = $derived(SITE_ORIGIN + path);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
</svelte:head>
