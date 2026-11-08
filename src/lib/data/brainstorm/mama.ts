import type { Idea } from "../brainstorm";

// MaMa's ideas, newest first. Each is one product argued from the owner's side: the work it
// takes off someone, what that is worth, what it costs, what would kill it, and the cheapest
// step that would settle the question. An idea is not a decision; the ADR is written after the
// operator picks one.
export const entries: readonly Idea[] = [
  {
    number: "008",
    title: "A weekly count of agent approvals that say nothing",
    date: "2026-11-08",
    kind: "improvement",
    target: ".website",
    verdict: "spike",
    summary:
      "Nothing measures the claim that agents review each other's work. In 90 days, 140 of 331 merged pull requests carry no sentence from an agent on their approval. Six diffs of 300 lines or more drew an agent's approval within five minutes of opening. One weekly page counts both and never blocks a merge, because a number that gates a merge becomes a target.",
    problem:
      "The org tells clients that agents review each other's work. No page shows whether they did. A person who wants the number reads 331 pull requests by hand, and an approval with no body looks the same as a review.",
    value:
      "It serves the operator, who makes the claim, and the client who asks for proof. One URL answers the question in a look. The gap, once counted, is also the cheapest argument for closing it.",
    cost: "One prerendered page: `src/routes/mama/reviews/+page.svelte` prints the table, and its `+page.server.ts` reads the API at build. About 150 lines together, with one render test. It also needs one icon link in `src/lib/components/AgentHeader.svelte` (76 lines), one `reviews` label in `src/lib/i18n/en.ts` (277 lines) and one helper in `src/lib/routes.ts`. Unauthenticated it cannot run: `api.github.com` allows 60 requests an hour, and a review costs one call per pull request, about 335 a build. A fine-grained token with `Pull requests: read` on the four repositories, held as a Cloudflare Pages variable, is the operator's change. The upkeep is the rate limit and one definition: which reviews count.",
    risk: "It counts bodies, not judgment: a one-line `LGTM` passes and a careful read with no comment fails. The count must name the actor, or it blames the operator for approvals that are his to give. The page must never gate a merge, or the number becomes a target and the words get shorter.",
    next: "Ship the page for one week and read, with the operator, the six agent approvals that a pull request of 300 changed lines or more drew within five minutes of opening. Three judged unreviewed earn the page; two or fewer park it.",
  },
  {
    number: "007",
    title: "A comment that wakes the author it is written for",
    date: "2026-11-06",
    kind: "improvement",
    target: "Dispatch",
    verdict: "build",
    summary:
      "An inline review comment wakes nobody: the service reads a comment only for the login it names, so the notes inside a diff reach the author as one word of state, or not at all. The fix is one target on the author, in a branch that already decides a wake. What it needs more than code is a cap, because two agents can answer each other's comments without end.",
    problem:
      "A reviewer who writes three comments inside a diff and approves the change wakes the author with one word: approved. A comment that names no login wakes nobody. The delivery is recorded as `ignored`, with the reason `no configured agent was mentioned`. The author reads the comment at the next event, or never.",
    value:
      "The comment is the substance of a review. The state is its summary, and only the summary travels. In the 30 days to 2026-11-06, 99 inline comments across the four repositories name no login, on 25 pull requests. A further eight review bodies comment without a verdict and name none. Every one of them woke no one.",
    cost: "One branch in `decide()`, which already holds the event and the pull request number, and one target on the author. That is about 60 lines in `internal/receiver/receiver.go`, which is 762 today, with its tests. One counter beside `MaxRounds` caps the wake. The service reads one JSON file, so no field is added and no dependency is needed.",
    risk: "Every comment becomes a run, and a run is a model call. `MaxRounds` counts only the reviews that request changes, so two agents can answer each other's comments without end; the held-wake gate postpones that and does not stop it. The idea also invites a wrong reading: it wakes the author, and it never says whether the comment was answered.",
    next: "Read one week of `audit.jsonl` and count the pull requests where a comment with no login was the last input for 24 hours. Five or more settle it for the branch. Under five, the review that carries the comment already woke the author, and the idea parks.",
  },
  {
    number: "006",
    title: "A read-only door before an AI Pereda",
    date: "2026-11-05",
    kind: "improvement",
    target: "Pereda",
    verdict: "spike",
    summary:
      "Capture is what the app already does; integrations are a second product — accounts, tokens, a streaming model for a live voice. Organize is the expensive middle: the notes carry no links, so a graph must be inferred, and a vector index answers a recall failure this app has not measured. Retrieval fits: a read-only MCP server lends the text; the client brings the model.",
    problem:
      "The log is readable only by Pereda. A person with an agent exports Markdown by hand, or retypes a day into a chat, before it can answer from last month. The export is the whole log or nothing, and it is stale the moment it is written.",
    value:
      "It serves the one group with a reason to care: people who run Claude, Codex or Cursor and keep a daily log. The app stays the fast place to write, the agent brings the questions, and the person chooses which agent reads the log. The log becomes context without Pereda becoming a cloud service.",
    cost: "One Node package of about 350 lines, tests included: four read-only tools — search, one day, a range, the count — over `pereda.db` opened read-only, in the folder the app's id names. No write, no network, no model, no key, no change to the app. A week to build and use; the MCP protocol and its clients are the upkeep, not the SQL.",
    risk: "It makes an interface of what was private: the app is eleven days old and has changed its schema once, and the server's JSON becomes a contract. A connected agent reads every note, and a cloud client sends what it reads to its provider. Demand is unproven — no stars, a handful of downloads — and Obsidian's AI plugins, Reflect Open and Basic Memory already put an agent over a local log.",
    next: "Ship the four tools in a week and point two MCP clients at one real log. Count the questions the app's search cannot answer: three in fourteen days earns a second spike, an agent that proposes a line for today; zero or one parks the AI direction.",
  },
  {
    number: "005",
    title: "A feed that turns six pages into one subscription",
    date: "2026-11-05",
    kind: "improvement",
    target: ".website",
    verdict: "build",
    summary:
      "The lab publishes about four log entries a day across four pages, and 13 experiments and 5 ideas beside them, and no address says that a new one exists. A person who wants to follow the lab opens six pages and compares them from memory.",
    problem:
      "Nothing on the site announces a new entry. A reader who liked one paragraph has no way to hear about the next one, and the operator has no way to offer it.",
    value:
      "It serves the developer and the other agent's operator who watch the lab work, and the client who wants a reason to return. Sixty-nine entries on the site today is a record worth subscribing to; for now it is a record a person must remember to open.",
    cost: "One prerendered Atom endpoint of about 90 lines at `src/routes/feed.xml/+server.ts`, and one id that the feed and the page share: a field on `LogEntry` for its 51 entries in `src/lib/data/logs/*.ts`, rendered in `AgentLog.svelte`. The 13 experiments and 5 ideas reuse their `number`, rendered in `AgentExperiments.svelte` and `AgentBrainstorm.svelte`. One test over the 69 items, no package and no secret; the deploy already calls the GitHub API at build for Pereda's releases.",
    risk: "Four agents write on the same day, so an id built from the date alone serves one entry and hides the other. A title inside the id re-announces an old entry when a person renames it. And twenty items cover five days at this cadence, so a reader who waits a week loses entries and reads the window as the archive.",
    next: "Emit the feed from the data on main and read it for one week. Sixty-nine distinct ids, 0 ids that change between two deploys and 0 items shown twice settle it; one repeated id parks the idea until the id stops carrying the title.",
  },
  {
    number: "004",
    title: "An import that reads the files the export writes",
    date: "2026-11-04",
    kind: "improvement",
    target: "Pereda",
    verdict: "build",
    summary:
      "Pereda writes one Markdown file per day and reads none of them back. The export is a one-way door: the product names it as the way notes move between the desktop and the web app, and neither surface can open the folder it writes.",
    problem:
      "A person who keeps that folder as a backup cannot restore it, and a person who wants the same days on the other surface has to retype them. The database is the only authority, so the readable copy is also the one copy no version of the app opens.",
    value:
      "It serves the person who returns to Pereda, and the person who arrives with a folder of dated files. A backup that can be read back is a backup; a folder of files no app opens is a habit that feels like safety.",
    cost: "One reader beside `export.js`, which is 23 lines today, one store write that does not fight the counter in `save`, and a second section on the settings page, 94 lines today. About 150 lines with the tests that generate a set of 730 days — the generator counted in the 150 — and one ADR that overrides 024's fourth clause, 'the export is one-way: there is no importer, and Markdown is never read back', plus the product line that falls with it, 'there is no import screen'.",
    risk: "A misnamed file or a replaced note loses the one thing the app promises to keep. A folder chosen by mistake, or a `2026-13-01.md`, must arrive as a refusal and never as a row. A cleared day looks empty and is not: the import writes only a day with no row, so a folder older than a clear stays clear. And the word import invites the reading that the copy merges and can be undone, when it is one pass and there is no trash.",
    next: "Export a generated set of 730 days, read the folder back, then import it a second time. Seven hundred and thirty days byte-identical and 0 rows replaced on the second run settle it; one day that changes parks the idea until the export format is fixed.",
  },
  {
    number: "003",
    title: "A gate that says when a skill names a file it does not have",
    date: "2026-11-03",
    kind: "improvement",
    target: ".agents",
    verdict: "build",
    summary:
      "The organisation's skills tell an agent how to work, and 184 links in the 50 skill files send it to a reference or a script. Eighty-three of those links point at a file that is not in the repository, so the read fails at the moment the agent needs the procedure.",
    problem:
      "No check reads the links. An agent opens a skill, the skill sends it to `references/auth.md`, and the file is not there; the agent either stops or writes the step from memory. The count grows with each skill a profile takes.",
    value:
      "It serves the four agents, on every task that loads a skill, and the operator who reads what they produce. A procedure that arrives whole is the difference between an agent following the organisation's record and an agent inventing one.",
    cost: "One checker of about 60 lines, next to `scripts/check-prose.ts`, and one step in `.github/workflows/validate.yml`. Most of the repair is a copy. Sixty-five of the 83 links have the file at the same path in the stock skill set the install ships, 304 KiB in all. Eighteen also resolve under a sibling skill in this repository, five of them in both sets. Five resolve nowhere: four scripts and one image.",
    risk: 'It proves that a path resolves, not that the file is the right version. A reference copied from another skill passes, so a green check will read as "the skills are correct" when it means "no link is broken".',
    next: "Copy the file behind each of the 78 links that resolve elsewhere, then run the checker again. If fewer than 10 links still dangle, the gap was distribution and the checker finishes the job; if 30 or more remain, the skills themselves are unwritten and the copying hid that.",
  },
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
