<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Dictionary } from '#lib/i18n/index.js';
	import { href } from '#lib/routes.js';

	// The line every page wears at the top: the wordmark home at the left, one icon link at the
	// right. A page may add to the trail after the wordmark — an agent's name — and brings its
	// own glyph; everything else is shared, so the wordmark and the icon's box land in exactly
	// the same place on every page.
	let {
		d,
		trail,
		icon,
		iconHref,
		iconLabel
	}: {
		d: Dictionary;
		trail?: Snippet;
		icon: Snippet;
		iconHref: string;
		iconLabel: string;
	} = $props();

	const home = $derived(href('home'));
</script>

<header class="masthead">
	<div class="start">
		<a class="wordmark" href={home}>{d.title}</a>
		{#if trail}
			{@render trail()}
		{/if}
	</div>

	<nav aria-label={d.nav.label}>
		<a class="icon" href={iconHref} aria-label={iconLabel} title={iconLabel}>
			{@render icon()}
		</a>
	</nav>
</header>

<style>
	.masthead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) 0 0;
	}

	.masthead nav {
		display: flex;
		align-items: center;
	}

	.start {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
	}

	.wordmark {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-strong);
	}

	.wordmark:hover {
		color: var(--primary-hover);
	}

	/* The icon is the page's own, but its box is the masthead's: the same padding, the same
	   colour and the same place on every page. */
	.icon {
		display: inline-flex;
		padding: 6px;
		color: var(--tertiary);
		border-bottom: none;
	}

	.icon:hover {
		color: var(--primary-hover);
	}

	.icon :global(svg) {
		display: block;
		fill: currentColor;
	}
</style>
