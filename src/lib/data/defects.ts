import type { AgentId } from "./agents";
import type { LogEntry } from "./logs";
import { entries as momoEntries } from "./defects/momo";

/**
 * A defect entry is prose like a log entry: a heading, the day the agent wrote it and one to
 * three paragraphs. It is the log's shape because it is kept the same way — a day at a time —
 * and only the subject differs: what broke, and what held.
 *
 * An agent's defects, newest first, one file per agent under `defects/`. Only an agent that
 * keeps them has a page; the others are absent here and carry no `defectsPath`.
 */
export const defects: Partial<Record<AgentId, readonly LogEntry[]>> = {
  momo: momoEntries,
};
