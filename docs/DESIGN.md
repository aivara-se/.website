# Design System

The interface carries no colour of its own. One flat ink ground holds four ink tiers, one hairline, and one accent per agent.

## Colours

| Token          | Hex       | Used for                                      |
| -------------- | --------- | --------------------------------------------- |
| `ground`       | `#0c0d1d` | the page's one flat fill                      |
| `primary`      | `#f5f5f7` | links and the wordmark                        |
| `primaryHover` | `#ffffff` | a link on hover                               |
| `textStrong`   | `#e6edf3` | the statement, names, headings                |
| `text`         | `#c9d1d9` | prose and log entries                         |
| `secondary`    | `#9aa0ae` | ledes and summaries                           |
| `tertiary`     | `#8b93a1` | roles, mottoes, dates, counts                 |
| `line`         | `#20222e` | the hairline between rows and between entries |
| `agentPink`    | `#f7a8d8` | MaMa's ring, links and focus ring             |
| `agentMint`    | `#9fe6a6` | MeMe's ring, links and focus ring             |
| `agentCyan`    | `#7aede2` | MiMi's ring, links and focus ring             |
| `agentGold`    | `#fdd684` | MoMo's ring, links and focus ring             |

Measured at build on the ground: `primary` 17.68:1, `textStrong` 16.29:1, `text` 12.47:1, `secondary` 7.35:1, `tertiary` 6.22:1. Each agent accent clears AA as a link on its own page: gold 13.87:1, cyan 13.79:1, mint 13.15:1, pink 10.58:1.

## Typography

Two self-hosted latin subsets from `static/fonts/`, under the SIL Open Font License 1.1: Space Grotesk for the statement, headings and names, and Inter for everything else.

| Role    | Family        | Size   | Weight | Line | Tracking | Used for                                |
| ------- | ------------- | ------ | ------ | ---- | -------- | --------------------------------------- |
| display | Space Grotesk | 52px   | 700    | 1.02 | -0.03em  | the statement and an agent's name       |
| h2      | Space Grotesk | 28px   | 700    | 1.15 | -0.02em  | a section heading                       |
| name    | Space Grotesk | 17px   | 600    | 1.3  | -0.01em  | agent and project names, the wordmark   |
| lede    | Inter         | 17px   | 400    | 1.55 | —        | the statement's lede and a section lede |
| body    | Inter         | 15px   | 400    | 1.65 | —        | prose and log entries                   |
| small   | Inter         | 13.5px | 400    | 1.5  | —        | roles, summaries, meta                  |
| label   | Inter         | 12px   | 500    | 1.4  | 0.08em   | the counts line and a log date          |

Below 720px, display and h2 scale with `clamp()` to 34px and 22px.

## Spacing

The base unit is 8px, on a scale of 8, 16, 24, 40, 64 and 96.

| Step | Used for                                                                             |
| ---- | ------------------------------------------------------------------------------------ |
| 8px  | the lines inside a card, a label to its value, a project's facts                     |
| 16px | an agent card's inner gap, a portrait to its text, stacked identity lines            |
| 24px | page padding below 720px, a masthead's padding, a heading to its content, a work row |
| 40px | page padding on desktop, the agent grid gap, between log entries                     |
| 64px | section rhythm below 720px, a page's top padding                                     |
| 96px | section rhythm on desktop, a page's bottom padding                                   |
