// The garden map. 8 levels, each one a PostHog concept in disguise.

export type Level = {
  id: number;
  slug: string;
  title: string;
  blurb: string;
  posthogConcept: string;
};

export const LEVELS: readonly Level[] = [
  {
    id: 1,
    slug: "event-seeds",
    title: "Event seeds",
    blurb: "Plant three seeds. Each one is an event. Max likes events.",
    posthogConcept: "Product analytics — captured events.",
  },
  {
    id: 2,
    slug: "funnel-bridge",
    title: "Funnel bridge",
    blurb: "Cross plank by plank. Mind the gap between steps.",
    posthogConcept: "Funnels — step-through conversion.",
  },
  {
    id: 3,
    slug: "flag-gate",
    title: "Flag gate",
    blurb: "The gate decides who you are today.",
    posthogConcept: "Feature flags — runtime variants.",
  },
  {
    id: 4,
    slug: "experiment-maze",
    title: "Experiment maze",
    blurb: "Two hints. One works better. Probably.",
    posthogConcept: "Experiments — A/B testing.",
  },
  {
    id: 5,
    slug: "survey-pond",
    title: "Survey pond",
    blurb: "Charming, confusing, or both? Toss a pebble in.",
    posthogConcept: "Surveys — inline qualitative feedback.",
  },
  {
    id: 6,
    slug: "replay-mirror",
    title: "Replay mirror",
    blurb: "See yourself, in retrospect.",
    posthogConcept: "Session replay — watching real sessions.",
  },
  {
    id: 7,
    slug: "error-thorns",
    title: "Error thorns",
    blurb: "Do not click the cursed berry. You will click the cursed berry.",
    posthogConcept: "Error tracking — exception capture.",
  },
  {
    id: 8,
    slug: "oracle-burrow",
    title: "Oracle burrow",
    blurb: "Ask Max for one last hint. He claims to know things.",
    posthogConcept: "LLM observability — prompt, model, latency, rating.",
  },
] as const;

export const LEVEL_COUNT = LEVELS.length;

export function getLevel(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}

export function isValidLevelId(id: unknown): id is number {
  return (
    typeof id === "number" &&
    Number.isInteger(id) &&
    id >= 1 &&
    id <= LEVEL_COUNT
  );
}
