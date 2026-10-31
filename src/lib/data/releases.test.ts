import { describe, expect, test } from 'bun:test';
import { downloadsFrom, latestDownloads, releasesPage } from './releases';

const repo = 'https://github.com/aivara-se/pereda';

const release = {
	tag_name: 'v1.8.0',
	assets: [
		{ name: 'pereda-1.8.0-linux-x86_64.tar.gz' },
		{ name: 'pereda-1.8.0-macos-arm64.zip' },
		{ name: 'pereda-1.8.0-macos-x86_64.zip' },
		{ name: 'pereda-1.8.0-windows-x86_64.zip' }
	]
};

function answering(body: unknown, status = 200): typeof globalThis.fetch {
	return (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
}

describe('downloadsFrom', () => {
	test('links each platform to the archive the release carries', () => {
		const downloads = downloadsFrom(release, repo);
		expect(downloads.map((download) => download.key)).toEqual([
			'macosArm64',
			'macosIntel',
			'windows',
			'linux'
		]);
		expect(downloads[0].href).toBe(
			'https://github.com/aivara-se/pereda/releases/download/v1.8.0/pereda-1.8.0-macos-arm64.zip'
		);
		expect(downloads[3].href).toBe(
			'https://github.com/aivara-se/pereda/releases/download/v1.8.0/pereda-1.8.0-linux-x86_64.tar.gz'
		);
	});

	test('leaves out a platform the release did not build', () => {
		const payload = { ...release, assets: release.assets.slice(0, 1) };
		expect(downloadsFrom(payload, repo)).toEqual([
			{
				key: 'linux',
				href: 'https://github.com/aivara-se/pereda/releases/download/v1.8.0/pereda-1.8.0-linux-x86_64.tar.gz'
			}
		]);
	});

	test('gives the releases page when no archive is one of ours', () => {
		expect(downloadsFrom({ ...release, assets: [{ name: 'SHA256SUMS' }] }, repo)).toEqual([
			releasesPage(repo)
		]);
	});

	test('gives the releases page when the payload is not a release', () => {
		expect(downloadsFrom({}, repo)).toEqual([releasesPage(repo)]);
		expect(downloadsFrom(null, repo)).toEqual([releasesPage(repo)]);
	});
});

describe('latestDownloads', () => {
	test('reads the release from the repository API', async () => {
		const asked: string[] = [];
		const downloads = await latestDownloads(repo, (async (url: string) => {
			asked.push(url);
			return new Response(JSON.stringify(release));
		}) as unknown as typeof fetch);

		expect(asked).toEqual(['https://api.github.com/repos/aivara-se/pereda/releases/latest']);
		expect(downloads).toHaveLength(4);
	});

	test('gives the releases page when GitHub answers with an error', async () => {
		expect(await latestDownloads(repo, answering({ message: 'rate limited' }, 403))).toEqual([
			releasesPage(repo)
		]);
	});

	test('gives the releases page when the request fails', async () => {
		const failing = (async () => {
			throw new Error('offline');
		}) as unknown as typeof fetch;
		expect(await latestDownloads(repo, failing)).toEqual([releasesPage(repo)]);
	});
});
