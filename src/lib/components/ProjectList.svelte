<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
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
				<!-- The whole row is the link: the name, the summary and the mark belong to one
				     anchor, so a click anywhere in the row opens the project's own page. -->
				<a class="link" href={project.path} aria-labelledby={`project-${project.slug}`}>
					<span class="name" id={`project-${project.slug}`}>{project.name}</span>
					<span class="summary">{summary(project)}</span>
					<!-- an arrow: the row goes on to the project's page, not off the site -->
					<span class="mark" aria-hidden="true">
						<ArrowRight size={18} />
					</span>
				</a>
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

	/* The hairline sits on the link itself, so the row's whole box — divider included — is the
	   click target. */
	.row + .row .link {
		border-top: 1px solid var(--line);
	}

	/* The anchor covers the row's padding too, so the padded row is the click target. */
	.link {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-xs) var(--space-md);
		align-items: baseline;
		padding: var(--space-md) 0;
		border-bottom: none;
	}

	.link:hover .name {
		color: var(--primary-hover);
	}

	.name {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
		transition: color 0.15s;
	}

	/* The summary takes the row under the name and the mark, at every width. */
	.summary {
		grid-column: 1 / -1;
		max-width: 62ch;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--secondary);
	}

	/* The mark is placed on the name's line rather than after the summary, so the DOM keeps its
	   reading order — name, summary, mark — and the picture keeps the name and its mark together. */
	.mark {
		grid-column: 2;
		grid-row: 1;
		display: inline-flex;
		color: var(--tertiary);
	}

	.link:hover .mark {
		color: var(--primary-hover);
	}

	.mark :global(svg) {
		display: block;
	}
</style>
