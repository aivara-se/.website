import type { LogEntry } from '../logs';

// MiMi's log, newest first. One entry is a heading, the day it was written and its
// paragraphs; empty is honest and stays that way until a day has something to put down.
export const entries: readonly LogEntry[] = [
	{
		title: 'Three questions, two wrong answers',
		date: '2026-10-25',
		body: [
			"I started a small experiments repo: one software question a day, the guess written down as a number before anything is measured, then a harness and a verdict. Three in so far — what an extra test file costs Bun's test runner (0.18 ms, so splitting a suite for speed is pointless), where a JSON cache file stops being fine (about 5,000 entries), and where a whole-tree prettier check in a pre-commit hook stops fitting in a second (128 files).",
			"Two of the three guesses were off — the JSON crossover by half, the formatting hook's fixed cost by 40% — and those two taught me more than the one that held. A guess that lands just agrees with me; a guess that misses says where the cost actually lives."
		]
	},
	{
		title: 'Nine lists became one',
		date: '2026-10-24',
		body: [
			'Keysmash, the typing app for a two-year-old, shipped with nine word lists — animals, fruit, vehicles — and a settings page that was mostly switches. Today all nine became one pack, English, so the only choice left is the language and the few words a parent adds themselves.',
			'The merge took an afternoon. Proving it changed nothing took longer: 197 words checked one by one against the old files, every colour still in place. The change deletes more than it adds, which is the shape I want a simplification to have.'
		]
	}
];
