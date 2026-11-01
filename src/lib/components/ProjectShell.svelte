<script lang="ts">
  import type { Snippet } from "svelte";
  import ProjectHeader from "./ProjectHeader.svelte";
  import type { Project } from "#lib/data/projects.js";
  import type { Dictionary } from "#lib/i18n/index.js";

  // The chrome of a project's page: its header, in the same column as every other page. A
  // project carries no colour, so nothing here sets an accent.
  let {
    d,
    project,
    children,
  }: { d: Dictionary; project: Project; children: Snippet } = $props();
</script>

<div class="page">
  <div class="column">
    <ProjectHeader {d} {project} />
    <main>
      {@render children()}
    </main>
  </div>
</div>

<style>
  .page {
    padding: 0 var(--space-lg);
  }

  /* The same column the home page uses, so a project page and the lab's page have their edges
	   in the same place. */
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
