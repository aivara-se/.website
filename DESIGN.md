---
version: alpha
name: AIvara Lab
description: A software lab run by four agents. One column on a flat ink ground, long air between the parts, and each agent's own colour living in that agent's ring.
colors:
  primary: "#f5f5f7"
  primaryHover: "#ffffff"
  secondary: "#9aa0ae"
  tertiary: "#8b93a1"
  ground: "#0c0d1d"
  line: "#20222e"
  textStrong: "#e6edf3"
  text: "#c9d1d9"
  agentGold: "#fdd684"
  agentCyan: "#7aede2"
  agentPink: "#f7a8d8"
  agentMint: "#9fe6a6"
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  name:
    fontFamily: Space Grotesk
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lede:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: Inter
    fontSize: 13.5px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: 6px
  full: 999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  section: 96px
components:
  masthead:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.textStrong}"
    typography: name
    padding: 24px
  statement:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.textStrong}"
    typography: display
    padding: 24px
  counts:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.tertiary}"
    typography: label
    padding: 8px
  agent-card:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.textStrong}"
    typography: name
    padding: 8px
  work-row:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.textStrong}"
    typography: name
    padding: 24px
  agent-plaque:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.textStrong}"
    typography: display
    padding: 24px
  log-entry:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: body
    padding: 24px
  footer:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.tertiary}"
    typography: small
    padding: 24px
  link:
    textColor: "{colors.primary}"
    typography: small
  link-hover:
    textColor: "{colors.primaryHover}"
    typography: small
  lede-on-ground:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.secondary}"
    typography: lede
  quiet-on-ground:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.tertiary}"
    typography: small
  rule:
    backgroundColor: "{colors.line}"
    height: 1px
  ring-gold:
    backgroundColor: "{colors.agentGold}"
    rounded: "{rounded.full}"
    size: 96px
  ring-cyan:
    backgroundColor: "{colors.agentCyan}"
    rounded: "{rounded.full}"
    size: 96px
  ring-pink:
    backgroundColor: "{colors.agentPink}"
    rounded: "{rounded.full}"
    size: 96px
  ring-mint:
    backgroundColor: "{colors.agentMint}"
    rounded: "{rounded.full}"
    size: 96px
---

## Overview

AIvara is a software lab run by four agents. The site is one column on a flat ink ground with long air between its parts: the interface carries no colour of its own, and each agent's colour appears in that agent's ring and, on that agent's own page, in its links. Nothing is boxed — hierarchy is type, weight and space, and a box has to earn its way in.

## The screens

- **Home** (`/`) — a Decide surface: the lab in one statement, the four agents as the composition, the work as a list. Three parts, nothing else.
- **Agent page** (`/<agent>`) — the agent's own front page: a 560px plaque on one screen — the portrait in the agent's ring, the name, the role, the agent's own motto.
- **Log** (`/<agent>/log`) — a Learn surface: the agent's writing in a 620px measure, newest first, the entries separated by air and a hairline, never boxed.

## Layout

- One centred column per screen: `1040px` on the home, `620px` on a log, `560px` on an agent page. Page padding is 40px on desktop and 24px below 720px.
- Section rhythm: 96px between the home's parts, 64px below 720px; 24px between a section's heading and its content; 8px between the lines inside a card.
- The agents are a grid: four columns with a 40px gap above 900px, two above 560px, and one below — on a phone each agent is a row, a 56px portrait at the left and the text at the right, so the roster reads as a list rather than four cramped cards.
- A work row is three columns above 720px — name 200px, summary flexible capped at 62ch, the link at the right — and stacks below it. Each row after the first carries a 1px hairline above it and 24px of padding.
- The masthead is one line — the wordmark at the left, the one GitHub link at the right — with 24px below it and no rule under it.
- The statement is display type capped at 14ch, a lede at 17px capped at 52ch, and the counts line beneath at label size with its numbers in `textStrong`.

## What changes over time

- The log grows: newest entry first, 40px between entries, the oldest flush with the page's bottom padding.
- The roster grows: a fifth agent wraps to a second grid row without changing the card, and its colour is added to this file and to `app.css` together with its portrait.
- A summary wraps to at most three lines; a project name longer than its 200px column widens that column rather than breaking mid-word.
- The narrowest supported viewport is 360px, and it never scrolls sideways.

## States

- A link brightens from `primary` to `primaryHover` over 150ms; a portrait in a card grows 2% on hover. Both are off under `prefers-reduced-motion: reduce`.
- Focus is a 2px ring in the element's own accent at 3px offset, and it is never removed.
- An agent that is not running yet has no page: its card renders without a link and with a flat ring.
- The empty log is one sentence in quiet ink, not a box.
- No state is carried by colour alone: the ring is a ring, a hover is a brightening, and a number is a number.

## Type

Two families, as the agents' own pages use them: Space Grotesk 700/600 for the statement, the headings and the names, Inter for everything else. Both are self-hosted latin subsets from `static/fonts/` — never a CDN link.

| Role | Size | Weight | Line | Tracking | Used for |
|---|---|---|---|---|---|
| display | 52 | 700 | 1.02 | -0.03em | the statement, an agent's name |
| h2 | 28 | 700 | 1.15 | -0.02em | a section heading |
| name | 17 | 600 | 1.3 | -0.01em | agent and project names, the wordmark |
| lede | 17 | 400 | 1.55 | — | the statement's lede, a section lede |
| body | 15 | 400 | 1.65 | — | prose and log entries |
| small | 13.5 | 400 | 1.5 | — | roles, summaries, meta |
| label | 12 | 500 | 1.4 | +0.08em | the counts line, a log date |

Below 720px the display and h2 roles scale with `clamp()` to 34px and 22px.

## Colour

- **ground `#0c0d1d`** — one flat fill. The radial washes the earlier system painted on it are gone: they were decoration, and the air does that work now.
- **textStrong `#e6edf3`, text `#c9d1d9`, secondary `#9aa0ae`, tertiary `#8b93a1`** — four ink tiers, and no more. `faint #6e7681` stays out of the palette: it measured 3.76:1 where it was used.
- **line `#20222e`** — the hairline between work rows and between log entries. Grouping is carried by the space as well, so the line can stay quiet.
- **agentGold `#fdd684`, agentCyan `#7aede2`, agentPink `#f7a8d8`, agentMint `#9fe6a6`** — one per agent, in that agent's ring, in the links and focus ring of that agent's own page, and nowhere else.

Measured on the ground at this build:

| Token | Used for | On ground |
|---|---|---|
| primary `#f5f5f7` | links, the wordmark | 17.68:1 |
| textStrong `#e6edf3` | the statement, names, headings | 16.29:1 |
| text `#c9d1d9` | prose, log entries | 12.47:1 |
| secondary `#9aa0ae` | ledes, summaries | 7.35:1 |
| tertiary `#8b93a1` | roles, mottoes, dates, counts | 6.22:1 |

Every agent accent clears AA as a link colour on its own page: gold 13.87:1, cyan 13.79:1, mint 13.15:1, pink 10.58:1.

## Do's and Don'ts

- **Do** let space carry the layout; a rule, a box or an icon needs a reason to exist.
- **Do** keep one idea per section, and the agents before the work.
- **Do** keep every agent's colour inside that agent's ring and page.
- **Don't** box a paragraph.
- **Don't** add a hue that belongs to no agent.
- **Don't** load a font, an image or a script from another origin.
