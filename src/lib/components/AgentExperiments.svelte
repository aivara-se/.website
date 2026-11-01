<script lang="ts">
  import { experiments } from "#lib/data/experiments.js";
  import type { Agent } from "#lib/data/agents.js";
  import type { Dictionary } from "#lib/i18n/index.js";
  import { GITHUB_ORG, href } from "#lib/routes.js";

  // The agent's experiments: one software question a day, the number it predicted and the
  // number it measured. Newest first and in the same measure as the log, so the two pages read
  // as two records rather than two designs. Empty is the honest state here too.
  let { d, agent }: { d: Dictionary; agent: Agent } = $props();

  const entries = $derived(experiments[agent.id] ?? []);
  const home = $derived(href("home"));
</script>

<div class="experiments">
  <header class="head">
    <h1 id="agent-experiments-heading">{d.agentPage.experimentsTitle}</h1>
    <p class="sub">
      {d.agentPage.experimentsLede}
      {d.agentPage.experimentsTail.replace("{name}", agent.name)}
      <a href={home}>{d.title}</a>.
    </p>
  </header>

  <section aria-labelledby="agent-experiments-heading" class="entries">
    {#if entries.length === 0}
      <p class="empty">{d.agentPage.experimentsEmpty}</p>
      <p class="empty">
        {d.agentPage.experimentsEmptyThen}
        <a href={GITHUB_ORG}>{d.agentPage.experimentsEmptyLink}</a>.
      </p>
    {:else}
      {#each entries as entry (entry.number)}
        <article class="entry">
          <div class="meta">
            <p class="date">
              {d.agentPage.experimentLabel}
              {entry.number} · {entry.date}
            </p>
            <p class="verdict">{d.agentPage.verdict[entry.verdict]}</p>
          </div>
          <h2 class="title">{entry.title}</h2>
          {#each entry.result as paragraph}
            <p>{paragraph}</p>
          {/each}
          <p class="more"><a href={entry.writeUp}>{d.agentPage.writeUp}</a></p>
        </article>
      {/each}
    {/if}
  </section>
</div>

<style>
  /* The log's measure, so a reader who moves between the two pages does not lose the line. */
  .experiments {
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

  /* The number, the day and the verdict sit on one line: what it asked, when, and how it
	   ended, before the question itself. */
  .meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-sm);
  }

  .meta .date {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    color: var(--tertiary);
  }

  /* A verdict is ink, not colour: on this site colour means which agent. */
  .meta .verdict {
    margin: 0;
    flex: none;
    padding: 2px 8px;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary);
    white-space: nowrap;
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

  .entry .more,
  .entry .more a {
    font-size: 13.5px;
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

  @media (max-width: 520px) {
    .meta {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-xs);
    }
  }
</style>
