# Max's Funnel Garden specification

## Product goal

Create a memorable, weird, PostHog-heavy demo that shows product analytics concepts through an interactive hedgehog garden.

## User experience

The user lands on a whimsical page and starts a short journey. They help Max cross different product engineering obstacles.

Each obstacle maps to a PostHog product capability.

## Levels

### Level 1 — Event seeds

User plants three event seeds.

Captured events:

```text
garden_started
event_seed_planted
level_completed
```

### Level 2 — Funnel bridge

User crosses a bridge with multiple steps.

Captured events:

```text
funnel_step_seen
funnel_step_completed
funnel_abandoned
```

### Level 3 — Feature flag gate

A gate opens differently depending on a feature flag.

Flag:

```text
max_gate_variant
```

### Level 4 — Experiment maze

Two versions of maze copy or hint style are tested.

Experiment:

```text
max_maze_hint_experiment
```

### Level 5 — Survey pond

After a friction point, user gets a tiny survey.

Survey question:

```text
Was this level charming, confusing, or both?
```

### Level 6 — Replay mirror

User is told they can watch how confusion looked via session replay.

No sensitive inputs.

### Level 7 — Error thorns

A safe intentional error is triggered by clicking a cursed berry.

Captured error:

```text
CursedBerryError
```

### Level 8 — LLM oracle burrow

User asks the hedgehog oracle for a hint.

LLM observability captures:

- prompt template id
- model
- latency
- output rating
- token estimate if available

## Acceptance criteria

- App can be completed in under 3 minutes.
- Uses at least 12 static events.
- Uses at least 3 feature flags.
- Uses at least 1 experiment.
- Uses at least 1 survey.
- Shows session replay guidance.
- Captures 1 safe intentional error.
- Tracks 1 LLM interaction.
- README maps every PostHog feature to a game moment.
- Demo video is under 3 minutes.

## Tone

Weird, cute, and direct.

Do not write corporate copy.

Do not over-explain on the main UI. Put explanations in a collapsible "what this shows" panel.
