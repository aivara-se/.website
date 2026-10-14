<script lang="ts">
	import type { Project } from '#lib/data/projects.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The work: one row per project, every one the same weight. No status, no filters, and no
	// project singled out above the others.
	let { d, projects }: { d: Dictionary; projects: Project[] } = $props();

	function summary(project: Project): string {
		const entry = (d.project as Record<string, { summary: string } | undefined>)[project.slug];
		return entry?.summary ?? project.summary;
	}
</script>

<section id="projects" class="section" aria-labelledby="work-heading">
	<h2 id="work-heading">{d.projects.title}</h2>
	<p class="lede">{d.projects.lede}</p>

	<ul class="rows">
		{#each projects as project (project.slug)}
			<li class="row">
				<span class="name">{project.name}</span>
				<span class="summary">{summary(project)}</span>
				<span class="meta">
					<span class="language">{project.language}</span>
					<a href={project.repo}>{d.projects.repo}</a>
				</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.rows {
		margin: var(--space-md) 0 0;
		padding: 0;
		list-style: none;
	}

	.row {
		display: grid;
		grid-template-columns: 200px minmax(0, 1fr) auto;
		gap: var(--space-md);
		align-items: baseline;
		padding: var(--space-md) 0;
	}

	.row + .row {
		border-top: 1px solid var(--line);
	}

	.name {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.summary {
		max-width: 62ch;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--secondary);
	}

	.meta {
		display: flex;
		align-items: baseline;
		gap: var(--space-sm);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tertiary);
		white-space: nowrap;
	}

	.meta a {
		color: var(--tertiary);
	}

	.meta a:hover {
		color: var(--primary-hover);
	}

	@media (max-width: 720px) {
		.row {
			grid-template-columns: 1fr;
			gap: var(--space-xs);
		}

		.meta {
			margin-top: var(--space-xs);
		}
	}
</style>
