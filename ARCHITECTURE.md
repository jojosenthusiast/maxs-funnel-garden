# Max's Funnel Garden architecture

## Minimal V1 architecture

```text
Next.js app
├── app/page.tsx
├── app/garden/[level]/page.tsx
├── app/api/oracle/route.ts
├── lib/posthog/client.ts
├── lib/posthog/server.ts
├── lib/events.ts
├── lib/flags.ts
├── components/MaxSprite.tsx
├── components/PostHogProofPanel.tsx
└── docs/demo-map.md
```

## Optional V2 architecture

```text
apps/web
apps/api
packages/events
packages/ui
packages/oracle
```

## State model

Use local state for V1.

Store only:

- current level
- completed levels
- oracle responses
- local preferences

Do not require accounts.

## Privacy

No email capture.
No real names.
No free-form sensitive inputs unless disabled from capture.
No recording of secret values.

## PostHog proof panel

Each level has a small panel:

```text
What this level demonstrates:
- Events captured
- Flag used
- Experiment used
- Survey used
- Where to see it in PostHog
```

This keeps the UI fun and the demo technically inspectable.
