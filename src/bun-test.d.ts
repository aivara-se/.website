declare module "bun:test" {
  type TestFn = () => void | Promise<void>;

  export const test: (name: string, fn: TestFn) => void;
  export const it: (name: string, fn: TestFn) => void;
  export const describe: (name: string, fn: () => void) => void;
  export const beforeEach: (fn: TestFn) => void;
  export const afterEach: (fn: TestFn) => void;

  interface Matchers {
    toBe(expected: unknown): void;
    toEqual(expected: unknown): void;
    toThrow(expected?: string | RegExp | Error): void;
    toHaveLength(length: number): void;
    toContain(expected: unknown): void;
    toMatch(expected: RegExp): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
  }

  export const expect: (value: unknown) => Matchers & { not: Matchers };
}
