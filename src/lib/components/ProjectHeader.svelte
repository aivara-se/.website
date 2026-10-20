<script lang="ts">
	import Masthead from './Masthead.svelte';
	import CodeMark from './CodeMark.svelte';
	import type { Project } from '#lib/data/projects.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// A project page's header: the same masthead as every other page, with the project's name
	// added after the wordmark and the code in place of the organisation's mark — the page is
	// the project's, so the icon leaves for its repository.
	let { d, project }: { d: Dictionary; project: Project } = $props();
</script>

<Masthead {d} iconHref={project.repo} iconLabel={d.projects.repo}>
	{#snippet trail()}
		<span class="sep" aria-hidden="true">/</span>
		<a class="project" href={project.path}>{project.name}</a>
	{/snippet}

	{#snippet icon()}
		<CodeMark />
	{/snippet}
</Masthead>

<style>
	/* Only the trail's own parts: the wordmark before it belongs to the masthead. A project has
	   no accent of its own — colour on this site means which agent — so the trail is ink. */
	.sep {
		font-size: 13.5px;
		color: var(--tertiary);
	}

	.project {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.project:hover {
		color: var(--primary-hover);
	}
</style>
