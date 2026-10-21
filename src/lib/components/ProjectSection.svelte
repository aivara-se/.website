<script lang="ts">
	import type { Snippet } from 'svelte';

	// One part of a project's page: a quiet rubric, a heading, and whatever the part is.
	// The hairline above it is the only divider the page uses, so a section needs no box.
	let {
		id,
		label,
		title,
		wide = false,
		children
	}: { id: string; label: string; title: string; wide?: boolean; children: Snippet } = $props();
</script>

<section class="section part" aria-labelledby={id}>
	<p class="label">{label}</p>
	<h2 {id}>{title}</h2>
	<div class="content" class:wide>
		{@render children()}
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

	/* A section whose content is a grid — trigger rows, the guarantees — takes the column's
	   whole width; a section of prose keeps the 62ch measure. */
	.content.wide {
		max-width: none;
	}
</style>
