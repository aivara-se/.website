<script lang="ts">
	import AgentCard from './AgentCard.svelte';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// Four of them, side by side while there is room; one column on a phone, so each agent
	// reads as a line of the roster rather than a cramped card.
	let { d, agents }: { d: Dictionary; agents: Agent[] } = $props();
</script>

<div class="roster">
	{#each agents as agent (agent.id)}
		<AgentCard {d} {agent} />
	{/each}
</div>

<style>
	.roster {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-lg);
		margin-top: var(--space-md);
	}

	@media (max-width: 900px) {
		.roster {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.roster {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}
	}
</style>
