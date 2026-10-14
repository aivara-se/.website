import raw from './projects.json';

export interface Project {
	slug: string;
	name: string;
	repo: string;
	summary: string;
}

// Nothing on this site carries a status, and nothing is singled out: the lab does not sort its
// work into active, shipped or internal, and a badge that says "active" says nothing a visitor
// cannot see for themselves.

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function parseProject(value: unknown, index: number): Project {
	if (typeof value !== 'object' || value === null) {
		throw new Error(`projects[${index}]: entry must be an object`);
	}
	const entry = value as Record<string, unknown>;
	const where = `projects[${index}]`;

	if (!isNonEmptyString(entry.slug)) {
		throw new Error(`${where}: missing slug`);
	}
	if (!isNonEmptyString(entry.name)) {
		throw new Error(`${where} (${entry.slug}): missing name`);
	}
	if (!isNonEmptyString(entry.repo)) {
		throw new Error(`${where} (${entry.slug}): missing repo`);
	}
	if (!isNonEmptyString(entry.summary)) {
		throw new Error(`${where} (${entry.slug}): missing summary`);
	}

	return {
		slug: entry.slug,
		name: entry.name,
		repo: entry.repo,
		summary: entry.summary
	};
}

export function validateProjects(data: unknown): Project[] {
	if (
		typeof data !== 'object' ||
		data === null ||
		!Array.isArray((data as { projects?: unknown }).projects)
	) {
		throw new Error('projects.json: expected an object with a "projects" array');
	}
	const entries = (data as { projects: unknown[] }).projects;
	if (entries.length === 0) {
		throw new Error('projects.json: "projects" must contain at least one entry');
	}
	return entries.map(parseProject);
}

export const projects: Project[] = validateProjects(raw);
