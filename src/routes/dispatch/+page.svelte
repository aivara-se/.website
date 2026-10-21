<script lang="ts">
	import ProjectIdentity from '#lib/components/ProjectIdentity.svelte';
	import ProjectSection from '#lib/components/ProjectSection.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { Project } from '#lib/data/projects.js';
	import { d } from '#lib/i18n/index.js';

	// The project's page: what it is, then the parts that make it worth reading — the events it
	// answers, the wake, the loop and its cap, the guarantees, the record, and what it leaves
	// alone. The words live in the dictionary; the page owns their order.
	let { data }: { data: { project: Project } } = $props();

	const copy = $derived(d.project[data.project.slug]);
</script>

<Seo
	path={data.project.path}
	title={`${data.project.name} · ${d.title}`}
	description={copy.description}
/>

<ProjectIdentity {d} project={data.project} />

<ProjectSection id="triggers" label={copy.triggers.label} title={copy.triggers.title} wide>
	<p class="lede">{copy.triggers.lede}</p>
	<ul class="triggers">
		{#each copy.triggers.rows as row (row.event)}
			<li>
				<p class="event">{row.event}</p>
				<p class="note">{row.body}</p>
			</li>
		{/each}
	</ul>
</ProjectSection>

<ProjectSection id="wake" label={copy.wake.label} title={copy.wake.title}>
	<p class="body">{copy.wake.body}</p>
	<div class="specimens">
		{#each copy.wake.specimens as line (line.lead)}
			<p>{line.lead} <span class="pointer">{line.pointer}</span></p>
		{/each}
	</div>
</ProjectSection>

<ProjectSection id="loop" label={copy.loop.label} title={copy.loop.title}>
	<p class="body">{copy.loop.body}</p>
</ProjectSection>

<ProjectSection id="guarantees" label={copy.guarantees.label} title={copy.guarantees.title} wide>
	<ul class="items two-up">
		{#each copy.guarantees.items as item (item.head)}
			<li>
				<p class="head">{item.head}</p>
				<p class="note">{item.body}</p>
			</li>
		{/each}
	</ul>
</ProjectSection>

<ProjectSection id="record" label={copy.record.label} title={copy.record.title}>
	<p class="body">{copy.record.body}</p>
	<dl class="fields">
		{#each copy.record.fields as field (field.key)}
			<div>
				<dt>{field.key}</dt>
				<dd>{field.value}</dd>
			</div>
		{/each}
	</dl>
</ProjectSection>

<ProjectSection id="scope" label={copy.scope.label} title={copy.scope.title}>
	<ul class="items">
		{#each copy.scope.items as item (item.head)}
			<li>
				<p class="head">{item.head}</p>
				<p class="note">{item.body}</p>
			</li>
		{/each}
	</ul>
</ProjectSection>

<ProjectSection id="code" label={copy.code.label} title={copy.code.title}>
	<p class="body">{copy.code.body}</p>
	<a class="repo" href={data.project.repo}>
		<span>{copy.code.link}</span>
		<span class="arrow" aria-hidden="true">→</span>
	</a>
</ProjectSection>

<style>
	.body {
		margin: 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text);
	}

	/* The triggers: the GitHub event at the left, what it wakes at the right. Two columns while
	   there is room, one when there is not; the hairline between rows does the grouping. */
	.triggers {
		margin: var(--space-md) 0 0;
		padding: 0;
		list-style: none;
		border-bottom: 1px solid var(--line);
	}

	.triggers li {
		display: grid;
		grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
		gap: var(--space-md) var(--space-lg);
		padding: var(--space-md) 0;
		border-top: 1px solid var(--line);
	}

	.event {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		line-height: 1.4;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.note {
		margin: 0;
		max-width: 52ch;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text);
	}

	/* The wake, word for word. A rule at the left holds the two sentences without boxing them. */
	.specimens {
		margin: var(--space-md) 0 0;
		padding-left: var(--space-md);
		border-left: 1px solid var(--line);
	}

	.specimens p {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		line-height: 1.6;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.specimens p + p {
		margin-top: var(--space-xs);
	}

	/* The repository and number are one token: they wrap as a unit, never at the hyphen. */
	.pointer {
		white-space: nowrap;
	}

	/* A list of short claims: a bold head and a sentence under it. The two-up grid is only for
	   the guarantees; the out-of-scope list stays one column so it reads as a footnote. */
	.items {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.two-up {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-md) var(--space-lg);
	}

	.head {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		line-height: 1.4;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.items .note {
		margin-top: 4px;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--secondary);
	}

	.items li + li {
		margin-top: var(--space-md);
	}

	.two-up li + li {
		margin-top: 0;
	}

	/* The record's four facts: a label and a value, two columns on a wide line. */
	.fields {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-md) var(--space-lg);
		margin: var(--space-md) 0 0;
		padding: var(--space-md) 0 0;
		border-top: 1px solid var(--line);
	}

	.fields dt {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tertiary);
	}

	.fields dd {
		margin: 4px 0 0;
		font-size: 15px;
		line-height: 1.5;
		color: var(--text);
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

	@media (max-width: 720px) {
		.triggers li {
			grid-template-columns: 1fr;
			gap: var(--space-xs);
		}

		.two-up,
		.fields {
			grid-template-columns: 1fr;
		}

		.two-up li + li {
			margin-top: var(--space-md);
		}
	}
</style>
