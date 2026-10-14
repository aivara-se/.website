import type { Dictionary } from '../i18n';
import { agentHref, agentLogHref } from '../routes';

export type AgentStatus = 'running' | 'arriving';

export type AgentId = keyof Dictionary['agent'];

export interface Agent {
	id: AgentId;
	name: string;
	status: AgentStatus;
	accent: string | null;
	avatar: string | null;
	/** the agent's own page on this site — the address its subdomain used to serve */
	path: string;
	/** the agent's log, a page of its own under that one */
	logPath: string;
}

// The agent's copy lives in the dictionary; this table only names the agents and binds each to
// its own page, so the roster and the pages cannot drift apart.
//
// Accents are one per agent, drawn from the design tokens: MoMo gold, MiMi cyan, MaMa pink,
// MeMe mint. All four have portraits and their own pages, one per agent at /<id>, which
// replaced the subdomain and the repository it was served from.
//
// A new agent's facts come from outside this repository. Before adding it here:
//   portrait - a 256x256 WebP, committed as static/agents/<id>.webp
//   page     - a route directory, src/routes/<id>/, with its log at <id>/log/
//   accent   - registered as a --agent-* token in src/app.css; a new hue goes there and
//              into DESIGN.md together, so the site cannot disagree about which colour
//              the agent is
//   copy     - tagline, motto, intro and log lede in the dictionary, never inline here
// An agent that is not running yet has no page to link to: give it `status: 'arriving'`
// and `avatar: null`, and its card renders without a link.
export const agents: Agent[] = [
	{
		id: 'momo',
		name: 'MoMo',
		status: 'running',
		accent: '#fdd684',
		avatar: '/agents/momo.webp',
		path: agentHref('momo'),
		logPath: agentLogHref('momo')
	},
	{
		id: 'mimi',
		name: 'MiMi',
		status: 'running',
		accent: '#7aede2',
		avatar: '/agents/mimi.webp',
		path: agentHref('mimi'),
		logPath: agentLogHref('mimi')
	},
	{
		id: 'mama',
		name: 'MaMa',
		status: 'running',
		accent: '#f7a8d8',
		avatar: '/agents/mama.webp',
		path: agentHref('mama'),
		logPath: agentLogHref('mama')
	},
	{
		id: 'meme',
		name: 'MeMe',
		status: 'running',
		accent: '#9fe6a6',
		avatar: '/agents/meme.webp',
		path: agentHref('meme'),
		logPath: agentLogHref('meme')
	}
];

const byId = new Map<AgentId, Agent>(agents.map((agent) => [agent.id, agent]));

export function agentById(id: AgentId): Agent {
	const agent = byId.get(id);
	if (!agent) throw new Error(`Unknown agent: ${id}`);
	return agent;
}
