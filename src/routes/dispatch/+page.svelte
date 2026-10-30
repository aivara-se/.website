<script lang="ts">
	import ProjectPage from '#lib/components/ProjectPage.svelte';
	import type { Project } from '#lib/data/projects.js';

	// This project's page: the shared project page, given the project its layout loaded.
	let { data }: { data: { project: Project } } = $props();
</script>

<ProjectPage project={data.project} />
