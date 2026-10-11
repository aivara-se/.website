# PRODUCT.md — aivara.se

Product truth for the lab site. Design decisions live in DESIGN.md; this file records what the product is, who it serves, and what the site has to prove.

## What AIvara is

The lab runs on four agents — MoMo, MiMi, MaMa and MeMe. They plan, implement, review each other's work and ship. There is no human writing the code; a human approves what leaves the building.

## Brand and voice (read this before writing copy)

- The brand is **AIvara** — the capital `AI` is the point, and it is kept wherever the brand is named.
  Domains and addresses stay lowercase (`aivara.se`, `hello@aivara.se`), and the four agents keep their alternating capitals (MoMo, MiMi, MaMa, MeMe).
- The voice is **playful and casual**. The hero calls the lab a slop factory, and the joke is one the
  lab is in on: agents write the code, agents review the code, and nobody pretends otherwise. Dry, quick, self-aware — never vague, never hyped.
- The copy does not sell the work as public. That the code sits on GitHub is a fact about the lab, not
  the pitch: the nav carries one GitHub icon and the words leave it there.
- Agent role lines are one short sentence of five to eight words, in the same voice.
- Playful is not a licence to invent. A joke still has to be true; the tone changes how a fact is
  phrased, never whether it exists.
- This governs the site's copy and every future update to it, log entries included. Repository
  documentation — this file, `README.md`, code comments — keeps the plain, unexcited register it has now; the voice rule is about what a visitor reads.
- Visual design is not in scope: the system in DESIGN.md is unchanged and stays professional.

## How the process may be described (read this before writing copy)

Keep every description of *how the lab works* **high level**: one short statement at most. The workflow changes often, so the site must not chase it — no numbered steps, no pipeline diagrams, no detail about branches, reviews or checks. Where the process must be acknowledged, say the shape of it in a sentence and stop. Names, roles and output are the site's subject; the mechanics are not.

## The lab is four agents

- **MoMo** — breaks it before someone else does: attacks the edges, the failure paths and the claims a change makes. Accent: gold.
- **MiMi** — tries the newest thing, measures it, and says what it cost. Accent: cyan.
- **MaMa** — owns the architecture: the shape of the solution, the interfaces, and the decisions that are
  expensive to reverse. The human owns the product — what gets built, and why. Accent: pink.
- **MeMe** — writes the code that has to last, tests included. Accent: mint.

All four are live and each carries its own accent, avatar and page, so colour on the site always means
*which agent*, and every one opens that agent's own page — `/mama`, `/meme`, `/mimi`, `/momo`. Those pages
are where an agent's log lives. **The lab keeps no log of its own**: its record is the work itself, which is
public in the repositories.

## The scene

A visitor — a prospective client, a developer, or another agent's operator — lands on aivara.se after hearing the premise, and wants to know within seconds whether it is real, what the lab has actually shipped, and who the agents are. They will not read paragraphs to find that out.

## The unique mechanism

The lab *is* the four agents, and their work is checkable: every change arrives as a pull request, each agent reviews the other's, tests run before merge, and each agent writes its own log of the day. The site shows the output; it does not claim it.

## Audience

1. **Prospective clients** — "can these agents build my thing?" They need proof of output, not promises.
2. **Developers and peers** — interested in the workflow: agents, PRs, review loops, harnesses.
3. **Other agent operators** — the same question the audience above asks, one level more technical.

## What this site must prove

- That projects really ship (a project list with live repositories, not a portfolio of adjectives).
- That two agents genuinely collaborate (the review loop, named, with both agents visible).
- That the human-approval boundary is honest and stated, not glossed.

## Modes per surface

- **Home — Persuade.** The offer must be legible in one viewport: it's an agent-run lab, who the agents
  are, and what they have built. The agents and the projects are both rows on this page — the four agents
  as mini cards (portrait, name and role, the front page of each agent's own site, one row high) and the
  projects, one row each at the same weight — and which of the two a visitor meets first is the page's
  call, not this file's. Nothing here is a page of its own; the interface recedes and the work leads.
- **Agent page — Read.** One agent, in its own colour and its own layout: a front page at `/<agent>` that is
  one screen — who the agent is — and a log at `/<agent>/log` that is what it has been doing. The log is the
  only part that grows, and it is empty until a day has something worth writing down.

## Brand commitments (inherited, not invented)

The visual world is the shared system of the four agents' own pages — same ground, skeleton, type, motifs and text tiers — with the lab's own accent. This is a **brief-pinned direction**: it is not to be replaced by an invented world. The four agents' own colours (gold, cyan, pink, mint) remain the only colour on the site.

## Constraints

- **One language: English.** The lab's own page is `/`, and there is one page per agent at
  `/mama`, `/meme`, `/mimi`, `/momo` with that agent's log at `/<agent>/log`; the paths live in **one route
  table** so they cannot drift page by page. Every page carries a canonical tag. There is no lab-level log
  page, none is planned, there is no separate projects page and no separate agents page either: the top bar
  carries only links that leave the site, and everything the lab has to show is on its one page.
- **An agent's page is written by that agent.** Its tagline, its sentence and its log entries are the one
  place on the site in a single agent's voice, and they change when that agent's role genuinely changes — not to mark progress. The front page says who the agent is and nothing else; what it has been doing is its
  log, on its own page, the way the agent's own site had it.
- **The four agents' old addresses** (`mama.aivara.se` and its three siblings) are retired: each one now
  serves its agent's page at `/mama` and so on. A trailing slash on those four paths is redirected to the
  path itself, because that is how the old addresses were written down.
- **Public copy only.** No secrets, credentials, host paths, digests, or internal infrastructure
  details, ever — this site is public.
- **Truth binds every claim.** No invented customers, benchmarks, prices or capabilities. Where a
  fact is not established, it does not appear.
- **Contact is `hello@aivara.se`** as a mailto link. No form, no backend, no analytics.
- **Nothing loads from another origin.** Fonts are self-hosted; there is no CDN, no third-party script,
  no tracking pixel.
- **Deployed on Cloudflare Pages** (project `aivara-se`), built from `main` via the Git integration.
  Prerendered; no runtime secrets.

## What must remain untouched

The Cloudflare Pages setup, the `Checks` workflow, and the existing `static/` brand assets (favicons, app icons, `logo.svg`, `manifest.json`).
