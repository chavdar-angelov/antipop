# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Antipop is a multi-seller clothing marketplace built with SvelteKit 5 and TypeScript. It uses a CQRS-lite + event-driven architecture with WebSocket for all client responses. See `docs/` for domain docs (CONCEPT, DATABASE, DOMAIN-EVENTS, USER-FLOWS, ROADMAP, PLAN).

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

npm run check            # Svelte type checking
npm run lint             # Prettier + ESLint check
npm run format           # Auto-format with Prettier

npm run test             # Run all tests (unit + e2e)
npm run test:unit        # Run unit tests (vitest, watch mode)
npm run test:unit -- --run                # Run unit tests once
npm run test:unit -- --run --project server  # Run server tests only
npm run test:e2e         # Run e2e tests (playwright, requires build first)
```

## Architecture

### Command Flow

All commands go through a single `POST /command` endpoint (fire-and-forget). The endpoint validates the command name exists and returns `200`. Results are delivered to clients via WebSocket (not HTTP response).

```
Client → POST /command { command: 'CREATE_USER', payload: {...} }
Client ← HTTP 200 { ok: true }

Command handler → validate → process → publish domain event
  → event store handler: appends to event log
  → view model handler: updates read model
Client ← WebSocket: event data
```

### Key Separation

- **Command handlers** (`src/lib/server/commands/`) — validate, process, produce domain events. No persistence.
- **Event bus** (`src/lib/server/events/event-bus.ts`) — in-process pub/sub connecting commands to handlers.
- **Event store** (`src/lib/server/events/event-store.ts`) — global listener, appends all events to event log.
- **View model handlers** (`src/lib/server/identity/on-user-created.ts` etc.) — per-event listeners, update read-optimized stores.
- **View stores** (`src/lib/server/identity/user-store.ts` etc.) — read models queried by the client.

### Source Layout

- `src/routes/command/` — single command endpoint
- `src/lib/types/` — shared types (client + server), domain event interfaces
- `src/lib/server/commands/` — command registry + individual command handlers
- `src/lib/server/events/` — event bus and event store
- `src/lib/server/identity/` — identity context (user store, event handlers)
- `src/lib/server/` — server-only code (not sent to client)
- `src/lib/` — shared library code, importable via `$lib/`
- `static/` — static assets served at root

### Test Setup (vite.config.ts)

Vitest is configured with two test projects:
- **client** — browser tests using Playwright for `*.svelte.{test,spec}.ts` files (excludes `src/lib/server/`)
- **server** — Node environment tests for `*.{test,spec}.ts` files (excludes `.svelte.` test files)

All tests require assertions (`requireAssertions: true`). Tests live next to the code they test.

## Code Style

- Tabs for indentation, single quotes, no trailing commas, 100 char print width (see `.prettierrc`)
- ESLint flat config with TypeScript and Svelte support
