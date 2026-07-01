# Max's Funnel Garden tasks

## Phase 0 — design slice

- [x] Choose visual style. (mossy garden palette, SVG hedgehog, Tailwind v4)
- [x] Define 8 levels. (`lib/levels.ts`)
- [x] Define event registry. (`lib/events.ts`)
- [x] Define feature flags. (`lib/flags.ts`)
- [ ] Create PostHog project. (out-of-repo / Phase 2)
- [x] Add `.env.example`.

## Phase 1 — playable skeleton

- [x] Build landing page. (`app/page.tsx`)
- [x] Build level route. (`app/garden/[level]/page.tsx`)
- [x] Add Max sprite component. (`components/MaxSprite.tsx`)
- [x] Add progression state. (`lib/progress.ts`, localStorage)
- [x] Add completion screen. (`app/garden/complete/page.tsx`)

## Phase 2 — PostHog instrumentation

- [ ] Install PostHog web SDK.
- [ ] Capture garden started.
- [ ] Capture level seen/completed.
- [ ] Add feature flags.
- [ ] Add experiment variant.
- [ ] Add survey pond.
- [ ] Enable session replay safely.
- [ ] Add cursed berry error.

## Phase 3 — oracle

- [ ] Add `/api/oracle` route.
- [ ] Add prompt template.
- [ ] Add LLM observability capture.
- [ ] Add user rating event.
- [ ] Add cost/latency display in proof panel.

## Phase 4 — polish

- [x] Add proof panel. (`components/PostHogProofPanel.tsx` — concept-only in Phase 0/1; per-level event/flag list wires in Phase 2)
- [ ] Add README screenshots.
- [ ] Add demo script.
- [ ] Add public write-up.
- [ ] Add limitations.

## Exit criteria

```text
A user can complete the garden in under 3 minutes, and every PostHog feature in the usage map has visible evidence.
```
