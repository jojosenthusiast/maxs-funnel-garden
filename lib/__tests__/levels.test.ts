// Strict route parameter parsing. Prevents /garden/1abc from resolving as level 1.

import { test } from "node:test";
import assert from "node:assert/strict";

import { parseLevelParam, LEVEL_COUNT } from "../levels.ts";

test("parseLevelParam accepts plain integer strings in range", () => {
  assert.equal(parseLevelParam("1"), 1);
  assert.equal(parseLevelParam("8"), LEVEL_COUNT);
});

test("parseLevelParam rejects strings with trailing garbage (/garden/1abc)", () => {
  assert.equal(parseLevelParam("1abc"), null);
  assert.equal(parseLevelParam("2xyz"), null);
  assert.equal(parseLevelParam("3.5"), null);
  assert.equal(parseLevelParam("4 "), null);
  assert.equal(parseLevelParam(" 4"), null);
});

test("parseLevelParam rejects leading zeros, signs, and non-numeric input", () => {
  assert.equal(parseLevelParam("01"), null);
  assert.equal(parseLevelParam("+1"), null);
  assert.equal(parseLevelParam("-1"), null);
  assert.equal(parseLevelParam(""), null);
  assert.equal(parseLevelParam("abc"), null);
});

test("parseLevelParam rejects out-of-range integers", () => {
  assert.equal(parseLevelParam("0"), null);
  assert.equal(parseLevelParam("9"), null);
  assert.equal(parseLevelParam("100"), null);
});
