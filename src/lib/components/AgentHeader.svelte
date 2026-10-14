<script lang="ts">
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';
	import { href } from '#lib/routes.js';

	// The agent page's own header: the wordmark home, and the way to the log. Both wear the
	// agent's accent, because the page is the agent's.
	let { d, agent }: { d: Dictionary; agent: Agent } = $props();

	const home = $derived(href('home'));
</script>

<header class="head">
	<a class="wordmark" href={home}>{d.title}</a>
	<a class="log" href={agent.logPath}>{d.agentPage.log}</a>
</header>

<style>
	.head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) 0 0;
		font-size: 13.5px;
	}

	.wordmark {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.wordmark,
	.log {
		color: var(--accent);
		border-bottom: none;
	}

	.wordmark:hover,
	.log:hover {
		color: var(--accent-bright);
	}
</style>
