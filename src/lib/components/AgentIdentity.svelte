<script lang="ts">
	import Avatar from './Avatar.svelte';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The plaque: who the agent is, on one screen, in the agent's own ring.
	let { d, agent }: { d: Dictionary; agent: Agent } = $props();

	const copy = $derived(d.agent[agent.id]);
</script>

<section class="plaque" aria-labelledby="agent-name">
	<Avatar {agent} />
	<h1 id="agent-name">{agent.name}</h1>
	<p class="role">{copy.tagline}</p>
	<p class="motto">{copy.motto}</p>
</section>

<style>
	.plaque {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		min-height: calc(100dvh - 140px);
		max-width: 560px;
		margin: 0 auto;
		padding: var(--space-md) 0;
		text-align: center;
	}

	.plaque :global(.ring) {
		--avatar: 120px;
	}

	h1 {
		font-size: clamp(34px, 7vw, 52px);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.03em;
	}

	.role {
		margin: 0;
		font-size: 17px;
		line-height: 1.55;
		color: var(--secondary);
	}

	.motto {
		margin: 0;
		max-width: 44ch;
		font-size: 15px;
		line-height: 1.65;
		color: var(--tertiary);
	}
</style>
