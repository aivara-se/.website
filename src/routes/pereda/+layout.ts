import { projectBySlug } from '#lib/data/projects.js';
import { latestDownloads } from '#lib/data/releases.js';

export const prerender = true;

// The project whose page this subtree is. The slug is written here and nowhere else: the layout
// and the pages under it read `data.project`, and the roster test fails if this literal stops
// matching the directory it sits in. A project's sub-pages, when it grows one, hang under this
// layout the way an agent's log hangs under its agent's. The downloads are the latest release's,
// read while the site is built, which is the only moment this page can ask GitHub.
export async function load({ fetch }) {
	const project = projectBySlug('pereda');
	return { project, downloads: await latestDownloads(project.repo, fetch) };
}
