// A project's downloads, read from its latest release while the site is built. Nothing runs on
// the host, so a reader cannot be answered from GitHub at request time: the build pins the tag it
// saw, which keeps the links working after the next release, where a `latest/download` path built
// from this tag would start answering 404. A build that cannot read the release still gives the
// reader the releases page rather than nothing.

export type DownloadKey =
  "macosArm64" | "macosIntel" | "windows" | "linux" | "latest";

export interface Download {
  key: DownloadKey;
  href: string;
}

// The archives the release workflow publishes, by the tail of their file name; the order here is
// the order the page prints them in.
const platforms: readonly { key: DownloadKey; suffix: string }[] = [
  { key: "macosArm64", suffix: "-macos-arm64.zip" },
  { key: "macosIntel", suffix: "-macos-x86_64.zip" },
  { key: "windows", suffix: "-windows-x86_64.zip" },
  { key: "linux", suffix: "-linux-x86_64.tar.gz" },
];

function withoutTrailingSlash(repo: string): string {
  return repo.replace(/\/+$/, "");
}

/** The repo's releases page: where a reader lands when the assets cannot be named. */
export function releasesPage(repo: string): Download {
  return {
    key: "latest",
    href: `${withoutTrailingSlash(repo)}/releases/latest`,
  };
}

/** The downloads a release payload offers, or the releases page when it names none of ours. */
export function downloadsFrom(payload: unknown, repo: string): Download[] {
  const release = payload as { tag_name?: unknown; assets?: unknown } | null;
  if (typeof release?.tag_name !== "string" || !Array.isArray(release.assets)) {
    return [releasesPage(repo)];
  }

  const names = release.assets
    .map((asset) => (asset as { name?: unknown } | null)?.name)
    .filter((name): name is string => typeof name === "string");
  const base = `${withoutTrailingSlash(repo)}/releases/download/${release.tag_name}`;
  const downloads = platforms.flatMap(({ key, suffix }) => {
    const file = names.find((name) => name.endsWith(suffix));
    return file ? [{ key, href: `${base}/${file}` }] : [];
  });

  return downloads.length > 0 ? downloads : [releasesPage(repo)];
}

/** The latest release's downloads. A failed request falls back to the releases page. */
export async function latestDownloads(
  repo: string,
  fetchImpl: typeof globalThis.fetch,
): Promise<Download[]> {
  const api = withoutTrailingSlash(repo).replace(
    "https://github.com/",
    "https://api.github.com/repos/",
  );

  try {
    const response = await fetchImpl(`${api}/releases/latest`, {
      headers: { accept: "application/vnd.github+json" },
    });
    return response.ok
      ? downloadsFrom(await response.json(), repo)
      : [releasesPage(repo)];
  } catch {
    return [releasesPage(repo)];
  }
}
