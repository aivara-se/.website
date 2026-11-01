import raw from "./projects.json";
import { isProjectKey, projectHref, type ProjectKey } from "../routes.js";

export interface ProjectScreenshot {
  /** the file in `static/`, as the page asks for it */
  src: string;
  /** what the shot shows, for a reader who cannot see it */
  alt: string;
  /** the file's own pixels, so the page can hold its space before it loads */
  width: number;
  height: number;
}

export interface Project {
  slug: ProjectKey;
  name: string;
  repo: string;
  summary: string;
  /** the app itself, where the project has a shot of it; the page shows it under the facts */
  screenshot?: ProjectScreenshot;
  /** the project's own page on this site, where its row on the front page opens */
  path: string;
}

// Nothing on this site carries a status, and nothing is singled out: the lab does not sort its
// work into active, shipped or internal, and a badge that says "active" says nothing a visitor
// cannot see for themselves.

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function parseScreenshot(value: unknown, where: string): ProjectScreenshot {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${where}: screenshot must be an object`);
  }
  const shot = value as Record<string, unknown>;

  if (!isNonEmptyString(shot.src) || !shot.src.startsWith("/")) {
    throw new Error(
      `${where}: screenshot needs a src that starts at / (static/)`,
    );
  }
  if (!isNonEmptyString(shot.alt)) {
    throw new Error(`${where}: screenshot needs alt text`);
  }
  if (!isPositiveInteger(shot.width) || !isPositiveInteger(shot.height)) {
    throw new Error(
      `${where}: screenshot needs the file's own width and height`,
    );
  }

  return {
    src: shot.src,
    alt: shot.alt,
    width: shot.width,
    height: shot.height,
  };
}

function parseProject(value: unknown, index: number): Project {
  if (typeof value !== "object" || value === null) {
    throw new Error(`projects[${index}]: entry must be an object`);
  }
  const entry = value as Record<string, unknown>;
  const where = `projects[${index}]`;

  if (!isNonEmptyString(entry.slug)) {
    throw new Error(`${where}: missing slug`);
  }
  if (!isProjectKey(entry.slug)) {
    throw new Error(`${where}: no page for the slug "${entry.slug}"`);
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
    summary: entry.summary,
    screenshot:
      entry.screenshot === undefined
        ? undefined
        : parseScreenshot(entry.screenshot, `${where} (${entry.slug})`),
    path: projectHref(entry.slug),
  };
}

export function projectBySlug(slug: ProjectKey): Project {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export function validateProjects(data: unknown): Project[] {
  if (
    typeof data !== "object" ||
    data === null ||
    !Array.isArray((data as { projects?: unknown }).projects)
  ) {
    throw new Error(
      'projects.json: expected an object with a "projects" array',
    );
  }
  const entries = (data as { projects: unknown[] }).projects;
  if (entries.length === 0) {
    throw new Error(
      'projects.json: "projects" must contain at least one entry',
    );
  }
  return entries.map(parseProject);
}

export const projects: Project[] = validateProjects(raw);
