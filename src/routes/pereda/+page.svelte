<script lang="ts">
  import ProjectPage from "#lib/components/ProjectPage.svelte";
  import type { Project } from "#lib/data/projects.js";
  import type { Download } from "#lib/data/releases.js";

  // This project's page: the shared project page, given the project its layout loaded and the
  // release its layout read.
  let { data }: { data: { project: Project; downloads: Download[] } } =
    $props();
</script>

<ProjectPage project={data.project} downloads={data.downloads} />
