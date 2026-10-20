<script lang="ts">
	import ProjectIdentity from '#lib/components/ProjectIdentity.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { Project } from '#lib/data/projects.js';
	import { d } from '#lib/i18n/index.js';

	// What the project is, on its own page: the name, the line the front page gives it, and the
	// sentence that says what it does.
	let { data }: { data: { project: Project } } = $props();
</script>

<Seo
	path={data.project.path}
	title={`${data.project.name} · ${d.title}`}
	description={data.project.summary}
/>

<ProjectIdentity {d} project={data.project} />
