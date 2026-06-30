# PostHog usage map

| PostHog feature | Game mechanic | Proof |
|---|---|---|
| Product analytics | Level progression events | Funnel insight screenshot |
| Web analytics | Landing page visits | Web analytics screenshot |
| Feature flags | Gate variants and weird mode | Flag key list |
| Experiments | Maze hint variants | Experiment hypothesis |
| Surveys | Survey pond | Survey screenshot |
| Session replay | Replay mirror | Replay link / screenshot |
| Error tracking | Cursed berry error | Error issue screenshot |
| LLM observability | Hedgehog oracle | LLM trace screenshot |

## Required feature flags

```text
max_weird_mode
max_gate_variant
max_oracle_enabled
max_hard_mode
```

## Required events

```text
garden_started
level_seen
level_completed
event_seed_planted
funnel_step_seen
funnel_step_completed
flag_gate_seen
flag_gate_opened
experiment_maze_started
survey_pond_seen
cursed_berry_clicked
oracle_hint_requested
oracle_hint_rated
garden_completed
```

## Required surveys

```text
survey_pond_feedback
```

## Required experiment

```text
max_maze_hint_experiment
```

Hypothesis:

```text
A more playful hint style increases level completion without increasing rage clicks or error clicks.
```

Primary metric:

```text
level_completed where level = experiment_maze
```

Guardrail metric:

```text
rage_click_like_interaction or cursed_berry_clicked
```
