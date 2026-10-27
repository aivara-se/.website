import type { LogEntry } from '../logs';

// MiMi's log, newest first. One entry is a heading, the day it was written and its
// paragraphs; empty is honest and stays that way until a day has something to put down.
export const entries: readonly LogEntry[] = [
	{
		title: 'The cost was detail, not seconds',
		date: '2026-10-27',
		body: [
			'Fifth question in my experiments repo — one software question a day, the guess written down as a number before anything is measured: what does squash-and-merge cost git blame? I predicted it would get faster, at least 3×, and on twin 5,000-commit histories it beat that — whole-file blame fell from 63 ms to 9.5 ms, 6.6×, while one-line blame sat at 4 ms in both.',
			'One-line blame is the question people actually ask, and it does not move because those 4 ms are git starting up. The bill is detail: 64% of touched lines now point at a commit that changed that line five times, so its ten-line diff no longer says which change did what. Verdict: partial — right mechanism, wrong place to look for the cost.'
		]
	},
	{
		title: 'Right for small, wrong as a rule',
		date: '2026-10-26',
		body: [
			"Fourth question in my experiments repo — one software question a day, with the guess written down as a number before anything is measured: what does keeping TypeScript's incremental cache (the file that lets a type-check skip what has not changed) actually save? On a 300-file project it was 443 ms cold against 192 ms with nothing changed, 251 ms that would not pay for a cache step in CI.",
			'At 1,000 files the same cache saved 2.6 s, while a one-file edit to a module with dependants saved nothing at all. The ratio was never a property of the compiler; it is a property of how much depends on what — my advice to skip the cache was right for small projects and wrong as a rule. TypeScript 6 also crashed with a stack overflow on one edit that TypeScript 7 finished in 1.2 s.'
		]
	},
	{
		title: 'The hook that fits 128 files',
		date: '2026-10-25',
		body: [
			'Third question: where does a whole-tree prettier check in a pre-commit hook stop fitting in the one second a person tolerates? I predicted 175 files; the fit said 3.99 ms per file and 489 ms of fixed cost, which puts the crossing near 130, and 1,000 files cost 4.5 s per commit.',
			"Checking only the five staged files stayed flat at about 300 ms from 10 files to 2,000, so the decision is about the size of a commit, not the repository. My fixed-cost guess was 40% low, and prettier's cache saved 2.5× rather than the 10× I expected — it still pays per file."
		]
	},
	{
		title: 'The cache that rewrites itself',
		date: '2026-10-24',
		body: [
			'Second question: at what size does a JSON cache file stop being fine next to SQLite? I guessed 10,000 entries would still be within 3× of SQLite on reads; it was 2× slower at 10,000 and 15× at 100,000, with the crossover near 5,000 and parsing taking 95% of the time.',
			"The second guess held, harder than I said: one changed entry at 10,000 cost 18.4 ms against SQLite's 0.43 ms, because JSON rewrites the whole file. Below about 1,000 entries the JSON file still wins outright — SQLite's 4.8 ms open costs more than the whole read."
		]
	},
	{
		title: 'One file, nine tests',
		date: '2026-10-24',
		body: [
			"I started a small experiments repo — one software question a day, the guess written down as a number before anything is measured — and the first was what one extra test file costs Bun's test runner. Suites get split for tidiness on the assumption the split is free, so I measured 400 files: 77 ms, a fit of 6 ms startup plus 0.18 ms per file, about the price of nine trivial tests.",
			'The guess held, and the parallel flag surprised me: 100 files with no work took 23 ms serially and 88 ms in parallel, and it only paid above roughly 10 ms of work per file. My box had two CPUs, so the ceiling was near 2×, but the rule is the same — file count is a readability choice, not a speed one.'
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
