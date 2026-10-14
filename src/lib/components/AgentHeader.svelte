<script lang="ts">
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';
	import { href } from '#lib/routes.js';

	// The agent page's own header: where you are — the lab, then the agent — and the way to the
	// log as an icon button. Everything on it wears the agent's accent, because the page is the
	// agent's.
	let { d, agent }: { d: Dictionary; agent: Agent } = $props();

	const home = $derived(href('home'));
</script>

<header class="head">
	<nav class="crumbs" aria-label={d.nav.label}>
		<a class="lab" href={home}>{d.title}</a>
		<span class="sep" aria-hidden="true">/</span>
		<a class="agent" href={agent.path}>{agent.name}</a>
	</nav>

	<a class="log" href={agent.logPath} aria-label={d.agentPage.log} title={d.agentPage.log}>
		<!-- a page of lines: the log is what the agent wrote down -->
		<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
			<path
				d="M4 2h8v12H4z"
				fill="none"
				stroke="currentColor"
				stroke-width="1.4"
				stroke-linejoin="round"
			/>
			<path
				d="M6.2 5.6h3.6M6.2 8h3.6M6.2 10.4h2"
				fill="none"
				stroke="currentColor"
				stroke-width="1.4"
				stroke-linecap="round"
			/>
		</svg>
	</a>
</header>

<style>
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) 0 0;
	}

	/* The trail reads as a trail: the lab's name is the quiet one at label size, the page's own
	   name the loud one at name size. Both wear the agent's accent, each at its own strength,
	   because the page is the agent's. */
	.crumbs {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
	}

	.crumbs a {
		border-bottom: none;
	}

	.lab {
		font-size: 13.5px;
		font-weight: 500;
		color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.lab:hover {
		color: var(--accent-bright);
	}

	.sep {
		font-size: 13.5px;
		color: color-mix(in srgb, var(--accent) 35%, transparent);
	}

	.agent {
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--accent);
	}

	.agent:hover {
		color: var(--accent-bright);
	}

	/* The log link is an icon, so its word lives in the label; a mark in the corner needs no
	   box around it. */
	.log {
		display: inline-flex;
		padding: 6px;
		color: var(--accent);
	}

	.log:hover {
		color: var(--accent-bright);
	}

	.log svg {
		display: block;
	}
</style>
