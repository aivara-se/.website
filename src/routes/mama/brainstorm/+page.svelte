<script lang="ts">
  import AgentBrainstorm from "#lib/components/AgentBrainstorm.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import { d } from "#lib/i18n/index.js";
  import { agentBrainstormHref } from "#lib/routes.js";

  // The ideas the agent argued: what it would build, for whom, at what cost and at what risk.
  // The chrome around it — accent, wash, header — is the layout's, and the canonical address is
  // built from the agent's id, the same helper the header uses.
  let { data }: { data: { agent: Agent } } = $props();
</script>

<Seo
  path={agentBrainstormHref(data.agent.id)}
  title={`${d.agentPage.brainstormTitle} · ${data.agent.name} · ${d.title}`}
  description={d.agentPage.brainstormLede}
/>

<AgentBrainstorm {d} agent={data.agent} />
