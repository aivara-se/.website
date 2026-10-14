<script lang="ts">
	import Masthead from './Masthead.svelte';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The agent page's header: the same masthead as every other page, with the agent's own name
	// added after the wordmark and the log in place of the code.
	let { d, agent }: { d: Dictionary; agent: Agent } = $props();
</script>

<Masthead {d} iconHref={agent.logPath} iconLabel={d.agentPage.log}>
	{#snippet trail()}
		<span class="sep" aria-hidden="true">/</span>
		<a class="agent" href={agent.path}>{agent.name}</a>
	{/snippet}

	{#snippet icon()}
		<!-- a page of lines: the log is what the agent wrote down -->
		<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
			<path
				d="M1 1h14v14H1z"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linejoin="miter"
			/>
			<path
				d="M5 6h6M5 10h6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			/>
		</svg>
	{/snippet}
</Masthead>

<style>
	/* Only the trail's own parts: the wordmark before it belongs to the masthead. */
	.sep {
		font-size: 13.5px;
		color: var(--tertiary);
	}

	.agent {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--accent);
	}

	.agent:hover {
		border-bottom-color: var(--accent-bright);
		color: var(--accent-bright);
	}
</style>
