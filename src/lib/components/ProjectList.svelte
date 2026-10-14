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
				<a class="repo" href={project.repo} aria-label={d.projects.repo} title={d.projects.repo}>
					<!-- a code mark: the repository is where the work itself can be read -->
					<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
						<path
							d="M6 3 1 8l5 5M10 3l5 5-5 5"
							fill="none"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
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

	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-xs) var(--space-md);
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

	/* The summary takes the row under the name and the mark, at every width. */
	.summary {
		grid-column: 1 / -1;
		max-width: 62ch;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--secondary);
	}

	/* The mark is placed on the name's line rather than after the summary, so the DOM keeps its
	   reading order — name, summary, link — and the picture keeps the name and its mark together.
	   An icon's word lives in its label, and a 1px line under a mark reads as a mistake, not as
	   a link cue. */
	.repo {
		grid-column: 2;
		grid-row: 1;
		display: inline-flex;
		border-bottom: none;
		color: var(--tertiary);
	}

	.repo:hover {
		border-bottom: none;
		color: var(--primary-hover);
	}

	.repo svg {
		display: block;
	}
</style>
