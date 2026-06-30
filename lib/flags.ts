// Static feature flag registry. Single source of truth for flag keys.
// Phase 0-1: static defaults; Phase 2 will wire PostHog evaluation.

export const FLAG_KEYS = [
  "max_weird_mode",
  "max_gate_variant",
  "max_oracle_enabled",
  "max_hard_mode",
] as const;

export type FlagKey = (typeof FLAG_KEYS)[number];
export type FlagValue = boolean | string;

const KEY_SET: ReadonlySet<string> = new Set(FLAG_KEYS);

export function isFlagKey(key: string): key is FlagKey {
  return KEY_SET.has(key);
}

const DEFAULTS: Readonly<Record<FlagKey, FlagValue>> = {
  max_weird_mode: true,
  max_gate_variant: "open",
  max_oracle_enabled: false,
  max_hard_mode: false,
};

// ponytail: returns static defaults. Phase 2 calls posthog.getFeatureFlag().
export function getFlag(key: FlagKey): FlagValue {
  if (!isFlagKey(key)) {
    throw new Error(`Unknown flag: ${key}`);
  }
  return DEFAULTS[key];
}
