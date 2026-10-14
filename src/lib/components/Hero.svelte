<script lang="ts">
	import type { Agent } from '#lib/data/agents.js';
	import type { Project } from '#lib/data/projects.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The statement: what the lab is, in one breath, with the two true numbers under it.
	let { d, projects, agents }: { d: Dictionary; projects: Project[]; agents: Agent[] } = $props();

	const running = $derived(agents.filter((agent) => agent.status === 'running').length);
</script>

<section class="statement" aria-labelledby="statement-heading">
	<h1 id="statement-heading">{d.hero.h1}</h1>
	<p class="lede">{d.hero.sub}</p>
	<p class="counts">
		<span><b>{projects.length}</b> {d.counts.projects}</span>
		<span><b>{running}</b> {d.counts.agents}</span>
	</p>
</section>

<style>
	.statement {
		padding: var(--space-xl) 0 0;
	}

	h1 {
		max-width: 14ch;
		font-size: clamp(34px, 7vw, 52px);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.03em;
	}

	.counts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin: var(--space-md) 0 0;
		font-size: 12px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--tertiary);
	}

	.counts b {
		color: var(--text-strong);
	}
</style>
