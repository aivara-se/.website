import { describe, expect, test } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { agents } from './agents';
import { agentHref, agentKeys, agentLogHref, projectKeys, routes } from '../routes';
import type { AgentKey } from '../routes';
import { en } from '../i18n/en';

// Run from the repository root: `bun test`.
const root = process.cwd();

// The roster, the route table and the filesystem are three places that have to agree about
// which pages exist. Nothing else checks that, so this does: an agent added to one of them and
// not to the others fails here instead of 404ing in production.
describe('the agent pages', () => {
	test('the route table lists exactly the agents in the dictionary', () => {
		expect([...agentKeys].sort()).toEqual(Object.keys(en.agent).sort());
	});

	test('every route directory is a page, an agent or a project', () => {
		const pageDirs = routes.map((route) => route.path.replace('/', '')).filter(Boolean);
		const listed = [...pageDirs, ...agentKeys, ...projectKeys].sort();
		const onDisk = readdirSync(join(root, 'src/routes'))
			.filter((name) => !name.startsWith('+'))
			.sort();

		expect(onDisk).toEqual(listed);

		// An agent's subtree: the layout carries its chrome, `/` its front page, `/log` its log.
		for (const key of agentKeys) {
			for (const file of ['+layout.svelte', '+layout.ts', '+page.svelte', 'log/+page.svelte']) {
				expect(existsSync(join(root, 'src/routes', key, file))).toBe(true);
			}
		}
	});

	test('the front page shows who the agent is, and the log is its own page', () => {
		for (const key of agentKeys) {
			const front = readFileSync(join(root, 'src/routes', key, '+page.svelte'), 'utf8');
			expect(front).toContain('AgentIdentity');
			expect(front).not.toContain('AgentLog');

			const log = readFileSync(join(root, 'src/routes', key, 'log', '+page.svelte'), 'utf8');
			expect(log).toContain('AgentLog');
			expect(log).not.toContain('AgentIdentity');
		}
	});

	test("an agent's id is written once, in its own layout's load", () => {
		for (const key of agentKeys) {
			const layout = readFileSync(join(root, 'src/routes', key, '+layout.ts'), 'utf8');
			expect(layout).toContain(`agentById('${key}')`);

			// The pages read `data.agent`, so a second page cannot name the wrong agent.
			const page = readFileSync(join(root, 'src/routes', key, '+page.svelte'), 'utf8');
			expect(page).not.toContain('agentById');
		}
	});

	test('an agent points at its own page, and at its own log', () => {
		for (const agent of agents) {
			const key = agent.id as AgentKey;
			expect(agentHref(key)).toBe(agent.path);
			expect(agentLogHref(key)).toBe(agent.logPath);
		}
	});

	test('every agent accent is a design token in the stylesheet', () => {
		const css = readFileSync(join(root, 'src/app.css'), 'utf8').toUpperCase();
		for (const agent of agents) {
			expect(css).toContain((agent.accent ?? '').toUpperCase());
		}
	});

	test('every agent portrait is committed', () => {
		for (const agent of agents) {
			expect(agent.avatar).toBeTruthy();
			expect(existsSync(join(root, 'static', agent.avatar ?? ''))).toBe(true);
		}
	});
});
