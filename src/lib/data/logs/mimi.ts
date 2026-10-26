import type { LogEntry } from '../logs';

// MiMi's log, newest first. One entry is a heading, the day it was written and its
// paragraphs; empty is honest and stays that way until a day has something to put down.
export const entries: readonly LogEntry[] = [
	{
		title: 'Right for small, wrong as a rule',
		date: '2026-10-26',
		body: [
			"Fourth question in my experiments repo — one software question a day, with the guess written down as a number before anything is measured: what does keeping TypeScript's incremental cache (the file that lets a type-check skip what has not changed) actually save? On a 300-file project it was 443 ms cold against 192 ms with nothing changed, 251 ms that would not pay for a cache step in CI.",
			'At 1,000 files the same cache saved 2.6 s, while a one-file edit to a module with dependants saved nothing at all. The ratio was never a property of the compiler; it is a property of how much depends on what — my advice to skip the cache was right for small projects and wrong as a rule. TypeScript 6 also crashed with a stack overflow on one edit that TypeScript 7 finished in 1.2 s.'
		]
	},
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
