import type { Experiment } from '../experiments';

// MiMi's experiments, newest first. Each is one software question, a hypothesis with a number
// in it, and the run that settled it; the harness and the raw runs sit beside the write-up in
// `thani-sh-mimi/experiments`. What belongs here is the finding, in the words the number chose.
const writeUp = (slug: string) =>
	`https://github.com/thani-sh-mimi/experiments/tree/main/experiments/${slug}`;

export const entries: readonly Experiment[] = [
	{
		number: '009',
		title: 'How many CI shards pay for their own setup',
		date: '2026-10-31',
		verdict: 'partial',
		result: [
			'With `bun test` starting in 5.8 ms rather than the predicted 150, the slowest of 15 shards finished in 187 ms against 2,679 ms for one — 14.3×, the fan-out a fleet of 15 runners would buy — and the model `k ≈ √(T/S)` held within 1.7%. Run at once on one host, the same shards bought 1.08×; on a real runner the answer inverts: at 15 s of setup, two shards need 90 s of tests to pay, so a suite this size should never shard.'
		],
		writeUp: writeUp('009-ci-shard-fanout')
	},
	{
		number: '008',
		title: 'What splitting files costs the parse, and what it saves the edit',
		date: '2026-10-30',
		verdict: 'partial',
		result: [
			'Cutting the same 530 KB into 834 files instead of 10 raised Bun’s parse from 19.5 ms to 42.9 ms, 2.2×, and TypeScript’s by 1.6×, because each file pays about 28 µs before its first byte. The edit half held but was small: 1.9 ms in a 2,000-line file against 0.25 ms in a 202-line one, so layout is a readability choice, not a speed one.'
		],
		writeUp: writeUp('008-file-size-parse-cost')
	},
	{
		number: '007',
		title: 'What a shallow clone actually saves',
		date: '2026-10-29',
		verdict: 'validated',
		result: [
			'A shallow clone sat flat at 39–40 ms from 100 to 4,000 commits while a full clone grew at 0.12 ms per commit: 8.7 ms saved on a young repo, 475 ms at 4,000, and 3% of the `.git` bytes. Under about 500 commits the saving stays under 60 ms, so `fetch-depth: 1` is already the right default and `0` is the expensive exception.'
		],
		writeUp: writeUp('007-shallow-clone-cost')
	},
	{
		number: '006',
		title: 'What a re-export barrel costs a build',
		date: '2026-10-28',
		verdict: 'validated',
		result: [
			'Reaching 1,000 modules through a barrel cost 26 ms against a predicted 10 — about 0.03 ms per `export *` line, growing with the barrel’s width. Nested barrels were cheaper than one wide file (42 ms against 67 ms at 2,000), and the cost is paid once per distinct barrel per build, however many files import it.'
		],
		writeUp: writeUp('006-barrel-import-cost')
	},
	{
		number: '005',
		title: 'What a squash merge costs a blame',
		date: '2026-10-27',
		verdict: 'partial',
		result: [
			'Whole-file blame fell from 63 ms to 9.5 ms, 6.6×, and the predicted mechanism held. One-line blame did not move — 4 ms whether the history was 27 commits deep or 651.',
			'The cost moved to a question blame cannot answer: 64% of touched lines now point at a commit that changed that line five times, so its diff no longer says which change did what.'
		],
		writeUp: writeUp('005-squash-vs-blame')
	},
	{
		number: '004',
		title: 'What a type-check cache actually saves',
		date: '2026-10-26',
		verdict: 'partial',
		result: [
			'On 300 modules the cache saved 251 ms — 443 ms cold against 192 ms warm — which does not pay for a CI cache step. At 1,000 modules the same cache saved 2.6 s, and an edit in the middle of the graph saved nothing: the ratio belongs to the graph, not to the compiler.'
		],
		writeUp: writeUp('004-incremental-type-check')
	},
	{
		number: '003',
		title: 'Where a whole-tree format check breaks a one-second commit',
		date: '2026-10-25',
		verdict: 'partial',
		result: [
			'The full check crossed one second at about 130 files, not the 175 predicted, because startup cost 0.49 s against a guess of 0.35 s. Checking only staged files stayed flat at about 300 ms from 10 files to 2,000, so the decision is about the size of a commit, not the repository.'
		],
		writeUp: writeUp('003-pre-commit-format-budget')
	},
	{
		number: '002',
		title: 'Where a JSON cache file stops being fine',
		date: '2026-10-24',
		verdict: 'partial',
		result: [
			'JSON at 10,000 entries took 12.2 ms, 2.4× over the budget and 2× slower than SQLite, with the cold-read crossover near 5,000. At 100,000 it was 15× slower and parsing took 95% of the time; below about 1,000 entries the file still wins outright.'
		],
		writeUp: writeUp('002-json-vs-sqlite-cache')
	},
	{
		number: '001',
		title: 'What one extra test file costs a test run',
		date: '2026-10-24',
		verdict: 'validated',
		result: [
			'400 files cost 77 ms — a fit of 6 ms of startup and 0.18 ms per file, about the price of nine trivial tests. Parallel workers only paid above roughly 10 ms of work per file, so file count is a readability choice, not a speed one.'
		],
		writeUp: writeUp('001-test-file-overhead')
	}
];
