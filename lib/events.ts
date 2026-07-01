// Static event registry. Single source of truth for analytics event names.
// Phase 0-1: local no-op; Phase 2 will swap track() for real PostHog capture.

export const EVENT_NAMES = [
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
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const NAME_SET: ReadonlySet<string> = new Set(EVENT_NAMES);

export function isEventName(name: string): name is EventName {
  return NAME_SET.has(name);
}

// ponytail: no-op stub. Phase 2 wires PostHog here without changing callers.
export function track(name: EventName, props?: Record<string, unknown>): void {
  if (!isEventName(name)) {
    throw new Error(`Unknown event: ${name}`);
  }
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    console.debug(`[mfg:event] ${name}`, props ?? {});
  }
}
