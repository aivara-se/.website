<script lang="ts">
	import type { Snippet } from 'svelte';

	// One part of a project's page: a quiet rubric, a heading, and whatever the part is. The
	// hairline above it is the only divider the page uses, so a section needs no box. A split
	// part puts the heading at the left and the content beside it, which breaks the stack of
	// prose without adding a surface; the rubric stays above both so the heading and the
	// content start on the same line.
	let {
		id,
		label,
		title,
		wide = false,
		split = false,
		children
	}: {
		id: string;
		label: string;
		title: string;
		wide?: boolean;
		split?: boolean;
		children: Snippet;
	} = $props();
</script>

<section class="section part" class:split aria-labelledby={id}>
	<p class="label">{label}</p>
	<div class="layout" class:split>
		<h2 {id}>{title}</h2>
		<div class="content" class:wide>
			{@render children()}
		</div>
	</div>
</section>

<style>
	.part {
		border-top: 1px solid var(--line);
		padding-top: var(--space-md);
	}

	.label {
		margin: 0 0 var(--space-xs);
		font-size: 12px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tertiary);
	}

	.content {
		margin-top: var(--space-sm);
		max-width: 62ch;
	}

	/* A section whose content is a grid — the benefits, the refusals — takes the column's whole
	   width; a section of prose keeps the 62ch measure. */
	.content.wide {
		max-width: none;
	}

	/* The split parts: the heading holds the left, the content the right, both starting under
	   the rubric on the same line. */
	.layout.split {
		display: grid;
		grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
		gap: var(--space-lg);
		align-items: start;
	}

	.layout.split .content {
		max-width: 52ch;
		margin-top: 0;
	}

	@media (max-width: 860px) {
		.layout.split {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.layout.split .content {
			margin-top: var(--space-sm);
		}
	}
</style>
