# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Antipop is a multi-seller clothing marketplace built with SvelteKit 5 and TypeScript. It uses a CQRS-lite + event-driven architecture with WebSocket for all client responses. See `docs/` for domain docs (CONCEPT, DATABASE, DOMAIN-EVENTS, USER-FLOWS, ROADMAP, PLAN).

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

npm run server           # Production server (after build)

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
Client connects via WebSocket → sends auth message → server registers connection

Client → POST /command { command: 'CREATE_USER', payload: {...}, correlationId: 'abc-123' }
Client ← HTTP 200 { ok: true }

Command handler → validate → process → publish domain event (with metadata)
  → event store handler: appends to event log
  → view model handler: updates read model
Client ← WS: (future: custom events will push data to clients)
```

### Key Separation

- **Command handlers** (`src/lib/server/commands/`) — validate, produce domain events. Return only `{ ok: true }` or `{ ok: false, error }`. No persistence, no data in response.
- **Event bus** (`src/lib/server/core/event-bus.ts`) — in-process pub/sub connecting commands to handlers.
- **Event store** (`src/lib/server/database/event-store.ts`) — appends events to `data/event_log.json`.
- **Database stores** (`src/lib/server/database/`) — JSON file persistence (`data/users.json`, `data/event_log.json`). Read models queried by command handlers and clients.
- **View model handlers** (`src/lib/server/events/identity/on-user-created.ts` etc.) — per-event listeners, update database stores.
- **Handler registration** (`src/lib/server/core/register-handlers.ts`) — central wiring of all event handlers to the event bus.
- **WebSocket layer** (`src/lib/server/ws/`) — connection manager, WS server. Uses `globalThis` for connection map to share state between server entry points and SvelteKit SSR.

### Source Layout

- `src/hooks.server.ts` — server init (registers all event handlers)
- `src/routes/command/` — single command endpoint
- `src/lib/types/` — shared types (client + server), domain event interfaces
- `src/lib/client/` — client-side utilities (WS helper)
- `src/lib/server/commands/` — command registry + individual command handlers
- `src/lib/server/core/` — core infrastructure (event bus, handler registration)
- `src/lib/server/database/` — JSON file stores (user-store, event-store) persisting to `data/`
- `src/lib/server/events/` — event handlers grouped by domain context (e.g., `events/identity/`)
- `src/lib/server/ws/` — WebSocket connection manager, server
- `src/lib/server/` — server-only code (not sent to client)
- `src/lib/` — shared library code, importable via `$lib/`
- `server.js` — custom production server (HTTP + WebSocket)
- `vite-ws-plugin.ts` — Vite plugin attaching WS server in dev
- `static/` — static assets served at root

### Test Setup (vite.config.ts)

Vitest is configured with two test projects:

- **client** — browser tests using Playwright for `*.svelte.{test,spec}.ts` files (excludes `src/lib/server/`)
- **server** — Node environment tests for `*.{test,spec}.ts` files (excludes `.svelte.` test files)

All tests require assertions (`requireAssertions: true`). Tests live next to the code they test.

## Code Style

- Tabs for indentation, single quotes, no trailing commas, 100 char print width (see `.prettierrc`)
- ESLint flat config with TypeScript and Svelte support
