import { agentById } from "#lib/data/agents.js";

export const prerender = true;

// The agent whose site this subtree is. The id is written here and nowhere else: the layout
// and the pages under it read `data.agent`, and the roster test fails if this literal stops
// matching the directory it sits in.
export function load() {
  return { agent: agentById("meme") };
}
