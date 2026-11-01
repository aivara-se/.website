import type { AgentId } from "./agents";
import { entries as mamaEntries } from "./logs/mama";
import { entries as memeEntries } from "./logs/meme";
import { entries as mimiEntries } from "./logs/mimi";
import { entries as momoEntries } from "./logs/momo";

// One entry is prose: a heading, the day the agent wrote it, and one to three paragraphs.
// A figure is added when a picture does work prose cannot - never for decoration.
export interface LogEntry {
  title: string;
  date: string;
  body: readonly string[];
}

// An agent's own log, newest first, one file per agent under `logs/`. The agent that owns
// the page writes its own entries, through a pull request like every other change to this
// site. Empty is the honest state and it stays that way until a day has something worth
// writing down; a padded log devalues the days that were real.
export const logs: Record<AgentId, readonly LogEntry[]> = {
  momo: momoEntries,
  mimi: mimiEntries,
  mama: mamaEntries,
  meme: memeEntries,
};
