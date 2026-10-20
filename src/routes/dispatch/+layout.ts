import { projectBySlug } from '#lib/data/projects.js';

export const prerender = true;

// The project whose page this subtree is. The slug is written here and nowhere else: the layout
// and the pages under it read `data.project`, and the roster test fails if this literal stops
// matching the directory it sits in. A project's sub-pages, when it grows one, hang under this
// layout the way an agent's log hangs under its agent's.
export function load() {
	return { project: projectBySlug('dispatch') };
}
