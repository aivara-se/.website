<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import type { Dictionary } from "#lib/i18n/index.js";

  // One agent on the home page: the portrait in its ring, the name, the role and the agent's
  // own line. An agent that is live has a page, so the whole card is the link.
  let { d, agent }: { d: Dictionary; agent: Agent } = $props();

  const target = $derived(agent.status === "running" ? agent.path : null);
  const accent = $derived(agent.accent ?? "var(--line)");
  const copy = $derived(d.agent[agent.id]);
</script>

<svelte:element
  this={target ? "a" : "article"}
  href={target}
  class="card"
  style="--accent: {accent};"
>
  <Avatar {agent} />
  <span class="text">
    <span class="name">{agent.name}</span>
    <span class="role">{copy.tagline}</span>
    <span class="motto">{copy.motto}</span>
  </span>
</svelte:element>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    /* a line under a portrait and a name reads as a mistake, not as a link cue */
    border-bottom: none;
  }

  .card :global(.ring) {
    --avatar: 96px;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-strong);
  }

  .role {
    font-size: 13.5px;
    color: var(--tertiary);
  }

  .motto {
    margin-top: var(--space-xs);
    max-width: 32ch;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--secondary);
  }

  .card:hover .name {
    color: var(--primary-hover);
  }

  .card:hover :global(.ring) {
    transform: scale(1.02);
  }

  .card:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    border-radius: 2px;
  }

  @media (max-width: 560px) {
    .card {
      flex-direction: row;
      align-items: flex-start;
    }

    .card :global(.ring) {
      --avatar: 56px;
    }
  }
</style>
