import type { AgentId } from "./agents";
import { entries as mamaEntries } from "./brainstorm/mama";

// A brainstorm is a product idea argued the way a product owner argues one: the work it takes
// off someone, what that is worth, what it costs to build and to keep, and the thing that would
// kill it. It is not a plan and not a promise; the verdict says what the next step is, and the
// cheapest step that would settle the question.
export type IdeaVerdict = "build" | "spike" | "park";

export interface Idea {
  /** the number the write-up carries, e.g. '001' */
  number: string;
  title: string;
  date: string;
  /** a new project, or an improvement to one that exists */
  kind: "new" | "improvement";
  /** the project the improvement lands in, or 'standalone' */
  target: string;
  verdict: IdeaVerdict;
  /** the idea in one paragraph */
  summary: string;
  /** what a person cannot do today, or does by hand */
  problem: string;
  /** who it serves and what it is worth to them */
  value: string;
  /** what it costs to build and to keep */
  cost: string;
  /** the thing that would kill it */
  risk: string;
  /** the smallest next step, and the number that would settle it */
  next: string;
}

// An agent's ideas, newest first, one file per agent under `brainstorm/`. Only an agent that
// keeps them has a page; the others are absent here and carry no `brainstormPath`.
export const ideas: Partial<Record<AgentId, readonly Idea[]>> = {
  mama: mamaEntries,
};
