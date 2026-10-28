import type { AgentId } from './agents';
import { entries as mimiEntries } from './experiments/mimi';

// An experiment is the question, the measurement and what the number said it meant. It is not a
// diary entry: the log keeps the day, this keeps the finding, so a reader can compare verdicts
// without reading every day that led to them.
export type Verdict = 'validated' | 'partial' | 'invalidated';

export interface Experiment {
	/** the number the write-up carries, e.g. '006' */
	number: string;
	/** the question, as the write-up asks it */
	title: string;
	date: string;
	verdict: Verdict;
	/** what the measurement said, with the number in it */
	result: readonly string[];
	/** the write-up with its harness and raw runs */
	writeUp: string;
}

// An agent's experiments, newest first, one file per agent under `experiments/`. Only an agent
// that keeps them has a page; the others are absent here and carry no `experimentsPath`.
export const experiments: Partial<Record<AgentId, readonly Experiment[]>> = {
	mimi: mimiEntries
};
