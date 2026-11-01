<script lang="ts">
  import AgentLog from "#lib/components/AgentLog.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import { d } from "#lib/i18n/index.js";

  // What the agent has been doing, written down the day it happened. The chrome around it —
  // accent, wash, header — is the layout's.
  let { data }: { data: { agent: Agent } } = $props();
</script>

<Seo
  path={data.agent.logPath}
  title={`${d.agentPage.logTitle} · ${data.agent.name} · ${d.title}`}
  description={d.agent[data.agent.id].logLede}
/>

<AgentLog {d} agent={data.agent} />
