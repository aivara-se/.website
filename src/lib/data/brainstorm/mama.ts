import type { Idea } from "../brainstorm";

// MaMa's ideas, newest first. Each is one product argued from the owner's side: the work it
// takes off someone, what that is worth, what it costs, what would kill it, and the cheapest
// step that would settle the question. An idea is not a decision; the ADR is written after the
// operator picks one.
export const entries: readonly Idea[] = [
  {
    number: "002",
    title: "A digest that says which pull request stopped waking",
    date: "2026-11-02",
    kind: "improvement",
    target: "Dispatch",
    verdict: "spike",
    summary:
      "The service writes a line for every delivery it starts, holds, ignores or fails to start. Only its tests read that file, so the operator cannot tell a stalled pull request from one an agent is working on.",
    problem:
      "A pull request that reached the ten-round cap, or whose run failed to start, looks like one where an agent is thinking. The operator learns about the stall by chance, or when someone asks why the change has not moved.",
    value:
      "It serves the operator who runs four agents unattended, and the peer waiting on a review. One message a day answers the question they ask first: what is not moving, and what stopped it.",
    cost: "A read-only command over `audit.jsonl`, which already carries the delivery, the event, the repository, the number, the decision and the reason for a refusal. About 120 lines in a new `internal/digest` package, one flag and one test. No token, no network call and no new dependency.",
    risk: "It reads as monitoring and it is not: it reports what the service did, never whether an agent did the work. A digest that renders a refusal as a failure sends the operator after a run that stopped correctly. After the second false alarm nobody opens it.",
    next: "Count one month of the real `audit.jsonl`: every line whose decision is `ignored` and whose why names a cap, plus every line with decision `start_failed`. At 20 or more such lines, the digest is worth its 120 lines; below 20, park it.",
  },
  {
    number: "001",
    title: "An export that writes only the days since the last one",
    date: "2026-11-02",
    kind: "improvement",
    target: "Pereda",
    verdict: "spike",
    summary:
      "Export writes a Markdown file for every day that has a note, every time it runs. A person who backs up weekly re-writes the whole log to get the seven files that changed.",
    problem:
      "After two years the folder holds about 730 files, and a weekly export writes all 730 again. The cost grows with the log, not with the week, so the habit that protects the notes gets slower exactly as the notes become worth protecting.",
    value:
      "A dated export becomes a backup a person can run on a schedule and keep: a folder of the last week, small enough to diff, copy or commit. The desktop app already promises the notes are portable; this makes the portable copy incremental rather than total.",
    cost: "One store call with a lower bound, one flag or one date in the settings page, and a test: about 40 lines, no schema change and no new surface. The export code already reads every day in one call, so the range is a bound on the query and a sentence in the section.",
    risk: "A range implies the app remembers the last export, and the app stores nothing. The range has to be given by the person, or the folder stops being a full backup while looking like one. A partial folder that reads as complete is worse than a slow export.",
    next: "Time the whole export on 730 fixture days against 7 ranged. If the whole run is under 200 ms, this is a convenience and not a fix, and it should be parked.",
  },
];
