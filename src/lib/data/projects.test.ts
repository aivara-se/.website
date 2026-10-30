import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { projects, projectBySlug, validateProjects } from './projects';
import { projectHref } from '../routes';
import { en } from '../i18n/en';

// Run from the repository root: `bun test`.
const root = process.cwd();

function entry(overrides: Record<string, unknown> = {}) {
	return {
		slug: 'dispatch',
		name: 'example',
		repo: 'https://github.com/example/example',
		summary: 'Summary',
		...overrides
	};
}

describe('validateProjects', () => {
	test('accepts a well-formed entry', () => {
		const result = validateProjects({ projects: [entry()] });
		expect(result).toHaveLength(1);
		expect(result[0].slug).toBe('dispatch');
		expect(result[0].path).toBe('/dispatch/');
	});

	test('rejects a slug with no page in the route table', () => {
		expect(() => validateProjects({ projects: [entry({ slug: 'unbuilt' })] })).toThrow(
			'no page for the slug "unbuilt"'
		);
	});

	test('rejects an entry with a missing slug', () => {
		const { slug: _slug, ...rest } = entry();
		expect(() => validateProjects({ projects: [rest] })).toThrow();
	});

	test('rejects an entry with a missing name', () => {
		const { name: _name, ...rest } = entry();
		expect(() => validateProjects({ projects: [rest] })).toThrow();
	});

	test('rejects an entry with a missing repo', () => {
		const { repo: _repo, ...rest } = entry();
		expect(() => validateProjects({ projects: [rest] })).toThrow();
	});

	test('rejects an entry with a missing summary', () => {
		const { summary: _summary, ...rest } = entry();
		expect(() => validateProjects({ projects: [rest] })).toThrow();
	});

	test('rejects a payload without a projects array', () => {
		expect(() => validateProjects({})).toThrow();
	});

	test('rejects an empty projects array', () => {
		expect(() => validateProjects({ projects: [] })).toThrow();
	});

	test('accepts a screenshot with a src, alt text and its own size', () => {
		const result = validateProjects({
			projects: [
				entry({ screenshot: { src: '/shots/x.png', alt: 'The app', width: 800, height: 600 } })
			]
		});
		expect(result[0].screenshot).toEqual({
			src: '/shots/x.png',
			alt: 'The app',
			width: 800,
			height: 600
		});
	});

	test('rejects a screenshot without alt text', () => {
		expect(() =>
			validateProjects({
				projects: [entry({ screenshot: { src: '/x.png', width: 8, height: 6 } })]
			})
		).toThrow('alt');
	});

	test('rejects a screenshot whose src does not start at the site root', () => {
		expect(() =>
			validateProjects({
				projects: [entry({ screenshot: { src: 'x.png', alt: 'The app', width: 8, height: 6 } })]
			})
		).toThrow();
	});
});

describe('curated projects.json', () => {
	test('loads and validates the curated entries', () => {
		expect(projects).toHaveLength(2);
		expect(projects.map((project) => project.slug)).toEqual(['dispatch', 'pereda']);
	});

	test('carries no status and no internal marker', () => {
		for (const project of projects) {
			expect('status' in project).toBe(false);
			expect('internal' in project).toBe(false);
		}
	});

	test("every project has its own page, and its path is the route table's", () => {
		for (const project of projects) {
			expect(project.path).toBe(projectHref(project.slug));
			for (const file of ['+layout.svelte', '+layout.ts', '+page.svelte']) {
				expect(existsSync(join(root, 'src/routes', project.slug, file))).toBe(true);
			}
		}
	});

	test("a project's slug is written once, in its own layout's load", () => {
		for (const project of projects) {
			const layout = readFileSync(join(root, 'src/routes', project.slug, '+layout.ts'), 'utf8');
			expect(layout).toContain(`projectBySlug('${project.slug}')`);

			// The pages read `data.project`, so a second page cannot name the wrong one.
			const page = readFileSync(join(root, 'src/routes', project.slug, '+page.svelte'), 'utf8');
			expect(page).not.toContain('projectBySlug');
		}
	});

	test('every project has the copy its page prints', () => {
		for (const project of projects) {
			const copy = (
				en.project as Record<string, { summary: string; description: string } | undefined>
			)[project.slug];
			expect(copy?.summary).toBe(project.summary);
			expect((copy?.description ?? '').length > 0).toBe(true);
		}
	});

	test('looks a project up by the slug its layout names', () => {
		for (const project of projects) {
			expect(projectBySlug(project.slug)).toEqual(project);
		}
	});

	test('a screenshot, where a project has one, is a file the site serves', () => {
		for (const project of projects) {
			if (!project.screenshot) continue;
			expect(existsSync(join(root, 'static', project.screenshot.src))).toBe(true);
		}
	});
});
