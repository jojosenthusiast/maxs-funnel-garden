// Playable-flow behavior tests for the progression state machine.
// Covers the loop the level page relies on: start -> mark levels 1..8 -> all done.

import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  loadProgress,
  markCompleted,
  resetProgress,
} from "../progress.ts";
import { LEVEL_COUNT } from "../levels.ts";

// Minimal in-memory localStorage shim. Progress module reads `window.localStorage`
// and is a no-op when window is undefined, so we install one before each test.
function installStorage(): void {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
  (globalThis as unknown as { window?: unknown }).window = { localStorage: storage };
}

beforeEach(() => {
  installStorage();
  resetProgress();
});

test("fresh progress is empty", () => {
  assert.deepEqual(loadProgress(), { completed: [] });
});

test("markCompleted records a level and dedupes on repeat calls", () => {
  markCompleted(1);
  markCompleted(1);
  assert.deepEqual(loadProgress().completed, [1]);
});

test("markCompleted keeps completed levels sorted regardless of order", () => {
  markCompleted(3);
  markCompleted(1);
  markCompleted(2);
  assert.deepEqual(loadProgress().completed, [1, 2, 3]);
});

test("full playable flow: completing all 8 levels tracks them all", () => {
  for (let level = 1; level <= LEVEL_COUNT; level++) {
    markCompleted(level);
  }
  const p = loadProgress();
  assert.equal(p.completed.length, LEVEL_COUNT);
  assert.deepEqual(p.completed, [1, 2, 3, 4, 5, 6, 7, 8]);
});

test("resetProgress clears everything", () => {
  markCompleted(1);
  markCompleted(2);
  resetProgress();
  assert.deepEqual(loadProgress(), { completed: [] });
});

test("loadProgress ignores garbage and out-of-range values persisted by older clients", () => {
  (globalThis as { window: { localStorage: Storage } }).window.localStorage.setItem(
    "mfg:progress:v1",
    JSON.stringify({ completed: [1, 2, "three", 99, -1, 3.5, 3] }),
  );
  assert.deepEqual(loadProgress().completed, [1, 2, 3]);
});
