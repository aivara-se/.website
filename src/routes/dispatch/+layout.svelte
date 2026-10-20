<script lang="ts">
	import type { Snippet } from 'svelte';
	import ProjectShell from '#lib/components/ProjectShell.svelte';
	import type { Project } from '#lib/data/projects.js';
	import { d } from '#lib/i18n/index.js';

	// The project's own chrome, on every page under /dispatch.
	let { data, children }: { data: { project: Project }; children: Snippet } = $props();
</script>

<ProjectShell {d} project={data.project}>{@render children()}</ProjectShell>
