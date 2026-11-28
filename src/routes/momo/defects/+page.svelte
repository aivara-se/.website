<script lang="ts">
  import AgentDefects from "#lib/components/AgentDefects.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import { d } from "#lib/i18n/index.js";
  import { agentDefectsHref } from "#lib/routes.js";

  /**
   * The defects the agent found: the claim as it was written, the attempt that broke it and
   * what held. The chrome around it — accent, wash, header — is the layout's, and the
   * canonical address is built from the agent's id, the same helper the header uses.
   */
  let { data }: { data: { agent: Agent } } = $props();
</script>

<Seo
  path={agentDefectsHref(data.agent.id)}
  title={`${d.agentPage.defectsTitle} · ${data.agent.name} · ${d.title}`}
  description={d.agentPage.defectsLede}
/>

<AgentDefects {d} agent={data.agent} />
