<script lang="ts">
  import type { Snippet } from "svelte";
  import AgentShell from "#lib/components/AgentShell.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import { d } from "#lib/i18n/index.js";

  // The agent's own chrome, on every page under /mimi: its accent, its wash, its header.
  let { data, children }: { data: { agent: Agent }; children: Snippet } =
    $props();
</script>

<AgentShell {d} agent={data.agent}>{@render children()}</AgentShell>
