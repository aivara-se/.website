// Types for what the tests read from the environment. The repository declares its own test
// surface by hand (see `bun-test.d.ts`) rather than pulling in `@types/node` and `bun-types`,
// and these are the only node APIs a test uses: reading the tree and the stylesheet.
declare module "node:fs" {
  export function existsSync(path: string): boolean;
  export function readdirSync(path: string): string[];
  export function readFileSync(path: string, encoding: "utf8"): string;
}

declare module "node:path" {
  export function join(...parts: string[]): string;
}

declare const process: {
  cwd(): string;
};
