<script lang="ts">
	import { logs } from '#lib/data/logs.js';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';
	import { GITHUB_ORG, href } from '#lib/routes.js';

	// The agent's log: its own writing, newest first, in a measure meant for reading. Nothing
	// is published on a day when nothing happened, so the empty state is the honest one.
	let { d, agent }: { d: Dictionary; agent: Agent } = $props();

	const entries = $derived(logs[agent.id] ?? []);
	const home = $derived(href('home'));
</script>

<div class="log">
	<header class="head">
		<h1 id="agent-log-heading">{d.agentPage.logTitle}</h1>
		<p class="sub">
			{d.agent[agent.id].logLede}
			{d.agentPage.logTail.replace('{name}', agent.name)}
			<a href={home}>{d.title}</a>.
		</p>
	</header>

	<section aria-labelledby="agent-log-heading" class="entries">
		{#if entries.length === 0}
			<p class="empty">{d.agentPage.logEmpty}</p>
			<p class="empty">
				{d.agentPage.logEmptyThen}
				<a href={GITHUB_ORG}>{d.agentPage.logEmptyLink}</a>.
			</p>
		{:else}
			{#each entries as entry (entry.date + entry.title)}
				<article class="entry">
					<p class="date">{entry.date}</p>
					<h2 class="title">{entry.title}</h2>
					{#each entry.body as paragraph}
						<p>{paragraph}</p>
					{/each}
				</article>
			{/each}
		{/if}
	</section>
</div>

<style>
	.log {
		max-width: 620px;
		margin: 0 auto;
		padding: var(--space-xl) 0 0;
	}

	.head {
		margin-bottom: var(--space-xl);
	}

	h1 {
		font-size: clamp(28px, 5vw, 36px);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.sub {
		margin: var(--space-xs) 0 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--tertiary);
	}

	.entry + .entry {
		margin-top: var(--space-lg);
		padding-top: var(--space-lg);
		border-top: 1px solid var(--line);
	}

	/* The byline is styled as `.entry .date`: a bare `.entry p` rule would win on
	   specificity otherwise, and the date would render as body copy. */
	.entry .date {
		margin: 0;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-variant-numeric: tabular-nums;
		color: var(--tertiary);
	}

	.title {
		margin: var(--space-xs) 0 0;
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.entry p {
		margin: var(--space-sm) 0 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text);
	}

	.empty {
		margin: 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--tertiary);
	}

	.empty + .empty {
		margin-top: var(--space-sm);
	}
</style>
