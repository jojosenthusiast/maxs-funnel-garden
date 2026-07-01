// Minimal node:test suite. Run with: pnpm test
// Uses Node's native type stripping (Node >= 22.6 with --experimental-strip-types,
// default in Node >= 23.6). Imports use explicit .ts extensions for Node ESM.

import { test } from "node:test";
import assert from "node:assert/strict";

import { EVENT_NAMES, isEventName, track } from "../events.ts";
import { FLAG_KEYS, isFlagKey, getFlag } from "../flags.ts";
import { LEVELS, LEVEL_COUNT, getLevel, isValidLevelId } from "../levels.ts";

const REQUIRED_EVENTS = [
  "garden_started",
  "level_seen",
  "level_completed",
  "event_seed_planted",
  "funnel_step_seen",
  "funnel_step_completed",
  "flag_gate_seen",
  "flag_gate_opened",
  "experiment_maze_started",
  "survey_pond_seen",
  "cursed_berry_clicked",
  "oracle_hint_requested",
  "oracle_hint_rated",
  "garden_completed",
];

const REQUIRED_FLAGS = [
  "max_weird_mode",
  "max_gate_variant",
  "max_oracle_enabled",
  "max_hard_mode",
];

test("events registry contains every required event name", () => {
  for (const name of REQUIRED_EVENTS) {
    assert.ok(
      (EVENT_NAMES as readonly string[]).includes(name),
      `missing event: ${name}`,
    );
  }
});

test("isEventName accepts known, rejects unknown", () => {
  assert.equal(isEventName("garden_started"), true);
  assert.equal(isEventName("not_a_real_event"), false);
});

test("track throws on unknown event name", () => {
  // @ts-expect-error — deliberately unknown
  assert.throws(() => track("nope"));
});

test("flags registry contains every required flag key", () => {
  for (const k of REQUIRED_FLAGS) {
    assert.ok(
      (FLAG_KEYS as readonly string[]).includes(k),
      `missing flag: ${k}`,
    );
  }
});

test("getFlag returns a defined default for every known key", () => {
  for (const k of FLAG_KEYS) {
    const v = getFlag(k);
    assert.notEqual(v, undefined, `flag default missing: ${k}`);
  }
});

test("getFlag throws on unknown key", () => {
  // @ts-expect-error — deliberately unknown
  assert.throws(() => getFlag("nope"));
});

test("isFlagKey accepts known, rejects unknown", () => {
  assert.equal(isFlagKey("max_weird_mode"), true);
  assert.equal(isFlagKey("nope"), false);
});

test("levels map has exactly 8 entries with ids 1..8 and unique slugs", () => {
  assert.equal(LEVEL_COUNT, 8);
  assert.deepEqual(
    LEVELS.map((l) => l.id),
    [1, 2, 3, 4, 5, 6, 7, 8],
  );
  const slugs = new Set(LEVELS.map((l) => l.slug));
  assert.equal(slugs.size, 8, "level slugs must be unique");
});

test("isValidLevelId enforces integer bounds", () => {
  assert.equal(isValidLevelId(1), true);
  assert.equal(isValidLevelId(8), true);
  assert.equal(isValidLevelId(0), false);
  assert.equal(isValidLevelId(9), false);
  assert.equal(isValidLevelId(1.5), false);
  assert.equal(isValidLevelId("1"), false);
  assert.equal(isValidLevelId(null), false);
});

test("getLevel returns matching entry or undefined", () => {
  const l = getLevel(3);
  assert.ok(l);
  assert.equal(l?.slug, "flag-gate");
  assert.equal(getLevel(99), undefined);
});
