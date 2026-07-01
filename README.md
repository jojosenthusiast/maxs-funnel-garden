# Max's Funnel Garden

## One-line pitch

**Max's Funnel Garden is a weird hedgehog-themed interactive game that teaches and dogfoods PostHog by making every product analytics feature part of the gameplay.**

## What it is

A playful mini-app where a hedgehog named Max travels through a garden made of product funnels, feature flags, experiments, surveys, session replays, errors, and LLM-powered hints.

It is cute, but not shallow.

The goal is to show PostHog fluency in a memorable way.

## Why it exists

PostHog values weirdness, public building, and developer-focused product craft. A serious project proves maturity. A weird project proves taste and adaptability.

Max's Funnel Garden should make someone smile and then realize:

```text
Wait, this actually uses the whole PostHog platform properly.
```

## Core gameplay

Users guide Max through a garden.

Each level represents a product concept:

```text
Level 1: Event seeds
Level 2: Funnel bridge
Level 3: Feature flag gate
Level 4: Experiment maze
Level 5: Survey pond
Level 6: Replay mirror
Level 7: Error thorns
Level 8: LLM oracle burrow
```

## PostHog usage

- Product analytics tracks player progression.
- Web analytics tracks landing page and public traffic.
- Feature flags control level variants.
- Experiments test level copy or difficulty.
- Surveys ask for feedback after friction moments.
- Session replay captures confusion points.
- Error tracking captures intentional safe demo errors.
- LLM observability tracks the hedgehog oracle assistant.

## Size

```text
Type: small-mid playful showcase
Duration: 1-2 weeks for V1
Stack: Next.js, TypeScript, PostHog
Optional backend: NestJS or serverless route for LLM oracle
```

## Non-goals

- Do not build a full game engine.
- Do not use heavy animations that slow the demo.
- Do not make the weirdness obscure the PostHog usage.
- Do not capture PII.

## Current scope

Phase 0 + Phase 1 only: playable skeleton.

- Landing page with `MaxSprite` and a Start CTA.
- Eight level routes: `/garden/1` through `/garden/8`.
- Local-only progression via `localStorage`. No accounts, no PII.
- Completion screen at `/garden/complete`.
- Static event registry (`lib/events.ts`) and flag registry (`lib/flags.ts`).
  Events log to `console.debug` in development; flags return static defaults.
- `.env.example` reserves the PostHog keys; no SDK is wired up yet.

Not yet implemented (Phase 2+): PostHog SDK, real flag evaluation, experiment
exposure, surveys, session replay, error capture, LLM oracle.

## Local development

Toolchain is pinned so the reviewer flow is deterministic:

- Node ≥ 22.13 (`engines.node` in `package.json`; needed by both pnpm 11 and native TS stripping).
- pnpm 11.3.0 (`packageManager` in `package.json`; corepack picks this up automatically).

```bash
corepack enable                    # once per machine; activates the pinned pnpm
pnpm install --frozen-lockfile
pnpm dev                           # http://localhost:3000
pnpm test                          # node:test against registries, level map, progress state, strict route parsing
pnpm lint
pnpm build
```

CI runs the same four commands (`.github/workflows/ci.yml`).

