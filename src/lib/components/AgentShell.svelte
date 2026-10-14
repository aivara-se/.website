<script lang="ts">
	import type { Snippet } from 'svelte';
	import AgentHeader from './AgentHeader.svelte';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The chrome of an agent's page: its header, and the accent every link in the body wears.
	// The page is the agent's, so the colour on it is the agent's.
	let { d, agent, children }: { d: Dictionary; agent: Agent; children: Snippet } = $props();

	const vars = $derived(
		[
			`--accent: ${agent.accent}`,
			'--accent-bright: color-mix(in srgb, var(--accent) 70%, #ffffff)'
		].join('; ')
	);
</script>

<div class="page" style={vars}>
	<div class="column">
		<AgentHeader {d} {agent} />
		<main>
			{@render children()}
		</main>
	</div>
</div>

<style>
	.page {
		padding: 0 var(--space-lg);
	}

	.column {
		max-width: 620px;
		margin: 0 auto;
		padding-bottom: var(--space-section);
	}

	/* Every link in the body is the agent's accent: an anchor with no rule of its own falls
	   through to the browser's default blue, which is far below AA on this ground. */
	.column :global(main a) {
		color: var(--accent);
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
	}

	.column :global(main a:hover) {
		color: var(--accent-bright);
		border-bottom-color: var(--accent-bright);
	}

	.column :global(main a:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
		border-radius: 2px;
	}

	@media (max-width: 720px) {
		.page {
			padding: 0 var(--space-md);
		}
	}
</style>
