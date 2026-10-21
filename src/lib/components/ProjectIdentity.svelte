<script lang="ts">
	import type { Project } from '#lib/data/projects.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// What the project is worth, in one screen: its name, the promise, the line the front page
	// gives it, the sentence that says what it changes, and four numbers that hold the shape.
	let { d, project }: { d: Dictionary; project: Project } = $props();

	const copy = $derived(d.project[project.slug]);
</script>

<section class="intro" aria-labelledby="project-name">
	<p class="eyebrow">{copy.eyebrow}</p>
	<h1 id="project-name">{copy.headline}</h1>
	<p class="lede">{copy.summary}</p>
	<p class="body">{copy.description}</p>
	<a class="action" href={project.repo}>
		<span>Read the code</span>
		<span class="arrow" aria-hidden="true">→</span>
	</a>

	<dl class="facts">
		{#each copy.facts as fact (fact.label)}
			<div class="fact">
				<dt>{fact.label}</dt>
				<dd>{fact.value}</dd>
			</div>
		{/each}
	</dl>
</section>

<style>
	.intro {
		padding: var(--space-xl) 0 0;
	}

	.eyebrow {
		margin: 0 0 var(--space-sm);
		font-size: 12px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tertiary);
	}

	h1 {
		max-width: 18ch;
		font-size: clamp(34px, 7vw, 52px);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.03em;
	}

	.lede {
		max-width: 52ch;
		margin: var(--space-md) 0 0;
		font-size: 17px;
		line-height: 1.55;
		color: var(--secondary);
	}

	.body {
		max-width: 62ch;
		margin: var(--space-sm) 0 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text);
	}

	.action {
		display: inline-flex;
		align-items: baseline;
		gap: var(--space-xs);
		margin-top: var(--space-md);
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
		border-bottom: 1px solid var(--line);
	}

	.action:hover {
		color: var(--primary-hover);
		border-bottom-color: var(--primary-hover);
	}

	.arrow {
		color: var(--tertiary);
	}

	/* The numbers are the page's one composition: the same four facts on every screen, so the
	   product is measurable before a sentence is read. The value sits above its label. */
	.facts {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-md);
		margin: var(--space-lg) 0 0;
		padding: var(--space-md) 0 0;
		border-top: 1px solid var(--line);
	}

	.fact {
		display: flex;
		flex-direction: column-reverse;
		gap: 4px;
	}

	.fact dt {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tertiary);
	}

	.fact dd {
		margin: 0;
		font-family: var(--font-heading);
		font-size: 28px;
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--text-strong);
	}

	@media (max-width: 720px) {
		.intro {
			padding-top: var(--space-lg);
		}

		.facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-md) var(--space-sm);
			margin-top: var(--space-md);
		}

		.fact dd {
			font-size: 22px;
		}
	}
</style>
