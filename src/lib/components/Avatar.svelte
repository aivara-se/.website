<script lang="ts">
  import type { Agent } from "#lib/data/agents.js";

  // The portrait a card and a plaque draw: the image inside a ring in the agent's colour.
  // The size belongs to the container — it sets `--avatar` — so a card can shrink the
  // portrait on a phone without a second component.
  let { agent }: { agent: Agent } = $props();

  const accent = $derived(agent.accent ?? "var(--line)");
</script>

<span
  class="ring"
  class:flat={!agent.avatar}
  style="--accent: {accent};"
  aria-hidden="true"
>
  {#if agent.avatar}
    <img src={agent.avatar} alt="" />
  {:else}
    <span class="initial">{agent.name.slice(0, 1)}</span>
  {/if}
</span>

<style>
  .ring {
    display: inline-flex;
    flex: 0 0 auto;
    width: var(--avatar, 40px);
    height: var(--avatar, 40px);
    padding: 2px;
    border: 2px solid var(--accent);
    border-radius: 50%;
    transition: transform 0.15s;
  }

  /* An agent with no portrait yet: the ring is a plain line, not a colour. */
  .ring.flat {
    border-color: var(--line);
  }

  .ring img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    background: var(--ground);
  }

  .initial {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--ground);
    color: var(--secondary);
    font-family: var(--font-heading);
    font-size: calc(var(--avatar, 40px) * 0.4);
    font-weight: 600;
    line-height: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .ring {
      transition: none;
    }
  }
</style>
