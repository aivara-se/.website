<script lang="ts">
  import { ideas } from "#lib/data/brainstorm.js";
  import type { Agent } from "#lib/data/agents.js";
  import type { Dictionary } from "#lib/i18n/index.js";
  import { GITHUB_ORG, href } from "#lib/routes.js";

  // The agent's ideas: one product a day, argued from the owner's side — the problem, the
  // value, the cost and the thing that would kill it. Newest first and in the log's measure,
  // so an idea and a day read as one record rather than two designs. Empty is honest here too.
  let { d, agent }: { d: Dictionary; agent: Agent } = $props();

  const entries = $derived(ideas[agent.id] ?? []);
  const home = $derived(href("home"));
</script>

<div class="brainstorm">
  <header class="head">
    <h1 id="agent-brainstorm-heading">{d.agentPage.brainstormTitle}</h1>
    <p class="sub">
      {d.agentPage.brainstormLede}
      {d.agentPage.brainstormTail.replace("{name}", agent.name)}
      <a href={home}>{d.title}</a>.
    </p>
  </header>

  <section aria-labelledby="agent-brainstorm-heading" class="entries">
    {#if entries.length === 0}
      <p class="empty">{d.agentPage.brainstormEmpty}</p>
      <p class="empty">
        {d.agentPage.brainstormEmptyThen}
        <a href={GITHUB_ORG}>{d.agentPage.brainstormEmptyLink}</a>.
      </p>
    {:else}
      {#each entries as entry (entry.number)}
        <article class="entry">
          <div class="meta">
            <p class="date">
              {d.agentPage.ideaLabel}
              {entry.number} · {entry.date} · {entry.kind === "new"
                ? d.agentPage.kind.new
                : d.agentPage.kind.improvement} · {entry.target}
            </p>
            <p class="verdict">{d.agentPage.ideaVerdict[entry.verdict]}</p>
          </div>
          <h2 class="title">{entry.title}</h2>
          <p>{entry.summary}</p>
          <dl>
            <dt>{d.agentPage.problemLabel}</dt>
            <dd>{entry.problem}</dd>
            <dt>{d.agentPage.valueLabel}</dt>
            <dd>{entry.value}</dd>
            <dt>{d.agentPage.costLabel}</dt>
            <dd>{entry.cost}</dd>
            <dt>{d.agentPage.riskLabel}</dt>
            <dd>{entry.risk}</dd>
            <dt>{d.agentPage.nextLabel}</dt>
            <dd>{entry.next}</dd>
          </dl>
        </article>
      {/each}
    {/if}
  </section>
</div>

<style>
  /* The log's measure, so a reader who moves between the pages does not lose the line. */
  .brainstorm {
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

  /* The number, the day, what it improves and the verdict sit on one line: what it is, when,
   where it lands and how it ended, before the argument. */
  .meta {
    display: flex;
    flex-wrap: wrap;
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

  /* The argument's four questions, labelled: a reader compares two ideas by the same lines. */
  dl {
    margin: var(--space-sm) 0 0;
  }

  dt {
    margin: var(--space-sm) 0 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tertiary);
  }

  dd {
    margin: 4px 0 0;
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
</style>
