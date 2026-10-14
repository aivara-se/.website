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
		<a href={home}>{d.title}</a>
		<span class="sep" aria-hidden="true">/</span>
		<a href={agent.path}>{agent.name}</a>
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

	.crumbs {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
		font-family: var(--font-heading);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.crumbs a {
		color: var(--accent);
		border-bottom: none;
	}

	.crumbs a:hover {
		color: var(--accent-bright);
	}

	.sep {
		color: var(--tertiary);
		font-weight: 400;
	}

	/* The log link is an icon, so its word lives in the label; the box is what makes it a
	   button rather than a mark floating in the corner. */
	.log {
		display: inline-flex;
		padding: 6px;
		border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
		border-radius: var(--radius-sm);
		color: var(--accent);
	}

	.log:hover {
		border-color: var(--accent-bright);
		color: var(--accent-bright);
	}

	.log svg {
		display: block;
	}
</style>
