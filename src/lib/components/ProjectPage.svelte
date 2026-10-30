<script lang="ts">
	import ProjectIdentity from './ProjectIdentity.svelte';
	import ProjectSection from './ProjectSection.svelte';
	import Seo from './Seo.svelte';
	import type { Project } from '#lib/data/projects.js';
	import { d } from '#lib/i18n/index.js';

	// A project's page: what it changes, the idea behind it, what it refuses to do, and why it
	// matters. The words live in the dictionary under the project's slug, so the page is the
	// same argument for every project and the project supplies only its copy.
	let { project }: { project: Project } = $props();

	const copy = $derived(d.project[project.slug]);
</script>

<Seo path={project.path} title={`${project.name} · ${d.title}`} description={copy.description} />

<ProjectIdentity {d} {project} />

{#if project.screenshot}
	<!-- The app itself, under the facts: the only picture on the page, and the window's own
	     edge is its frame. The file's pixels reserve the space, so the parts below do not
	     jump while it loads. -->
	<figure class="shot">
		<img
			src={project.screenshot.src}
			alt={project.screenshot.alt}
			width={project.screenshot.width}
			height={project.screenshot.height}
			loading="lazy"
			decoding="async"
		/>
	</figure>
{/if}

<ProjectSection id="benefits" label={copy.benefits.label} title={copy.benefits.title} wide>
	<ul class="benefits">
		{#each copy.benefits.items as item (item.head)}
			<li>
				<p class="benefit-head">{item.head}</p>
				<p class="benefit-note">{item.body}</p>
			</li>
		{/each}
	</ul>
</ProjectSection>

<ProjectSection id="idea" label={copy.principle.label} title={copy.principle.title} split>
	<p class="lead">{copy.principle.body}</p>
</ProjectSection>

<ProjectSection id="refusals" label={copy.promises.label} title={copy.promises.title} wide>
	<ul class="refusals">
		{#each copy.promises.items as item (item.head)}
			<li>
				<p class="refusal-head">{item.head}</p>
				<p class="refusal-note">{item.body}</p>
			</li>
		{/each}
	</ul>
</ProjectSection>

<ProjectSection id="why" label={copy.why.label} title={copy.why.title} split>
	<p class="lead">{copy.why.body}</p>
	<a class="repo" href={project.repo}>
		<span>Read the code</span>
		<span class="arrow" aria-hidden="true">→</span>
	</a>
</ProjectSection>

<style>
	/* The shot sits in the column at its width, 40px under the facts. The hairline and the
	   radius keep the window's dark ground from running into the page's. */
	.shot {
		margin: var(--space-lg) 0 0;
	}

	.shot img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--line);
		border-radius: 8px;
	}

	/* Three promises, side by side while there is room: the page's one wide row above the
	   refusals, so the value reads as a composition rather than a list. */
	.benefits {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-lg);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.benefit-head {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.benefit-note {
		margin: var(--space-xs) 0 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text);
		text-wrap: pretty;
	}

	/* The split parts' right column: a sentence at lede size. */
	.lead {
		margin: 0;
		font-size: 17px;
		line-height: 1.55;
		color: var(--secondary);
		text-wrap: pretty;
	}

	/* The refusals are a ledger: one row each, the claim at the left and the reason beside it,
	   divided by the same hairline the rest of the site uses. Six short lines read at a glance
	   and none of them competes with the value above. */
	.refusals {
		margin: 0;
		padding: 0;
		list-style: none;
		border-bottom: 1px solid var(--line);
	}

	.refusals li {
		display: grid;
		grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
		gap: var(--space-xs) var(--space-lg);
		padding: var(--space-sm) 0;
		border-top: 1px solid var(--line);
	}

	.refusal-head {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.refusal-note {
		margin: 0;
		max-width: 52ch;
		font-size: 15px;
		line-height: 1.65;
		color: var(--secondary);
		text-wrap: pretty;
	}

	/* The one link the page asks a reader to take: the repository, at name size. */
	.repo {
		display: inline-flex;
		align-items: baseline;
		gap: var(--space-xs);
		margin-top: var(--space-md);
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
		border-bottom: 1px solid var(--line);
	}

	.repo:hover {
		color: var(--primary-hover);
		border-bottom-color: var(--primary-hover);
	}

	.arrow {
		color: var(--tertiary);
	}

	@media (max-width: 860px) {
		.benefits {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}
	}

	@media (max-width: 720px) {
		.refusals li {
			grid-template-columns: 1fr;
		}
	}
</style>
