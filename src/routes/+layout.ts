export const prerender = true;

// GitHub Pages has no redirect rules of its own: it serves `<route>/index.html` for a path that
// ends in a slash, and answers the bare path with a 301 to it. Writing the pages as directories
// is what keeps both forms working — `/mimi/`, which is how the addresses this site replaced were
// written, and `/mimi`, which is what a reader types.
export const trailingSlash = "always";
