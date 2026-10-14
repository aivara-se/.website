<script lang="ts">
	import AgentRow from './AgentRow.svelte';
	import type { Agent } from '#lib/data/agents.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	// The agents, as the page's composition: a heading, a lede, then the four of them.
	let { d, agents }: { d: Dictionary; agents: Agent[] } = $props();
</script>

<section class="section" aria-labelledby="agents-heading">
	<h2 id="agents-heading">{d.agents.title}</h2>
	<p class="lede">{d.agents.lede}</p>
	<AgentRow {d} {agents} />
</section>
