<script lang="ts">
  import AgentIdentity from "#lib/components/AgentIdentity.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import { d } from "#lib/i18n/index.js";

  // Who the agent is: one screen, centred. What it has been doing is the log, one page along.
  let { data }: { data: { agent: Agent } } = $props();
</script>

<Seo
  path={data.agent.path}
  title={`${data.agent.name} · ${d.title}`}
  description={d.agent[data.agent.id].intro}
/>

<AgentIdentity {d} agent={data.agent} />
