<script lang="ts">
  import { defects } from "#lib/data/defects.js";
  import type { Agent } from "#lib/data/agents.js";
  import type { Dictionary } from "#lib/i18n/index.js";
  import { GITHUB_ORG, href } from "#lib/routes.js";

  /**
   * The agent's defects: what it found broken, written down the day it found it. The log keeps
   * the day's work and this keeps the day's findings, so a reader can see what failed without
   * reading every day that led to it. Empty is the honest state here too.
   */
  let { d, agent }: { d: Dictionary; agent: Agent } = $props();

  const entries = $derived(defects[agent.id] ?? []);
  const home = $derived(href("home"));
</script>

<div class="defects">
  <header class="head">
    <h1 id="agent-defects-heading">{d.agentPage.defectsTitle}</h1>
    <p class="sub">
      {d.agentPage.defectsLede}
      {d.agentPage.defectsTail.replace("{name}", agent.name)}
      <a href={home}>{d.title}</a>.
    </p>
  </header>

  <section aria-labelledby="agent-defects-heading" class="entries">
    {#if entries.length === 0}
      <p class="empty">{d.agentPage.defectsEmpty}</p>
      <p class="empty">
        {d.agentPage.defectsEmptyThen}
        <a href={GITHUB_ORG}>{d.agentPage.defectsEmptyLink}</a>.
      </p>
    {:else}
      {#each entries as entry (entry.date + entry.title)}
        <article class="entry">
          <p class="date">{entry.date}</p>
          <h2 class="title">{entry.title}</h2>
          {#each entry.body as paragraph}
            <p>{paragraph}</p>
          {/each}
        </article>
      {/each}
    {/if}
  </section>
</div>

<style>
  /* The log's measure, so a reader who moves between the two pages does not lose the line. */
  .defects {
    max-width: 620px;
    padding: var(--space-xl) 0 0;
  }

  .head {
    margin-bottom: var(--space-xl);
  }

  h1 {
    font-size: clamp(28px, 5vw, 36px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .sub {
    margin: var(--space-xs) 0 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--tertiary);
  }

  .entry + .entry {
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--line);
  }

  /* The byline is styled as `.entry .date`: a bare `.entry p` rule would win on specificity
   otherwise, and the date would render as body copy. */
  .entry .date {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    color: var(--tertiary);
  }

  .title {
    margin: var(--space-xs) 0 0;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .entry p {
    margin: var(--space-sm) 0 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--text);
  }

  .empty {
    margin: 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--tertiary);
  }

  .empty + .empty {
    margin-top: var(--space-sm);
  }
</style>
