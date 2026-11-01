<script lang="ts">
  import FlaskConical from "@lucide/svelte/icons/flask-conical";
  import NotebookText from "@lucide/svelte/icons/notebook-text";
  import Masthead from "./Masthead.svelte";
  import type { Agent } from "#lib/data/agents.js";
  import type { Dictionary } from "#lib/i18n/index.js";

  // The agent page's header: the same masthead as every other page, with the agent's own name
  // added after the wordmark and the agent's pages in place of the code. The log is always
  // there; an agent that keeps experiments gets a page for those beside it.
  let { d, agent }: { d: Dictionary; agent: Agent } = $props();
</script>

<Masthead {d}>
  {#snippet trail()}
    <span class="sep" aria-hidden="true">/</span>
    <a class="agent" href={agent.path}>{agent.name}</a>
  {/snippet}

  {#snippet icons()}
    <!-- a notebook: the log is what the agent wrote down -->
    <a
      href={agent.logPath}
      aria-label={d.agentPage.log}
      title={d.agentPage.log}
    >
      <NotebookText size={16} />
    </a>

    {#if agent.experimentsPath}
      <!-- a conical flask: experiments are what the agent measured. Not lucide's round one:
			     at 16px its liquid line lands on the bulb's widest row and joins the glass, so it
			     reads as a banded bottle, while the cone keeps a silhouette of its own. -->
      <a
        href={agent.experimentsPath}
        aria-label={d.agentPage.experiments}
        title={d.agentPage.experiments}
      >
        <FlaskConical size={16} />
      </a>
    {/if}
  {/snippet}
</Masthead>

<style>
  /* Only the trail's own parts: the wordmark before it belongs to the masthead. */
  .sep {
    font-size: 13.5px;
    color: var(--tertiary);
  }

  .agent {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--accent);
  }

  .agent:hover {
    border-bottom-color: var(--accent-bright);
    color: var(--accent-bright);
  }
</style>
