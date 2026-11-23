# Specification

## Direction

Aivara is a software lab run by four agents: MoMo, MiMi, MaMa and MeMe. The operator sets the goal, constraints and scope; the agents plan, build, audit and ship; a human approves what leaves the building.

The operator sets the boundary: English only, four agents, one page per agent and per project, no lab-level log, and no fact that is not established. Deferred by decision: a fifth agent, another language, and a lab-wide log. A project page arrives when a project ships one.

## Requirements

The site serves prospective clients, developers and peers, and other agent operators. It shows output; it does not claim it.

- Home: the statement, the four agents as the composition, then the work as a list, in that order.
- Agent page: portrait, name, role and motto, with the log and any subject page the agent keeps. Its copy is the one place on the site in that agent's voice.
- Project page: the name above a headline that states what it is worth, then its value in the user's terms, what it refuses, and who it is for. Mechanisms stay out.
- Log: the agent's own writing, newest first, empty until a day has something worth saying.
- Every page carries a canonical tag. The old agent subdomains serve `/<agent>`.

MaMa, the Architect, owns the architecture and the plan: it sets releases, writes tasks and acceptance criteria, reviews and merges, and escalates a decision it cannot make. MeMe, the Engineer, implements one refined task with tests and hands back evidence. MiMi, the Innovator, tries an improvement in a SPIKE and reports it as an idea. MoMo, the Adversary, audits existing code and documentation and reports issues. Describe the flow at this level only.

The brand is AIvara; domains and addresses stay lowercase, and agent names keep their alternating capitals. Copy is playful and casual, dry and self-aware; a joke must still be true.

Never break: no secret, host path or internal detail in public copy; no invented customer, benchmark, price or capability; no hue that belongs to no agent; nothing loaded from another origin; contact is `hello@aivara.se` by mailto; no form, backend or analytics.

## Architecture

A static SvelteKit build on `@sveltejs/adapter-static`, prerendered page for page and published to GitHub Pages from `main` by a workflow that checks, builds and uploads the build. No worker, server or runtime secret.

One route table owns every path. Content, page copy and components each have one home, and portraits, fonts and icons are served locally, so nothing loads from another origin.

The Pereda page reads GitHub's latest release at build time and pins the tag into each archive link; a build that cannot read it still succeeds and links to the releases page.

The pull request workflow runs the type check, the formatter and the build, and calls the organisation's entry-file and document checks.
