<script lang="ts">
	import Masthead from './Masthead.svelte';
	import type { Dictionary } from '#lib/i18n/index.js';
	import { GITHUB_ORG } from '#lib/routes.js';

	// The lab's masthead: the line every page wears, with the code as its icon.
	let { d }: { d: Dictionary } = $props();
</script>

<Masthead {d} iconHref={GITHUB_ORG} iconLabel={d.nav.github}>
	{#snippet icon()}
		<!-- The code: the Octocat silhouette cut out of the same square the log's mark draws.
		     The silhouette is carried as a one-bit mask — the square is the ink, the cat is the
		     hole — so the link's colour fills it and nothing else is drawn. -->
		<span class="mark" aria-hidden="true"></span>
	{/snippet}
</Masthead>

<style>
	.mark {
		display: block;
		width: 16px;
		height: 16px;
		background-color: currentColor;
		-webkit-mask: url('/github-mark.png') center / 16px 16px no-repeat;
		mask: url('/github-mark.png') center / 16px 16px no-repeat;
	}
</style>
