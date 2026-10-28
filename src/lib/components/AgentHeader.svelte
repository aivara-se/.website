<script lang="ts">
	import Masthead from './Masthead.svelte';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The agent page's header: the same masthead as every other page, with the agent's own name
	// added after the wordmark and the agent's pages in place of the code. The log is always
	// there; an agent that keeps experiments gets a page for those beside it.
	let { d, agent }: { d: Dictionary; agent: Agent } = $props();
</script>

<Masthead {d}>
	{#snippet trail()}
		<span class="sep" aria-hidden="true">/</span>
		<a class="agent" href={agent.path}>{agent.name}</a>
	{/snippet}

	{#snippet icons()}
		<!-- a page of lines: the log is what the agent wrote down -->
		<a href={agent.logPath} aria-label={d.agentPage.log} title={d.agentPage.log}>
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
		</a>

		{#if agent.experimentsPath}
			<!-- a round-bottom flask with its liquid line: experiments are what the agent measured -->
			<a
				href={agent.experimentsPath}
				aria-label={d.agentPage.experiments}
				title={d.agentPage.experiments}
			>
				<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
					<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
						<circle cx="8" cy="10" r="4.9" />
						<path d="M6 5.1V1M10 5.1V1" />
						<path d="M5.5 1h5" />
						<path d="M3.9 10.8h8.2" />
					</g>
				</svg>
			</a>
		{/if}
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
