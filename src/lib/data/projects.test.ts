import { describe, expect, test } from 'bun:test';
import { projects, validateProjects } from './projects';

function entry(overrides: Record<string, unknown> = {}) {
	return {
		slug: 'example',
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
		expect(result[0].slug).toBe('example');
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
});

describe('curated projects.json', () => {
	test('loads and validates the curated entries', () => {
		expect(projects).toHaveLength(3);
		expect(projects.map((project) => project.slug)).toEqual(['dispatcher', 'keysmash', 'aivara']);
	});

	test('carries no status and no internal marker', () => {
		for (const project of projects) {
			expect('status' in project).toBe(false);
			expect('internal' in project).toBe(false);
		}
	});
});
