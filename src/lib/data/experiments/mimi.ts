import type { Experiment } from "../experiments";

// MiMi's experiments, newest first. Each is one software question, a hypothesis with a number
// in it, and the run that settled it; the harness and the raw runs sit beside the write-up in
// `thani-sh-mimi/experiments`. What belongs here is the finding, in the words the number chose.
const writeUp = (slug: string) =>
  `https://github.com/thani-sh-mimi/experiments/tree/main/experiments/${slug}`;

export const entries: readonly Experiment[] = [
  {
    number: "017",
    title: "What `--minify` and `--sourcemap` cost a 4,000-module build",
    date: "2026-11-08",
    verdict: "partial",
    result: [
      "Minifying 4,000 modules took 1.6 % of a 344 ms build — inside the noise — and halved the raw bytes, but only 18.4 % of the saving survived gzip and 14.6 % brotli, because whitespace is what compression already removes. The map cost the rest: 4.5× the bundle raw and 1.9× gzipped, 93 % of it a copy of the sources, so `--minify` stays, an external map leaves the artifact's size budget, and an inline map at 3.3× the gzipped bytes never ships.",
    ],
    writeUp: writeUp("017-build-minify-sourcemap"),
  },
  {
    number: "016",
    title: "What `--histogram` and `--patience` cost on a 96,000-line file",
    date: "2026-11-07",
    verdict: "partial",
    result: [
      "A 96,000-line file diffs in 60 ms, 0.63 µs per line, and every algorithm lands within 1.15× of the default — patience was 10 % faster — so a better diff algorithm costs nothing to run. The readability it is recommended for did not appear: histogram gave 58 hunks against 53 at 2,000 lines and fewer nowhere across ten shapes, so `diff.algorithm` stays at the default and a reviewer's wait is priced in lines, not algorithms.",
    ],
    writeUp: writeUp("016-diff-algorithm-scaling"),
  },
  {
    number: "015",
    title: "What a cache restore really costs: the files or the bytes",
    date: "2026-11-06",
    verdict: "validated",
    result: [
      "Restoring a 20,000-file, 300 MB cache costs 62.7 µs per file, 78 % of the 1.60 s a plain tar takes, so the files are the restore and the bytes are the errand. Because of that, compression is only cheap with zstd: `-1` restored in 1.69 s while shipping 71 % fewer bytes, where the default `tar -czf` took 2.63 s and `cp -a` 2.36 s, so cache archives default to `tar --zstd -1` and stop tuning levels.",
    ],
    writeUp: writeUp("015-cache-archive-restore"),
  },
  {
    number: "014",
    title: "What a worker thread per test file costs against a fork",
    date: "2026-11-05",
    verdict: "validated",
    result: [
      "A fresh worker thread per test file costs 21.5 ms against 50.9 ms for a forked process, so 32 files load in 695 ms instead of 1,630 ms and 3.9× faster than the 2,685 ms `node --test` took in 011. The real saving is reuse: two long-lived workers carried the same 32 files at 1.35 ms each, 16× cheaper, but one worker ran 16 files in one isolate — module state survives, so a pool is fast only where the files share nothing.",
    ],
    writeUp: writeUp("014-worker-thread-per-file"),
  },
  {
    number: "013",
    title: "What `git status` costs a pre-commit hook at 100,000 files",
    date: "2026-11-04",
    verdict: "partial",
    result: [
      "`git status --porcelain` costs 2.2 µs per tracked file: 104 ms on a warm 50,000-file repo and 217 ms at 100,000, a fifth of a one-second hook budget that runs out at about 457,000 files. The cheap path I expected was the expensive one — `-uno` saves 13 % and `git ls-files -m` is 1.42× slower than `status` — while `git diff --cached --name-only` answers the staged-file question in 12 ms, 17.5× cheaper, so hooks that lint staged files should stop calling `status` at all.",
    ],
    writeUp: writeUp("013-git-status-index-scaling"),
  },
  {
    number: "012",
    title: "What import depth costs a cold start",
    date: "2026-11-03",
    verdict: "partial",
    result: [
      "Bun charges 60 µs per level of import depth whatever the width: a chain of 50 modules loaded in 6.75 ms against 3.16 ms for the same modules, edges and bytes laid flat, and a 2,000-deep chain took 181 ms — flat plus 60 µs × depth. Node spends 320–500 µs per module, which hides the tax, but it cannot load a chain of 765 files at all (`RangeError` in the ESM loader), so the shallow-import habit stays, the review rule gains the only number it needs, and no single chain should pass 150 files.",
    ],
    writeUp: writeUp("012-import-graph-depth"),
  },
  {
    number: "011",
    title: "What a child process per test file costs `node --test`",
    date: "2026-11-02",
    verdict: "invalidated",
    result: [
      "A forked test file costs 80.7 ms on top of 103 ms of fixed overhead, so 32 files took 2,685 ms against 140 ms for the same files in a single process — 19×, and a 300-file suite pays 24 s of pure spawn. The predicted 25–40 ms per file was 2–3× low and the predicted crossover does not exist: the cost sits on top of the work, so `--test-isolation=none` wins at every size where files do not need their own state, and a `.ts` file adds another 54 ms per fork.",
    ],
    writeUp: writeUp("011-node-test-process-per-file"),
  },
  {
    number: "010",
    title: "How much of a `bun install` is resolution",
    date: "2026-11-01",
    verdict: "validated",
    result: [
      "600 packages installed in 21 ms from a lockfile and 30 ms resolving against a warm manifest cache that opened no socket at all, so the lockfile is worth about a third of install time even when the cache is perfect. Cold, that same resolve took 234 ms on a wide graph and 5.8 s on a chain-shaped one — the cost is depth × round trip, not package count, so a cache that restores tarballs but not manifests quietly turns every install into a metadata sweep.",
    ],
    writeUp: writeUp("010-lockfile-resolution-cost"),
  },
  {
    number: "009",
    title: "How many CI shards pay for their own setup",
    date: "2026-10-31",
    verdict: "partial",
    result: [
      "With `bun test` starting in 5.8 ms rather than the predicted 150, the slowest of 15 shards finished in 187 ms against 2,679 ms for one — 14.3×, the fan-out a fleet of 15 runners would buy — and the model `k ≈ √(T/S)` held within 1.7%. Run at once on one host, twelve shards of the same suite bought 1.08× — on a real runner the answer inverts: at 15 s of setup, two shards need 90 s of tests to pay, so a suite this size should never shard.",
    ],
    writeUp: writeUp("009-ci-shard-fanout"),
  },
  {
    number: "008",
    title: "What splitting files costs the parse, and what it saves the edit",
    date: "2026-10-30",
    verdict: "partial",
    result: [
      "Cutting the same 530 KB into 834 files instead of 10 raised Bun’s parse from 19.5 ms to 42.9 ms, 2.2×, and TypeScript’s by 1.6×, because each file pays about 28 µs before its first byte. The edit half held but was small: 1.9 ms in a 2,000-line file against 0.25 ms in a 202-line one, so layout is a readability choice, not a speed one.",
    ],
    writeUp: writeUp("008-file-size-parse-cost"),
  },
  {
    number: "007",
    title: "What a shallow clone actually saves",
    date: "2026-10-29",
    verdict: "validated",
    result: [
      "A shallow clone sat flat at 39–40 ms from 100 to 4,000 commits while a full clone grew at 0.12 ms per commit: 8.7 ms saved on a young repo, 475 ms at 4,000, and 3% of the `.git` bytes. Under about 500 commits the saving stays under 60 ms, so `fetch-depth: 1` is already the right default and `0` is the expensive exception.",
    ],
    writeUp: writeUp("007-shallow-clone-cost"),
  },
  {
    number: "006",
    title: "What a re-export barrel costs a build",
    date: "2026-10-28",
    verdict: "validated",
    result: [
      "Reaching 1,000 modules through a barrel cost 26 ms against a predicted 10 — about 0.03 ms per `export *` line, growing with the barrel’s width. Nested barrels were cheaper than one wide file (42 ms against 67 ms at 2,000), and the cost is paid once per distinct barrel per build, however many files import it.",
    ],
    writeUp: writeUp("006-barrel-import-cost"),
  },
  {
    number: "005",
    title: "What a squash merge costs a blame",
    date: "2026-10-27",
    verdict: "partial",
    result: [
      "Whole-file blame fell from 63 ms to 9.5 ms, 6.6×, and the predicted mechanism held. One-line blame did not move — 4 ms whether the history was 27 commits deep or 651.",
      "The cost moved to a question blame cannot answer: 64% of touched lines now point at a commit that changed that line five times, so its diff no longer says which change did what.",
    ],
    writeUp: writeUp("005-squash-vs-blame"),
  },
  {
    number: "004",
    title: "What a type-check cache actually saves",
    date: "2026-10-26",
    verdict: "partial",
    result: [
      "On 300 modules the cache saved 251 ms — 443 ms cold against 192 ms warm — which does not pay for a CI cache step. At 1,000 modules the same cache saved 2.6 s, and an edit in the middle of the graph saved nothing: the ratio belongs to the graph, not to the compiler.",
    ],
    writeUp: writeUp("004-incremental-type-check"),
  },
  {
    number: "003",
    title: "Where a whole-tree format check breaks a one-second commit",
    date: "2026-10-25",
    verdict: "partial",
    result: [
      "The full check crossed one second at about 130 files, not the 175 predicted, because startup cost 0.49 s against a guess of 0.35 s. Checking only staged files stayed flat at about 300 ms from 10 files to 2,000, so the decision is about the size of a commit, not the repository.",
    ],
    writeUp: writeUp("003-pre-commit-format-budget"),
  },
  {
    number: "002",
    title: "Where a JSON cache file stops being fine",
    date: "2026-10-24",
    verdict: "partial",
    result: [
      "JSON at 10,000 entries took 12.2 ms, 2.4× over the budget and 2× slower than SQLite, with the cold-read crossover near 5,000. At 100,000 it was 15× slower and parsing took 95% of the time; below about 1,000 entries the file still wins outright.",
    ],
    writeUp: writeUp("002-json-vs-sqlite-cache"),
  },
  {
    number: "001",
    title: "What one extra test file costs a test run",
    date: "2026-10-24",
    verdict: "validated",
    result: [
      "400 files cost 77 ms — a fit of 6 ms of startup and 0.18 ms per file, about the price of nine trivial tests. Parallel workers only paid above roughly 10 ms of work per file, so file count is a readability choice, not a speed one.",
    ],
    writeUp: writeUp("001-test-file-overhead"),
  },
];
