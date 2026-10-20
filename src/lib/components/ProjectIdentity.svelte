<script lang="ts">
	import type { Project } from '#lib/data/projects.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// What the project is: its name, the line the front page gives it, and the sentence that says
	// what it does.
	let { d, project }: { d: Dictionary; project: Project } = $props();

	// A project with no copy would render a page with a hole in it, so it fails here instead.
	function copyFor(entry: Project): { summary: string; description: string } {
		const copy = (
			d.project as Record<string, { summary: string; description: string } | undefined>
		)[entry.slug];
		if (!copy) throw new Error(`No copy for project: ${entry.slug}`);
		return copy;
	}

	const copy = $derived(copyFor(project));
</script>

<section class="intro" aria-labelledby="project-name">
	<h1 id="project-name">{project.name}</h1>
	<p class="lede">{copy.summary}</p>
	<p class="body">{copy.description}</p>
</section>

<style>
	.intro {
		max-width: 62ch;
		padding: var(--space-xl) 0 0;
	}

	h1 {
		font-size: clamp(34px, 7vw, 52px);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.03em;
	}

	.lede {
		margin: var(--space-sm) 0 0;
		font-size: 17px;
		line-height: 1.55;
		color: var(--secondary);
	}

	.body {
		margin: var(--space-md) 0 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text);
	}

	@media (max-width: 720px) {
		.intro {
			padding-top: var(--space-lg);
		}
	}
</style>
