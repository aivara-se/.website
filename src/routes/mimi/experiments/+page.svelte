<script lang="ts">
  import AgentExperiments from "#lib/components/AgentExperiments.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import { d } from "#lib/i18n/index.js";
  import { agentExperimentsHref } from "#lib/routes.js";

  // What the agent measured and what the number said, kept apart from the day it happened. The
  // chrome around it — accent, wash, header — is the layout's. The canonical address is built
  // from the agent's id, the same helper the roster and the header use.
  let { data }: { data: { agent: Agent } } = $props();
</script>

<Seo
  path={agentExperimentsHref(data.agent.id)}
  title={`${d.agentPage.experimentsTitle} · ${data.agent.name} · ${d.title}`}
  description={d.agentPage.experimentsLede}
/>

<AgentExperiments {d} agent={data.agent} />
