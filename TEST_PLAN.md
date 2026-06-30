# Max's Funnel Garden test plan

## Unit tests

- Event registry rejects unknown event names.
- Flag registry rejects unknown flags.
- Oracle prompt does not include forbidden fields.
- Level map has no missing levels.

## E2E tests

- Start garden.
- Complete all levels.
- Trigger cursed berry error.
- Ask oracle for hint.
- Complete garden.

## Manual PostHog verification

- [ ] Events appear in activity.
- [ ] Funnel can be created from level events.
- [ ] Feature flag variant affects UI.
- [ ] Experiment exposure appears.
- [ ] Survey appears only at survey pond.
- [ ] Session replay is available.
- [ ] Error tracking captures cursed berry.
- [ ] LLM observability captures oracle request.

## Weirdness review

Ask a reviewer:

```text
1. Did it make you smile?
2. Did the weirdness make the PostHog concepts easier or harder to understand?
3. Could you explain what each PostHog feature did after playing?
4. Was anything annoying, too slow, or unclear?
```
